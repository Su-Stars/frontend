import Link from 'next/link'
import {
  LuMapPin,
  LuChevronLeft,
  LuPhone,
  LuShare2,
  LuNotebook,
  LuCopy,
} from 'react-icons/lu'
import { Button } from '../ui/button'
import Image from 'next/image'
import NoImage from '@/components/common/no-image'
import PoolBookmark from '@/components/pool/pool-bookmark'
import type { PoolDetail as PoolDetailI } from '@/types/pools'
import { useToast } from '@/hooks/use-toast'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { formatPhoneNumber } from '@/lib/formats'
import { LuShowerHead, LuCamera } from 'react-icons/lu'
import { cn } from '@/lib/utils'
import { GiDuckPalm } from 'react-icons/gi'
import { PiTowel } from 'react-icons/pi'
import { FaRegCaretSquareUp } from 'react-icons/fa'
import { GiDropletSplash } from 'react-icons/gi'

interface PoolDetailProps {
  pool: PoolDetailI
}

const facilityItems = [
  {
    key: 'isSoapProvided',
    icon: LuShowerHead,
    label: '샤워용품 제공',
  },
  {
    key: 'isTowelProvided',
    icon: PiTowel,
    label: '수건 제공',
  },
  {
    key: 'isKickboardAllowed',
    icon: FaRegCaretSquareUp,
    label: '킥보드 사용 가능',
  },
  {
    key: 'isFinsAllowed',
    icon: GiDuckPalm,
    label: '오리발 사용 가능',
  },
  {
    key: 'isKickboardRental',
    icon: FaRegCaretSquareUp,
    label: '킥보드 대여',
  },
  {
    key: 'isDivingAllowed',
    icon: GiDropletSplash,
    label: '다이빙 가능',
  },
  {
    key: 'isPhotoAllowed',
    icon: LuCamera,
    label: '사진촬영 가능',
  },
]

export default function PoolDetail({ pool }: PoolDetailProps) {
  const { toast } = useToast()

  const copyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: `${label} 복사됨`,
        description: text,
      })
    } catch (err) {
      toast({
        title: `${label} 복사 실패`,
        description: `${label}를 복사하는데 실패했습니다.`,
        variant: 'destructive',
      })
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: pool.name,
      text: `${pool.name} - ${pool.address}`,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await copyText(window.location.href, 'URL')
      }
    } catch (error) {
      // 사용자가 공유를 취소한 경우 토스트 메세지를 띄우지 않습니다.
      if (error instanceof Error && error.name !== 'AbortError') {
        toast({
          title: '공유하기 실패',
          description: '공유하기가 지원되지 않는 환경입니다.',
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <section className="flex flex-col gap-2">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-10 items-center gap-2 bg-background">
        <Button variant="outline" size="icon" className="rounded-full" asChild>
          <Link href="/" aria-label="메인 페이지로 이동">
            <LuChevronLeft className="h-6 w-6" aria-hidden="true" />
            <span className="sr-only">메인 페이지로 이동</span>
          </Link>
        </Button>
        {/* <h2>{pool?.name}</h2> */}
      </header>

      {/* 메인 */}
      <main className="flex flex-col space-y-4">
        {/* 이미지 */}
        <div className="relative h-[200px] w-full">
          {pool?.images?.length > 0 ? (
            <Carousel>
              <CarouselContent>
                {pool.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-[200px] w-full">
                      <Image
                        src={image}
                        fill
                        className="rounded-lg object-cover"
                        alt={`${pool.name} 수영장 이미지 ${index + 1}`}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          ) : (
            <NoImage className="h-[200px] w-full" />
          )}
        </div>
        {/* Business Info */}
        <div>
          {/* 타이틀과 북마크 버튼 */}
          <div className="flex items-start justify-between">
            <h2>{pool?.name}</h2>
            <PoolBookmark poolId={pool.id} />
          </div>

          {/* Address & Phone & Description */}
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <LuMapPin className="h-4 w-4 text-primary" />
              <span>{pool.address}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4"
                role="button"
                aria-label="주소 복사"
                onClick={() => copyText(pool.address, '주소')}
              >
                <LuCopy className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <LuPhone className="h-4 w-4 text-primary" />
              {pool.phone ? (
                <>
                  <a
                    href={`tel:${formatPhoneNumber(pool.phone)}`}
                    className="hover:text-primary hover:underline"
                  >
                    {pool.phone}
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4"
                    role="button"
                    aria-label="전화번호 복사"
                    onClick={() => copyText(pool.phone, '전화번호')}
                  >
                    <LuCopy className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <span className="text-muted-foreground">전화번호 없음</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <LuNotebook className="h-4 w-4 text-primary" />
              <div className="flex flex-col gap-1 text-sm">
                {pool.laneInfo || pool.depthInfo || pool.description ? (
                  <>
                    {pool.laneInfo && <span>{pool.laneInfo}</span>}
                    {pool.depthInfo && <span>{pool.depthInfo}</span>}
                    {pool.description && <span>{pool.description}</span>}
                  </>
                ) : (
                  <span>수영장 상세 정보가 없습니다</span>
                )}
              </div>
            </div>
          </div>
          {/* Addditional Info */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {facilityItems.map(({ key, icon: Icon, label }) => {
              const value = pool[key as keyof typeof pool]
              if (value === null || false) return null

              return (
                <div
                  key={key}
                  className={cn(
                    'flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1',
                    value ? 'text-primary' : 'text-muted-foreground',
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs">{label}</span>
                </div>
              )
            })}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex gap-2">
            {/* TODO : 수영장 정보 등록 요청 기능 추가 */}
            <Button
              variant="outline"
              size="lg"
              className="flex-1"
              onClick={() => {
                toast({
                  title: '준비 중인 기능입니다',
                  description: '수영장 정보 등록 기능은 곧 지원될 예정입니다.',
                })
              }}
            >
              수영장 정보 등록하기
            </Button>
            {/* 사이트 방문하기 */}
            {pool.website ? (
              <Link
                href={pool.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="flex-1">
                  사이트 방문 하기
                </Button>
              </Link>
            ) : (
              <Button variant="outline" size="lg" className="flex-1" disabled>
                사이트 정보 없음
              </Button>
            )}
            {/* 공유하기 */}
            <Button
              variant="outline"
              size="lg"
              onClick={handleShare}
              role="button"
              aria-label="공유하기"
            >
              <LuShare2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </section>
  )
}
