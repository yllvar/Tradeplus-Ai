export function formatPrice(price: number, precision: number = 2): string {
  return price.toLocaleString(undefined, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
}

export function formatChange(change: number, isPositiveClass: string, isNegativeClass: string): string {
  const isPositive = change >= 0;
  const sign = isPositive ? '+' : '';
  const className = isPositive ? isPositiveClass : isNegativeClass;
  
  return `<span class="${className}">${sign}${change.toFixed(2)}%</span>`;
}

export function formatVolume(volume: number): string {
  if (volume >= 1000000000) {
    return `${(volume / 1000000000).toFixed(2)}B`;
  }
  if (volume >= 1000000) {
    return `${(volume / 1000000).toFixed(2)}M`;
  }
  if (volume >= 1000) {
    return `${(volume / 1000).toFixed(2)}K`;
  }
  return volume.toString();
}

export function getMarketStatus(timestamp: number): { status: 'open' | 'closed'; message: string } {
  const now = Date.now();
  const diff = now - timestamp;
  const minutesAgo = Math.floor(diff / (1000 * 60));
  
  if (minutesAgo > 5) {
    return {
      status: 'closed',
      message: `Market data is ${minutesAgo} minutes old`,
    };
  }
  
  return {
    status: 'open',
    message: 'Market is open',
  };
}

export function parseSymbol(symbol: string): { base: string; quote: string } {
  const [base, quote] = symbol.split('/');
  return { base, quote };
}
