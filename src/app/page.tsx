import { HeroSection } from '@/components/layout/HeroSection'
import { CategoryNavRow } from '@/components/layout/CategoryNavRow'
import { CategorySection } from '@/components/layout/CategorySection'
import { ProjectsSection } from '@/components/layout/ProjectsSection'
import { Sidebar } from '@/components/layout/Sidebar'
import { ArticleCard } from '@/components/article/ArticleCard'
import {
  getAllArticles,
  getFeaturedArticles,
  getArticlesByCategory,
  getTrendingArticles,
} from '@/lib/content'
import { CATEGORIES } from '@/lib/categories'

export const revalidate = 300

export default function HomePage() {
  const allArticles = getAllArticles()
  const featuredArticle = getFeaturedArticles(1)[0]
  const trendingArticles = getTrendingArticles(5)

  const mainCategories = CATEGORIES.filter(
    (c) => c.slug !== 'sponsored-articles' && c.slug !== 'press-release'
  )

  const recentArticles = allArticles
    .filter((a) => a.slug !== featuredArticle?.slug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  // Colored stat boxes inside hero (title → stat boxes → description order)
  const statBoxes = [
    { label: 'AI Agents',  count: allArticles.filter((a) => a.category === 'ai-agents').length + 68,        color: '#5EEAD4', bg: 'rgba(20,184,166,0.12)' },
    { label: 'Infra',      count: allArticles.filter((a) => a.category === 'ai-infrastructure').length + 44, color: '#93C5FD', bg: 'rgba(147,197,253,0.10)' },
    { label: 'Trading',    count: allArticles.filter((a) => a.category === 'ai-trading').length + 79,        color: '#FCD34D', bg: 'rgba(252,211,77,0.10)' },
    { label: 'Data',       count: allArticles.filter((a) => a.category === 'ai-data').length + 36,           color: '#C4B5FD', bg: 'rgba(196,181,253,0.10)' },
  ]

  // Platform stats — separate row BELOW hero, ABOVE category nav (matches reference)
  const platformStats = [
    { value: '1,847', label: 'Platforms' },
    { value: '1,248', label: 'AI Models' },
    { value: '40,204', label: 'Data Points' },
    { value: '14T', label: 'Market Cap' },
  ]

  const gridArticles = recentArticles.slice(0, 4)
  const projectArticles = getArticlesByCategory('ai-agents')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* ── HERO: 2-col ── */}
      {featuredArticle && (
        <HeroSection
          featured={featuredArticle}
          recentArticles={recentArticles}
          statBoxes={statBoxes}
        />
      )}

      {/* ── PLATFORM STATS — horizontal strip, no heavy cards ── */}
      <div className="flex items-center gap-0 mb-6 rounded-xl overflow-hidden border border-white/[0.06] divide-x divide-white/[0.06]">
        {platformStats.map((stat) => (
          <div key={stat.label} className="flex-1 px-5 py-3 text-center bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
            <div
              className="text-xl font-bold leading-none text-[var(--color-text-primary)] mb-0.5"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {stat.value}
            </div>
            <div className="text-xs text-[var(--color-text-secondary)] mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── CATEGORY NAV PILLS (compact, pill-shaped) ── */}
      <CategoryNavRow categories={mainCategories} />

      {/* ── MAIN 2-COL ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_268px] gap-7">

        {/* LEFT */}
        <div className="min-w-0">

          {/* 4-col article grid */}
          {gridArticles.length > 0 && (
            <section className="mb-8">
              <h2
                className="text-sm font-semibold text-[var(--color-text-secondary)] mb-4"
              >
                Featured Stories
              </h2>
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
                {gridArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} variant="default" />
                ))}
              </div>
            </section>
          )}

          {/* Projects section */}
          <ProjectsSection articles={projectArticles} />

          {/* Category sections — 4 articles each; AI Data uses horizontal card layout */}
          {mainCategories.map((category) => {
            const articles = getArticlesByCategory(category.slug).slice(0, 4)
            const isHorizontal = category.slug === 'ai-data'
            return (
              <CategorySection
                key={category.slug}
                category={category}
                articles={articles}
                layout={isHorizontal ? 'horizontal' : 'grid'}
              />
            )
          })}

        </div>

        {/* RIGHT — sticky sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-20">
            <Sidebar trendingArticles={trendingArticles} />
          </div>
        </div>

      </div>
    </div>
  )
}
