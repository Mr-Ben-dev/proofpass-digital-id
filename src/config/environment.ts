export const ENV = {
  CHAIN_ID: parseInt(import.meta.env.VITE_CHAIN_ID || '314159'),
  RPC_URL: import.meta.env.VITE_RPC_URL || 'https://calibration.filfox.info/rpc/v1',
  CONTRACTS: {
    RESIDENCY_PASS: import.meta.env.VITE_RESIDENCY_PASS as `0x${string}`,
    SP_JURISDICTION: import.meta.env.VITE_SP_JURISDICTION as `0x${string}`,
    NOTARY_REGISTRY: import.meta.env.VITE_NOTARY_REGISTRY as `0x${string}`,
  },
  EXPLORER_BASE: import.meta.env.VITE_EXPLORER_BASE || 'https://calibration.filfox.info/en',
  WALLET_CONNECT_PROJECT_ID: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID || '',
  JURISDICTION: {
    COUNTRY: import.meta.env.VITE_DEFAULT_COUNTRY || 'US',
    ALLOWED_REGIONS: (import.meta.env.VITE_ALLOWED_REGIONS || 'CA').split(',').map(s => s.trim()),
  },
} as const;

export type Region = typeof ENV.JURISDICTION.ALLOWED_REGIONS[number];

// Validation helper
export const validateRegion = (region: string): void => {
  if (!ENV.JURISDICTION.ALLOWED_REGIONS.includes(region)) {
    throw new Error(`Region ${region} not supported. Only: ${ENV.JURISDICTION.ALLOWED_REGIONS.join(', ')}`);
  }
};

// Debug helper
export const logContractParams = (region: string) => {
  console.log("=== CONTRACT CALL PARAMETERS ===");
  console.log("Country (hardcoded):", ENV.JURISDICTION.COUNTRY);
  console.log("Region (selected):", region);
  console.log("Expected contract args: [address, 'US', 'CA', docCID, metaCID, expiry]");
  console.log("Actual contract args: [address,", ENV.JURISDICTION.COUNTRY + ",", region + ", docCID, metaCID, expiry]");
  
  if (ENV.JURISDICTION.COUNTRY !== "US") {
    console.warn("⚠️  WARNING: Country is not 'US'! Current:", ENV.JURISDICTION.COUNTRY);
  }
  
  if (region !== "CA") {
    console.warn("⚠️  WARNING: Region is not 'CA'! Current:", region);
  }
  
  if (ENV.JURISDICTION.COUNTRY === "US" && region === "CA") {
    console.log("✅ Parameters match Storage Provider registration: US-CA");
  } else {
    console.error("❌ Parameters DO NOT match Storage Provider registration!");
    console.error("   Storage Provider expects: country='US', region='CA'");
    console.error("   Sending: country='" + ENV.JURISDICTION.COUNTRY + "', region='" + region + "'");
  }
};

// Environment validation
export const validateEnvironment = () => {
  const required = [
    'VITE_RESIDENCY_PASS',
    'VITE_SP_JURISDICTION', 
    'VITE_NOTARY_REGISTRY'
  ];
  
  const missing = required.filter(key => !import.meta.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
  
  // Critical: Validate Storage Provider configuration
  console.log("=== ENVIRONMENT VALIDATION ===");
  console.log("Country:", ENV.JURISDICTION.COUNTRY);
  console.log("Allowed regions:", ENV.JURISDICTION.ALLOWED_REGIONS);
  
  if (ENV.JURISDICTION.COUNTRY !== "US") {
    console.warn("⚠️  WARNING: Country is not 'US'! Storage Provider expects 'US'");
  }
  
  if (!ENV.JURISDICTION.ALLOWED_REGIONS.includes("CA")) {
    console.warn("⚠️  WARNING: 'CA' not in allowed regions! Storage Provider expects 'CA'");
  }
  
  console.log("✅ Environment validation complete");
};

// Test helper to verify contract parameters
export const testContractParams = () => {
  console.log("=== CONTRACT PARAMETERS TEST ===");
  const testAddress = "0x1234567890123456789012345678901234567890";
  const testArgs = [
    testAddress,
    ENV.JURISDICTION.COUNTRY,
    ENV.JURISDICTION.ALLOWED_REGIONS[0],
    "testDocCID",
    "testMetaCID",
    BigInt(Date.now() + 31536000)
  ];
  
  console.log("Test contract args:", testArgs);
  console.log("Expected: [address, 'US', 'CA', docCID, metaCID, expiry]");
  console.log("Actual  : [address, '" + testArgs[1] + "', '" + testArgs[2] + "', docCID, metaCID, expiry]");
  
  if (testArgs[1] === "US" && testArgs[2] === "CA") {
    console.log("✅ Contract parameters are correct for Storage Provider");
  } else {
    console.error("❌ Contract parameters are INCORRECT!");
  }
  
  return testArgs;
};