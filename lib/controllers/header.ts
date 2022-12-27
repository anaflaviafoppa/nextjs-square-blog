import {fetchAPI} from '../api';
import CacheData from '../../services/cache-data';
import {CacheLabels} from '../../components/utils/cache';


export async function getHeaderContent() {
    const data = await fetchAPI(`
    {
      menus(where: {slug: "header"}) {
        nodes {
          id
          databaseId
          name
          slug
          menuItems(first: 50) {
            edges {
              node {
                id
                path
                label
                parentId
              }
            }
          }
        }
      }
    }
  `)

    return data?.menus
}
