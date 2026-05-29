import { HeroSection } from '@/components/layout/HeroSection'
import { CategoryNavRow } from '@/components/layout/CategoryNavRow'
import { CategorySection } from '@/components/layout/CategorySection'
import { Sidebar } from '@/components/layout/Sidebar'
import { MarketSummary } from '@/components/data/MarketSummary'
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

  // Recent articles for hero right column (exclude featured)
  const recentArticles = allArticles
    .filter((a) => a.slug !== featuredArticle?.slug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  // Category article counts for hero badges
  const categoryCounts = [
    { label: 'AI Agents',  count: allArticles.filter((a) => a.category === 'ai-agents').length + 68,        color: '#5EEAD4' },
    { label: 'Infra',      count: allArticles.filter((a) => a.category === 'ai-infrastructure').length + 44, color: '#93C5FD' },
    { label: 'Trading',    count: allArticles.filter((a) => a.category === 'ai-trading').length + 79,        color: '#FCD34D' },
    { label: 'Data',       count: allArticles.filter((a) => a.category === 'ai-data').length + 36,           color: '#C4B5FD' },
  ]

  // Platform stats row
  const platformStats = [
    { value: '1,847', label: 'Platforms' },
    { value: '1,348', label: 'AI Models' },
    { value: '40.2M', label: 'Data Points' },
    { value: '14T',   label: 'Market Cap' },
  ]

  // Featured 4 articles for the 2×2 grid (non-hero)
  const gridArticles = recentArticles.slice(0, 4)

  // Remaining articles after grid
  const remainingArticles = recentArticles.slice(4)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* ── HERO: featured left + recent list right ── */}
      {featuredArticle && (
        <HeroSection
          featured={featuredArticle}
          recentArticles={recentArticles}
          categoryCounts={categoryCounts}
        />
      )}

      {/* ── PLATFORM STATS ROW ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {platformStats.map((stat) => (
          <div key={stat.label} className="card-cosmic p-4 text-center">
            <div
              className="text-2xl font-bold font-mono mb-0.5"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-teal)' }}
            >
              {stat.value}
            </div>
            <div className="text-xs text-[var(--color-text-muted)]">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* ── CATEGORY NAV ROW ── */}
      <CategoryNavRow categories={mainCategories} />

      {/* ── MAIN LAYOUT: content 70% + sidebar 30% ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">

        {/* LEFT — main content */}
        <div className="min-w-0">

          {/* 2×2 Featured articles grid */}
          {gridArticles.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-base font-bold text-[var(--color-text-primary)]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Featured Stories
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gridArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} variant="default" />
                ))}
              </div>
            </section>
          )}

          {/* Market Overview */}
          <MarketSummary />

          {/* Category sections */}
          {mainCategories.map((category) => {
            const articles = getArticlesByCategory(category.slug).slice(0, 3)
            return (
              <CategorySection key={category.slug} category={category} articles={articles} />
            )
          })}

        </div>

        {/* RIGHT — sidebar (sticky) */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Sidebar trendingArticles={trendingArticles} />
          </div>
        </div>

      </div>
    </div>
  )
}
