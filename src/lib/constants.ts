export interface Region {
  name: string
  code: string
}

export const REGION: Region[] = [
  {
    name: '전국',
    code: '00',
  },
  {
    name: '서울',
    code: '11',
  },
  {
    name: '경기도',
    code: '31',
  },
  {
    name: '강원도',
    code: '32',
  },
  {
    name: '세종',
    code: '29',
  },
  {
    name: '충청북도',
    code: '33',
  },
  {
    name: '충청남도',
    code: '34',
  },
  {
    name: '인천',
    code: '23',
  },
  {
    name: '대전',
    code: '25',
  },
  {
    name: '전라북도',
    code: '35',
  },
  {
    name: '전라남도',
    code: '36',
  },
  {
    name: '광주',
    code: '24',
  },
  {
    name: '경상남도',
    code: '38',
  },
  {
    name: '경상북도',
    code: '37',
  },
  {
    name: '대구',
    code: '22',
  },
  {
    name: '부산',
    code: '21',
  },
  {
    name: '울산',
    code: '26',
  },
  {
    name: '제주도',
    code: '39',
  },
]

interface IReviewKeyword {
  category: string
  keywords: string[]
}

export const REVIEW_KEYWORDS: IReviewKeyword[] = [
  {
    category: '청결',
    keywords: ['깨끗한 물', '청결한 샤워실'],
  },
  {
    category: '서비스',
    keywords: ['편리한 센터 이용', '충분한 레인', '적당한 물 온도'],
  },
  {
    category: '가격',
    keywords: ['합리적인 가격'],
  },
  {
    category: '접근성',
    keywords: ['편리한 대중 교통 이용', '넓은 주차 공간', '다양한 주변 맛집'],
  },
  {
    category: '기타',
    keywords: ['눈부신 채광', '오리발 사용 가능', '개인 기구 사용 가능'],
  },
]
