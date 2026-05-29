import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ArticleHeader } from '@/components/article/ArticleHeader'
import { ArticleBody } from '@/components/article/ArticleBody'
import { ArticleFooter } from '@/components/article/ArticleFooter'
import { RelatedArticles } from '@/components/article/RelatedArticles'
import { ReadingProgress } from '@/components/article/ReadingProgress'
import { Sidebar } from '@/components/layout/Sidebar'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import { getAllArticles, getArticleBySlug, getRelatedArticles, getTrendingArticles } from '@/lib/content'
import { getCategoryBySlug } from '@/lib/categories'
import { generateArticleMetadata } from '@/lib/seo'
import { SITE_URL } from '@/lib/constants'

export const revalidate = 3600

interface PageProps {
  params: Promise<{ category: string; subcategory: string; slug: string }>
}

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles
    .filter((a) => a.subcategory)
    .map((a) => ({
      category: a.category,
      subcategory: a.subcategory as string,
      slug: a.slug,
    }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return generateArticleMetadata(article)
}

export default async function ArticlePage({ params }: PageProps) {
  const { category: catSlug, subcategory: subSlug, slug } = await params
  const article = getArticleBySlug(slug)

  if (!article || article.category !== catSlug || article.subcategory !== subSlug) notFound()

  const relatedArticles = getRelatedArticles(article, 3)
  const trendingArticles = getTrendingArticles(5)
  const category = getCategoryBySlug(catSlug)

  const breadcrumbItems = [
    { name: category?.label ?? catSlug, url: `${SITE_URL}/${catSlug}` },
    { name: subSlug.replace(/-/g, ' '), url: `${SITE_URL}/${catSlug}/${subSlug}` },
    { name: article.title, url: `${SITE_URL}${article.href}` },
  ]

  return (
    <>
      <ReadingProgress />
      <ArticleJsonLd article={article} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
          <article className="min-w-0">
            <ArticleHeader article={article} />
            <ArticleBody article={article} />
            <ArticleFooter article={article} />
          </article>

          <div className="hidden lg:block">
            <div className="sticky top-24">
              <Sidebar trendingArticles={trendingArticles} />
            </div>
          </div>
        </div>

        <RelatedArticles articles={relatedArticles} />
      </div>
    </>
  )
}
