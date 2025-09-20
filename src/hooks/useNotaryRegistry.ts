import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { filecoinCalibration } from "@/utils/constants";
import { contracts } from "@/utils/constants";
import NotaryRegistryAbi from "../abi/NotaryRegistry.json";

const notaryRegistryContract = {
  address: contracts.NotaryRegistry as `0x${string}`,
  abi: NotaryRegistryAbi,
};

// Read hook for isNotary
export const useIsNotary = (address: `0x${string}`) => {
  const { data, error, isLoading, isError } = useReadContract({
    // Changed to useReadContract
    ...notaryRegistryContract,
    functionName: "isNotary",
    args: [address],
    query: {
      // Added query object
      enabled: !!address,
    },
  });

  return { data, error, isLoading, isError };
};

// Read hook for getNotaryCount
export const useGetNotaryCount = () => {
  const { data, error, isLoading, isError } = useReadContract({
    // Changed to useReadContract
    ...notaryRegistryContract,
    functionName: "getNotaryCount",
    query: {
      // Added query object
      enabled: true, // Always enabled for a global count
    },
  });

  return { data, error, isLoading, isError };
};

// Write hook for addNotary
export const useAddNotary = () => {
  const { address: account } = useAccount();
  const {
    data: hash,
    writeContract,
    isPending,
    error,
    isError,
  } = useWriteContract();
  const {
    data: receipt,
    isLoading: isConfirming,
    isSuccess,
    isError: isReceiptError,
    error: receiptError,
  } = useWaitForTransactionReceipt({ hash });
  return {
    writeContract: (address: `0x${string}`, did: string) =>
      writeContract({
        ...notaryRegistryContract,
        functionName: "addNotary",
        args: [address, did],
        chain: filecoinCalibration,
        account,
      }),
    data: receipt,
    isLoading: isPending || isConfirming,
    isSuccess,
    isError: isError || isReceiptError,
    error: error || receiptError,
  };
};

// Write hook for removeNotary
export const useRemoveNotary = () => {
  const { address: account } = useAccount();
  const {
    data: hash,
    writeContract,
    isPending,
    error,
    isError,
  } = useWriteContract();
  const {
    data: receipt,
    isLoading: isConfirming,
    isSuccess,
    isError: isReceiptError,
    error: receiptError,
  } = useWaitForTransactionReceipt({ hash });
  return {
    writeContract: (address: `0x${string}`) =>
      writeContract({
        ...notaryRegistryContract,
        functionName: "removeNotary",
        args: [address],
        chain: filecoinCalibration,
        account,
      }),
    data: receipt,
    isLoading: isPending || isConfirming,
    isSuccess,
    isError: isError || isReceiptError,
    error: error || receiptError,
  };
};
