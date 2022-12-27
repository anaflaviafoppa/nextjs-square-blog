import {fetchAPI} from '../api';

export async function getPostsByCategory(slug) {
    console.debug(slug);
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
          }
        }
      }
    }
    `)

    return data?.posts;
}
