"use client";
import { WagmiProvider, http, createConfig } from "wagmi";
import { FC, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getEnvConfigValue } from "../envConfig/envConfig";
import { mainnet as mainnetProvider, bsc as bscProvider } from "wagmi/chains";

import { appDescription } from "@/utils/constants";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { useNetworkConfig } from "./useNetworkConfigs";

const queryClient = new QueryClient();

export const Web3Provider: FC<PropsWithChildren> = ({ children }) => {
  const projectId = getEnvConfigValue("WALLET_CONNECT_PROJECT_ID");
  const { kyoto, bsc } = useNetworkConfig();

  const config = getDefaultConfig({
    appName: appDescription.title,
    projectId,
    chains: [
      mainnetProvider,
      {
        id: kyoto.chainId,
        name: "Kyoto",
        nativeCurrency: { name: "KYOTO", symbol: "KYOT", decimals: 18 },
        rpcUrls: {
          default: { http: [kyoto.rpc] },
        },
        blockExplorers: {
          default: { name: "KYOTO", url: kyoto.explorerUrl },
        },
      },
      {
        ...bscProvider,
        id: bsc.chainId,
        rpcUrls: {
          default: { http: [bsc.rpc] },
        },
        blockExplorers: {
          default: { name: "BSC", url: bsc.explorerUrl },
        },
      },
    ],
    transports: {
      [mainnetProvider.id]: http(),
      [kyoto.chainId]: http(kyoto.rpc),
      [bsc.chainId]: http(bsc.rpc),
    },
    ssr: true,
  });
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};
