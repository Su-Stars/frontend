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
    <Link href={`/pools/${bookmark.pool.id}`} key={bookmark.id}>
      <Card className="mt-4 min-w-[300px] p-0 transition hover:opacity-90">
        <CardHeader className="relative h-[200px] p-0">
          {bookmark.pool.img_url ? (
            <Image
              src={bookmark.pool.img_url}
              alt={bookmark.pool.name}
              fill
              className="rounded-t-lg object-cover"
              sizes="(max-width: 300px) 100vw, 300px"
            />
          ) : (
            <NoImage className="h-full w-full rounded-t-lg text-sm" />
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
