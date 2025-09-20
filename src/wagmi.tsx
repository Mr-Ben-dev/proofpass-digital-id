import { createConfig, http, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { filecoinCalibration } from "@/utils/constants";
import { injected } from "wagmi/connectors";
import React from "react";

export const wagmiConfig = createConfig({
  chains: [filecoinCalibration],
  transports: {
    [filecoinCalibration.id]: http("https://calibration.filfox.info/rpc/v1"),
  },
  connectors: [injected()],
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
