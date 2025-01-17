'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'

import { useForm } from 'react-hook-form'

import KaKaoMap from '../home/KaKaoMap'
import { Button } from '../ui/button'
import {
  LuMapPin,
  LuChevronDown,
  LuChevronLeft,
  LuLoader,
} from 'react-icons/lu'
import { Input } from '@/components/ui/input'
import useCenterStore from '@/stores/center-store'
import { REGION, Region } from '@/lib/constants'
import { useState } from 'react'
import { useRegions } from '@/hooks/useRegions'
import { useSearch } from '@/hooks/useSearch'

interface SearchFormValues {
  keyword: string
}

export default function HomePage() {
  const { address, setAddress } = useCenterStore()
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('')

  const { districts, isLoading } = useRegions({
    code: selectedRegion?.code || '',
  })

  const { register, handleSubmit } = useForm<SearchFormValues>()

  const onSubmit = (data: SearchFormValues) => {
    setKeyword(data.keyword)
  }

  const { searchResults, isLoading: isSearchLoading } = useSearch({
    region: selectedDistrict,
    keyword,
  })

  const clickDistrict = (district: string) => {
    setSelectedDistrict(district)
    setAddress(district)
  }

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">인근 수영장</h2>
      <KaKaoMap />

      <form onSubmit={handleSubmit(onSubmit)} className="flex space-x-2">
        <Input
          {...register('keyword')}
          placeholder="검색어를 입력하세요"
          className="flex-1"
        />
        <Button type="submit">검색</Button>
      </form>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-fit">
            <LuMapPin />
            {address}
            <LuChevronDown />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="flex flex-col gap-2">
            <DialogTitle>지역으로 검색</DialogTitle>
            <h3 className="font-semibold text-theme">
              {selectedRegion?.name ? (
                <span className="flex items-center gap-4">
                  <Button
                    className="bg-white text-black hover:text-white"
                    size="icon"
                    onClick={() => setSelectedRegion(null)}
                  >
                    <LuChevronLeft />
                  </Button>
                  {selectedRegion.name}
                </span>
              ) : (
                '지역을 선택해주세요'
              )}
            </h3>
            <DialogDescription className="grid grid-cols-2">
              {selectedRegion
                ? districts?.result.map((district) => (
                    <Button
                      key={district.cd}
                      size="lg"
                      variant="outline"
                      className="w-full text-black"
                      onClick={() => clickDistrict(district.full_addr)}
                    >
                      <DialogClose className="w-full">
                        <span className="text-md font-semibold">
                          {district.full_addr}
                        </span>
                      </DialogClose>
                    </Button>
                  ))
                : REGION.map((item) =>
                    item.name === '전국' ? (
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-black"
                        onClick={() => setSelectedRegion(item)}
                        key={item.code}
                      >
                        <DialogClose className="w-full">
                          <span className="text-md font-semibold">
                            {item.name}
                          </span>
                        </DialogClose>
                      </Button>
                    ) : (
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-black"
                        onClick={() => setSelectedRegion(item)}
                        key={item.code}
                      >
                        <span className="text-md font-semibold">
                          {item.name}
                        </span>
                      </Button>
                    ),
                  )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <h2 className="text-2xl font-bold">
        검색 결과 <span className="text-theme">8 </span>개
      </h2>
      {isSearchLoading ? (
        <LuLoader />
      ) : (
        searchResults?.data.pools.map((pool) => <div>수영장</div>)
      )}
    </div>
  )
}
