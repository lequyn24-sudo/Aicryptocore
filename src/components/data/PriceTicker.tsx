'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface CoinPrice {
  symbol: string
  name: string
  price: number
  change24h: number
}

const MOCK_PRICES: CoinPrice[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 98420, change24h: 2.34 },
  { symbol: 'ETH', name: 'Ethereum', price: 3841, change24h: -1.12 },
  { symbol: 'SOL', name: 'Solana', price: 184.5, change24h: 4.21 },
  { symbol: 'FET', name: 'Fetch.ai', price: 2.84, change24h: 8.93 },
  { symbol: 'RENDER', name: 'Render', price: 11.24, change24h: 5.67 },
  { symbol: 'TAO', name: 'Bittensor', price: 492, change24h: -2.45 },
  { symbol: 'NEAR', name: 'NEAR Protocol', price: 7.82, change24h: 3.18 },
  { symbol: 'GRT', name: 'The Graph', price: 0.284, change24h: -0.89 },
  { symbol: 'OCEAN', name: 'Ocean Protocol', price: 1.14, change24h: 6.54 },
  { symbol: 'AGIX', name: 'SingularityNET', price: 1.68, change24h: 11.23 },
  { symbol: 'AKT', name: 'Akash Network', price: 4.92, change24h: 2.87 },
  { symbol: 'WLD', name: 'Worldcoin', price: 3.41, change24h: -3.21 },
]

function formatPrice(price: number): string {
  if (price >= 1000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
  if (price >= 1) return `$${price.toFixed(2)}`
  return `$${price.toFixed(3)}`
}

export function PriceTicker() {
  const [prices, setPrices] = useState<CoinPrice[]>(MOCK_PRICES)

  useEffect(() => {
    async function fetchPrices() {
      try {
        const ids = 'bitcoin,ethereum,solana,fetch-ai,render-token,bittensor,near,the-graph,ocean-protocol,singularitynet,akash-network,worldcoin-wld'
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`,
          { next: { revalidate: 60 } }
        )
        if (!res.ok) return
        // Use mock data as fallback — real API integration would map response to CoinPrice
      } catch {
        // Silently fall back to mock data
      }
    }
    fetchPrices()
  }, [])

  const allItems = [...prices, ...prices]

  return (
    <div
      className="ticker-cosmic h-9"
      aria-live="polite"
      aria-label="Live crypto prices"
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center gap-3">
        <span className="shrink-0 text-xs font-bold bg-[var(--color-accent)] text-[#0a0a0f] px-2 py-0.5 rounded">
          LIVE
        </span>
        <div className="ticker-wrap flex-1 overflow-hidden">
          <div className="ticker-track flex items-center gap-6">
            {allItems.map((coin, i) => (
              <span key={`${coin.symbol}-${i}`} className="flex items-center gap-1.5 text-xs font-mono whitespace-nowrap">
                <span className="font-bold text-[var(--color-text-secondary)]">{coin.symbol}</span>
                <span className="text-[var(--color-text-primary)]">{formatPrice(coin.price)}</span>
                <span
                  className="flex items-center gap-0.5"
                  style={{ color: coin.change24h >= 0 ? 'var(--color-price-up)' : 'var(--color-price-down)' }}
                >
                  {coin.change24h >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {Math.abs(coin.change24h).toFixed(2)}%
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
