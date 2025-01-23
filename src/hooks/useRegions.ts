import districtJSON from '@/lib/districts.json'
interface useRegionsParams {
  regionName: string
}

export interface District {
  y_coor: string
  full_addr: string
  x_coor: string
  addr_name: string
  cd: string
}

const defaultResponse: District = {
  y_coor: '0',
  full_addr: '0',
  x_coor: '0',
  addr_name: '0',
  cd: '0',
}
export interface Districts {
  [key: string]: District[]
}

const districtData: Districts = districtJSON

export const useRegions = ({ regionName }: useRegionsParams) => {
  const districts = districtData[regionName] || defaultResponse

  return { districts }
}
