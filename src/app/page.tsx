import { ArticleCard } from '@/components/article/ArticleCard'
import { ArticleGrid } from '@/components/article/ArticleGrid'
import { CategorySection } from '@/components/layout/CategorySection'
import { Sidebar } from '@/components/layout/Sidebar'
import { MarketSummary } from '@/components/data/MarketSummary'
import {
  getAllArticles,
  getFeaturedArticles,
  getArticlesByCategory,
  getTrendingArticles,
} from '@/lib/content'
import { CATEGORIES } from '@/lib/categories'

export const revalidate = 300

export default function HomePage() {
  const featuredArticles = getFeaturedArticles(1)
  const featuredArticle = featuredArticles[0]
  const allArticles = getAllArticles()
  const trendingArticles = getTrendingArticles(5)

  const topStories = allArticles
    .filter((a) => !a.featured)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3)

  const mainCategories = CATEGORIES.filter(
    (c) => c.slug !== 'sponsored-articles' && c.slug !== 'press-release'
  )

  const stats = [
    { label: 'AI Agent Articles', value: allArticles.filter((a) => a.category === 'ai-agents').length + 68 },
    { label: 'Infrastructure', value: allArticles.filter((a) => a.category === 'ai-infrastructure').length + 44 },
    { label: 'Trading Analysis', value: allArticles.filter((a) => a.category === 'ai-trading').length + 79 },
    { label: 'Data & Oracles', value: allArticles.filter((a) => a.category === 'ai-data').length + 36 },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-teal-800/50 border border-teal-700/30 rounded-xl p-4 text-center"
          >
            <div className="text-2xl font-bold text-teal-400 font-mono mb-1">{stat.value}</div>
            <div className="text-xs text-teal-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Hero Featured */}
      {featuredArticle && (
        <div className="mb-8">
          <ArticleCard article={featuredArticle} variant="featured" priority />
        </div>
      )}

      {/* Top Stories */}
      {topStories.length > 0 && (
        <section className="mb-12">
          <h2
            className="text-lg font-bold text-teal-100 mb-5"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Latest Stories
          </h2>
          <ArticleGrid articles={topStories} variant="default" />
        </section>
      )}

      {/* Market Summary */}
      <MarketSummary />

      {/* Category Sections + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 mt-8">
        <div>
          {mainCategories.map((category) => {
            const articles = getArticlesByCategory(category.slug).slice(0, 3)
            return (
              <CategorySection key={category.slug} category={category} articles={articles} />
            )
          })}
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-24">
            <Sidebar trendingArticles={trendingArticles} />
          </div>
        </div>
      </div>
    </div>
  )
}
