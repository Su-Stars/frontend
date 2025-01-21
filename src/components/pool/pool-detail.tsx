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
import { usePool } from '@/hooks/usePool'

interface PoolDetailProps {
  poolId: string
}

export default function PoolDetail({ poolId }: PoolDetailProps) {
  const { pool, isLoading } = usePool({ poolId })

  if (isLoading) {
    ;<section className="flex flex-col gap-2">
      <header className="flex w-full items-center gap-4 border-b-slate-200 bg-white">
        <Button
          size="icon"
          variant="link"
          className="bg-transparent bg-white text-black shadow-none hover:bg-gray-400"
          asChild
        >
          <Link href="/" className="hover:bg-gray-400">
            <LuChevronLeft />
          </Link>
        </Button>
        <span className="h-10 w-1/2 animate-pulse rounded-md border border-input shadow-sm" />
      </header>
      <figure>
        <div className="flex h-14 w-full items-center bg-gray-400 text-center font-semibold"></div>
      </figure>
      <div className="flex flex-col gap-2 *:flex *:items-center *:gap-4">
        <div className="justify-between text-xl font-semibold text-black">
          <span className="h-10 w-1/2 animate-pulse rounded-md border border-input shadow-sm" />
        </div>
        <div>
          <span className="h-10 w-1/2 animate-pulse rounded-md border border-input shadow-sm" />
        </div>
        <div className="justify-between">
          <div className="flex items-center gap-4">
            <span className="h-10 w-1/2 animate-pulse rounded-md border border-input shadow-sm" />
          </div>
          <div>
            {/*정보 수정 페이지 제작 필요 */}
            <Link
              href=""
              className="flex items-center text-center text-sm text-gray-400 underline"
            >
              정보 수정 요청하기
            </Link>
          </div>
        </div>
        <div>
          <span className="h-10 w-1/2 animate-pulse rounded-md border border-input shadow-sm" />
        </div>
        <div>
          <span className="h-10 w-1/2 animate-pulse rounded-md border border-input shadow-sm" />
        </div>
      </div>
    </section>
  }

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
      <figure>
        {pool?.images ? (
          <Image
            src={pool.images[0]}
            width={100}
            height={100}
            className="w-full object-cover"
            alt="수영장 이미지"
          />
        ) : (
          <div className="flex h-14 w-full items-center bg-gray-400 text-center font-semibold">
            이미지가 없습니다
          </div>
        )}
      </figure>
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
            {/*정보 수정 페이지 제작 필요 */}
            <Link
              href=""
              className="flex items-center text-center text-sm text-gray-400 underline"
            >
              정보 수정 요청하기
            </Link>
          </div>
        </div>
        <div>
          <FaPersonSwimming />
          <dd> {pool?.laneInfo}</dd>
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
