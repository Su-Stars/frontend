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
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false`
    document.head.appendChild(mapScript)

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        navigator.geolocation.getCurrentPosition((position) => {
          const newCenter = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }
          setCenter(newCenter)

          if (kakaoMap.current) {
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
    }
  }, [center, map])

  return <div ref={kakaoMap} id="map" className="h-[300px] w-full"></div>
}
