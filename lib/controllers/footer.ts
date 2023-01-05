import {fetchAPI} from '../api';

export async function getFooterContent() {
    const data = await fetchAPI(`
    {
      menus(where: {slug: "footer-menu"}) {
        nodes {
          id
          name
          slug
          menuItems(first: 50) {
            edges {
              node {
                id
                path
                label
                parentId
                childItems {
                  nodes {
                    id
                    path
                    parentId
                    title
                    label
                  }
                }
              }
            }
          }
        }
      }
    }
    `)

    return data?.menus;
}
