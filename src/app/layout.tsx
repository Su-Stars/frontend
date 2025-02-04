import '@/styles/globals.css'
import GlobalProvider from '@/providers/global-provider'
import localFont from 'next/font/local'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Toaster } from '@/components/ui/toaster'
import type { Metadata } from 'next'

// 개발 환경에서만 MSW 서버를 시작합니다. 프로덕션 빌드에서는 실행되지 않습니다.
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  const initMocks = async () => {
    const { server } = await import('@/mocks/node')
    server.listen()
  }

  initMocks().catch(console.error)
}

export const metadata: Metadata = {
  title: {
    template: '%s | 어푸!',
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
      <body className={`${pretendard.variable} font-pretendard antialiased`}>
        <GoogleAnalytics gaId={GA_ID} />
        <GlobalProvider>{children}</GlobalProvider>
        <Toaster />
      </body>
    </html>
  )
}
