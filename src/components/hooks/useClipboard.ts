import { useCallback } from "react";

export const useClipboard = () => {
  const copy = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
  }, []);

  return copy;
};
