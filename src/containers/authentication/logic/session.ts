import { obtainNewTokens } from "./token";
import { getApiClient } from "../authClient";
import { SessionDataResponse, UserProfileResponse } from "@/types/api.type";
import { resetAllStores } from "@/utils/zustand/storeUtils";
import useAuthData from "../store/authData.slice";
import { handleOperationError } from "@/containers/errorHandling/errorHandlingActions";

export const setSessionData = (
  data: { accessToken: string; refreshToken: string } | null
) => {
  const { setSessionData } = useAuthData.getState();

  setSessionData(data);
  if (data?.refreshToken) {
    localStorage.setItem("refresh-token", data.refreshToken);
  } else {
    localStorage.removeItem("refresh-token");
  }
};
//TODO: restore user profile
export const loadStoredSession = async () => {
  //const { setCurrentUser } = useCurrentUserData.getState()
  const refreshToken = localStorage.getItem("refresh-token");
  if (!refreshToken) {
    setSessionData(null);
    //setCurrentUser(null);
    return;
  }
  const data = await obtainNewTokens(refreshToken);
  setSessionData({
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
  });
  // const apiClient = await getApiClient();
  // const userData = await apiClient.get<UserProfileResponse>("user/profile");
  // setCurrentUser(userData.data.profile);
};

export const deleteSession = async (navigate?: () => void) => {
  try {
    resetAllStores();
    const apiClient = await getApiClient();
    await apiClient.delete("session");
    // setCurrentUser(null);
    setSessionData(null);
  } catch (err) {
    handleOperationError("Logout operation failed", err);
  }
  window.localStorage.clear();
  if (navigate) {
    navigate();
  } else {
    window.location.replace("/login");
  }
};

export const startSession = async (
  accessToken: string,
  refreshToken: string,
  navigate: () => void
) => {
  try {
    const apiClient = await getApiClient.withoutAuth();
    // setCurrentUser(null);
    setSessionData({
      accessToken,
      refreshToken,
    });
    navigate();
  } catch (err) {
    handleOperationError("Login operation failed", err);
  }
};
