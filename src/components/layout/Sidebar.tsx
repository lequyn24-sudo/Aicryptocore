import Link from 'next/link'
import type { Article } from '@/types/article'
import { TrendingUp, TrendingDown, ArrowRight, Layers, Cpu, BarChart2, Database, GitBranch, Globe } from 'lucide-react'
import { NAV_CATEGORIES } from '@/lib/categories'
import { NewsletterForm } from '@/components/ui/NewsletterForm'

interface SidebarProps {
  trendingArticles: Article[]
}

const MARKET_PRICES = [
  { symbol: 'BTC', name: 'Bitcoin',       price: '$98,420', change: '+2.34%', up: true },
  { symbol: 'ETH', name: 'Ethereum',      price: '$3,841',  change: '-1.12%', up: false },
  { symbol: 'SOL', name: 'Solana',        price: '$184.50', change: '+4.21%', up: true },
  { symbol: 'FET', name: 'Fetch.ai',      price: '$2.84',   change: '+8.93%', up: true },
  { symbol: 'TAO', name: 'Bittensor',     price: '$492',    change: '-2.45%', up: false },
  { symbol: 'RENDER', name: 'Render',     price: '$11.24',  change: '+5.67%', up: true },
]

const SPACE_NAV = [
  { label: 'Application Layer',   href: '/ai-agents',         icon: Layers },
  { label: 'Infrastructure Layer',href: '/ai-infrastructure', icon: Cpu },
  { label: 'Trading Systems',     href: '/ai-trading',        icon: BarChart2 },
  { label: 'Data Protocols',      href: '/ai-data',           icon: Database },
  { label: 'Ecosystem & L1',      href: '/ai-ecosystem',      icon: GitBranch },
  { label: 'Press & Sponsored',   href: '/press-release',     icon: Globe },
]

export function Sidebar({ trendingArticles }: SidebarProps) {
  return (
    <aside className="space-y-4">

      {/* ── Market & Trending ── */}
      <div className="card-cosmic p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] mb-3">
          Market &amp; Trending
        </p>
        <ul className="divide-y divide-white/[0.04]">
          {MARKET_PRICES.map((coin) => (
            <li key={coin.symbol} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold w-12 text-[var(--color-text-primary)]">{coin.symbol}</span>
                <span className="text-xs text-[var(--color-text-secondary)]">{coin.name}</span>
              </div>
              <div className="flex items-center gap-2 text-right">
                <span className="text-xs font-mono text-[var(--color-text-primary)]">{coin.price}</span>
                <span
                  className="flex items-center gap-0.5 text-xs font-medium w-16 justify-end"
                  style={{ color: coin.up ? 'var(--color-price-up)' : 'var(--color-price-down)' }}
                >
                  {coin.up ? <TrendingUp size={9} /> : <TrendingDown size={9} />}
                  {coin.change}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Trending Topics ── */}
      <div className="card-cosmic p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={13} className="text-[var(--color-accent)]" />
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)]">Trending Topics</p>
        </div>
        <ol className="space-y-3">
          {trendingArticles.map((article, i) => (
            <li key={article.slug}>
              <Link href={article.href} className="flex gap-2.5 group">
                <span
                  className="text-base font-bold tabular-nums shrink-0 leading-tight w-6"
                  style={{ color: i < 3 ? 'var(--color-text-teal)' : 'var(--color-text-muted)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </p>
                  <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                    {article.category.replace('ai-', 'AI ').replace(/-/g, ' ')}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Space Navigator ── */}
      <div className="card-cosmic p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] mb-3">Space Navigator</p>
        <ul className="space-y-0.5">
          {SPACE_NAV.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.05] transition-colors group"
              >
                <Icon size={13} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-teal)] shrink-0 transition-colors" />
                <span className="text-xs">{label}</span>
                <ArrowRight size={10} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Categories ── */}
      <div className="card-cosmic p-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-secondary)] mb-3">Categories</p>
        <ul className="divide-y divide-white/[0.04]">
          {NAV_CATEGORIES.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/${cat.slug}`}
                className="flex items-center justify-between py-2 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-teal)] transition-colors group"
              >
                <span>{cat.label}</span>
                <span className="text-xs text-[var(--color-text-muted)]">{cat.subcategories.length} topics</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Newsletter ── */}
      <div
        className="rounded-xl p-4 border border-[var(--color-border-teal)]"
        style={{ background: 'linear-gradient(135deg, rgba(20,184,166,0.08) 0%, rgba(99,102,241,0.06) 100%)' }}
      >
        <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-1">AI × Crypto Weekly</p>
        <p className="text-[11px] text-[var(--color-text-secondary)] mb-3 leading-relaxed">
          Join 12,000+ subscribers for weekly AI and crypto intelligence.
        </p>
        <NewsletterForm compact />
      </div>

    </aside>
  )
}
