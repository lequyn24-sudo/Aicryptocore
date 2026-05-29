'use client'

import { useState, useCallback } from 'react'
import { searchArticles } from '@/lib/search'
import { getAllArticles } from '@/lib/content'
import type { Article } from '@/types/article'

export function useSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Article[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const search = useCallback((q: string) => {
    setQuery(q)
    if (!q.trim()) {
      setResults([])
      return
    }
    const articles = getAllArticles()
    const found = searchArticles(q, articles)
    setResults(found.map((r) => r.item))
  }, [])

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => {
    setIsOpen(false)
    setQuery('')
    setResults([])
  }, [])

  return { query, results, isOpen, search, open, close }
}
