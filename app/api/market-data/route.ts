import { getExchangeService } from '../../../src/services/exchange';

type MarketDataRequest = {
  type: 'ticker' | 'orderbook' | 'ohlcv';
  symbol: string;
  exchange?: string;
  limit?: number;
  timeframe?: string;
  since?: number;
};

// Helper function to create a JSON response
const jsonResponse = (data: any, status = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export async function POST(req: Request) {
  try {
    const request = (await req.json()) as MarketDataRequest;
    const { 
      type, 
      symbol, 
      exchange = 'binance', 
      limit = 20, 
      timeframe = '1h', 
      since 
    } = request;

    const exchangeService = await getExchangeService(exchange);

    switch (type) {
      case 'ticker':
        const ticker = await exchangeService.getTicker(symbol);
        return jsonResponse(ticker);

      case 'orderbook':
        const orderbook = await exchangeService.getOrderBook(symbol, limit);
        return jsonResponse(orderbook);

      case 'ohlcv':
        const ohlcv = await exchangeService.getOHLCV(symbol, timeframe, since, limit);
        return jsonResponse(ohlcv);

      default:
        return jsonResponse({ error: 'Invalid request type' }, 400);
    }
  } catch (error) {
    console.error('Market data error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return jsonResponse(
      { 
        error: 'Failed to fetch market data',
        details: errorMessage
      },
      500
    );
  }
}

export async function GET() {
  return jsonResponse({ error: 'Method not allowed' }, 405);
}
