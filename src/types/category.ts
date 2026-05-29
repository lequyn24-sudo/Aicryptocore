export type CategorySlug =
  | 'ai-agents'
  | 'ai-infrastructure'
  | 'ai-trading'
  | 'ai-data'
  | 'ai-ecosystem'
  | 'sponsored-articles'
  | 'press-release'

export type SubcategorySlug =
  | 'defi-agents'
  | 'trading-agents'
  | 'onchain-agents'
  | 'economy'
  | 'compute'
  | 'decentralized-ai'
  | 'models'
  | 'safety'
  | 'bots'
  | 'signals'
  | 'prediction'
  | 'execution'
  | 'analytics'
  | 'indexing'
  | 'oracles'
  | 'layer1'
  | 'defi-ai'
  | 'data-ai'

export interface Subcategory {
  slug: SubcategorySlug
  label: string
  parent: CategorySlug
  description: string
}

export interface Category {
  slug: CategorySlug
  label: string
  description: string
  icon: string
  color: string
  subcategories: Subcategory[]
}
