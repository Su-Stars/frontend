import Link from 'next/link'
import {
  FaBookmark,
  FaChevronLeft,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from 'react-icons/fa'
import { IoIosCheckboxOutline } from 'react-icons/io'
import { FaPersonSwimming } from 'react-icons/fa6'
import { LuLink } from 'react-icons/lu'
import { Button } from '../ui/button'
import Image from 'next/image'
import NoImage from '../common/no-image'
import PoolUpdate from './pool-update'
import PoolDetailItem from './pool-detail-item'
import PoolBookmark from './pool-bookmark'
import type { Pool } from '@/types/pool'

interface PoolDetailProps {
  pool: Pool
}

export default function PoolDetail({ pool }: PoolDetailProps) {
  const generatePoolAdditionalInfo = (pool: Pool): string | React.ReactNode => {
    const infoItems = [
      {
        condition: pool.isFinsAllowed,
        trueText: '오리발 가능',
        falseText: '오리발 불가능',
      },
      {
        condition: pool.isKickboardAllowed,
        trueText: '킥판 사용 가능',
        falseText: '킥판 사용 불가능',
      },
      {
        condition: pool.isPhotoAllowed,
        trueText: '사진 촬영 가능',
        falseText: '사진 촬영 불가능',
      },
      {
        condition: pool.isSoapProvided,
        trueText: '비누 제공',
        falseText: '비누 제공 안 함',
      },
    ]

    const filteredItems = infoItems
      .filter((item) => item.condition !== null)
      .map((item) => (item.condition ? item.trueText : item.falseText))

    return filteredItems.length > 0 ? (
      filteredItems.join(', ')
    ) : (
      <PoolUpdate triggerTitle="정보 등록하기" poolId={pool.id} />
    )
  }

  return (
    <section className="flex flex-col gap-2">
      <header className="flex w-full items-center gap-1">
        <Button variant="ghost" size="icon" className="rounded-full" asChild>
          <Link href="/">
            <FaChevronLeft />
          </Link>
        </Button>
        <h2>{pool?.name}</h2>
      </header>
      <div className="relative h-[200px] w-full">
        {/* TODO : 이미지가 여러개 인경우 슬라이드로 보여주기 */}
        {pool?.images[0] ? (
          <Image
            src={pool.images[0]}
            fill
            className="rounded-lg object-fill"
            alt={`#{pool.name} 수영장 이미지`}
          />
        ) : (
          <NoImage className="h-[200px] w-full" />
        )}
      </div>
      <div className="flex flex-col gap-2 *:flex *:items-center *:gap-4">
        <div className="justify-between">
          <h2> {pool?.name}</h2>
          <PoolBookmark poolId={pool.id} />
        </div>

        <PoolDetailItem
          triggerTitle="주소 정보 등록하기"
          poolId={pool.id}
          icon={FaMapMarkerAlt}
        >
          {pool?.address || ''}
        </PoolDetailItem>

        <div className="justify-between">
          <PoolDetailItem
            triggerTitle="전화번호 등록하기"
            poolId={pool.id}
            icon={FaPhoneAlt}
          >
            {pool?.phone || ''}
          </PoolDetailItem>

          <PoolUpdate triggerTitle="정보 수정 요청하기" poolId={pool.id} />
        </div>

        <PoolDetailItem
          triggerTitle="레인 정보 등록하기"
          poolId={pool.id}
          icon={FaPersonSwimming}
        >
          {pool?.laneInfo || ''}
        </PoolDetailItem>

        <PoolDetailItem
          triggerTitle="링크 정보 등록하기"
          poolId={pool.id}
          icon={LuLink}
        >
          {pool?.website ? (
            <Link
              href={`${pool?.website}`}
              className="text-blue-500 underline"
              target="_blank"
            >
              {pool.website}
            </Link>
          ) : (
            ''
          )}
        </PoolDetailItem>

        <PoolDetailItem
          triggerTitle="기타 정보 등록하기"
          icon={IoIosCheckboxOutline}
          poolId={pool.id}
        >
          {generatePoolAdditionalInfo(pool)}
        </PoolDetailItem>
      </div>
    </section>
  )
}
