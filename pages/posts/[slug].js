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
import { markdownToHtml } from '@/lib/markdownToHtml'

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
export default function Post({ post}) {
  const router = useRouter()

  return (
    <Layout>
        {router.isFallback
        ? <div>Loading</div>
        : (
          <div>
            {post.prev}
            {post.next}
            <PostBody content={post.content} prev={post.prev} next={post.next} />
        </div>
        )}
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const { slug } = params

  const blogDir = path.join(process.cwd(), 'blog')
  const filenames = fs.readdirSync(blogDir).filter((file) => file.endsWith('.md'))
  const slugs = filenames.map((file) => file.replace('.md', ''))

  const currentIndex = slugs.indexOf(slug)
  const prev = currentIndex === 0 ? slugs[slugs.length - 1] : slugs[currentIndex - 1]
  const next = currentIndex === slugs.length - 1 ? slugs[0] : slugs[currentIndex + 1]

  const fullPath = path.join(blogDir, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const { data, content } = matter(fileContents)
  const htmlContent = await markdownToHtml(content)

  return {
    props: {
      post: {
        data,
        content: htmlContent,
        prev,
        next,
      },
    },
  }
}

export async function getStaticPaths() {
  const blogDir = path.join(process.cwd(), 'blog')
  const filenames = fs.readdirSync(blogDir).filter((file) => file.endsWith('.md'))

  const paths = filenames.map((filename, idx) => {
    const slug = filename.replace('.md', '')
    return {
      params: {
        slug,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}