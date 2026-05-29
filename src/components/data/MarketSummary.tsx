'use client'

import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'

const MARKET_DATA = [
  { symbol: 'BTC', name: 'Bitcoin', price: 98420, change: 2.34, mcap: '1.93T' },
  { symbol: 'ETH', name: 'Ethereum', price: 3841, change: -1.12, mcap: '461B' },
  { symbol: 'SOL', name: 'Solana', price: 184.5, change: 4.21, mcap: '84B' },
  { symbol: 'FET', name: 'Fetch.ai', price: 2.84, change: 8.93, mcap: '2.4B' },
  { symbol: 'RENDER', name: 'Render', price: 11.24, change: 5.67, mcap: '4.6B' },
  { symbol: 'TAO', name: 'Bittensor', price: 492, change: -2.45, mcap: '3.2B' },
]

function formatPrice(price: number): string {
  if (price >= 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
  return `$${price.toFixed(2)}`
}

export function MarketSummary() {
  return (
    <section className="card-cosmic p-6 my-10">
      <div className="flex items-center gap-2 mb-5">
        <BarChart3 size={18} className="text-[var(--color-accent)]" />
        <h2 className="text-base font-semibold text-[var(--color-text-primary)] uppercase tracking-wide">Market Overview</h2>
        <span className="ml-auto text-xs text-[var(--color-text-muted)]">Updated live</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {MARKET_DATA.map((coin) => (
          <div
            key={coin.symbol}
            className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06] hover:border-[var(--color-border-teal)] transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[var(--color-text-primary)]">{coin.symbol}</span>
              <span
                className="flex items-center gap-0.5 text-xs font-medium"
                style={{ color: coin.change >= 0 ? 'var(--color-price-up)' : 'var(--color-price-down)' }}
              >
                {coin.change >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {Math.abs(coin.change).toFixed(2)}%
              </span>
            </div>
            <div className="text-sm font-semibold text-[var(--color-text-primary)] font-mono">{formatPrice(coin.price)}</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-0.5">MCap: {coin.mcap}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
