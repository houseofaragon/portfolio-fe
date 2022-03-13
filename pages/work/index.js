import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/hero-post'
import Intro from '@/components/intro'
import Layout from '@/components/layout'
import { getAllProjects } from '@/lib/api'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
import { Projects } from '@/components/projects'

export default function Work({projects}) {
  return (
    <>
      <Layout>
        <Head>
          <title>Karen Aragon</title>
        </Head>
        <Container>
          <div class="flex flex-row grid gap-10 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
            <div class="basis-1/3 mr-20">
              <h2 className="text-3xl md:text-l sm:text-s"><b>—</b> Work </h2>
              <br/>
              <br/>
              <div className='description'>
                <p>For the past 4 years I have worked on a lot of projects that have impacted users' lives. Ranging from scaling to microservices to design systems.</p>
                <br />
                <p>
                At work I have written primarily in Node, React, and PHP -- this was the stack of choice.
                </p>
                <br />
                <p>
                Presented here are my own personal projects. This is only a miniscule view into what I've working on between hours. In this space I've been able to experient in wider range of technologies - which include ThreeJS, D3, Vue, Nuxt, Next, Python, more Node and more React. 
                </p>
              </div>
            </div>
            <div class="basis-2/3">
              <Projects projects={projects}/>
            </div>
        </div>
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const projects = await getAllProjects() || []

  return {
    props: { projects }
  }
}