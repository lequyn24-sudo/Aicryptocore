import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Article } from '@/types/article'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/dates'

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

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {articles.slice(0, 4).map((article) => (
          <Link
            key={article.slug}
            href={article.href}
            className="group card-cosmic overflow-hidden flex flex-col"
          >
            {/* Full-width thumbnail */}
            <div className="relative w-full aspect-[16/10] bg-[#161b22] overflow-hidden shrink-0">
              <Image
                src={article.coverImage}
                alt={article.coverImageAlt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1280px) 25vw, 280px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Card body */}
            <div className="flex flex-col flex-1 p-3 gap-2">
              <Badge variant="category" className="self-start text-[10px] py-0">
                {article.subcategory?.replace(/-/g, ' ') ?? article.category.replace('ai-', 'AI ').replace(/-/g, ' ')}
              </Badge>

              <h3 className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-text-teal)] transition-colors leading-snug line-clamp-2">
                {article.title}
              </h3>

              <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 leading-relaxed flex-1">
                {article.description}
              </p>

              {/* Author row */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/[0.05]">
                <div className="w-5 h-5 rounded-full bg-[rgba(20,184,166,0.2)] border border-[var(--color-border-teal)] flex items-center justify-center text-[9px] font-bold text-[var(--color-text-teal)] shrink-0">
                  {article.author.name.charAt(0)}
                </div>
                <span className="text-[10px] text-[var(--color-text-muted)] truncate">{article.author.name}</span>
                <span className="text-[10px] text-[var(--color-text-muted)] ml-auto">{formatDate(article.publishedAt)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
