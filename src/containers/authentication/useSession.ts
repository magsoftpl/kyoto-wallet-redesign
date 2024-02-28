import { useMemo } from "react";
import {
  deleteSession as terminateSession,
  startSession,
} from "./logic/session";

export const useSession = () => {
  const result = useMemo(
    () => ({
      startSession,
      terminateSession,
    }),
    []
  );
  return result;
};
