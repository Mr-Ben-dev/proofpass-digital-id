import { ENV } from "@/config/environment";
import { filecoinCalibration } from "@/utils/constants";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [filecoinCalibration],
  transports: {
    [filecoinCalibration.id]: http(ENV.RPC_URL),
  },
  connectors: [
    injected(),
    ...(ENV.WALLET_CONNECT_PROJECT_ID 
      ? [walletConnect({ 
          projectId: ENV.WALLET_CONNECT_PROJECT_ID,
          metadata: {
            name: 'ProofPass Digital ID',
            description: 'Soulbound NFT Residency Passes with PDP verification',
            url: 'https://proofpass.app',
            icons: ['https://proofpass.app/icon.png']
          }
        })]
      : []
    ),
  ],
});

const queryClient = new QueryClient();

export function WagmiProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
