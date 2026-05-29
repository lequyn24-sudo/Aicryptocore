import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, User, TrendingUp } from 'lucide-react'
import type { Article } from '@/types/article'
import { Badge } from '@/components/ui/Badge'
import { formatDate, formatReadingTime } from '@/lib/dates'

interface HeroSectionProps {
  featured: Article
  recentArticles: Article[]
  categoryCounts: { label: string; count: number; color: string }[]
}

export function HeroSection({ featured, recentArticles, categoryCounts }: HeroSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 mb-8">
      {/* LEFT — Big featured hero */}
      <div className="cosmic-orbs rounded-2xl overflow-hidden relative group min-h-[420px] flex flex-col justify-end bg-[#0d1117] border border-white/[0.07]">
        <Link href={featured.href} className="absolute inset-0 z-10" aria-label={featured.title} />
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={featured.coverImage}
            alt={featured.coverImageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 65vw"
            priority
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />
        </div>

        {/* Content overlay */}
        <div className="relative z-20 p-6 md:p-8">
          {/* Category count badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categoryCounts.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-white/[0.10] border border-white/[0.10] text-[var(--color-text-primary)]">
                <span className="font-bold text-base" style={{ color: c.color }}>{c.count}</span>
                <span className="text-[var(--color-text-muted)]">{c.label}</span>
              </span>
            ))}
          </div>

          <h1
            className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3 group-hover:text-[var(--color-text-teal)] transition-colors"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {featured.title}
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-5 max-w-xl leading-relaxed">
            {featured.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1"><User size={12} /> {featured.author.name}</span>
              <span>{formatDate(featured.publishedAt)}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {formatReadingTime(featured.readingTime)}</span>
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-[var(--color-text-teal)] group-hover:gap-2 transition-all">
              Read more <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT — Recent articles stacked */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">Latest</h2>
          <Link href="/search" className="text-xs text-[var(--color-text-teal)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1">
            View all <ArrowRight size={11} />
          </Link>
        </div>
        {recentArticles.slice(0, 5).map((article) => (
          <Link
            key={article.slug}
            href={article.href}
            className="group flex gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[var(--color-border-teal)] hover:bg-white/[0.05] transition-all duration-200"
          >
            <div className="relative w-[72px] h-[54px] rounded-lg overflow-hidden shrink-0 bg-[#161b22]">
              <Image
                src={article.coverImage}
                alt={article.coverImageAlt}
                fill
                sizes="72px"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex-1 min-w-0">
              <Badge variant="category" className="mb-1 text-[10px] py-0">
                {article.category.replace('ai-', 'AI ').replace(/-/g, ' ')}
              </Badge>
              <h3 className="text-xs font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] leading-snug line-clamp-2 transition-colors">
                {article.title}
              </h3>
              <p className="text-[10px] text-[var(--color-text-muted)] mt-1">{formatDate(article.publishedAt)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
