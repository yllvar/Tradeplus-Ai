// Type definitions for CCXT
declare module 'ccxt' {
  export class Exchange {
    constructor(config?: any);
    fetchTicker(symbol: string): Promise<{
      symbol: string;
      last?: number;
      percentage?: number;
      high?: number;
      low?: number;
      baseVolume?: number;
      timestamp?: number;
    }>;
    
    fetchOrderBook(symbol: string, limit?: number): Promise<{
      symbol: string;
      bids: [number, number][];
      asks: [number, number][];
      timestamp: number;
    }>;
    
    fetchOHLCV(symbol: string, timeframe?: string, since?: number, limit?: number): Promise<[number, number, number, number, number, number][]>;
  }

  export class binance extends Exchange {}
  
  // Add default export for ESM compatibility
  const ccxt: {
    binance: typeof binance;
    // Add other exchanges as needed
  };
  
  export default ccxt;
}
