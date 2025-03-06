import Layout from '@/components/layout'
import Head from 'next/head'
import PostPreview from '@/components/post-preview'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

export default function Index({ posts, preview }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Karen Aragon</title>
        </Head>
        <div className="flex flex-row grid gap-10 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
          <div className="basis-1/3 mr-5 md:mr-20">
            <h2 className="hidden text-2xl md:text-l md:block"><b>—</b> Writing </h2>
            <br/>
            <div className='description dark:text-slate-300 text-md'>
              <p>I'm a creature of habit who keeps up with a daily work journal but my writing is sporadic. 
              </p>
              <br/>
              <p>I've written about React <a href="/posts/look-into-react-memoization.html">rendering</a> and <a href="/posts/look-into-react-optimizing-performance.html">memoization</a>, building a <a href="/posts/homelab.html">homelab</a>, being a <a href="/posts/meditations-on-being-a-lead.html">lead</a>, <a href="/posts/building-local-first-collaboration.html">local-first software</a> and <a href="/posts/building-machine-learning-experiments.html">machine learning</a>, among various other random things.</p>
              <br/>
              <p>Presented here are some of those thoughts edited in a much more cohesive manner.</p>
            </div>
          </div>
          <div className="basis-2/3 pb-10">
          <ul className="timeline-list">
            {posts.map((post, index) => {
              return (
                <li key={index}>
                  <div className="content">
                    <PostPreview
                      slug={post.slug}
                      key={post.slug}
                      title={post.title}
                      date={post.date}
                      excerpt={post.excerpt}
                    />
                  </div>
                </li>
              )
            })}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const blogDir = path.join(process.cwd(), 'blog')
  const filenames = fs.readdirSync(blogDir)

  const posts = filenames.map((filename) => {
    const fullPath = path.join(blogDir, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    
    return {
        slug: filename.replace('.md', ''),
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
    }
  })

  return {
    props: {
      posts,
    },
  };
}