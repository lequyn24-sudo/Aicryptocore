import Link from 'next/link'
import { ArrowRight, Bot, Server, TrendingUp, Database, Network } from 'lucide-react'
import type { Article } from '@/types/article'
import type { Category } from '@/types/category'
import { ArticleGrid } from '@/components/article/ArticleGrid'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Bot,
  Server,
  TrendingUp,
  Database,
  Network,
}

interface CategorySectionProps {
  category: Category
  articles: Article[]
}

export function CategorySection({ category, articles }: CategorySectionProps) {
  const Icon = ICON_MAP[category.icon] ?? Bot

  if (articles.length === 0) return null

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-white/[0.05] border border-[var(--color-border-teal)]">
            <Icon size={16} className="text-[var(--color-text-teal)]" />
          </div>
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            {category.label}
          </h2>
        </div>
        <Link
          href={`/${category.slug}`}
          className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-teal)] transition-colors group"
        >
          View all
          <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
      </div>
      <ArticleGrid articles={articles} variant="default" />
    </section>
  )
}
