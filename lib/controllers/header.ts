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

export async function getContentCTA() {
    const data = await fetchAPI(`
    {
      menus(where: {slug: "cta-button-navbar"}) {
        nodes {
          id
          databaseId
          name
          slug
          menuItems(first: 1) {
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
