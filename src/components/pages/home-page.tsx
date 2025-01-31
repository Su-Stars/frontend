'use client'

import HomeKakaoMap from '../home/home-kakao-map'
import RegionFilter from '../home/home-region-filter'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { LuSearch } from 'react-icons/lu'
import { useIntersectionObserver } from '@/hooks/use-intersectionObserver'
import { useSearch } from '@/hooks/use-search'
import { useRegions } from '@/hooks/useRegions'
import { useState } from 'react'
import { Region } from '@/lib/constants'
import HomePoolList from '../home/home-pool-list'

export default function HomePage() {
  const [region, setRegion] = useState<string>('all')
  const [filterName, setFilterName] = useState('전국')
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
    if (value === '') {
      setKeyword('all')
    }

    if (value !== keyword) {
      setKeyword(value)
    }

    setValue('')
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setValue(e.target.value)
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

  const parseDistrict = (name: string) => {
    return name.split(' ').length === 2
      ? name.split(' ')[1]
      : name.split(' ')[1] + ' ' + name.split(' ')[2]
  }

  const clickBack = () => {
    setSelectedRegion(null)
  }

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-2xl font-bold">수영장 검색</h2>
      <HomeKakaoMap searchResults={searchResults} setRegion={setRegion} />
      <RegionFilter
        filterName={filterName}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        clickBack={clickBack}
        clickAllDistrict={clickAllDistrict}
        clickDistrict={clickDistrict}
        clickAllRegion={clickAllRegion}
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

      <HomePoolList total={total} searchResults={searchResults} />

      {hasNextPage && (
        <div ref={moreRef} className="py-4 text-center text-gray-500">
          {isFetchingNextPage ? '로딩 중...' : '더 보기'}
        </div>
      )}
    </div>
  )
}
