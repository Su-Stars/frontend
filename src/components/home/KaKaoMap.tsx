'use client'

import { useEffect, useState, useRef } from 'react'

declare global {
  interface Window {
    kakao: any
  }
}
const APP_KEY = '0d929ba008c86e3296bdbeb4f341c2cc'

export default function KaKaoMap() {
  const [center, setCenter] = useState({
    lat: 37.552987017,
    lon: 126.972591728,
  })
  const kakaoMap = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)

  useEffect(() => {
    const mapScript = document.createElement('script')
    mapScript.async = true
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&libraries=services,drawing&autoload=false`
    document.head.appendChild(mapScript)

    // 사용자의 현재 위치를 가져와 지도의 시작점으로 지정합니다
    // 사용자의 현재 위치를 가져오는 데 실패했다면 서울시청을 지도의 시작점으로 지정합니다
    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          const newCenter = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }
          setCenter(newCenter)

          // 카카오 지도가 마운트 되면
          if (kakaoMap.current) {
            // 지도 인스턴스 생성
            const mapOption = {
              center: new window.kakao.maps.LatLng(
                newCenter.lat,
                newCenter.lon,
              ),
              level: 3,
            }
            const mapInstance = new window.kakao.maps.Map(
              kakaoMap.current,
              mapOption,
            )
            setMap(mapInstance)

            // 마커 생성
            const markerPosition = new window.kakao.maps.LatLng(
              newCenter.lat,
              newCenter.lon,
            )
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
            })
            marker.setMap(mapInstance)
          }
        })
      })
    }
    mapScript.addEventListener('load', onLoadKakaoMap)
  }, [])

  // 지오코딩을 이용해 지도의 중심 좌표로 행정동 주소 가져오기
  useEffect(() => {
    if (map) {
      const markerPosition = new window.kakao.maps.LatLng(
        center.lat,
        center.lon,
      )
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
      })

      marker.setMap(map)
      map.setCenter(markerPosition)

      // 좌표에서 주소 가져오기
      const searchDetailAddrFromCoords = () => {
        const geocoder = new window.kakao.maps.services.Geocoder()
        geocoder.coord2RegionCode(center.lon, center.lat, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            for (let i = 0; i < result.length; i++) {
              // 행정동의 region_type 값은 'H' 이므로
              if (result[i].region_type === 'H') {
                console.log(result[i].address_name)
                break
              }
            }
          }
        })
      }
      searchDetailAddrFromCoords()
    }
  }, [center, map])

  return <div ref={kakaoMap} className="h-[300px] w-full"></div>
}
