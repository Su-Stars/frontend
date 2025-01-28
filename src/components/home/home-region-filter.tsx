import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { LuMapPin, LuChevronDown, LuChevronLeft } from 'react-icons/lu'
import { REGION, Region } from '@/lib/constants'
import { District } from '@/hooks/useRegions'

interface RegionFilterProps {
  address: string
  selectedRegion: Region | null
  setSelectedRegion: (region: Region) => void
  clickBack: () => void
  clickAllDistrict: (name: string) => void
  clickDistrict: (fullAddr: string) => void
  clickAllRegion: () => void
  parseDistrict: (fullAddr: string) => string
  districts: District[]
}

export default function RegionFilter({
  address,
  selectedRegion,
  setSelectedRegion,
  clickBack,
  clickAllDistrict,
  clickDistrict,
  clickAllRegion,
  districts,
}: RegionFilterProps) {
  return (
    //TODO : 스크롤바 유무로 인한 레이아웃 변경 이슈 해결 필요
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit text-lg font-semibold" variant="secondary">
          <LuMapPin className="stroke-4" />
          {address}
          <LuChevronDown className="stroke-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-96 w-96 overflow-y-auto rounded-2xl md:h-[30rem] md:w-[30rem]">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle className="flex">
            <LuMapPin className="mr-1 text-primary" />
            지역 설정
          </DialogTitle>
          <h3 className="text-primary">
            {selectedRegion?.name ? (
              <span className="flex items-center gap-4">
                <Button
                  className="h-5 w-5 rounded-full bg-white text-black hover:text-white"
                  variant="outline"
                  onClick={clickBack}
                >
                  <LuChevronLeft />
                </Button>
                {selectedRegion.name}
              </span>
            ) : (
              '지역을 선택해주세요'
            )}
          </h3>
          <DialogDescription className="flex flex-wrap">
            {selectedRegion ? (
              <>
                <DialogClose asChild>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-1/2 text-black"
                    onClick={() => clickAllDistrict(selectedRegion.name)}
                  >
                    <span className="text-md font-semibold">전체</span>
                  </Button>
                </DialogClose>
                {districts?.map((district) => (
                  <DialogClose asChild key={district.cd}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-1/2 text-black"
                      onClick={() => clickDistrict(district.full_addr)}
                    >
                      <span className="text-md font-semibold">
                        {district.addr_name}
                      </span>
                    </Button>
                  </DialogClose>
                ))}
              </>
            ) : (
              REGION.map((region) =>
                region.name === '전국' ? (
                  <DialogClose asChild key={region.name}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-1/2 text-black"
                      onClick={clickAllRegion}
                    >
                      <span className="text-md font-semibold">
                        {region.name}
                      </span>
                    </Button>
                  </DialogClose>
                ) : (
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-1/2 text-black"
                    onClick={() => setSelectedRegion(region)}
                    key={region.name}
                  >
                    <span className="text-md font-semibold">{region.name}</span>
                  </Button>
                ),
              )
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
