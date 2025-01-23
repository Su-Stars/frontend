export interface Region {
  name: string
}

export const REGION: Region[] = [
  {
    name: '전국',
  },
  {
    name: '서울',
  },
  {
    name: '경기도',
  },
  {
    name: '강원도',
  },
  {
    name: '세종',
  },
  {
    name: '충청북도',
  },
  {
    name: '충청남도',
  },
  {
    name: '인천',
  },
  {
    name: '대전',
  },
  {
    name: '전라북도',
  },
  {
    name: '전라남도',
  },
  {
    name: '광주',
  },
  {
    name: '경상남도',
  },
  {
    name: '경상북도',
  },
  {
    name: '대구',
  },
  {
    name: '부산',
  },
  {
    name: '울산',
  },
  {
    name: '제주도',
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
