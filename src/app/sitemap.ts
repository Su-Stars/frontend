import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://apuu.netlify.app/'

  // 정적 페이지 목록
  const staticPages = [
    '', // home
    '/diary',
    '/bulletin',
    '/login',
    '/register',
    '/my-page',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // pools 페이지 1~1000까지 생성
  const poolPages = Array.from({ length: 2000 }, (_, i) => i + 1).map((id) => ({
    url: `${baseUrl}/pools/${id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }))

  // 모든 페이지 합치기
  return [...staticPages, ...poolPages]
}
