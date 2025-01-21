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
import { DistrictResponse } from '@/hooks/useRegions'

interface RegionFilterProps {
  address: string
  selectedRegion: Region | null
  setSelectedRegion: (region: Region) => void
  clickBack: () => void
  clickAllDistrict: (name: string) => void
  clickDistrict: (fullAddr: string) => void
  clickAllRegion: () => void
  parseDistrict: (fullAddr: string) => string
  districts: DistrictResponse
  isRegionLoading: boolean
}

export default function RegionFilter({
  address,
  selectedRegion,
  setSelectedRegion,
  clickBack,
  clickAllDistrict,
  clickDistrict,
  clickAllRegion,
  parseDistrict,
  districts,
  isRegionLoading,
}: RegionFilterProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div>
          <Button className="w-fit">
            <LuMapPin />
            {address}
            <LuChevronDown />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="h-96 w-96 overflow-y-auto rounded-2xl md:h-[30rem] md:w-[30rem]">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle>지역으로 검색</DialogTitle>
          <h3 className="font-semibold text-theme">
            {selectedRegion?.name ? (
              <span className="flex items-center gap-4">
                <Button
                  className="bg-white text-black hover:text-white"
                  size="icon"
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
                {districts?.result.map((district) => (
                  <DialogClose asChild key={district.cd}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-1/2 text-black"
                      onClick={() => clickDistrict(district.full_addr)}
                    >
                      <span className="text-md font-semibold">
                        {parseDistrict(district.full_addr)}
                      </span>
                    </Button>
                  </DialogClose>
                ))}
              </>
            ) : (
              REGION.map((region) =>
                region.name === '전국' ? (
                  <DialogClose asChild key={region.code}>
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
                    key={region.code}
                  >
                    <span className="text-md font-semibold">{region.name}</span>
                  </Button>
                ),
              )
            )}
            {/* 지역 로딩 상태 중 스켈레톤 표시*/}
            {isRegionLoading && (
              <>
                <span className="h-10 w-1/2 animate-pulse rounded-md border border-input shadow-sm" />
                <span className="h-10 w-1/2 animate-pulse rounded-md border border-input shadow-sm" />
                <span className="h-10 w-1/2 animate-pulse rounded-md border border-input shadow-sm" />
                <span className="h-10 w-1/2 animate-pulse rounded-md border border-input shadow-sm" />
                <span className="h-10 w-1/2 animate-pulse rounded-md border border-input shadow-sm" />
                <span className="h-10 w-1/2 animate-pulse rounded-md border border-input shadow-sm" />
                <span className="h-10 w-1/2 animate-pulse rounded-md border border-input shadow-sm" />
                <span className="h-10 w-1/2 animate-pulse rounded-md border border-input shadow-sm" />
                <span className="h-10 w-1/2 animate-pulse rounded-md border border-input shadow-sm" />
                <span className="h-10 w-1/2 animate-pulse rounded-md border border-input shadow-sm" />
              </>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
