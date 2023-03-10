const API_URL = process.env.WORDPRESS_API_URL

//IDS:
const BANNER_SELECTED_CATEGORY_ID = process.env.NEXT_PUBLIC_BANNER_SELECTED_CATEGORY_ID;
const BANNER_SELECTED_CATEGORY_MOBILE = process.env.NEXT_PUBLIC_BANNER_SELECTED_CATEGORY_MOBILE_ID;
const BANNER_SELECTED_CATEGORY_DESKTOP = process.env.NEXT_PUBLIC_BANNER_SELECTED_CATEGORY_DESKTOP_ID;
const BANNER_CATEGORY_ID = process.env.NEXT_PUBLIC_BANNER_CATEGORY_ID;
const CAROUSEL_CATEGORY_ID = process.env.NEXT_PUBLIC_CAROUSEL_CATEGORY_ID;

export async function fetchAPI(query = '', {variables}: Record<string, any> = {}) {
    const headers = {'Content-Type': 'application/json', 'Cache-Control': 's-maxage=86400'}

    if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
        headers[
            'Authorization'
            ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
    }

    // WPGraphQL Plugin must be enabled
    const res = await fetch(API_URL, {
        headers,
        method: 'POST',
        body: JSON.stringify({
            query,
            variables,
        }),
    })

    const json = await res.json()
    if (json.errors) {
        console.error(json.errors)
        throw new Error('Failed to fetch API')
    }
    return json.data
}

export async function getPreviewPost(id, idType = 'DATABASE_ID') {
    const data = await fetchAPI(
        `
    query PreviewPost($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        databaseId
        slug
        status
      }
    }`,
        {
            variables: {id, idType},
        }
    )
    return data.post
}

export async function getAllPostsWithSlug() {
    const data = await fetchAPI(`
    {
      posts(first: 10000,  where: { orderby: { field: DATE, order: DESC }, categoryNotIn: "[${BANNER_SELECTED_CATEGORY_ID},${BANNER_SELECTED_CATEGORY_MOBILE},${BANNER_SELECTED_CATEGORY_DESKTOP},${BANNER_CATEGORY_ID},${CAROUSEL_CATEGORY_ID}]" }) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)
    return data?.posts
}

export async function getCategories(slug: string, preview) {
    const data = await fetchAPI(`
     query AllPosts {
      posts(
        first: 20
        where: {orderby: {field: DATE, order: DESC}, categoryName: "${slug}"}
      ) {
        edges {
          node {
            title
            excerpt
            slug
            date
            uri
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
  `,
        {
            variables: {
                onlyEnabled: !preview,
                preview,
            },
        });

    return data?.posts
}

export async function getAllPostsForHome(preview) {
    const data = await fetchAPI(
        `
    query AllPosts {
      posts(first: 20,
       where: { orderby: { field: DATE, order: DESC }, categoryNotIn: "[${BANNER_CATEGORY_ID}]" }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            uri
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
  `,
        {
            variables: {
                onlyEnabled: !preview,
                preview,
            },
        }
    )

    return data?.posts
}

export async function getPostAndMorePosts(slug, preview, previewData) {
    const postPreview = preview && previewData?.post
    // The slug may be the id of an unpublished post
    const isId = Number.isInteger(Number(slug))
    const isSamePost = isId
        ? Number(slug) === postPreview.id
        : slug === postPreview.slug
    const isDraft = isSamePost && postPreview?.status === 'draft'
    const isRevision = isSamePost && postPreview?.status === 'publish'
    const data = await fetchAPI(
        `
    fragment AuthorFields on User {
      name
      firstName
      lastName
      avatar {
        url
      }
    }
    fragment PostFields on Post {
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
          ...AuthorFields
        }
      }
      categories(where: {exclude: "[${CAROUSEL_CATEGORY_ID}]"}) {
        nodes {
            name
            parentId
            id
        }
        edges {
          node {
            name
            parentId
          }
        }
      }
      tags {
        edges {
          node {
            name
          }
        }
      }
    }
    query PostBySlug($id: ID!, $idType: PostIdType!) {
      post(id: $id, idType: $idType) {
        ...PostFields
        content
        ${
            // Only some of the fields of a revision are considered as there are some inconsistencies
            isRevision
                ? `
        revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              content
              author {
                node {
                  ...AuthorFields
                }
              }
            }
          }
        }
        `
                : ''
        }
      }
      posts(first: 3, where: { orderby: { field: DATE, order: DESC },
       categoryNotIn: "[${BANNER_CATEGORY_ID}]" }) {
        edges {
          node {
            ...PostFields
          }
        }
      }
    }
  `,
        {
            variables: {
                id: isDraft ? postPreview.id : slug,
                idType: isDraft ? 'DATABASE_ID' : 'SLUG',
            },
        }
    )

    // Draft posts may not have an slug
    if (isDraft) data.post.slug = postPreview.id
    // Apply a revision (changes in a published post)
    if (isRevision && data.post.revisions) {
        const revision = data.post.revisions.edges[0]?.node

        if (revision) Object.assign(data.post, revision)
        delete data.post.revisions
    }

    // Filter out the main post
    data.posts.edges = data.posts.edges.filter(({node}) => node.slug !== slug)
    // If there are still 3 posts, remove the last one
    if (data.posts.edges.length > 2) data.posts.edges.pop()

    return data
}

export async function getAboutUsContent() {
    const data = await fetchAPI(`
    {
      pages(where: {name: "quem-somos"}) {
        edges {
          node {
            content
            date
            slug
            title
            excerpt
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `)
    return data?.pages
}


export async function sendMail(subject, body, mutationId = 'contact') {
    const fromAddress = 'noreply@yourwebsite.com';
    const toAddress = 'someone@yourwebsite.com';
    const data = await fetchAPI(
        `
		mutation SendEmail($input: SendEmailInput!) {
			sendEmail(input: $input) {
				message
				origin
				sent
			}
		}
	`,
        {
            variables: {
                input: {
                    clientMutationId: mutationId,
                    from: fromAddress,
                    to: toAddress,
                    body: body,
                    subject: subject,
                },
            },
        }
    );

    return data?.sendEmail;
}
