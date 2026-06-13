import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllArticles } from '@/lib/articles'

interface Props { params: { slug: string } }

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.excerpt,
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
    alternates: { canonical: `https://vpnranker.net/${article.slug}` },
  }
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { '@type': 'Organization', name: 'VPNRanker' },
    publisher: { '@type': 'Organization', name: 'VPNRanker' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1.5" aria-label="Breadcrumb">
          <a href="/" className="hover:text-orange-600 transition-colors">Home</a>
          <span aria-hidden>/</span>
          <span className="text-orange-600 font-medium">{article.category}</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <span className="text-xs font-medium text-orange-700 bg-orange-50 px-2 py-0.5 rounded mb-3 inline-block">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed mb-5">{article.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 border-t border-b border-gray-100 py-3">
            <span>By <strong className="text-gray-600">VPNRanker Editorial</strong></span>
            <span>
              Updated:{' '}
              {new Date(article.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span>{article.readingTime} min read</span>
            {article.verified && <span className="badge-verified">✓ Independently Tested</span>}
          </div>
        </header>

        {/* Introduction */}
        <section className="mb-10">
          <p className="text-base text-gray-700 leading-relaxed">{article.introduction}</p>
        </section>

        {/* Comparison Table */}
        <section className="mb-10">
          <h2 className="section-heading">VPN Comparison</h2>
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-950 text-white">
                  <th className="text-left px-4 py-3 font-semibold">VPN</th>
                  <th className="text-left px-4 py-3 font-semibold">Rating</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Price</th>
                  <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Best For</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {article.comparisonTable.map((row, i) => (
                  <tr key={row.productName} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-medium text-gray-900">{row.productName}</td>
                    <td className="px-4 py-3"><RatingBadge rating={row.rating} /></td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{row.price}</td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{row.bestFor}</td>
                    <td className="px-4 py-3">
                      <a
                        href={row.affiliateUrl}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                        className="btn-primary py-1.5 px-3 text-xs whitespace-nowrap"
                      >
                        View Deal →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pros & Cons */}
        <section className="mb-10">
          <h2 className="section-heading">Pros &amp; Cons</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-green-200 bg-green-50/50 p-5">
              <p className="font-semibold text-green-800 mb-3">✓ Pros</p>
              <ul className="space-y-2">
                {article.pros.map((pro) => (
                  <li key={pro} className="text-sm text-green-900 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5 flex-shrink-0" aria-hidden>+</span>{pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50/50 p-5">
              <p className="font-semibold text-red-800 mb-3">✗ Cons</p>
              <ul className="space-y-2">
                {article.cons.map((con) => (
                  <li key={con} className="text-sm text-red-900 flex items-start gap-2">
                    <span className="text-red-400 mt-0.5 flex-shrink-0" aria-hidden>−</span>{con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {article.faqs.map((faq, i) => (
              <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between px-5 py-4 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors list-none">
                  <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                  <span className="text-gray-400 flex-shrink-0 transition-transform group-open:rotate-180">▾</span>
                </summary>
                <div className="px-5 py-4 text-sm text-gray-700 leading-relaxed bg-white">{faq.answer}</div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-blue-950 text-white p-8 text-center">
          <p className="text-xs uppercase tracking-widest text-orange-400 mb-2">Our Top Pick</p>
          <h3 className="text-xl font-serif font-bold mb-2">{article.ctaTitle}</h3>
          <p className="text-sm text-blue-200 mb-6 max-w-md mx-auto leading-relaxed">{article.ctaDescription}</p>
          <a
            href={article.ctaAffiliateUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
            className="inline-block bg-orange-500 text-white font-semibold px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors text-sm"
          >
            {article.ctaButtonText} →
          </a>
          <p className="text-xs text-blue-400 mt-4">
            * Affiliate link. We may earn a commission at no extra cost to you.
          </p>
        </section>
      </article>
    </>
  )
}

function RatingBadge({ rating }: { rating: number }) {
  const colorClass =
    rating >= 4.5 ? 'text-green-700 bg-green-50 border-green-200' :
    rating >= 4.0 ? 'text-blue-700 bg-blue-50 border-blue-200' :
                   'text-yellow-700 bg-yellow-50 border-yellow-200'
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded border ${colorClass}`}>
      ★ {rating.toFixed(1)}
    </span>
  )
}
