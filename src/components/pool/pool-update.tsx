'use client'

import { FaMapMarkerAlt, FaPhone, FaRegImage } from 'react-icons/fa'
import { Input } from '../ui/input'
import { FaPersonSwimming } from 'react-icons/fa6'
import { LuLink } from 'react-icons/lu'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { ResponsiveDialog } from '../responsive-dialog'

interface PoolUpdateParams {
  triggerTitle: string
  poolId: number
}

interface FormData {
  address?: string
  phone?: string
  laneInfo?: string
  website?: string
  image?: FileList
}

export default function PoolUpdate({ triggerTitle, poolId }: PoolUpdateParams) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [isPoolEditOpen, setIsPoolEditOpen] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const { register, handleSubmit, watch, reset } = useForm()
  const formValues = watch()

  {
    /* 나중에 실제 서버 URL로 변경*/
  }
  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch(
        `나중에 실제 server URL 추가/api/v1/pools/${poolId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
      )
      const json = await res.json()
      reset()
      return json
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const hasValues = Object.values(formValues).some((value) => value)

    setIsFormValid(hasValues)
  }, [formValues])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        const base64String = reader.result as string
        setPreviewImage(base64String)
      }
      reader.onerror = () => {
        setPreviewImage(null)
      }

      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <Button
        variant="link"
        className="text-sm text-gray-400 underline hover:text-blue-500"
        onClick={() => setIsPoolEditOpen(true)}
      >
        {triggerTitle}
      </Button>
      <ResponsiveDialog
        isOpen={isPoolEditOpen}
        setIsOpen={setIsPoolEditOpen}
        title="수영장 정보 수정/등록 요청"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <label
            htmlFor="pool-image"
            className="relative h-[250px] w-[400px] cursor-pointer overflow-hidden rounded-md"
          >
            <input
              {...register('image')}
              type="file"
              className="hidden"
              id="pool-image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {previewImage ? (
              <Image
                src={previewImage}
                width={400}
                height={250}
                className="h-full w-full object-cover"
                alt="미리보기"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center border-4 border-dashed border-gray-400">
                <FaRegImage className="h-20 w-20" />
              </div>
            )}
          </label>

          <div className="flex flex-col gap-2 text-black *:flex *:items-center *:gap-4">
            <div>
              <FaMapMarkerAlt />
              <Input {...register('address')} placeholder="주소" />
            </div>
            <div className="">
              <FaPhone />
              <Input {...register('phone')} placeholder="전화번호" />
            </div>
            <div>
              <FaPersonSwimming />
              <Input {...register('laneInfo')} placeholder="레인정보" />
            </div>
            <div>
              <LuLink />
              <Input {...register('website')} placeholder="링크정보" />
            </div>
          </div>
          <Button
            type="submit"
            size="lg"
            className="bg-blue-500"
            disabled={!isFormValid}
          >
            수정 요청
          </Button>
        </form>
      </ResponsiveDialog>
    </>
  )
}
