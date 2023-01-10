import {fetchAPI} from "../api";
const BANNER_SELECTED_CATEGORY_ID = process.env.NEXT_PUBLIC_BANNER_SELECTED_CATEGORY_ID;

export async function getBannerSelected(preview) {
    const data = await fetchAPI(
        `
        query AllPosts {
          posts(
            first: 20
            where: {orderby: {field: DATE, order: DESC},
             categoryIn: "[${BANNER_SELECTED_CATEGORY_ID}]"}
          ) {
            edges {
              node {
                title
                slug
                featuredImage {
                  node {
                    sourceUrl
                  }
                }
                categories {
                  nodes {
                    name
                    id
                  }
                }
                excerpt
              }
            }
          }
        }
        `,
        {
            variables: {
                onlyEnabled: !preview,
                preview,
            },
        }
    )

    return data?.posts;
}