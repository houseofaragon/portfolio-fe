import Layout from '@/components/layout'
import { getAllProjects } from '@/lib/api'
import Head from 'next/head'
import { Projects } from '@/components/projects'

export default function Work({projects}) {
  console.log(projects)
  return (
    <>
      <Layout>
        <Head>
          <title>Karen Aragon</title>
        </Head>
          <div className="flex flex-row grid gap-10 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
          <div className="basis-1/3 mr-5 md:mr-20">
              <h2 className="hidden text-3xl md:text-l md:block"><b>—</b> Work </h2>
              <br />
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
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const projects =  {
      data: [
        {
          attributes: {
            title: "Project 1",
            content: "This is a project",
            meta: "Meta",
            github: "https://github.com",
            link: "https://google.com"
          }
        },
        {
          attributes: {
            title: "Project 2",
            content: "This is a project",
            meta: "Meta",
            github: "https://github.com",
            link: "https://google.com"
          }
        },
        {
          attributes: {
            title: "Project 3",
            content: "This is a project",
            meta: "Meta",
            github: "https://github.com",
            link: "https://google.com"
          }
        },
        {
          attributes: {
            title: "Project 4",
            content: "This is a project",
            meta: "Meta",
            github: "https://github.com",
            link: "https://google.com"
          }
        },
        {
          attributes: {
            title: "Project 5",
            content: "This is a project",
            meta: "Meta",
            github: "https://github.com",
            link: "https://google.com"
          }
        }
      ]
  }

  return {
    props: { projects }
  }
}