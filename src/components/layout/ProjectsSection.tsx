import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Article } from '@/types/article'
import { Badge } from '@/components/ui/Badge'

interface ProjectsSectionProps {
  articles: Article[]
}

export function ProjectsSection({ articles }: ProjectsSectionProps) {
  if (articles.length === 0) return null

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-base font-bold text-[var(--color-text-primary)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Projects in AI Agents
        </h2>
        <Link
          href="/ai-agents"
          className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-teal)] transition-colors group"
        >
          View all <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {articles.slice(0, 4).map((article) => (
          <Link
            key={article.slug}
            href={article.href}
            className="group card-cosmic p-4 flex flex-col gap-3 overflow-hidden"
          >
            {/* Avatar / thumbnail */}
            <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#161b22] shrink-0">
              <Image
                src={article.coverImage}
                alt={article.coverImageAlt}
                fill
                sizes="48px"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            {/* Meta */}
            <div className="flex-1 min-w-0">
              <Badge variant="category" className="mb-2 text-[10px] py-0">
                {article.subcategory?.replace(/-/g, ' ') ?? article.category.replace('ai-', 'AI ').replace(/-/g, ' ')}
              </Badge>
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-text-teal)] transition-colors leading-snug line-clamp-2 mb-1">
                {article.title}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
                {article.description}
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-2 pt-2 border-t border-white/[0.05]">
              <div className="w-5 h-5 rounded-full bg-[var(--color-border-teal)] flex items-center justify-center text-[9px] font-bold text-[var(--color-text-teal)] shrink-0">
                {article.author.name.charAt(0)}
              </div>
              <span className="text-[10px] text-[var(--color-text-muted)] truncate">{article.author.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
