import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, User, Zap } from 'lucide-react'
import type { Article } from '@/types/article'
import { formatDate, formatReadingTime } from '@/lib/dates'

interface StatBox {
  label: string
  count: number
  color: string
  bg: string
}

interface HeroSectionProps {
  featured: Article
  recentArticles: Article[]
  statBoxes: StatBox[]
}

export function HeroSection({ featured, recentArticles, statBoxes }: HeroSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 mb-6">

      {/* ── LEFT: Brand hero card ── */}
      <div className="cosmic-orbs relative rounded-2xl overflow-hidden min-h-[440px] flex flex-col bg-[#0d1117] border border-white/[0.07]">
        {/* Background image – pushed right, faded */}
        <div className="absolute inset-0">
          <Image
            src={featured.coverImage}
            alt={featured.coverImageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 65vw"
            priority
            className="object-cover object-center opacity-30"
          />
          {/* Strong left-side gradient so text is always readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d1117] via-[#0d1117]/90 to-[#0d1117]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col flex-1 p-7 md:p-9">
          {/* Top badge */}
          <div className="mb-5">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full badge-teal">
              <Zap size={9} /> Featured
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-2xl md:text-[28px] lg:text-3xl font-bold text-white leading-tight mb-5 max-w-[520px]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {featured.title}
          </h1>

          {/* ── Stat boxes: immediately after title (matches reference) ── */}
          <div className="flex gap-2.5 mb-5 flex-wrap">
            {statBoxes.map((s) => (
              <div
                key={s.label}
                className="rounded-xl px-4 py-2.5 border text-center min-w-[72px]"
                style={{ background: s.bg, borderColor: s.color + '35' }}
              >
                <div
                  className="text-2xl font-bold font-mono leading-none mb-0.5"
                  style={{ color: s.color, fontFamily: 'var(--font-mono)' }}
                >
                  {s.count}
                </div>
                <div className="text-[9px] uppercase tracking-wide text-[var(--color-text-muted)] leading-tight">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-[var(--color-text-secondary)] line-clamp-2 mb-6 max-w-md leading-relaxed">
            {featured.description}
          </p>

          {/* CTA */}
          <div className="flex items-center gap-4 mb-auto">
            <Link
              href={featured.href}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:gap-3 hover:brightness-110"
              style={{ background: 'var(--color-accent)', color: '#0a0a0f' }}
            >
              Get Started <ArrowRight size={14} />
            </Link>
            <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1"><User size={11} /> {featured.author.name}</span>
              <span className="flex items-center gap-1"><Clock size={11} /> {formatReadingTime(featured.readingTime)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Recent articles stacked ── */}
      <div className="flex flex-col gap-0">
        <div className="flex items-center justify-between px-1 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)]">
            Latest Articles
          </span>
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
              <div className="relative w-[66px] h-[50px] rounded-lg overflow-hidden shrink-0 bg-[#161b22]">
                <Image
                  src={article.coverImage}
                  alt={article.coverImageAlt}
                  fill
                  sizes="66px"
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
