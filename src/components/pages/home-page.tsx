import KaKaoMap from '../home/KaKaoMap'
import { Button } from '@/components/ui/button'
import { ChevronDown, MapPin } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">인근 수영장</h2>
      <KaKaoMap />
      <Button className="w-fit bg-gray-500">
        <MapPin />
        서울
        <ChevronDown />
      </Button>
      <Input placeholder="명칭으로 검색하기" />
      <h2 className="text-2xl font-bold">
        검색 결과 <span className="text-theme">8 </span>개
      </h2>
    </div>
  )
}
