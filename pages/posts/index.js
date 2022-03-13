import Container from '@/components/container'
import MoreStories from '@/components/more-stories'
import HeroPost from '@/components/hero-post'
import Intro from '@/components/intro'
import Layout from '@/components/layout'
import { getAllPostsForHome } from '@/lib/api'
import Head from 'next/head'
import { CMS_NAME } from '@/lib/constants'
import PostPreview from '@/components/post-preview'

export default function Index({ allPosts, preview }) {
  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>Karen Aragon</title>
        </Head>
        <Container>
        <div class="flex flex-row grid gap-10 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2">
          <div class="basis-1/3 mr-20">
            <h2 className="text-3xl md:text-l"><b>—</b> Writing </h2>
            
            <br/>
            <br/>
            <div className='description'>
              <p> I would describe myself as a creature of habit. I write in a journal everyday. I name my "TODO" list as <em>Eat the Frog</em> because that's the productivity style I align best with.
              </p>
              <br/>
              <p> When I'm learning something new I take notes. Lots and Lots of notes. Often I handwrite  snippets of code before I even type it out. This is so I build the muscle memory and hopefully have it stick.
              </p>
              <br/>
              <p>Presented here are some of those notes edited in a much more cohesive manner. Some of it is stuff I just learned recently for example Vue and Nuxt. Some of it is stuff I think about a lot in between coding. Maybe it'll help someone?</p>
            </div>
          </div>
          <div class="basis-2/3">
          <ul class="timeline-list">
            {allPosts.map((post) => {
              return (
                <li>
                  <div class="content">
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
        </Container>
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
