import Container from '@/components/container'
import Layout from '@/components/layout'
import { getAllProjects } from '@/lib/api'
import Head from 'next/head'
import { Projects } from '@/components/projects'

export default function Work({projects}) {
  return (
    <>
      <Layout>
        <Head>
          <title>Karen Aragon</title>
        </Head>
        <Container>
          <div className="flex flex-row grid gap-10 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
            <div className="basis-1/3 mr-10">
              <h2 className="text-m md:text-xl lg:text-3xl"><b>—</b> Work </h2>
              <br/>
              <div className='description dark:text-slate-300'>
                <p> I've worked on many projects ranging from microservices to design systems to scaling initiatives.  At work I write in Node, React, Typescript and PHP.
                </p>
                <br />
                <p>
                I experiment with a wider range of technologies in my own personal projects which include: ThreeJS, D3, Vue, Nuxt, Next, Python.
                </p>
                <br />
                <p>All my projects are open sourced on <a href="https://github.com/houseofaragon" target="blank" >github</a>.</p>
              </div>
            </div>
            <div className="basis-2/3">
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