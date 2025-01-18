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
import Image from 'next/image'

export default function HomeSearch() {
  const [address, setAddress] = useState('전국')
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [finalRegion, setFinalRegion] = useState<string>('all')
  const [value, setValue] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('all')

  const { districts, isLoading: isRegionLoading } = useRegions({
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

  // 검색 기능 수행
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // 입력 없이 검색 버튼만 누른 경우
    // 키워드는 'all'로 초기화
    // 지역구에 대해서만 검색
    if (value === '') {
      setKeyword('all')
    }

    // 입력 값이 있으면 keyword 변경 후
    // 지역구 + 키워드로 검색 실행
    if (value !== keyword) {
      setKeyword(value) // 최종 keyword 변경
    }

    // 인풋 박스의 값은 초기화
    setValue('')
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setValue(e.target.value)
  }

  // 전국 클릭 시
  const clickAllRegion = () => {
    setKeyword('all') // 키워드 초기화
    setAddress('전국') // address 전국으로 표시
    setFinalRegion('all') // 전국 으로 검색 요청
    setSelectedRegion(null) // 필터의 검색 지역 초기화
  }

  // 지역구의 전체 버튼 클릭 시
  // ex) 경기도 전체에 대해 검색을 실행
  const clickAllDistrict = (region: string) => {
    setAddress(`${region} 전체`) // 해당 지역으로 표시
    setKeyword('all') // 키워드 초기화
    setFinalRegion(region) // 해당 지역 전체로 검색 요청
    setSelectedRegion(null) // 필터의 검색 지역 초기화
  }

  // 지역구 클릭 시
  const clickDistrict = (district: string) => {
    setKeyword('all') // 키워드 초기화

    const DISTRICT = parseDistrict(district)
    const query = `${selectedRegion?.name} ${DISTRICT}`
    setAddress(query) // address를 선택한 지역구로 표시
    setFinalRegion(query) // 선택한 지역구로 검색 요청
    setSelectedRegion(null) // // 필터의 검색 지역 초기화
  }

  const parseDistrict = (name: string) => {
    return name.split(' ').length === 2
      ? name.split(' ')[1]
      : name.split(' ')[1] + ' ' + name.split(' ')[2]
  }

  const clickBack = () => {
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
            <DialogDescription className="grid h-[370px] grid-cols-2 gap-0 overflow-y-auto">
              {selectedRegion ? (
                <>
                  <DialogClose asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-black"
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
                        className="w-full text-black"
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
                        className="text-black"
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
                      className="text-black"
                      onClick={() => setSelectedRegion(region)}
                      key={region.code}
                    >
                      <span className="text-md font-semibold">
                        {region.name}
                      </span>
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
            <Link className="flex gap-4" href={`/pool/${pool.id}`}>
              <Image src={pool.thumbnail} alt="이미지" width={70} height={70} />
              <div className="flex-col gap-4">
                <div className="text-lg font-semibold">{pool.name}</div>
                <div className="text-sm text-gray-400">{pool.address}</div>
              </div>
            </Link>
          </div>
        ))
      )}
    </>
  )
}
