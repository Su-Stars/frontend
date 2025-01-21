import { Pool } from '@/hooks/useSearch'
import Link from 'next/link'
import { FaBookmark, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import { FaPersonSwimming } from 'react-icons/fa6'
import { LuBookmark, LuLink } from 'react-icons/lu'
import { Button } from '../ui/button'
import Image from 'next/image'

interface PoolDetailProps {
  pool: Pool
}

export default function PoolDetail({ pool }: PoolDetailProps) {
  return (
    <section className="flex flex-col gap-2">
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
          <Link href={`${pool?.website}`} className="text-blue-500 underline">
            {pool?.website}
          </Link>
        </div>
      </div>
    </section>
  )
}
