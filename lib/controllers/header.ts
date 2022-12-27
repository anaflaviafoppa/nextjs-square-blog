import {fetchAPI} from '../api';


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
