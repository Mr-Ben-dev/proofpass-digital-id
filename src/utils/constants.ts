import { defineChain } from 'viem';

export const filecoinCalibration = defineChain({
  id: 314159,
  name: 'Filecoin Calibration',
  nativeCurrency: {
    decimals: 18,
    name: 'testnet-Filecoin',
    symbol: 'tFIL',
  },
  rpcUrls: {
    default: { http: ['https://calibration.filfox.info/rpc/v1'] },
  },
  blockExplorers: {
    default: { name: 'Filfox', url: 'https://calibration.filfox.info/en' },
  },
})

export const contracts = {
  NotaryRegistry: "0x17692e10Aa8FD4F1DC28cDaa49827111C4Ab6051",
  SPJurisdiction: "0xBC8F28D0850Ea65A824c4677E4897a74e2246fC0",
  ResidencyPass: "0x2D4Ea76Ea27e5fC4E551d8657B79AD30FB48C57E",
}

export const storageProvider = "0xe1641A049381149AFAacef386ee58fDA5ad9Be32" as const;

export const demoPassId = 1;
