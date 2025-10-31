import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatPrice, formatChange } from '../utils/marketUtils';

type MarketDataWidgetProps = {
  symbol: string;
  last?: number;
  change?: number;
  high?: number;
  low?: number;
  volume?: number;
  loading?: boolean;
  error?: string | null;
};

export const MarketDataWidget: React.FC<MarketDataWidgetProps> = ({
  symbol,
  last,
  change = 0,
  high,
  low,
  volume,
  loading = false,
  error = null,
}) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading {symbol} data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={[
          styles.price,
          change >= 0 ? styles.positive : styles.negative
        ]}>
          {last ? formatPrice(last) : 'N/A'}
        </Text>
        <Text style={[
          styles.change,
          change >= 0 ? styles.positive : styles.negative
        ]}>
          {change >= 0 ? '+' : ''}{change?.toFixed(2)}%
        </Text>
      </View>
      
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>24h High:</Text>
          <Text style={styles.value}>{high ? formatPrice(high) : 'N/A'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>24h Low:</Text>
          <Text style={styles.value}>{low ? formatPrice(low) : 'N/A'}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>24h Volume:</Text>
          <Text style={styles.value}>
            {volume ? `${formatPrice(volume)} ${symbol.split('/')[1] || ''}` : 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E2E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  symbol: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 8,
  },
  change: {
    fontSize: 14,
  },
  positive: {
    color: '#4CAF50', // Green for positive
  },
  negative: {
    color: '#F44336', // Red for negative
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: '#2D3748',
    paddingTop: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  label: {
    color: '#A0AEC0',
    fontSize: 14,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  error: {
    color: '#F44336',
    fontSize: 14,
  },
});
