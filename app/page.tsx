import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllArticles, type Article } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'VPNRanker — Independent VPN Reviews You Can Trust',
  description:
    'Independent, hands-on testing of VPN services for streaming, torrenting, privacy, and security. Honest comparisons trusted by 200,000+ privacy-conscious readers.',
}

export default function HomePage() {
  const articles = getAllArticles()
  const featured = articles.slice(0, 6)
  const rest = articles.slice(6)

  return (
    <>
      <HeroSection />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif font-bold text-gray-900">Latest Comparisons</h2>
          <span className="text-sm text-gray-400">{articles.length} guides published</span>
        </div>

        {/* Featured grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {featured.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {/* Remaining list */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {rest.map((article) => (
              <ArticleCardCompact key={article.slug} article={article} />
            ))}
          </div>
        )}
      </section>
      <TrustBanner />
    </>
  )
}

function HeroSection() {
  return (
    <section className="bg-blue-950 text-white py-16 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <span className="inline-block text-xs font-medium text-orange-300 border border-orange-800 bg-blue-900/40 px-3 py-1 rounded-full mb-5">
          Independent · Hands-On Tested · Unsponsored
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-5 leading-tight">
          Independent VPN Reviews<br />You Can Trust
        </h1>
        <p className="text-lg text-blue-200 max-w-xl mx-auto leading-relaxed">
          In-depth testing of speed, security, and privacy across 50+ comparisons — so you pick the right VPN for streaming, torrenting, gaming, or staying anonymous online.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-orange-300">
          {['Streaming', 'Torrenting', 'Privacy', 'Gaming', 'China VPNs'].map((cat) => (
            <span key={cat} className="border border-orange-800 px-3 py-1 rounded-full hover:border-orange-500 cursor-pointer transition-colors">
              {cat}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/${article.slug}`}
      className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-orange-200 transition-all duration-200"
    >
      <div className="h-1.5 w-full bg-orange-500" />
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-orange-700 bg-orange-50 px-2 py-0.5 rounded">
            {article.category}
          </span>
          {article.verified && <span className="badge-verified">✓ Verified</span>}
        </div>
        <h3 className="font-serif text-gray-900 font-bold text-lg mb-2 leading-snug group-hover:text-orange-700 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-gray-600 flex-1 mb-4 line-clamp-3">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-100 pt-3 mt-auto">
          <span>{article.readingTime} min read</span>
          <span>{new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>
    </Link>
  )
}

function ArticleCardCompact({ article }: { article: Article }) {
  return (
    <Link
      href={`/${article.slug}`}
      className="group flex items-start gap-4 p-4 border border-gray-200 rounded-xl hover:border-orange-200 hover:shadow-sm transition-all duration-200 bg-white"
    >
      <div className="w-1 flex-shrink-0 self-stretch bg-orange-500 rounded-full" />
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium text-orange-700 bg-orange-50 px-2 py-0.5 rounded">
          {article.category}
        </span>
        <h3 className="font-serif text-gray-900 font-semibold mt-1.5 mb-1 text-sm leading-snug group-hover:text-orange-700 transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-xs text-gray-400">{article.readingTime} min read</p>
      </div>
    </Link>
  )
}

function TrustBanner() {
  const stats = [
    { value: '30+', label: 'VPNs Tested' },
    { value: '50+', label: 'Comparisons Published' },
    { value: '200K+', label: 'Monthly Readers' },
    { value: '100%', label: 'Independent' },
  ]
  return (
    <section className="bg-gray-50 border-y border-gray-200 py-12 px-4">
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-12">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-3xl font-serif font-bold text-orange-600">{s.value}</p>
            <p className="text-sm text-gray-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
