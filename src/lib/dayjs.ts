// dayjs 라이브러리 및 플러그인 불러오기
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import relativeTime from 'dayjs/plugin/relativeTime'

// relativeTime 플러그인 확장 및 한국어 로케일 설정
dayjs.extend(relativeTime)
dayjs.locale('ko')

// dayjs 인스턴스 내보내기
export default dayjs

// 사용 예시
// import dayjs from '@/lib/dayjs'
// console.log(dayjs().fromNow()) // 몇 초 전
// console.log(dayjs('2023-01-01').fromNow()) // 몇 달 전
