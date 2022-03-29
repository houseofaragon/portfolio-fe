import Intro from '@/components/intro'
import Layout from '@/components/layout'
import { getAllPostsForHome } from '@/lib/api'
import Head from 'next/head'

export default function Index({ allPosts, preview }) {
  const heroPost = allPosts[0]
  const {
    title, excerpt, slug
  } = heroPost.attributes
  const morePosts = allPosts.slice(1)
  
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Karen Aragon</title>
        </Head>
        <Intro />
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = null }) {
  const allPosts = (await getAllPostsForHome(preview)) || []
  return {
    props: { allPosts, preview },
  }
}
