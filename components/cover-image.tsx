import cn from 'classnames'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  title: string
  coverImage: {
    node: {
      sourceUrl: string
    }
  }
  slug?: string,
  width?: number,
  height?: number
}

export default function CoverImage({ title, coverImage, slug, width, height }: Props) {
  const isFill = !width || !height;

  const image = (
    <Image
      fill={isFill}
      alt={`Cover Image for ${title}`}
      src={coverImage?.node.sourceUrl}
      className={cn('object-contain object-center w-auto h-auto', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
    />
  )

  const exactImage = (
      <Image
          width={width}
          height={height}
          alt={`Cover Image for ${title}`}
          src={coverImage?.node.sourceUrl}
          className={cn('object-contain object-center w-auto h-auto', {
            'hover:shadow-medium transition-shadow duration-200': slug,
          })}
      />
  )

  const imageChosen = isFill ? image : exactImage;

  return (
    <div className="sm:mx-0 position-relative my-auto block">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {imageChosen}
        </Link>
      ) : (
          imageChosen
      )}
    </div>
  )
}
