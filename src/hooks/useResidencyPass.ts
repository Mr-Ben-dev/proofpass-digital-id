import { contracts, filecoinCalibration } from "@/utils/constants";
import {
    useAccount,
    useReadContract,
    useWaitForTransactionReceipt,
    useWriteContract,
} from "wagmi";
import ResidencyPassAbi from "../abi/ResidencyPass.json";

const residencyPassContract = {
  address: contracts.ResidencyPass as `0x${string}`,
  abi: ResidencyPassAbi,
};

export function useVerifyResidency(passId: bigint | null) {
  return useReadContract({
    ...residencyPassContract,
    functionName: "verifyResidency",
    args: passId !== null ? [passId] : undefined,
    query: { enabled: passId !== null },
  });
}

export function useGetPDPFreshness(passId: bigint | null) {
  return useReadContract({
    ...residencyPassContract,
    functionName: "getPDPFreshness",
    args: passId !== null ? [passId] : undefined,
    query: { enabled: passId !== null },
  });
}

export const useIssuePass = () => {
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
    writeContract: (
      to: `0x${string}`,
      country: string,
      region: string,
      docCID: string,
      metaCID: string,
      expiry: bigint,
      fee: bigint | undefined
    ) =>
      writeContract({
        ...residencyPassContract,
        functionName: "issuePass",
        args: [to, country, region, docCID, metaCID, expiry],
        value: fee,
        chain: filecoinCalibration,
        account,
      }),
    hash, // Export the transaction hash
    data: receipt,
    isLoading: isPending || isConfirming,
    isSuccess,
    isError: isError || isReceiptError,
    error: error || receiptError,
  };
};

export const useFeeAmount = () => {
  return useReadContract({
    // Changed to useReadContract
    ...residencyPassContract,
    functionName: "feeAmount",
    query: {
      // Added query object
      enabled: true, // Always enabled
    },
  });
};

export const usePdpFee = () => {
  return useReadContract({
    // Changed to useReadContract
    ...residencyPassContract,
    functionName: "pdpFee",
    query: {
      // Added query object
      enabled: true, // Always enabled
    },
  });
};

export const useTriggerPDPCheck = () => {
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
    writeContract: (passId: bigint, fee: bigint | undefined) =>
      writeContract({
        ...residencyPassContract,
        functionName: "triggerPDPCheck",
        args: [passId],
        value: fee,
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
