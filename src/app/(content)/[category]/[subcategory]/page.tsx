import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArticleGrid } from '@/components/article/ArticleGrid'
import { Sidebar } from '@/components/layout/Sidebar'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { SubcategoryFilterTabs } from '@/components/article/SubcategoryFilterTabs'
import { getCategoryBySlug, getSubcategoryBySlug, CATEGORIES } from '@/lib/categories'
import { getArticlesBySubcategory, getTrendingArticles } from '@/lib/content'
import { SITE_NAME } from '@/lib/constants'
import type { CategorySlug, SubcategorySlug } from '@/types/category'

export const revalidate = 900

interface PageProps {
  params: Promise<{ category: string; subcategory: string }>
}

export async function generateStaticParams() {
  return CATEGORIES.flatMap((cat) =>
    cat.subcategories.map((sub) => ({
      category: cat.slug,
      subcategory: sub.slug,
    }))
  )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: catSlug, subcategory: subSlug } = await params
  const sub = getSubcategoryBySlug(subSlug)
  const cat = getCategoryBySlug(catSlug)
  if (!sub || !cat) return {}
  return {
    title: `${sub.label} — ${cat.label} News`,
    description: sub.description,
    openGraph: { title: `${sub.label} | ${SITE_NAME}`, description: sub.description },
  }
}

export default async function SubcategoryPage({ params }: PageProps) {
  const { category: catSlug, subcategory: subSlug } = await params
  const category = getCategoryBySlug(catSlug)
  const subcategory = getSubcategoryBySlug(subSlug)

  if (!category || !subcategory || subcategory.parent !== catSlug) notFound()

  const articles = getArticlesBySubcategory(subcategory.slug as SubcategorySlug)
  const trendingArticles = getTrendingArticles(5)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: category.label, href: `/${category.slug}` },
            { label: subcategory.label },
          ]}
        />
      </div>

      <div className="mb-8 pb-6 border-b border-teal-800/40">
        <h1
          className="text-2xl font-bold text-teal-50 mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {subcategory.label}
        </h1>
        <p className="text-teal-400 max-w-2xl leading-relaxed mb-1">{subcategory.description}</p>
        <p className="text-sm text-teal-500">{articles.length} articles</p>
      </div>

      <SubcategoryFilterTabs
        subcategories={category.subcategories}
        categorySlug={category.slug}
        activeSubcategory={subcategory.slug}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div>
          <ArticleGrid articles={articles} variant="default" />
          {articles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-teal-500 mb-2">No articles in this subcategory yet.</p>
              <a href={`/${category.slug}`} className="text-teal-400 hover:text-teal-200 text-sm underline">
                Browse all {category.label} articles
              </a>
            </div>
          )}
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
