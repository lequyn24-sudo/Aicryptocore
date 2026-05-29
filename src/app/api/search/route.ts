import { NextRequest, NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/content'
import { searchArticles } from '@/lib/search'

export const dynamic = 'force-dynamic'

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') ?? ''

  if (!q.trim()) {
    return NextResponse.json([])
  }

  const articles = getAllArticles()
  const results = searchArticles(q, articles)

  const simplified = results.map(({ item }) => ({
    title: item.title,
    slug: item.slug,
    category: item.category,
    description: item.description,
    coverImage: item.coverImage,
    href: item.href,
    publishedAt: item.publishedAt,
  }))

  return NextResponse.json(simplified)
}
