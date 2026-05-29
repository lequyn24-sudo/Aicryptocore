import Link from 'next/link'
import type { Article } from '@/types/article'
import { TrendingUp, ArrowRight, Layers, Cpu, Code2, GitBranch, Globe } from 'lucide-react'
import { NAV_CATEGORIES } from '@/lib/categories'
import { NewsletterForm } from '@/components/ui/NewsletterForm'
import { formatDate } from '@/lib/dates'

interface SidebarProps {
  trendingArticles: Article[]
}

const SPACE_NAV = [
  { label: 'Application Layer', href: '/ai-agents', icon: Layers },
  { label: 'Infrastructure Layer', href: '/ai-infrastructure', icon: Cpu },
  { label: 'Trading Systems', href: '/ai-trading', icon: TrendingUp },
  { label: 'Data Protocols', href: '/ai-data', icon: Code2 },
  { label: 'Ecosystem & L1', href: '/ai-ecosystem', icon: GitBranch },
  { label: 'Press & Sponsored', href: '/press-release', icon: Globe },
]

export function Sidebar({ trendingArticles }: SidebarProps) {
  return (
    <aside className="space-y-5">

      {/* ── Space Navigator ── */}
      <div className="card-cosmic p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">Space Navigator</p>
        <ul className="space-y-0.5">
          {SPACE_NAV.map(({ label, href, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.05] transition-colors group"
              >
                <Icon size={14} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-teal)] transition-colors shrink-0" />
                <span>{label}</span>
                <ArrowRight size={11} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Trending Now ── */}
      <div className="card-cosmic p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={14} className="text-[var(--color-accent)]" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Trending Topics</p>
        </div>
        <ol className="space-y-3">
          {trendingArticles.map((article, i) => (
            <li key={article.slug}>
              <Link href={article.href} className="flex gap-3 group">
                <span className="text-lg font-bold tabular-nums text-[var(--color-border-strong)] group-hover:text-[var(--color-text-teal)] transition-colors shrink-0 w-6 leading-tight">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </p>
                  <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">
                    {article.category.replace('ai-', 'AI ').replace(/-/g, ' ')}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Categories ── */}
      <div className="card-cosmic p-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-3">Categories</p>
        <ul className="divide-y divide-white/[0.04]">
          {NAV_CATEGORIES.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/${cat.slug}`}
                className="flex items-center justify-between py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-teal)] transition-colors group"
              >
                <span>{cat.label}</span>
                <span className="text-[10px] text-[var(--color-text-muted)] group-hover:text-[var(--color-text-teal)] transition-colors">
                  {cat.subcategories.length} topics
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Newsletter CTA ── */}
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
