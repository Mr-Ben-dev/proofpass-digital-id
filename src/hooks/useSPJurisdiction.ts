import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { filecoinCalibration } from "@/utils/constants";
import { contracts } from "@/utils/constants";
import SPJurisdictionAbi from "../abi/SPJurisdiction.json";

const spJurisdictionContract = {
  address: contracts.SPJurisdiction as `0x${string}`,
  abi: SPJurisdictionAbi,
};

export const useIsSPCompliant = (
  sp: `0x${string}`,
  country: string,
  region: string
) => {
  const { data, error, isLoading, isError } = useReadContract({
    // Changed to useReadContract
    ...spJurisdictionContract,
    functionName: "isSPCompliant",
    args: [sp, country, region],
    query: {
      // Added query object
      enabled: !!sp && !!country,
    },
  });

  return { data, error, isLoading, isError };
};

export const useRegisterJurisdiction = () => {
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
      country: string,
      region: string,
      vcCID: string,
      expiry: bigint,
      signature: `0x${string}`
    ) =>
      writeContract({
        ...spJurisdictionContract,
        functionName: "registerJurisdiction",
        args: [country, region, vcCID, expiry, signature],
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
