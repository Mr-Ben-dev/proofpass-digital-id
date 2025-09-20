import { usePublicClient, useWalletClient } from "wagmi";
import { type PublicClient, type WalletClient } from "viem";
import { filecoinCalibration } from "@/utils/constants";

export function useFilecoinPublicClient(): PublicClient | undefined {
  // Workaround for TypeScript deep instantiation error
  const client = usePublicClient({ chainId: filecoinCalibration.id }) as any as
    | PublicClient
    | undefined;
  return client;
}

export function useFilecoinWalletClient(): WalletClient | undefined | null {
  const { data: walletClient } = useWalletClient({
    chainId: filecoinCalibration.id,
  });
  return walletClient;
}
