import KaKaoMap from '../home/KaKaoMap'
import { ChevronDown, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '../ui/button'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">인근 수영장</h2>
      <KaKaoMap />

      <Dialog>
        <DialogTrigger asChild className="w-fit bg-gray-500">
          <Button>
            <MapPin />
            서울
            <ChevronDown />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>지역으로 검색</DialogTitle>
            <DialogDescription>지역으로 검색</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Input placeholder="명칭으로 검색하기" />
      <h2 className="text-2xl font-bold">
        검색 결과 <span className="text-theme">8 </span>개
      </h2>
    </div>
  )
}
