import Image from 'next/image'
import NoImage from '@/components/common/no-image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface PoolImagesProps {
  images: string[]
  poolName: string
}

export default function PoolImages({ images, poolName }: PoolImagesProps) {
  return (
    <div className="relative h-[200px] w-full">
      {images?.length > 0 ? (
        <Carousel>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[200px] w-full">
                  <Image
                    src={image}
                    fill
                    className="rounded-lg object-cover"
                    alt={`${poolName} 수영장 이미지 ${index + 1}`}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      ) : (
        <NoImage className="h-[200px] w-full" />
      )}
    </div>
  )
}
