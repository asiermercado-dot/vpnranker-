import type { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const merriweather = Merriweather({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'VPNRanker — Independent VPN Reviews You Can Trust',
    template: '%s | VPNRanker',
  },
  description:
    'Independent, hands-on testing of VPN services for streaming, torrenting, privacy, and security. Honest comparisons trusted by 200,000+ privacy-conscious readers.',
  metadataBase: new URL('https://vpnranker.net'),
  openGraph: { type: 'website', locale: 'en_US', siteName: 'VPNRanker' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  verification: { google: 'O618r5iMgwY7-cCLoXskvwXyKcTn-I_HO2ITy1jqoEg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <head>
        {/* @ts-expect-error -- Impact.com verification snippet requires `value`, not `content` */}
        <meta name="impact-site-verification" value="33d23e7d-714b-4800-98b9-07e4740ce222" />
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}

function SiteHeader() {
  return (
    <header className="bg-blue-950 border-b border-blue-900 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <span className="text-white font-serif text-xl font-bold tracking-tight">
            VPN<span className="text-orange-400">Ranker</span>
          </span>
          <span className="hidden sm:inline text-xs text-orange-300 border border-orange-800 px-2 py-0.5 rounded">
            Independent
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-blue-300">
          <a href="/" className="hover:text-white transition-colors">Reviews</a>
          <a href="/comparisons" className="hover:text-white transition-colors">Comparisons</a>
          <a href="/about" className="hover:text-white transition-colors">About</a>
        </nav>
      </div>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="bg-blue-950 text-blue-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-serif text-white font-bold text-lg mb-2">VPNRanker</p>
            <p className="text-sm text-blue-400 leading-relaxed">
              Independent VPN reviews and comparisons covering speed, security, and privacy — tested by hand, not sponsored.
            </p>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-3">Disclosure</p>
            <p className="text-xs text-blue-400 leading-relaxed">
              This site contains affiliate links. We earn a commission when you purchase through our links at no extra cost to you. Our testing and rankings remain editorially independent.
            </p>
          </div>
          <div>
            <p className="text-white text-sm font-semibold mb-3">Legal</p>
            <ul className="space-y-1.5 text-xs text-blue-400">
              <li><a href="/privacy" className="hover:text-orange-300 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-orange-300 transition-colors">Terms of Use</a></li>
              <li><a href="/affiliate-disclosure" className="hover:text-orange-300 transition-colors">Affiliate Disclosure</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-900 pt-6 text-xs text-blue-600 text-center">
          © {new Date().getFullYear()} VPNRanker. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
