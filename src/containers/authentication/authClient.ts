import { createClient } from "./logic/client";
import { isRefreshNeeded, obtainNewTokens } from "./logic/token";
import { AxiosInstance } from "axios";
import { deleteSession, setSessionData } from "./logic/session";
import useAuthData from "./store/authData-slice";
import { logError } from "../maintenanceLogs/maintenanceLog";

export const getApiClient = prepareApiClientFn();

function prepareApiClientFn() {
  const getApiClientWithoutAuth = async () => {
    return createClient();
  };

  const getAuthApiClient = async () => {
    const { session } = useAuthData.getState();
    const accessToken = session?.accessToken;
    const refreshToken = session?.refreshToken;

    const refreshSession = async (token: string | undefined) => {
      const data = await obtainNewTokens(token);
      setSessionData({
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      });
      return data.access_token;
    };

    let newToken = accessToken;
    try {
      const refreshNeeded = isRefreshNeeded(accessToken);
      if (refreshNeeded) {
        newToken = await refreshSession(refreshToken);
      }
    } catch (err) {
      deleteSession();
      logError("Error when refresing jwt", err);
      newToken = undefined;
    }
    return createClient(newToken);
  };
  const result = getAuthApiClient as ApiClient;
  result.withoutAuth = getApiClientWithoutAuth;
  return result;
}

interface ApiClient {
  (): Promise<AxiosInstance>;
  withoutAuth(): Promise<AxiosInstance>;
}
