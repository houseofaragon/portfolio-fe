import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '@/components/container'
import PostBody from '@/components/post-body'
import MoreStories from '@/components/more-stories'
import Header from '@/components/header'
import SectionSeparator from '@/components/section-separator'
import Layout from '@/components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import PostTitle from '@/components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
import markdownToHtml from '@/lib/markdownToHtml'

export default function Post({ post, morePosts, preview, error }) {
  const router = useRouter()
  const { title, content } = post;
  console.log('post', post)
  return (
    <Layout preview={preview}>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          error ? <ErrorPage statusCode={404} /> :
          <>
              <Head>
                <title>
                  {post.title} | Karen Aragon
                </title>
              </Head>
              <div className="max-w-2xl mx-auto pr-10">
                <h2 className="text-xl md:text-l font-bold">{post.title}</h2>
                <PostBody content={post.content} />
              </div>
          </>
        )}
        <SectionSeparator />
        {morePosts && morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = null }) {
  console.log('params', params)
  const data = await getPostAndMorePosts(params.slug, preview)
  console.log(data)
  if (!data || !data.posts || !data.posts.data.length){
    return {
      props: {
        preview,
        post: {},
        morePosts: data.morePosts.data,
        error: true
      },
    }
  }

  const post = data?.posts?.data[0]
  const { content } = post?.attributes;

  // const postContent = await Promise.all(blocks.map(async block => {
  //   let contentToConvert = '';
  //   if(['ComponentSharedRichText', 'ComponentSharedQuote'].includes(block.__typename) ) {
  //     contentToConvert = block.body
  //   }
  //   return await markdownToHtml(content)
  // }))

  const postContent =  await markdownToHtml(content)
  return {
    props: {
      preview,
      post: {
        ...post.attributes,
        content: postContent,
      },
      morePosts: data.morePosts.data,
      error: false
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug()
  console.log('allPosts', await allPosts)
  return {
    paths: allPosts?.map((post) => {
      return `/posts/${post.attributes.slug}`
    }) || [],
    fallback: true,
  }
}
