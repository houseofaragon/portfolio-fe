import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import PostBody from '@/components/post-body'
import Layout from '@/components/layout'
import Head from 'next/head'
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html';
import rehypeHighlight from 'rehype-highlight'

function PostContent({ data, content }) {
  const htmlContent = `<div class="markdown-body">${content}</div>`

  return (
    <>
      <Head>
        <title>
          Karen Aragon
        </title>
      </Head>
      <div className="post-content max-w-2xl mx-auto pr-10">
        <br/>
        <PostBody content={content} />
      </div>
    </>
  )
}
export default function Post({ post }) {
  const router = useRouter()

  return (
    <Layout>
        {router.isFallback
        ? <div>Loading</div>
        : (
          <div>
            <PostBody content={post.content} />
        </div>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params, preview = null }) {
  const { slug } = params
  const blogDir = path.join(process.cwd(), 'blog')
  const fullPath = path.join(blogDir, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(fileContents)
  const processedContent = await remark()
    .use(html).use(rehypeHighlight).process(content)
  const htmlContent = processedContent.toString()

  return {
    props: {
      post: {
        data: data,
        content: htmlContent
      },
    },
  }
}

export async function getStaticPaths() {
  const blogDir = path.join(process.cwd(), 'blog')
  const filenames = fs.readdirSync(blogDir)
  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }))

  return {
    paths,
    fallback: false,
  }
}
