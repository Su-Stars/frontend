import { useSearchStore } from '@/stores/search-store'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { LuSearch } from 'react-icons/lu'

export default function HomeSearchInput() {
  const { keyword, value, setKeyword, setValue } = useSearchStore()

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
  return (
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
  )
}
