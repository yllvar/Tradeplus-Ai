import { useState, useCallback } from 'react';

type MarketData = {
  symbol: string;
  last?: number;
  change?: number;
  high?: number;
  low?: number;
  volume?: number;
  timestamp?: number;
  error?: string;
};

export function useMarketData() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [marketData, setMarketData] = useState<MarketData | null>(null);

  const fetchMarketData = useCallback(async (symbol: string, type: 'ticker' | 'orderbook' | 'ohlcv' = 'ticker') => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/market-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          symbol: symbol.toUpperCase(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch market data');
      }

      const data = await response.json();
      setMarketData({
        ...data,
        symbol: symbol.toUpperCase(),
      });
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch market data';
      setError(errorMessage);
      console.error('Market data fetch error:', errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTicker = useCallback((symbol: string) => 
    fetchMarketData(symbol, 'ticker'),
    [fetchMarketData]
  );

  const getOrderBook = useCallback((symbol: string, limit: number = 20) => 
    fetchMarketData(`${symbol}?limit=${limit}`, 'orderbook'),
    [fetchMarketData]
  );

  const getOHLCV = useCallback((symbol: string, timeframe: string = '1h', limit: number = 100) => 
    fetchMarketData(`${symbol}?timeframe=${timeframe}&limit=${limit}`, 'ohlcv'),
    [fetchMarketData]
  );

  return {
    marketData,
    isLoading,
    error,
    getTicker,
    getOrderBook,
    getOHLCV,
  };
}
