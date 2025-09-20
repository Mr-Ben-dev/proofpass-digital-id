import { useState, useEffect } from "react";
import { useWaitForTransactionReceipt } from "wagmi";

export interface Transaction {
  hash: `0x${string}`;
  description: string;
  status: "pending" | "success" | "error";
}

const TRANSACTION_STORAGE_KEY = "proofpass_transactions";

export const useTransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    try {
      const storedTxs = localStorage.getItem(TRANSACTION_STORAGE_KEY);
      if (storedTxs) {
        setTransactions(JSON.parse(storedTxs));
      }
    } catch (error) {
      console.error("Failed to parse transactions from localStorage", error);
    }
  }, []);

  const addTransaction = (hash: `0x${string}`, description: string) => {
    const newTx: Transaction = { hash, description, status: "pending" };
    setTransactions((prevTxs) => {
      const newTxs = [newTx, ...prevTxs];
      try {
        localStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(newTxs));
      } catch (error) {
        console.error("Failed to save transactions to localStorage", error);
      }
      return newTxs;
    });
  };

  const updateTransactionStatus = (
    hash: `0x${string}`,
    status: "success" | "error"
  ) => {
    setTransactions((prevTxs) => {
      const newTxs = prevTxs.map((tx) =>
        tx.hash === hash ? { ...tx, status } : tx
      );
      try {
        localStorage.setItem(TRANSACTION_STORAGE_KEY, JSON.stringify(newTxs));
      } catch (error) {
        console.error("Failed to save transactions to localStorage", error);
      }
      return newTxs;
    });
  };

  return { transactions, addTransaction, updateTransactionStatus };
};

export const usePollTransactionStatus = (
  hash: `0x${string}` | undefined,
  onSuccess?: (data: any) => void,
  onError?: (error: Error) => void
) => {
  return useWaitForTransactionReceipt({
    hash,
    query: { enabled: !!hash },
  });
};
