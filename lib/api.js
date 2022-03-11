async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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

export async function getPreviewPostBySlug(slug) {
  const data = await fetchAPI(
    `
  query PostBySlug($where: JSON) {
    posts(where: $where) {
      slug
    }
  }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  )
  return data?.posts[0]
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts {
        data{
          attributes {
            slug
          }
        }
      }
    }
  `)

  console.log('data slug', data)
  return data?.posts?.data
}

export async function getAllPostsForHome(preview) {
  const data = await fetchAPI(
    `{
      posts {
        data{
          attributes {
            title,
            content,
            slug,
            excerpt,
            img {
              data {
                attributes {
                  url,
                }
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        where: {
          ...(preview ? {} : { status: 'published' }),
        },
      },
    }
  )

  return data?.posts?.data
}

export async function getPostAndMorePosts(slug, preview) {
  console.log('slug', slug)
  const query = `
    {
      posts (filters: { slug: { eq: "${slug}" } }) {
        data{
          id,
          attributes {
            title,
            content,
            slug,
            excerpt,
            img {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }

      morePosts: posts (pagination: { page: 1, pageSize: 3 },filters: { slug: { ne: "${slug}" } }) {
        data{
          id,
          attributes {
            title,
            content,
            slug,
            excerpt,
            img {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `
  const data = await fetchAPI(
    query,
    {
      preview,
      variables: {
        where: {
          slug,
          ...(preview ? {} : { status: 'published' }),
        },
        where_ne: {
          ...(preview ? {} : { status: 'published' }),
          slug_ne: slug,
        },
      },
    }
  )

  console.log('data', data)
  return data
}

export async function getAllProjects() {
  const query = `
    {
      projects {
        data{
          attributes {
            title,
            content,
            meta,
            github,
            link
          }
        }
      }
    }
  `

  const data = await fetchAPI(query, {})

  return data?.projects?.data
}
