import ResidencyPassABI from '@/abi/ResidencyPass.json';
import { useState } from 'react';
import { decodeEventLog, keccak256, toHex } from 'viem';

export const DiagnosticPanel = () => {
  const [diagnostics, setDiagnostics] = useState<any>(null);

  const runDiagnostics = () => {
    const results: any = {
      timestamp: new Date().toISOString(),
      environment: {
        isDev: import.meta.env.DEV,
        mode: import.meta.env.MODE,
        baseUrl: import.meta.env.BASE_URL,
        nodeEnv: import.meta.env.NODE_ENV,
        prod: import.meta.env.PROD,
      },
      abi: {
        imported: !!ResidencyPassABI,
        type: typeof ResidencyPassABI,
        isArray: Array.isArray(ResidencyPassABI),
        length: Array.isArray(ResidencyPassABI) ? ResidencyPassABI.length : 'N/A',
      },
      viem: {
        decodeEventLogAvailable: typeof decodeEventLog === 'function',
        keccak256Available: typeof keccak256 === 'function',
        toHexAvailable: typeof toHex === 'function',
      },
    };

    // Test PassIssued event finding
    if (Array.isArray(ResidencyPassABI)) {
      const passIssuedEvent = ResidencyPassABI.find((item: any) => 
        item.type === 'event' && item.name === 'PassIssued'
      );
      results.passIssuedEvent = {
        found: !!passIssuedEvent,
        structure: passIssuedEvent || null,
      };

      // Test event signature calculation
      try {
        const signature = keccak256(toHex("PassIssued(uint256,address,address,string,string,string)"));
        results.eventSignature = {
          calculated: signature,
          success: true,
        };
      } catch (error) {
        results.eventSignature = {
          error: error instanceof Error ? error.message : 'Unknown error',
          success: false,
        };
      }
    }

    // Test decodeEventLog with sample data
    try {
      // This should fail gracefully with invalid data
      decodeEventLog({
        abi: ResidencyPassABI,
        data: '0x',
        topics: ['0x123'],
      });
    } catch (error) {
      results.decodeEventLogTest = {
        error: error instanceof Error ? error.message : 'Unknown error',
        note: 'Expected to fail with invalid data - this tests if function works',
      };
    }

    setDiagnostics(results);
    console.log('Diagnostics Results:', results);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border p-4 rounded shadow-lg max-w-sm">
      <h3 className="font-bold mb-2">Debug Panel</h3>
      <button 
        onClick={runDiagnostics}
        className="bg-blue-500 text-white px-3 py-1 rounded text-sm mb-2"
      >
        Run Diagnostics
      </button>
      
      {diagnostics && (
        <div className="text-xs max-h-64 overflow-y-auto">
          <pre>{JSON.stringify(diagnostics, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};