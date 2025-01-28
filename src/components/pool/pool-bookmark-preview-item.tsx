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

interface PoolBookmarkPreviewItemProps {
  bookmark: BookmarkI
}

export default function PoolBookmarkPreviewItem({
  bookmark,
}: PoolBookmarkPreviewItemProps) {
  return (
    <Link href={`/pools/${bookmark.pool.id}`} key={bookmark.id}>
      <Card className="mt-4 min-w-[300px] p-0 transition hover:opacity-90">
        <CardHeader className="p-0">
          <Image
            src={bookmark.pool.img_url || 'https://picsum.photos/600/400'}
            alt={bookmark.pool.name}
            width={300}
            height={200}
            className="rounded-t-lg"
          />
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
