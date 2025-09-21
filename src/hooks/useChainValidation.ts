import { ENV } from "@/config/environment";
import { useEffect } from "react";
import { useChainId } from "wagmi";
import { useToast } from "./use-toast";

export const useChainValidation = () => {
  const chainId = useChainId();
  const { toast } = useToast();

  useEffect(() => {
    if (chainId !== ENV.CHAIN_ID) {
      console.warn("Wrong network detected:", {
        current: chainId,
        expected: ENV.CHAIN_ID
      });
      
      toast({
        title: "Wrong Network",
        description: `Please switch to Filecoin Calibration testnet (Chain ID: ${ENV.CHAIN_ID})`,
        variant: "destructive",
      });
    }
  }, [chainId, toast]);

  return {
    isCorrectChain: chainId === ENV.CHAIN_ID,
    currentChainId: chainId,
    expectedChainId: ENV.CHAIN_ID,
  };
};