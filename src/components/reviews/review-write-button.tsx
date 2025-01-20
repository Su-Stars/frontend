import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { LuPencil } from 'react-icons/lu'
import ReviewForm from '@/components/reviews/reivew-form'

interface ReviewWriteButtonProps {
  poolId: string
  createReview: (poolId: string) => void
}

export default function ReviewWriteButton({
  poolId,
  createReview,
}: ReviewWriteButtonProps) {
  return (
    <>
      {/* 데스크탑 환경에서 다이얼로그를 사용 */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="hidden md:flex">
            <LuPencil />
            리뷰 작성하기
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>수영장 리뷰를 남겨주세요.</DialogTitle>
            <DialogDescription>
              여러분의 소중한 리뷰는 다른 사용자들에게 큰 도움이 됩니다.
            </DialogDescription>
          </DialogHeader>
          <ReviewForm poolId={poolId} onSubmit={createReview} />
        </DialogContent>
      </Dialog>
      {/* 모바일 환경에서 드로워를 사용 */}
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="md:hidden">
            <LuPencil />
            리뷰 작성하기
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>수영장 리뷰를 남겨주세요</DrawerTitle>
            <DrawerDescription>
              여러분의 소중한 리뷰는 다른 사용자들에게 큰 도움이 됩니다.
            </DrawerDescription>
          </DrawerHeader>
          <ReviewForm poolId={poolId} onSubmit={createReview} />
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">취소하기</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
