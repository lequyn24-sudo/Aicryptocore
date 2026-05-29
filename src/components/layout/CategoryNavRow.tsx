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
    <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 scrollbar-none">
      {categories.map((cat) => {
        const Icon = ICON_MAP[cat.icon] ?? Bot
        return (
          <Link
            key={cat.slug}
            href={`/${cat.slug}`}
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.08] hover:border-[var(--color-border-teal)] hover:bg-[var(--color-border-teal)] transition-all duration-200 whitespace-nowrap shrink-0"
          >
            <Icon size={13} className="text-[var(--color-text-teal)] group-hover:text-[var(--color-text-primary)] transition-colors" />
            <span className="text-xs font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
              {cat.label}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
