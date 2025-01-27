import { Geist, Geist_Mono } from 'next/font/google'
import '@/styles/globals.css'
import { server } from '@/mocks/node'
import GlobalProvider from '@/providers/global-provider'
import localFont from 'next/font/local'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'
import Script from 'next/script'

// 개발 환경에서만 MSW 서버를 시작합니다.
if (process.env.NODE_ENV === 'development') {
  server.listen()
}

export const metadata: Metadata = {
  title: {
    template: '%s | Acme',
    default: '어푸!',
  },
  description: '어푸!는 전국 수영인들을 위해 수영장 정보를 제공합니다.',
  generator: '어푸!',
  applicationName: '어푸!',
  referrer: 'origin-when-cross-origin',
  keywords: ['수영장', '수영장 정보', '자유수영', '자유수영 정보'],
  authors: [{ name: '어푸!', url: 'https://github.com/Su-Stars' }],
  creator: '어푸!',
  publisher: '어푸!',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: '어푸!',
    description: '어푸!는 전국 수영인들을 위해 수영장 정보를 제공합니다.',
    url: 'https://apuu.netlify.app/',
    siteName: '어푸!',
    images: [
      {
        url: 'https://nextjs.org/og.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.png',
    shortcut: '/shortcut-icon.png',
    apple: '/apple-icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: '어푸!',
    description: '어푸!는 전국 수영인들을 위해 수영장 정보를 제공합니다.',
    siteId: '1467726470533754880',
    creator: '어푸!',
    creatorId: '1467726470533754880',
    images: ['https://nextjs.org/og.png'], // Must be an absolute URL
  },
  verification: {
    google: 'FGxuIZJK4nXKhDlSTwR1EoYjC_pXFrtGDMVYpTuemb8',
    // other: {
    //   me: ['my-email', 'my-link'],
    // },
  },
  category: 'information',
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const pretendard = localFont({
  src: '../static/fonts/PretendardVariable.woff2',
  display: 'swap', // 폰트 로딩 중 시스템 폰트로 대체(디폴트 swap)
  preload: true, // 폰트 미리 로드(디폴트 true)
  fallback: [
    // 폰트 로드 실패시 대체 폰트
    '-apple-system',
    'BlinkMacSystemFont',
    'system-ui',
    'Roboto',
    'Helvetica Neue',
    'Arial',
    'sans-serif',
  ],
  weight: '45 920', // Pretendard 가변 폰트 weight 범위
  variable: '--font-pretendard',
  adjustFontFallback: 'Arial', // 폰트 메트릭 조정을 위한 기준 폰트(디폴트 Arial)
})

// Google Analytics ID
const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <head>
        <script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=0d929ba008c86e3296bdbeb4f341c2cc&libraries=services,clusterer&autoload=false" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pretendard.variable} font-pretendard antialiased`}
      >
        <GoogleAnalytics gaId={GA_ID} />
        <GlobalProvider>{children}</GlobalProvider>
        <Toaster />
      </body>
    </html>
  )
}
