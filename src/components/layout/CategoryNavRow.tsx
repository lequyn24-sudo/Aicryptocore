import Link from 'next/link'
import { Bot, Server, TrendingUp, Database, Network } from 'lucide-react'
import type { Category } from '@/types/category'

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Bot, Server, TrendingUp, Database, Network,
}

interface CategoryNavRowProps {
  categories: Category[]
}

export function CategoryNavRow({ categories }: CategoryNavRowProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
      {categories.map((cat) => {
        const Icon = ICON_MAP[cat.icon] ?? Bot
        return (
          <Link
            key={cat.slug}
            href={`/${cat.slug}`}
            className="group flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.07] hover:border-[var(--color-border-teal)] hover:bg-white/[0.07] transition-all duration-200 text-center"
          >
            <Icon size={15} className="text-[var(--color-text-teal)] shrink-0" />
            <span className="text-sm font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors whitespace-nowrap">
              {cat.label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
