'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { SearchBar } from '@/components/ui/SearchBar'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { NAV_CATEGORIES } from '@/lib/categories'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={`sticky top-0 z-40 h-16 flex items-center transition-all duration-200 nav-cosmic ${
          scrolled ? 'shadow-[0_1px_0_rgba(255,255,255,0.06)]' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Image
              src="/logo/logo.png"
              alt="AiCryptoCore"
              width={36}
              height={36}
              className="rounded-lg"
            />
            <span className="font-bold text-[var(--color-text-primary)] text-lg hidden sm:block" style={{ fontFamily: 'var(--font-display)' }}>
              AiCryptoCore
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
            {NAV_CATEGORIES.map((cat) => (
              <div key={cat.slug} className="group relative">
                <Link
                  href={`/${cat.slug}`}
                  aria-current={pathname.startsWith(`/${cat.slug}`) ? 'page' : undefined}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                    pathname.startsWith(`/${cat.slug}`)
                      ? 'text-[var(--color-text-teal)] bg-white/[0.06]'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/[0.04]'
                  }`}
                >
                  {cat.label}
                  <ChevronDown size={14} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)] transition-transform duration-200 group-hover:rotate-180" />
                </Link>

                {/* Mega menu dropdown */}
                <div className="absolute top-full left-0 pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200">
                  <div className="bg-surface border border-glass rounded-xl shadow-[var(--shadow-lg)] p-3 min-w-[200px] backdrop-blur-md">
                    {cat.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/${cat.slug}/${sub.slug}`}
                        className="flex flex-col px-3 py-2.5 rounded-lg hover:bg-white/[0.05] transition-colors group/sub"
                      >
                        <span className="text-sm font-medium text-[var(--color-text-secondary)] group-hover/sub:text-[var(--color-text-primary)]">{sub.label}</span>
                        <span className="text-xs text-[var(--color-text-muted)] mt-0.5 line-clamp-1">{sub.description}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2 ml-auto lg:ml-0">
            <SearchBar />
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden p-2 rounded-lg text-teal-300 hover:text-teal-100 hover:bg-teal-800/50 transition-colors"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <div
        className={`fixed inset-0 z-30 lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
        <nav
          className={`absolute left-0 top-16 bottom-0 w-80 bg-surface border-r border-glass overflow-y-auto transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-4">
            {NAV_CATEGORIES.map((cat) => (
              <div key={cat.slug} className="mb-4">
                <Link
                  href={`/${cat.slug}`}
                  className="flex items-center gap-2 py-2 text-sm font-semibold text-[var(--color-text-primary)] hover:text-[var(--color-text-teal)] border-b border-white/[0.06] mb-2"
                >
                  {cat.label}
                </Link>
                <div className="pl-3 space-y-1">
                  {cat.subcategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      href={`/${cat.slug}/${sub.slug}`}
                      className="block py-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-white/[0.06] space-y-2">
              <Link href="/about" className="block py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">About</Link>
              <Link href="/sponsored-articles" className="block py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">Sponsored</Link>
              <Link href="/press-release" className="block py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">Press Release</Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
