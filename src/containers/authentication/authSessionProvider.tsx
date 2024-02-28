"use client";
import { ReactNode, useEffect, useState } from "react";
import { loadStoredSession } from "./logic/session";
import { AppLoadingInfo } from "@/components/layouts/AppLoadingInfo";
import { logError } from "../maintenanceLogs/maintenanceLog";

export const AuthSessionProvider = ({ children }: { children: ReactNode }) => {
  const [loadingState, setLoadingState] = useState<
    "not-loaded" | "error" | "loaded"
  >("not-loaded");
  useEffect(() => {
    const refreshSession = async () => {
      try {
        await loadStoredSession();
        setLoadingState("loaded");
      } catch (err) {
        logError("Failed to restore previous user session", err);
        setLoadingState("error");
      }
    };
    refreshSession();
  }, []);

  return (
    <>
      {loadingState === "not-loaded" && (
        <AppLoadingInfo>
          <div className="text-xl">Loading...</div>
        </AppLoadingInfo>
      )}
      {loadingState === "error" && (
        <AppLoadingInfo>
          <div className="text-xl">Error</div>
        </AppLoadingInfo>
      )}
      {loadingState === "loaded" && children}
    </>
  );
};
