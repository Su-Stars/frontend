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
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { LuPencil } from 'react-icons/lu'
import ReviewForm from '@/components/reviews/reivew-form'

interface ReviewUpdateButtonProps {
  poolId: string
  updateReview: (poolId: string, reviewId: string) => void
  defaultValues?: {
    keywords: string[]
    content: string
  }
}

export default function ReviewUpdateButton({
  poolId,
  updateReview,
  defaultValues,
}: ReviewUpdateButtonProps) {
  return (
    <>
      {/* 데스크탑 환경에서 다이얼로그를 사용 */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="hidden md:flex">
            <LuPencil />
            리뷰 수정하기
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>수영장 리뷰를 남겨주세요.</DialogTitle>
            <DialogDescription>
              여러분의 소중한 리뷰는 다른 사용자들에게 큰 도움이 됩니다.
            </DialogDescription>
          </DialogHeader>
          <ReviewForm
            poolId={poolId}
            onSubmit={updateReview}
            defaultValues={defaultValues}
          />
        </DialogContent>
      </Dialog>
      {/* 모바일 환경에서 드로워를 사용 */}
      <Drawer>
        <DrawerTrigger asChild>
          <Button className="md:hidden">
            <LuPencil />
            리뷰 수정하기
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>수영장 리뷰를 남겨주세요</DrawerTitle>
            <DrawerDescription>
              여러분의 소중한 리뷰는 다른 사용자들에게 큰 도움이 됩니다.
            </DrawerDescription>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerHeader>
          <ReviewForm
            poolId={poolId}
            onSubmit={updateReview}
            defaultValues={defaultValues}
          />
        </DrawerContent>
      </Drawer>
    </>
  )
}
