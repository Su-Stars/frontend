'use client'

import { useRegions } from '@/hooks/useRegions'
import { Pool, useSearch } from '@/hooks/useSearch'
import { REGION, Region } from '@/lib/constants'
import { useState } from 'react'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import {
  LuMapPin,
  LuChevronDown,
  LuChevronLeft,
  LuLoader,
} from 'react-icons/lu'
import { Input } from '../ui/input'
import Link from 'next/link'

export default function HomeSearch() {
  const [address, setAddress] = useState('전국')
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [finalRegion, setFinalRegion] = useState<string>('all')
  const [value, setValue] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('all')

  const { districts, isLoading } = useRegions({
    code: selectedRegion?.code || '',
  })

  const {
    searchResults,
    isLoading: isSearchLoading,
    isError,
  } = useSearch({
    region: finalRegion,
    keyword,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value === '') {
      return
    }
    if (value !== keyword) {
      setKeyword(value) // 최종 keyword 변경
    }
    setValue('')
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setValue(e.target.value)
  }

  const clickDistrict = (district: string) => {
    const DISTRICT =
      district.split(' ').length === 2
        ? district.split(' ')[1]
        : district.split(' ')[1] + ' ' + district.split(' ')[2]

    setAddress(`${selectedRegion?.name} ${DISTRICT}`)
    setFinalRegion(`${selectedRegion?.name} ${DISTRICT}`)
    setSelectedRegion(null)
  }

  return (
    <>
      {/*지역구 선택 */}
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
            <DialogDescription className="grid h-[370px] grid-cols-2 gap-0 overflow-y-auto">
              {selectedRegion ? (
                <>
                  <DialogClose asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-black"
                      onClick={() => {
                        setAddress(`${selectedRegion.name} 전체`)
                        setFinalRegion(selectedRegion.name)
                        setSelectedRegion(null)
                      }}
                    >
                      <span className="text-md font-semibold">전체</span>
                    </Button>
                  </DialogClose>
                  {districts?.result.map((district) => (
                    <DialogClose asChild key={district.cd}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full text-black"
                        onClick={() => clickDistrict(district.full_addr)}
                      >
                        <span className="text-md font-semibold">
                          {district.full_addr.split(' ').length === 2
                            ? district.full_addr.split(' ')[1]
                            : district.full_addr.split(' ')[1] +
                              ' ' +
                              district.full_addr.split(' ')[2]}
                        </span>
                      </Button>
                    </DialogClose>
                  ))}
                </>
              ) : (
                REGION.map((item) =>
                  item.name === '전국' ? (
                    <DialogClose asChild key={item.code}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-black"
                        onClick={() => {
                          setAddress('전국')
                          setSelectedRegion(null)
                          setFinalRegion('all')
                        }}
                      >
                        <span className="text-md font-semibold">
                          {item.name}
                        </span>
                      </Button>
                    </DialogClose>
                  ) : (
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-black"
                      onClick={() => setSelectedRegion(item)}
                      key={item.code}
                    >
                      <span className="text-md font-semibold">{item.name}</span>
                    </Button>
                  ),
                )
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/*검색어 입력 */}
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          placeholder="검색어를 입력하세요"
          className="flex-1"
          value={value}
          onChange={onChange}
        />
        <Button type="submit">검색</Button>
      </form>

      {/*결과 출력*/}
      <h2 className="text-2xl font-bold">
        검색 결과{' '}
        <span className="text-theme">
          {searchResults?.total ? searchResults.total : 0}{' '}
        </span>
        개
      </h2>
      {isError ? (
        <LuLoader />
      ) : searchResults?.total === 0 ? (
        <h1>검색 결과가 없습니다</h1>
      ) : (
        searchResults?.pools.map((pool: Pool) => (
          <div key={pool.id}>
            <Link className="flex" href={`/pool/${pool.id}`}>
              <div className="size-10 bg-gray-400" />
              <div>
                <span>{pool.name}</span>
                <span>{pool.address}</span>
              </div>
            </Link>
          </div>
        ))
      )}
    </>
  )
}
