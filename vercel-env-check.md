# Vercel Environment Configuration Checklist

## Required Environment Variables for Production

None required currently - all configuration is hardcoded in the app.

## Current Configuration

- **RPC Endpoint**: `https://calibration.filfox.info/rpc/v1` (hardcoded in wagmi.tsx)
- **Chain ID**: `314159` (Filecoin Calibration)
- **Contract Address**: `0x2D4Ea76Ea27e5fC4E551d8657B79AD30FB48C57E` (hardcoded)

## Build Dependencies

- **viem**: ^2.37.6
- **wagmi**: ^2.17.1
- **Node.js**: Check Vercel uses compatible version

## Files to Check on Vercel Build

1. `/src/abi/ResidencyPass.json` - Must be included in build
2. `decodeEventLog` function from viem - Must work in production
3. Event signature calculation - Must match local behavior

## Debug Commands for Vercel

Add these to your Vercel deployment to check:

```bash
# Check if ABI file exists
ls -la dist/assets/ | grep -i residency

# Check build output
cat dist/assets/*.js | grep -i "PassIssued" | head -5
```

## Potential Issues

1. **Build process** may be stripping or transforming the ABI import
2. **viem ESM/CJS** compatibility issues in production
3. **TypeScript compilation** may affect event decoding
4. **Bundler** (Vite) may handle imports differently in production
