import { ENV } from "./environment";

export const COUNTRY = ENV.JURISDICTION.COUNTRY;
export const ALLOWED_REGIONS = ENV.JURISDICTION.ALLOWED_REGIONS;
export type Region = typeof ALLOWED_REGIONS[number];

// Validation helper
export const validateRegion = (region: string): void => {
  if (!ALLOWED_REGIONS.includes(region)) {
    throw new Error(`Region ${region} not supported. Only: ${ALLOWED_REGIONS.join(', ')}`);
  }
};

// Debug helper
export const logContractParams = (region: string) => {
  console.log("=== CONTRACT CALL PARAMETERS ===");
  console.log("Country (hardcoded):", COUNTRY);
  console.log("Region (selected):", region);
  console.log("Should send: [address, 'US', 'CA', ...]");
};