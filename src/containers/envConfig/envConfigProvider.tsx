"use client";
import { ReactNode, useEffect, useState } from "react";
import { setEnvConfig } from "./envConfig";
import { getApiClient } from "@/containers/authentication/authClient";
import { AppLoadingInfo } from "@/components/complex-controls/AppLoadingInfo";
import { logError } from "../maintenanceLogs/maintenanceLog";

export const EnvConfigProvider = ({ children }: { children: ReactNode }) => {
  const [loadingState, setLoadingState] = useState<
    "not-loaded" | "error" | "loaded"
  >("not-loaded");
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const apiClient = await getApiClient.withoutAuth();
        const configResponse = await apiClient.get<{
          config: Record<string, string>;
        }>("/config");
        setLoadingState("loaded");
        setEnvConfig(configResponse.data.config);
      } catch (err) {
        logError("Error loading environment config", err);
        setLoadingState("error");
      }
    };
    loadConfig();
  }, []);

  return (
    <>
      {loadingState === "not-loaded" && (
        <AppLoadingInfo>
          <div className="text-white text-xl">Loading...</div>
        </AppLoadingInfo>
      )}
      {loadingState === "error" && (
        <AppLoadingInfo>
          <div className="text-white text-xl">Error</div>
        </AppLoadingInfo>
      )}
      {loadingState === "loaded" && children}
    </>
  );
};
