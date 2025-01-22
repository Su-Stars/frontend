import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function SignUpPage() {
  return (
    <>
      <div>
        <div>
          <Image src="/logo_image.svg" width={83} height={83} alt="logo" />
          <h1 className="text-4xl font-bold">회원가입</h1>
        </div>
        <div>아이디</div>
        <Input className="" type="email" placeholder="아이디" />
      </div>
      <div>
        <div>비밀번호</div>
        <Input type="password" placeholder="비밀번호" />
      </div>
      <div>
        <div>닉네임</div>
        <Input type="text" placeholder="닉네임" />
      </div>
      <Link href="/login" className="text-blue-500">
        로그인
      </Link>
      <Button variant="blue">다음</Button>
    </>
  )
}
