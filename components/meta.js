import Head from 'next/head'
import { CMS_NAME, HOME_OG_IMAGE_URL } from '@/lib/constants'

export default function Meta() {
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon/favicon-karen-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon/favicon-karen-16x16.png"
      />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <meta
        name="description"
        content={`Karen Aragon`}
      />
      <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital@0;1&amp;display=swap" rel="stylesheet"></link>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
    </Head>
  )
}
