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
      <div className="bg-teal-800 border border-teal-700/30 rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={16} className="text-amber-400" />
          <h3 className="text-sm font-semibold text-teal-200 uppercase tracking-wide">Trending Now</h3>
        </div>
        <ol className="space-y-3">
          {trendingArticles.map((article, i) => (
            <li key={article.slug}>
              <Link href={article.href} className="flex gap-3 group">
                <span className="text-xl font-bold text-teal-700 group-hover:text-teal-500 transition-colors shrink-0 leading-tight">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-teal-300 group-hover:text-teal-100 transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>

      {/* Categories */}
      <div className="bg-teal-800 border border-teal-700/30 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-teal-200 uppercase tracking-wide mb-4">Categories</h3>
        <ul className="space-y-1.5">
          {NAV_CATEGORIES.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/${cat.slug}`}
                className="flex items-center justify-between py-1.5 text-sm text-teal-400 hover:text-teal-200 transition-colors group"
              >
                <span>{cat.label}</span>
                <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter CTA */}
      <div className="bg-gradient-to-br from-teal-800 to-teal-900 border border-teal-600/30 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-teal-100 mb-2">AI × Crypto Weekly</h3>
        <p className="text-xs text-teal-400 mb-4 leading-relaxed">
          Join 12,000+ subscribers getting the best AI and crypto analysis every week.
        </p>
        <NewsletterForm compact />
      </div>
    </aside>
  )
}
