import {fetchAPI} from '../api';

export async function getFilteredPosts(filterKey) {
    const data = await fetchAPI(`
    {
      posts(
      where: {search: "${filterKey}", orderby: {field: DATE, order: DESC}}
      first: 20
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
