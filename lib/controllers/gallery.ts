import {fetchAPI} from '../api';

const GALLERY_IMAGES_ID = process.env.NEXT_PUBLIC_GALLERY_IMAGES_ID

export async function getImagesList() {
    const data = await fetchAPI(`
    {
      mediaItems(
        where: {parent: "${GALLERY_IMAGES_ID}", orderby: {field: IN, order: DESC}}
        first: 20
      ) {
        nodes {
          id
          slug
          sourceUrl
        }
      }
    }
    `)

    return data?.mediaItems;
}
