import { useCallback, useMemo } from "react";
import { AxiosError } from "axios";
import useLoginStateData, {
  LoginWizardData,
  WalletProvider,
} from "../store/loginData.slice";
import { getApiClient } from "@/containers/authentication/authClient";
import { SessionDataResponse } from "@/types/api.type";
import { useSession } from "@/containers/authentication/useSession";
import { handleOperationError } from "@/containers/errorHandling/errorHandlingActions";

export const useLoginWizardLogic = () => {
  const {
    loginWizard,
    resetPasswordWizard,
    setLoginWizard,
    setResetPasswordWizard,
  } = useLoginStateData();
  const { startSession } = useSession();

  const showLoginWizard = useCallback(() => {
    setLoginWizard({ kind: "method-select" });
    setResetPasswordWizard(null);
  }, [setLoginWizard, setResetPasswordWizard]);

  const hideLoginWizard = useCallback(() => {
    setLoginWizard(null);
  }, [setLoginWizard]);

  const selectLoginMethod = useCallback(
    (
      payload:
        | "email"
        | {
            kind: "wallet";
            provider: WalletProvider;
          }
    ) => {
      const initialState: LoginWizardData =
        payload === "email"
          ? {
              kind: "email",
              isForgotPassword: false,
              isLoginError: false,
              resetPasswordEmailSent: false,
            }
          : {
              kind: "wallet",
              provider: payload.provider,
            };
      setLoginWizard(initialState);
    },
    [setLoginWizard]
  );

  const goToLoginMethod = useCallback(() => {
    setLoginWizard({
      kind: "method-select",
    });
  }, [setLoginWizard]);

  const changeForgotPasswordMode = useCallback(
    (val: boolean) => {
      if (loginWizard?.kind !== "email") {
        return;
      }
      setLoginWizard({
        ...loginWizard,
        isForgotPassword: val,
        resetPasswordEmailSent: false,
      });
    },
    [loginWizard, setLoginWizard]
  );

  const loginWithEmailPassword = useCallback(
    async (email: string, password: string, navigate: () => void) => {
      try {
        const client = await getApiClient.withoutAuth();
        const loginResponse = await client.post<SessionDataResponse>("login", {
          email,
          password,
        });
        await startSession(
          loginResponse.data.access_token,
          loginResponse.data.refresh_token,
          navigate
        );
        setLoginWizard(null);
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 401) {
          if (loginWizard?.kind !== "email") {
            return;
          }
          setLoginWizard({
            ...loginWizard,
            isLoginError: true,
          });
          return;
        }
        handleOperationError("Error during login operation", err);
      }
    },
    [loginWizard, setLoginWizard, startSession]
  );

  const sendPasswordResetRequest = useCallback(
    async (email: string) => {
      try {
        const client = await getApiClient.withoutAuth();
        await client.post("password/resetpassword", {
          email,
        });
        if (loginWizard?.kind !== "email") {
          return;
        }
        setLoginWizard({
          ...loginWizard,
          resetPasswordEmailSent: true,
        });
      } catch (err) {
        handleOperationError("Error when sending password reset link", err);
      }
    },
    [loginWizard, setLoginWizard]
  );

  const showResetPasswordWizard = useCallback(
    (token: string) => {
      setResetPasswordWizard({
        token,
        passwordResetStatus: null,
      });
    },
    [setResetPasswordWizard]
  );

  const resetPassword = useCallback(
    async (password: string) => {
      try {
        if (!resetPasswordWizard) {
          return;
        }
        const client = await getApiClient.withoutAuth();
        await client.post("password/resetpassword/newpassword", {
          token: resetPasswordWizard.token,
          password,
        });
        setResetPasswordWizard({
          ...resetPasswordWizard,
          passwordResetStatus: "success",
        });
      } catch (err) {
        if (err instanceof AxiosError && err.response?.status === 401) {
          if (!resetPasswordWizard) {
            return;
          }
          setResetPasswordWizard({
            ...resetPasswordWizard,
            passwordResetStatus: "error",
          });
          return;
        }
        handleOperationError("Error when setting new password", err);
      }
    },
    [resetPasswordWizard, setResetPasswordWizard]
  );

  const result = useMemo(
    () => ({
      showLoginWizard,
      hideLoginWizard,
      selectLoginMethod,
      goToLoginMethod,
      changeForgotPasswordMode,
      loginWithEmailPassword,
      sendPasswordResetRequest,
      showResetPasswordWizard,
      resetPassword,
    }),
    [
      showLoginWizard,
      hideLoginWizard,
      selectLoginMethod,
      goToLoginMethod,
      changeForgotPasswordMode,
      loginWithEmailPassword,
      sendPasswordResetRequest,
      showResetPasswordWizard,
      resetPassword,
    ]
  );

  return result;
};
