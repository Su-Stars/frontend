'use client'

import { useRegions } from '@/hooks/useRegions'
import { Pool, useSearch } from '@/hooks/use-search'
import { Region } from '@/lib/constants'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import PoolCard from '@/components/home/home-pool-card'
import RegionFilter from '@/components/home/home-region-filter'
import useRegionStore from '@/stores/region-store'
import { useIntersectionObserver } from '@/hooks/use-intersectionObserver'
import { LuSearch } from 'react-icons/lu'

export default function HomeSearch() {
  const { setRegion, region } = useRegionStore()
  const [address, setAddress] = useState('전국')

  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [value, setValue] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('all')

  const { districts } = useRegions({
    regionName: selectedRegion?.name || '',
  })

  const {
    searchResults,
    hasNextPage,
    fetchNextPage,
    total,
    isFetchingNextPage,
  } = useSearch({
    region,
    keyword,
  })

  const option = {
    threshold: 0.5,
    rootMargin: '0px',
  }

  const moreRef = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }, option)

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
    setRegion('all') // 전국 으로 검색 요청
    setSelectedRegion(null) // 필터의 검색 지역 초기화
  }

  // 지역 전체 버튼 클릭 시
  // ex) 경기도 전체에 대해 검색을 실행
  const clickAllDistrict = (region: string) => {
    setAddress(`${region} 전체`) // 해당 지역으로 표시
    setKeyword('all') // 키워드 초기화
    setRegion(region) // 해당 지역 전체로 검색 요청
    setSelectedRegion(null) // 필터의 검색 지역 초기화
  }

  // 지역구 클릭 시
  const clickDistrict = (district: string) => {
    setKeyword('all') // 키워드 초기화

    const DISTRICT = parseDistrict(district)
    const query = `${selectedRegion?.name} ${DISTRICT}`
    setAddress(query) // address를 선택한 지역구로 표시
    setRegion(query) // 선택한 지역구로 검색 요청
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
      <RegionFilter
        address={address}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        clickBack={clickBack}
        clickAllDistrict={clickAllDistrict}
        clickDistrict={clickDistrict}
        clickAllRegion={clickAllRegion}
        parseDistrict={parseDistrict}
        districts={districts || { result: [] }}
      />

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <Input
          placeholder="수영장 이름, 특정 지역 검색"
          className="h-10 flex-1"
          value={value}
          onChange={onChange}
        />
        <Button type="submit" className="h-10" variant="primary">
          <LuSearch className="h-6 w-6" />
          검색
        </Button>
      </form>

      <h3>
        검색 결과 <span className="text-blue-500"> {total}</span>
      </h3>
      {total === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-12 text-muted-foreground">
          <LuSearch className="h-12 w-12" />
          <h3>검색 결과가 없습니다</h3>
          <p>다른 검색어로 다시 시도해보세요</p>
        </div>
      ) : (
        searchResults.map((pool: Pool) => (
          <PoolCard pool={pool} key={pool.id} />
        ))
      )}
      {/* 다음 페이지가 있을 때만 더보기 표시 */}
      {hasNextPage && (
        <div ref={moreRef} className="py-4 text-center text-gray-500">
          {isFetchingNextPage ? '로딩 중...' : '더 보기'}
        </div>
      )}
    </>
  )
}
