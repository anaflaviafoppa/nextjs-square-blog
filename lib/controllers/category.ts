import {fetchAPI} from '../api';

const BOM_DE_ASSISTIR = process.env.NEXT_PUBLIC_BOM_DE_ASSISTIR_ID;

export async function getPostsByCategory(slug) {
    const data = await fetchAPI(`
    {
      posts(
        where: {categoryName: "${slug}", orderby: {field: DATE, order: DESC}}
        first: 10
      ) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
            categories(first: 10) {
              nodes {
                name
                parentId
              }
            }
          }
        }
      }
    }
    `)

    return data?.posts;
}

export async function getTitleFromPage(name: string | string[]) {
    const data = await fetchAPI(`
    {
      pages(where: {name: "${name}"}) {
        edges {
          node {
            slug
            title
            content
          }
        }
      }
    }
    `);

    return data?.pages;
}

export async function getAllValidCategories() {
    const data = await fetchAPI(`
    {
      categories(first: 10, where: {nameLike: "bom", exclude: "[${BOM_DE_ASSISTIR}]"}) {
        nodes {
          id
          name
          uri
          parentId
          children {
            nodes {
              name
              uri
              slug
            }
          }
        }
      }
    }
    `)

    return data?.categories;
}

export async function getChildrenCategory(name: string | string[]) {
    const data = await fetchAPI(`
    {
      categories(first: 10, where: {slug: "${name}"}) {
        nodes {
          id
          name
          children {
            nodes {
              name
              uri
              slug
            }
          }
        }
      }
    }
    `)

    return data?.categories;
}
