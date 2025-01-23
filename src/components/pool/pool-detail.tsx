import Link from 'next/link'
import {
  FaBookmark,
  FaChevronLeft,
  FaMapMarkerAlt,
  FaPhone,
} from 'react-icons/fa'
import { FaPersonSwimming } from 'react-icons/fa6'
import { LuBookmark, LuLink } from 'react-icons/lu'

import { Button } from '../ui/button'
import Image from 'next/image'
import NoImage from '../common/no-image'
import { Pool } from '@/hooks/useSearch'
import PoolUpdate from './pool-update'

interface PoolDetailProps {
  pool: Pool
}

export default function PoolDetail({ pool }: PoolDetailProps) {
  const clickBookmark = () => {
    if (pool?.isBookMarked) {
      // 북마크 추가
    } else {
      // 북마크 취소
    }
  }

  return (
    <section className="flex flex-col gap-2">
      <header className="flex w-full items-center gap-4 border-b-slate-200 bg-white">
        <Button
          size="icon"
          className="bg-transparent text-black hover:bg-gray-400"
          asChild
        >
          <Link href="/">
            <FaChevronLeft />
          </Link>
        </Button>
        <h2 className="text-2xl font-bold">{pool?.name}</h2>
      </header>
      <div className="relative h-[200px] w-full">
        {pool?.images ? (
          <Image
            src={pool.images[0]}
            fill
            className="object-fill"
            alt="수영장 이미지"
          />
        ) : (
          <NoImage />
        )}
      </div>
      <div className="flex flex-col gap-2 *:flex *:items-center *:gap-4">
        <div className="justify-between text-xl font-semibold text-black">
          {pool?.name}

          {/*북마크 기능 추가해야함 */}
          <Button
            onClick={clickBookmark}
            size="icon"
            className="bg-transparent text-black hover:bg-gray-400"
          >
            {pool?.isBookMarked ? <FaBookmark /> : <LuBookmark />}
          </Button>
        </div>
        <div>
          <FaMapMarkerAlt />
          <dd>{pool?.address}</dd>
        </div>
        <div className="justify-between">
          <div className="flex items-center gap-4">
            <FaPhone />
            <dd>{pool?.phone}</dd>
          </div>
          <div>
            <PoolUpdate triggerTitle="정보 수정 요청하기" poolId={pool.id} />
          </div>
        </div>
        <div>
          <FaPersonSwimming />
          <dd>
            {pool?.laneInfo ? (
              pool!.laneInfo
            ) : (
              <PoolUpdate
                triggerTitle="레인 정보 수정 등록하기"
                poolId={pool.id}
              />
            )}
          </dd>
        </div>
        <div>
          <LuLink />
          <Link
            href={`${pool?.website}`}
            className="text-blue-500 underline"
            target="_blank"
          >
            {pool?.website}
          </Link>
        </div>
      </div>
    </section>
  )
}
