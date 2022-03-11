import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/hero-post'
import Intro from '@/components/intro'
import Layout from '@/components/layout'
import { getAllPostsForHome } from '@/lib/api'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
import { Resume } from '@/components/resume'

export default function CV() {
  return (
    <>
      <Layout>
        <Head>
          <title>Karen Aragon</title>
        </Head>
        <Container>
          <Resume />
        </Container>
      </Layout>
    </>
  )
}