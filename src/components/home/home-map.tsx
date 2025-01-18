'use client'

import { Map, MapMarker } from 'react-kakao-maps-sdk'
import { useEffect, useRef } from 'react'
import useCenterStore from '@/stores/center-store'

export default function HomeKaKaoMap() {
  const { setCenter, center } = useCenterStore()
  const mapRef = useRef<kakao.maps.Map>(null)

  useEffect(() => {
    // 사용자의 현재 위치를 가져와 지도의 시작점으로 지정합니다
    navigator.geolocation.getCurrentPosition((position) => {
      const newCenter = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      setCenter(newCenter)
    })
  }, [])

  // 지오코딩을 이용해 지도의 중심 좌표로 행정동 주소를 콘솔창에 출력가져오기
  // useEffect(() => {
  //   if (mapRef.current) {
  //     // 좌표에서 주소 가져오기
  //     const searchDetailAddrFromCoords = () => {
  //       const geocoder = new window.kakao.maps.services.Geocoder()
  //       geocoder.coord2RegionCode(center.lng, center.lat, (result, status) => {
  //         if (status === window.kakao.maps.services.Status.OK) {
  //           for (let i = 0; i < result.length; i++) {
  //             // 행정동의 region_type 값은 'H' 이므로
  //             if (result[i].region_type === 'H') {
  //               setAddress(result[i].address_name)
  //               break
  //             }
  //           }
  //         }
  //       })
  //     }
  //     searchDetailAddrFromCoords()
  //  }
  // }, [mapRef.current])

  return (
    <Map
      ref={mapRef}
      center={{ lat: center.lat, lng: center.lng }}
      style={{ width: '100%', height: '200px' }}
    >
      <MapMarker position={{ lat: center.lat, lng: center.lng }}>
        <div style={{ color: '#000' }}>Hello World!</div>
      </MapMarker>
    </Map>
  )
}
