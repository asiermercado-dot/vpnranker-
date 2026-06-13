import articlesData from '@/data/keywords.json'

export interface ComparisonRow {
  productName: string
  rating: number
  price: string
  bestFor: string
  affiliateUrl: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface Article {
  slug: string
  title: string
  keyword: string
  category: string
  excerpt: string
  introduction: string
  metaTitle: string
  metaDescription: string
  publishedAt: string
  updatedAt: string
  readingTime: number
  verified: boolean
  comparisonTable: ComparisonRow[]
  pros: string[]
  cons: string[]
  faqs: FAQ[]
  ctaTitle: string
  ctaDescription: string
  ctaButtonText: string
  ctaAffiliateUrl: string
}

export function getAllArticles(): Article[] {
  return articlesData as Article[]
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((a) => a.slug === slug)
}
