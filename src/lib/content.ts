import type { Article } from '@/types/article'
import type { CategorySlug, SubcategorySlug } from '@/types/category'
import MOCK_ARTICLES from './mockArticles'

function computeHref(article: Article): string {
  if (article.subcategory) {
    return `/${article.category}/${article.subcategory}/${article.slug}`
  }
  return `/${article.category}/${article.slug}`
}

const ARTICLES_WITH_HREF = MOCK_ARTICLES.map((a) => ({
  ...a,
  href: computeHref(a),
}))

export function getAllArticles(): Article[] {
  return ARTICLES_WITH_HREF
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES_WITH_HREF.find((a) => a.slug === slug)
}

export function getArticlesByCategory(category: CategorySlug): Article[] {
  return ARTICLES_WITH_HREF.filter((a) => a.category === category)
}

export function getArticlesBySubcategory(subcategory: SubcategorySlug): Article[] {
  return ARTICLES_WITH_HREF.filter((a) => a.subcategory === subcategory)
}

export function getFeaturedArticles(count = 1): Article[] {
  return ARTICLES_WITH_HREF.filter((a) => a.featured).slice(0, count)
}

export function getLatestArticles(count = 6): Article[] {
  return [...ARTICLES_WITH_HREF]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count)
}

export function getRelatedArticles(article: Article, count = 3): Article[] {
  return ARTICLES_WITH_HREF.filter(
    (a) => a.slug !== article.slug && (a.category === article.category || a.tags.some((t) => article.tags.includes(t)))
  ).slice(0, count)
}

export function getSponsoredArticles(): Article[] {
  return ARTICLES_WITH_HREF.filter((a) => a.sponsored === true)
}

export function getPressReleaseArticles(): Article[] {
  return ARTICLES_WITH_HREF.filter((a) => a.pressRelease === true)
}

export function getTrendingArticles(count = 5): Article[] {
  return getLatestArticles(count)
}
