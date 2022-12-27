import {fetchAPI} from '../api';

export async function getFilteredPosts(filterKey) {
    const data = await fetchAPI(`
    {
      posts(
      where: {search: "${filterKey}", orderby: {field: DATE, order: DESC}}
      first: 15
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
          }
        }
      }
    }
    `)

    return data?.posts;
}
