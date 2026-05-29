import Link from 'next/link'
import type { Article } from '@/types/article'
import { TrendingUp, ArrowRight } from 'lucide-react'
import { NAV_CATEGORIES } from '@/lib/categories'
import { NewsletterForm } from '@/components/ui/NewsletterForm'

interface SidebarProps {
  trendingArticles: Article[]
}

export function Sidebar({ trendingArticles }: SidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Trending Now */}
      <div className="card-cosmic p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-[var(--color-accent)]" />
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wide">Trending Now</h3>
        </div>
        <ol className="space-y-3">
          {trendingArticles.map((article, i) => (
            <li key={article.slug}>
              <Link href={article.href} className="flex gap-3 group">
                <span className="text-xl font-bold text-[var(--color-border-strong)] group-hover:text-[var(--color-text-teal)] transition-colors shrink-0 leading-tight">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* Categories */}
      <div className="card-cosmic p-5">
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] uppercase tracking-wide mb-4">Categories</h3>
        <ul className="space-y-1.5">
          {NAV_CATEGORIES.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/${cat.slug}`}
                className="flex items-center justify-between py-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-teal)] transition-colors group"
              >
                <span>{cat.label}</span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter CTA */}
      <div className="rounded-xl p-5 border border-[var(--color-border-teal)]"
        style={{ background: 'linear-gradient(135deg, rgba(20,184,166,0.08) 0%, rgba(99,102,241,0.06) 100%)' }}>
        <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">AI × Crypto Weekly</h3>
        <p className="text-xs text-[var(--color-text-secondary)] mb-4 leading-relaxed">
          Join 12,000+ subscribers getting the best AI and crypto analysis every week.
        </p>
        <NewsletterForm compact />
      </div>
    </aside>
  )
}
