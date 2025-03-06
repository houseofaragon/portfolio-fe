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
                <p> I've worked on many projects, ranging from distributed systems to microservices, design systems, and scaling initiatives.</p>  
                <br />
                <p>At work, I write in <strong>Elixir</strong>, <strong>LiveView</strong>, and <strong>React / Typescript,</strong> and I have production experience with <strong>Node</strong>, Java, PHP, and Python.
                </p>
                <br />
                <p>
                I experiment with a wider range of technologies in my own personal projects which include: <strong>Machine Learning</strong>, <strong>CRDT</strong>'s, <strong>ThreeJS</strong>, and<strong>D3.</strong>
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
            title: "Machine Learning Experiments in the Browser",
            content: "Building interactive apps with ML using Transformers and ONNX",
            meta: "React + Webworkers + Transformers + ONNX",
            github: "https://github.com/houseofaragon/oracle-whisper",
            link: "/posts/building-machine-learning-experiments.html"
          }
        },
        {
          attributes: {
            title: "Local-first Collaborative Digital Garden",
            content: "A real-time collaborative digital garden using CRDTs running on my own personal server.",
            meta: "React + CRDTs",
            github: "https://github.com/houseofaragon/digital-garden",
            link: "/posts/building-local-first-collaboration.html"
          }
        },
        {
          attributes: {
            title: "WebGL Experiments",
            content: "A collaborative Audio and WebGL/3D site featuring interactive visuals and shaders running on the GPU.",
            meta: "React + ThreeJs",
            github: "https://github.com/fifteenpm",
            link: "https://fifteen.pm/"
          }
        },
        {
          attributes: {
            title: "Chrome Extensions + Machine Learning",
            content: "Building Chrome extensions for productivity and fun.",
            meta: "React + Chrome API + Transformers",
            github: "https://github.com/houseofaragon/browser-ext-translate",
            link: "posts/chrome-extensions.html"
          }
        },
        {
          attributes: {
            title: "Interactive Sound Visualizer",
            content: "Building an interactive sound visualizer with machine learning and shaders.",
            meta: "HandPose Model + React + ThreeJS + WebAudio",
            github: "https://github.com/houseofaragon/ml-hand-shader",
            link: "/posts/ml-hand-shader.html"
          }
        },
        {
          attributes: {
            title: "Data Visualization of Sanctions Data",
            content: "A real-time application enabling users to explore U.S. sanctions data, with visualizations highlighting activity by volume, geography, presidential administration, and growth rate.",
            meta: "React + D3",
            link: "https://enigma.com/blog/post/sanctions-tracker"
          }
        },
        {
          attributes: {
            title: "KSHACK Records",
            content: "Features interactive React and ThreeJS visuals, Audio player, static site generation with NextJS, and Strapi backend. Main site for NY based record label, KSHACK.",
            meta: "React + ThreeJS",
            github: "https://github.com/houseofaragon/kshack/tree/revamp",
            link: "https://kschk.com/"
          }
        }
      ]
  }

  return {
    props: { projects }
  }
}