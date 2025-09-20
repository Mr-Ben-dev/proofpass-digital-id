import { useAccount, useConnect, useDisconnect } from "wagmi";

export function useWallet() {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  return {
    address,
    isConnected,
    isConnecting,
    connect,
    connectors,
    error,
    isPending,
    disconnect,
  };
}
