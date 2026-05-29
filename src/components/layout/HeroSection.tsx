import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, User, Zap } from 'lucide-react'
import type { Article } from '@/types/article'
import { Badge } from '@/components/ui/Badge'
import { formatDate, formatReadingTime } from '@/lib/dates'

interface StatBox {
  label: string
  count: number
  color: string
  bg: string
}

interface PlatformStat {
  value: string
  label: string
}

interface HeroSectionProps {
  featured: Article
  recentArticles: Article[]
  statBoxes: StatBox[]
  platformStats: PlatformStat[]
}

export function HeroSection({ featured, recentArticles, statBoxes, platformStats }: HeroSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 mb-6">

      {/* ── LEFT: Brand hero card ── */}
      <div className="cosmic-orbs relative rounded-2xl overflow-hidden min-h-[460px] flex flex-col bg-[#0d1117] border border-white/[0.07]">
        {/* Background image with strong gradient */}
        <div className="absolute inset-0">
          <Image
            src={featured.coverImage}
            alt={featured.coverImageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 65vw"
            priority
            className="object-cover opacity-40"
          />
          {/* Double gradient: right→transparent for image fade + bottom→dark for text */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117] via-[#0d1117]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col flex-1 p-6 md:p-8">
          {/* Category badge */}
          <div className="mb-4">
            <Badge variant="new">
              <Zap size={10} className="mr-1" />
              Featured
            </Badge>
          </div>

          {/* Title */}
          <h1
            className="text-2xl md:text-[28px] font-bold text-white leading-tight mb-3 max-w-lg"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {featured.title}
          </h1>

          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-6 max-w-md leading-relaxed">
            {featured.description}
          </p>

          {/* ── Stat boxes (78/72/64/81 style) ── */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {statBoxes.map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-3 border text-center"
                style={{ background: s.bg, borderColor: s.color + '30' }}
              >
                <div className="text-xl font-bold font-mono leading-none mb-1" style={{ color: s.color }}>
                  {s.count}
                </div>
                <div className="text-[10px] text-[var(--color-text-muted)] leading-tight">{s.label}</div>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <div className="mb-auto">
            <Link
              href={featured.href}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:gap-3"
              style={{ background: 'var(--color-accent)', color: '#0a0a0f' }}
            >
              Read Article <ArrowRight size={15} />
            </Link>
          </div>

          {/* ── Platform stats row (1,847 / 1,248 / 40.2M / 14T) ── */}
          <div className="mt-6 pt-5 border-t border-white/[0.07] grid grid-cols-4 gap-2">
            {platformStats.map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="text-base font-bold font-mono text-[var(--color-text-primary)] leading-none mb-0.5"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {s.value}
                </div>
                <div className="text-[10px] text-[var(--color-text-muted)]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RIGHT: Recent articles stacked ── */}
      <div className="flex flex-col gap-0">
        <div className="flex items-center justify-between px-1 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">Latest Articles</span>
          <Link
            href="/search"
            className="text-[10px] text-[var(--color-text-teal)] hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"
          >
            View all <ArrowRight size={10} />
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          {recentArticles.slice(0, 5).map((article) => (
            <Link
              key={article.slug}
              href={article.href}
              className="group flex gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[var(--color-border-teal)] hover:bg-white/[0.05] transition-all duration-200"
            >
              {/* Thumbnail */}
              <div className="relative w-[68px] h-[52px] rounded-lg overflow-hidden shrink-0 bg-[#161b22]">
                <Image
                  src={article.coverImage}
                  alt={article.coverImageAlt}
                  fill
                  sizes="68px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <span className="badge-teal text-[9px] font-medium px-1.5 py-0.5 rounded-full inline-block mb-1">
                  {article.category.replace('ai-', 'AI ').replace(/-/g, ' ')}
                </span>
                <h3 className="text-xs font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] leading-snug line-clamp-2 transition-colors">
                  {article.title}
                </h3>
                <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">
                  {formatDate(article.publishedAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
