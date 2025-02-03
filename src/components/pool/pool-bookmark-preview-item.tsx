import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { BookmarkI } from '@/hooks/use-my-bookmarks'
import NoImage from '@/components/common/no-image'

interface PoolBookmarkPreviewItemProps {
  bookmark: BookmarkI
}

export default function PoolBookmarkPreviewItem({
  bookmark,
}: PoolBookmarkPreviewItemProps) {
  return (
    <Link
      href={`/pools/${bookmark.pool.id}`}
      key={bookmark.id}
      role="listitem"
      aria-lable="북마크 수영장"
    >
      <Card className="mt-4 min-w-[150px] p-0 transition hover:opacity-90 lg:min-w-[300px]">
        <CardHeader className="relative h-[200px] p-0">
          {bookmark.pool.img_url ? (
            <div className="relative aspect-square h-full overflow-hidden rounded-l-lg">
              <Image
                src={bookmark.pool.img_url}
                alt={`${bookmark.pool.name} 수영장 이미지`}
                width={160}
                height={160}
                sizes="(max-width: 768px) 128px, 160px"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                priority={false}
              />
            </div>
          ) : (
            <NoImage className="aspect-square h-full rounded-l-lg text-sm" />
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-2 p-4">
          <CardTitle>{bookmark.pool.name}</CardTitle>
          <CardDescription>
            {bookmark.pool.address.split(' ').slice(0, 2).join(' ')}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}
