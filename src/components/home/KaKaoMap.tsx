'use client'

import { useEffect, useState, useRef } from 'react'

declare global {
  interface Window {
    kakao: any
  }
}

export default function KaKaoMap() {
  const kakaoMap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mapScript = document.createElement('script')

    mapScript.async = true
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=0d929ba008c86e3296bdbeb4f341c2cc&autoload=false`

    document.head.appendChild(mapScript)

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map')
        const mapOption = {
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        }
        new window.kakao.maps.Map(mapContainer, mapOption)
      })
    }
    mapScript.addEventListener('load', onLoadKakaoMap)
  }, [])

  return <div ref={kakaoMap} id="map" className="h-96 w-full max-w-lg"></div>
}
