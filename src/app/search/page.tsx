'use client'

import { useState, useEffect, useCallback, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { ArticleGrid } from '@/components/article/ArticleGrid'
import { searchArticles } from '@/lib/search'
import { getAllArticles } from '@/lib/content'
import { NAV_CATEGORIES } from '@/lib/categories'
import type { Article } from '@/types/article'

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialQuery = searchParams.get('q') ?? ''

  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<Article[]>([])
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const doSearch = useCallback(
    (q: string) => {
      if (!q.trim()) {
        setResults([])
        return
      }
      let articles = getAllArticles()
      if (activeCategory !== 'all') {
        articles = articles.filter((a) => a.category === activeCategory)
      }
      const found = searchArticles(q, articles)
      setResults(found.map((r) => r.item))
    },
    [activeCategory]
  )

  useEffect(() => {
    doSearch(query)
  }, [query, activeCategory, doSearch])

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value
    setQuery(q)
    router.replace(`/search?q=${encodeURIComponent(q)}`, { scroll: false })
  }

  const allArticles = getAllArticles()
  const displayArticles =
    results.length > 0
      ? results
      : !query
        ? allArticles.slice(0, 12)
        : []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1
        className="text-3xl font-bold text-teal-50 mb-6"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Search
      </h1>

      {/* Search input */}
      <div className="relative mb-6">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400"
        />
        <input
          type="text"
          placeholder="Search articles, topics, authors..."
          value={query}
          onChange={handleInput}
          autoFocus
          className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-teal-800 border border-teal-700/40 text-teal-100 placeholder-teal-500 text-base outline-none focus:border-teal-500 transition-colors"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 border ${
            activeCategory === 'all'
              ? 'bg-teal-500 text-teal-900 border-teal-500'
              : 'bg-teal-800/50 text-teal-400 border-teal-700/30 hover:text-teal-200'
          }`}
        >
          All
        </button>
        {NAV_CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => setActiveCategory(cat.slug)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 border ${
              activeCategory === cat.slug
                ? 'bg-teal-500 text-teal-900 border-teal-500'
                : 'bg-teal-800/50 text-teal-400 border-teal-700/30 hover:text-teal-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Results */}
      {query && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-teal-500 text-lg mb-2">No results for &ldquo;{query}&rdquo;</p>
          <p className="text-teal-600 text-sm">Try different keywords or browse a category.</p>
        </div>
      )}

      {!query && (
        <div className="mb-4">
          <p className="text-teal-500 text-sm">Showing latest articles</p>
        </div>
      )}

      {query && results.length > 0 && (
        <div className="mb-4">
          <p className="text-teal-500 text-sm">{results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;</p>
        </div>
      )}

      <ArticleGrid articles={displayArticles} variant="horizontal" />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-teal-500">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  )
}
