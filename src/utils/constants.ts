import { ENV } from '@/config/environment';
import { defineChain } from 'viem';

export const filecoinCalibration = defineChain({
  id: ENV.CHAIN_ID,
  name: 'Filecoin Calibration',
  nativeCurrency: {
    decimals: 18,
    name: 'testnet-Filecoin',
    symbol: 'tFIL',
  },
  rpcUrls: {
    default: { http: [ENV.RPC_URL] },
  },
  blockExplorers: {
    default: { name: 'Filfox', url: ENV.EXPLORER_BASE },
  },
})

export const contracts = {
  NotaryRegistry: ENV.CONTRACTS.NOTARY_REGISTRY,
  SPJurisdiction: ENV.CONTRACTS.SP_JURISDICTION,
  ResidencyPass: ENV.CONTRACTS.RESIDENCY_PASS,
}

export const storageProvider = "0xe1641A049381149AFAacef386ee58fDA5ad9Be32" as const;

export const demoPassId = 1;
