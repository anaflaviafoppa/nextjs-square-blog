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
  const url = coverImage?.node.sourceUrl;
  const style = {
      backgroundImage: `url(${url})`,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width: "100%",
      height: "100%"
  }

  const image = (
    /*<Image
      fill={isFill}
      alt={`Cover Image for ${title}`}
      src={coverImage?.node.sourceUrl}
      className={cn('object-contain object-center w-auto h-auto', {
        'hover:shadow-medium transition-shadow duration-200': slug,
      })}
    />*/
      <div style={style}>

      </div>
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
    <>
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {imageChosen}
        </Link>
      ) : (
          imageChosen
      )}
    </>
  )
}
