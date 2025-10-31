// Type definitions for CCXT
import 'ccxt';

declare module 'ccxt' {
  // Re-export all types from CCXT
  export * from 'ccxt/js/src/static_dependencies/ws/types';
  export * from 'ccxt/js/src/base/types';
  
  // Add any custom type extensions here if needed
  export interface Exchange {
    // Add any custom methods or properties you need
  }
}
