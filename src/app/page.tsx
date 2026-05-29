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

  // ── Stat boxes (colored tiles inside hero) ──
  const statBoxes = [
    { label: 'AI Agents',  count: allArticles.filter((a) => a.category === 'ai-agents').length + 68,        color: '#5EEAD4', bg: 'rgba(20,184,166,0.10)' },
    { label: 'Infra',      count: allArticles.filter((a) => a.category === 'ai-infrastructure').length + 44, color: '#93C5FD', bg: 'rgba(147,197,253,0.08)' },
    { label: 'Trading',    count: allArticles.filter((a) => a.category === 'ai-trading').length + 79,        color: '#FCD34D', bg: 'rgba(252,211,77,0.08)' },
    { label: 'Data',       count: allArticles.filter((a) => a.category === 'ai-data').length + 36,           color: '#C4B5FD', bg: 'rgba(196,181,253,0.08)' },
  ]

  // ── Platform stats (inside hero bottom bar) ──
  const platformStats = [
    { value: '1,847', label: 'Platforms' },
    { value: '1,248', label: 'AI Models' },
    { value: '40.2M', label: 'Data Points' },
    { value: '14T',   label: 'Market Cap' },
  ]

  // 4-col featured grid (first 4 non-hero articles)
  const gridArticles = recentArticles.slice(0, 4)

  // Project cards (use ai-agents articles)
  const projectArticles = getArticlesByCategory('ai-agents')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

      {/* ── HERO ── */}
      {featuredArticle && (
        <HeroSection
          featured={featuredArticle}
          recentArticles={recentArticles}
          statBoxes={statBoxes}
          platformStats={platformStats}
        />
      )}

      {/* ── CATEGORY NAV PILLS ── */}
      <CategoryNavRow categories={mainCategories} />

      {/* ── MAIN 2-COL: content + sidebar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-7">

        {/* LEFT — main content */}
        <div className="min-w-0">

          {/* 4-col featured grid */}
          {gridArticles.length > 0 && (
            <section className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2
                  className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wide"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Featured Stories
                </h2>
              </div>
              {/* Reference shows 4 in a row on desktop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {gridArticles.map((article) => (
                  <ArticleCard key={article.slug} article={article} variant="default" />
                ))}
              </div>
            </section>
          )}

          {/* Projects section */}
          <ProjectsSection articles={projectArticles} />

          {/* Category sections */}
          {mainCategories.map((category) => {
            const articles = getArticlesByCategory(category.slug).slice(0, 3)
            return (
              <CategorySection key={category.slug} category={category} articles={articles} />
            )
          })}

        </div>

        {/* RIGHT — sticky sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Sidebar trendingArticles={trendingArticles} />
          </div>
        </div>

      </div>
    </div>
  )
}
