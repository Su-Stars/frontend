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
import { REGION } from '@/lib/constants'
import { useRegions } from '@/hooks/useRegions'
import { useSearchStore } from '@/stores/search-store'

export default function HomeRegionFilter() {
  const {
    selectedRegion,
    setRegion,
    setKeyword,
    setSelectedRegion,
    filterName,
    setFilterName,
  } = useSearchStore()

  const { districts } = useRegions({
    regionName: selectedRegion?.name || '',
  })

  const parseDistrict = (name: string) => {
    return name.split(' ').length === 2
      ? name.split(' ')[1]
      : name.split(' ')[1] + ' ' + name.split(' ')[2]
  }
  const clickAllRegion = () => {
    setKeyword('all')
    setFilterName('전국')
    setRegion('all')
    setSelectedRegion(null)
  }

  const clickAllDistrict = (region: string) => {
    setFilterName(`${region} 전체`)
    setKeyword('all')
    setRegion(region)
    setSelectedRegion(null)
  }

  const clickDistrict = (district: string) => {
    setKeyword('all')
    const DISTRICT = parseDistrict(district)
    const query = `${selectedRegion?.name} ${DISTRICT}`
    setFilterName(query)
    setRegion(query)
    setSelectedRegion(null)
  }

  const clickBack = () => {
    setSelectedRegion(null)
  }

  return (
    //TODO : 스크롤바 유무로 인한 레이아웃 변경 이슈 해결 필요
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit text-lg font-semibold" variant="secondary">
          <LuMapPin className="stroke-4" />
          {filterName}
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
