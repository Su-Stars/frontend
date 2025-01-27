'use client'

import { useRegions } from '@/hooks/useRegions'
import { Pool, useSearch } from '@/hooks/use-search'
import { Region } from '@/lib/constants'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LuLoader } from 'react-icons/lu'
import { Input } from '@/components/ui/input'
import useCenterStore from '@/stores/center-store'
import { useNearby } from '@/hooks/useNearby'
import PoolCard from '@/components/home/home-pool-card'
import RegionFilter from '@/components/home/home-region-filter'

export default function HomeSearch() {
  const [address, setAddress] = useState('전국')
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [finalRegion, setFinalRegion] = useState<string>('all')
  const [value, setValue] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('all')
  const { center } = useCenterStore()

  const { districts } = useRegions({
    regionName: selectedRegion?.name || '',
  })

  const { nearbySwimmingPools, isNearbyLoading, isNearbyError } = useNearby({
    latitude: center.lat,
    longtitude: center.lng,
  })

  const { searchResults, isSearchLoading, isSearchError } = useSearch({
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

  // 지역 전체 버튼 클릭 시
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
      {/*초기에는 nearbySwimmingPools를 사용하여 주변 수영장 1개와 같이 표시합니다 */}
      {/* 키워드나 지역구가 변경되어 검색을 하면 searchResults를 사용 해당 결과를 출력 기존에는 근처 수영장 갯수를 보여줍니다 */}
      <h1>
        검색 결과 <span className="text-blue-500"> {searchResults?.total}</span>
      </h1>

      {/*검색 결과표시*/}
      {searchResults?.total === 0 ? (
        <h1>검색 결과가 없습니다</h1>
      ) : (
        searchResults.pools.map((pool: Pool) => (
          <PoolCard pool={pool} key={pool.id} />
        ))
      )}
    </>
  )
}
