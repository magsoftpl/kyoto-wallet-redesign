import { useMemo } from "react";
import { useAccount } from "wagmi";

export const useCurrentWalletInfo = () => {
  const { address, isConnected } = useAccount();
  const result = useMemo(
    () => ({
      address: isConnected ? address : null,
    }),
    [address, isConnected]
  );
  return result;
};
