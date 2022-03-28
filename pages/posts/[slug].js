import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostBody from '@/components/post-body'
import MoreStories from '@/components/more-stories'
import Header from '@/components/header'
import SectionSeparator from '@/components/section-separator'
import Layout from '@/components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/api'
import Head from 'next/head'
import { markdownToHtml } from '@/lib/markdownToHtml'
import 'highlight.js/styles/atom-one-light.css';

function PostContent({ post }) {
  const { title, content, slug, img } = post
  const htmlContent = `<div>${content}</div>`

  return (
    <>
      <Head>
        <title>
          Karen Aragon | {title}
        </title>
      </Head>
      <div className="post-content max-w-2xl mx-auto pr-10">
        <h2>{title}</h2>
        <br/>
        {img && img.data[0] && img.data[0].attributes &&
        <img
          width={2000}
          height={1000}
          src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${img.data[0]?.attributes?.url}`}
          alt={`Image for ${slug}`}                
        />}
        <PostBody content={content} />
      </div>
    </>
  )
}
export default function Post({ post, morePosts, preview, error }) {
  const router = useRouter()

  return (
    <Layout preview={preview}>
        {router.isFallback
        ? <div>Loading</div>
        : (
          error
            ? <ErrorPage statusCode={404} />
            : <PostContent post={post} />
        )}
        <SectionSeparator />
        {morePosts && morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = null }) {
  const data = await getPostAndMorePosts(params.slug, preview)
  
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

  const post = data.posts.data[0]
  const { content } = post.attributes;
 
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
  
  return {
    paths: allPosts?.map((post) => {
      return `/posts/${post.attributes.slug}`
    }) || [],
    fallback: false,
  }
}
