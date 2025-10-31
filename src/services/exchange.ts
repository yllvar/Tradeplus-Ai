// Supported exchanges
type ExchangeName = 'binance';

interface ExchangeConfig {
  create: (config?: any) => any;
  options: {
    enableRateLimit: boolean;
    timeout: number;
    apiKey?: string;
    secret?: string;
  };
}

// We'll use a factory function to create exchange instances
async function createExchange(exchangeName: ExchangeName) {
  try {
    // Dynamic import of CCXT with type assertion
    const ccxtModule = await import('ccxt');
    const ccxt = ccxtModule.default || ccxtModule;
    
    const exchangeConfig = {
      binance: () => new ccxt.binance({
        enableRateLimit: true,
        timeout: 30000,
        apiKey: process.env.BINANCE_API_KEY,
        secret: process.env.BINANCE_SECRET_KEY,
      })
    };
    
    const createExchangeFn = exchangeConfig[exchangeName];
    if (!createExchangeFn) {
      throw new Error(`Unsupported exchange: ${exchangeName}`);
    }
    
    return createExchangeFn();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to initialize CCXT:', error);
    throw new Error(`Failed to initialize exchange: ${errorMessage}`);
  }
}

const EXCHANGES: Record<ExchangeName, ExchangeConfig> = {
  binance: {
    create: () => createExchange('binance'),
    options: {
      enableRateLimit: true,
      timeout: 30000,
    },
  },
};

type ExchangeId = keyof typeof EXCHANGES;

interface TickerData {
  symbol: string;
  last?: number;
  change?: number;
  high?: number;
  low?: number;
  volume?: number;
  timestamp?: number;
}

interface OrderBookData {
  symbol: string;
  bids: [number, number][];
  asks: [number, number][];
  timestamp: number;
}

type OHLCV = [number, number, number, number, number, number];


export class ExchangeService {
  private exchange: any;
  private exchangeId: ExchangeId;
  private lastRequestTime = 0;
  private readonly RATE_LIMIT_MS = 1000; // 1 second between requests
  
  private constructor(exchange: any, exchangeId: ExchangeId) {
    this.exchange = exchange;
    this.exchangeId = exchangeId;
  }

  static async create(exchangeId: ExchangeId = 'binance'): Promise<ExchangeService> {
    const exchangeConfig = EXCHANGES[exchangeId];
    if (!exchangeConfig) {
      throw new Error(`Unsupported exchange: ${exchangeId}`);
    }
    
    const exchange = await exchangeConfig.create();
    return new ExchangeService(exchange, exchangeId);
  }

  private async rateLimit(): Promise<void> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    
    if (timeSinceLastRequest < this.RATE_LIMIT_MS) {
      await new Promise(resolve => 
        setTimeout(resolve, this.RATE_LIMIT_MS - timeSinceLastRequest)
      );
    }
    
    this.lastRequestTime = Date.now();
  }
  
  // Add error handling helper
  private handleError(error: unknown, context: string): never {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error(`[${this.exchangeId}] Error in ${context}:`, errorMessage);
    throw new Error(`Failed to ${context}: ${errorMessage}`);
  }

  async getTicker(symbol: string): Promise<TickerData> {
    try {
      await this.rateLimit();
      const ticker = await this.exchange.fetchTicker(symbol);
      
      return {
        symbol: ticker.symbol,
        last: ticker.last,
        change: ticker.percentage,
        high: ticker.high,
        low: ticker.low,
        volume: ticker.baseVolume,
        timestamp: ticker.timestamp,
      };
    } catch (error) {
      return this.handleError(error, `fetch ticker for ${symbol}`);
    }
  }

  async getOrderBook(symbol: string, limit = 20): Promise<OrderBookData> {
    try {
      await this.rateLimit();
      const orderbook = await this.exchange.fetchOrderBook(symbol, limit);
      
      return {
        symbol,
        bids: orderbook.bids,
        asks: orderbook.asks,
        timestamp: orderbook.timestamp || Date.now(),
      };
    } catch (error) {
      return this.handleError(error, `fetch order book for ${symbol}`);
    }
  }

  async getOHLCV(
    symbol: string, 
    timeframe = '1h', 
    since?: number, 
    limit = 100
  ): Promise<OHLCV[]> {
    try {
      await this.rateLimit();
      return await this.exchange.fetchOHLCV(symbol, timeframe, since, limit);
    } catch (error) {
      return this.handleError(error, `fetch OHLCV for ${symbol}`);
    }
  }

  // Add more exchange methods as needed
}

// Singleton instance
let exchangeService: ExchangeService | null = null;

export const getExchangeService = async (exchangeId: ExchangeId = 'binance'): Promise<ExchangeService> => {
  if (!exchangeService) {
    exchangeService = await ExchangeService.create(exchangeId);
  }
  return exchangeService;
};
