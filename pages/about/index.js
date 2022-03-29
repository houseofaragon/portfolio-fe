import Layout from '@/components/layout'
import Head from 'next/head'
import { Resume } from '@/components/resume'

export default function CV() {
  return (
    <>
      <Layout>
        <Head>
          <title>Karen Aragon</title>
        </Head>
          <Resume />
      </Layout>
    </>
  )
}