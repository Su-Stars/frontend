import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  return (
    <>
      <div>
        <div>
          <Image src="/logo_image.svg" width={83} height={83} alt="logo" />
          <h1 className="text-4xl font-bold">로그인</h1>
        </div>
        <div>아이디</div>
        <Input className="" type="email" placeholder="아이디" />
      </div>
      <div>
        <div>비밀번호</div>
        <Input type="password" placeholder="비밀번호" />
      </div>
      <Link href="/find-password" className="text-blue-500">
        비밀번호를 잊으셨나요?
      </Link>
      <Link href="/sign-up" className="text-blue-500">
        회원가입
      </Link>
      <Button variant="blue">로그인</Button>
    </>
  )
}
