import type { Category, CategorySlug, SubcategorySlug } from '@/types/category'

export const CATEGORIES: Category[] = [
  {
    slug: 'ai-agents',
    label: 'AI Agents',
    description: 'Autonomous AI agents operating on-chain — DeFi, trading, and beyond',
    icon: 'Bot',
    color: 'teal',
    subcategories: [
      { slug: 'defi-agents', label: 'DeFi Agents', parent: 'ai-agents', description: 'AI agents in DeFi protocols' },
      { slug: 'trading-agents', label: 'Trading Agents', parent: 'ai-agents', description: 'Autonomous trading systems' },
      { slug: 'onchain-agents', label: 'On-chain Agents', parent: 'ai-agents', description: 'On-chain AI agent infrastructure' },
      { slug: 'economy', label: 'Agent Economy', parent: 'ai-agents', description: 'Token economies for AI agents' },
    ],
  },
  {
    slug: 'ai-infrastructure',
    label: 'AI Infrastructure',
    description: 'Decentralized compute, models, and safety for AI systems',
    icon: 'Server',
    color: 'teal',
    subcategories: [
      { slug: 'compute', label: 'Compute', parent: 'ai-infrastructure', description: 'Decentralized GPU/compute networks' },
      { slug: 'decentralized-ai', label: 'Decentralized AI', parent: 'ai-infrastructure', description: 'AI systems built on decentralized infra' },
      { slug: 'models', label: 'AI Models', parent: 'ai-infrastructure', description: 'Open models deployed on-chain' },
      { slug: 'safety', label: 'AI Safety', parent: 'ai-infrastructure', description: 'Safety research in crypto-AI context' },
    ],
  },
  {
    slug: 'ai-trading',
    label: 'AI Trading',
    description: 'Bots, signals, prediction models, and execution systems',
    icon: 'TrendingUp',
    color: 'amber',
    subcategories: [
      { slug: 'bots', label: 'Trading Bots', parent: 'ai-trading', description: 'Automated crypto trading bots' },
      { slug: 'signals', label: 'AI Signals', parent: 'ai-trading', description: 'AI-generated trading signals' },
      { slug: 'prediction', label: 'Prediction', parent: 'ai-trading', description: 'Price and market prediction models' },
      { slug: 'execution', label: 'Execution', parent: 'ai-trading', description: 'Smart order routing and execution' },
    ],
  },
  {
    slug: 'ai-data',
    label: 'AI Data',
    description: 'On-chain data analytics, indexing, and oracle networks for AI',
    icon: 'Database',
    color: 'teal',
    subcategories: [
      { slug: 'analytics', label: 'Analytics', parent: 'ai-data', description: 'AI-powered on-chain analytics' },
      { slug: 'indexing', label: 'Indexing', parent: 'ai-data', description: 'Data indexing protocols for AI' },
      { slug: 'oracles', label: 'Oracles', parent: 'ai-data', description: 'AI-augmented oracle networks' },
    ],
  },
  {
    slug: 'ai-ecosystem',
    label: 'AI Ecosystem',
    description: 'Layer 1 blockchains, DeFi protocols, and data networks built for AI',
    icon: 'Network',
    color: 'teal',
    subcategories: [
      { slug: 'layer1', label: 'Layer 1', parent: 'ai-ecosystem', description: 'AI-native L1 blockchains' },
      { slug: 'defi-ai', label: 'DeFi × AI', parent: 'ai-ecosystem', description: 'DeFi protocols integrating AI' },
      { slug: 'data-ai', label: 'Data × AI', parent: 'ai-ecosystem', description: 'Data infrastructure for AI ecosystems' },
    ],
  },
]

export const CATEGORY_SLUGS: CategorySlug[] = CATEGORIES.map((c) => c.slug)

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug)
}

export function getSubcategoryBySlug(slug: string) {
  for (const cat of CATEGORIES) {
    const sub = cat.subcategories.find((s) => s.slug === slug)
    if (sub) return sub
  }
  return undefined
}

export function getAllSubcategories() {
  return CATEGORIES.flatMap((c) => c.subcategories)
}

export function getSubcategoriesByCategory(categorySlug: CategorySlug) {
  return CATEGORIES.find((c) => c.slug === categorySlug)?.subcategories ?? []
}

export const NAV_CATEGORIES = CATEGORIES.filter(
  (c) => c.slug !== 'sponsored-articles' && c.slug !== 'press-release'
)

export const VALID_CATEGORY_SLUGS = new Set<SubcategorySlug | CategorySlug>([
  ...CATEGORIES.map((c) => c.slug as CategorySlug),
  ...CATEGORIES.flatMap((c) => c.subcategories.map((s) => s.slug as SubcategorySlug)),
])
