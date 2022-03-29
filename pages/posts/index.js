import Layout from '@/components/layout'
import { getAllPostsForHome } from '@/lib/api'
import Head from 'next/head'
import PostPreview from '@/components/post-preview'

export default function Index({ allPosts, preview }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Karen Aragon</title>
        </Head>
        <div className="flex flex-row grid gap-10 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
          <div className="basis-1/3 mr-20">
            <h2 className="hidden text-3xl md:text-l md:block"><b>—</b> Writing </h2>
            <br/>
            <div className='description dark:text-slate-300'>
              <p>I'm a creature of habit who keeps up with a daily work journal. I keep extensive documentation and I often write out snippets of code before I type it out because writing helps me synthesize the information better. 
              </p>
              <br/>
              <p>Presented here are some of those thoughts edited in a much more cohesive manner.</p>
            </div>
          </div>
          <div className="basis-2/3 pb-10">
          <ul className="timeline-list">
            {allPosts.map((post, index) => {
              return (
                <li key={index}>
                  <div className="content">
                    <PostPreview
                      key={post.attributes.slug}
                      title={post.attributes.title}
                      coverImage="{post.attributes.cover}"
                      slug={post.attributes.slug}
                      excerpt={post.attributes.excerpt}
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
  const allPosts = await getAllPostsForHome()
  return {
    props: { 
      allPosts
    },
  }
}