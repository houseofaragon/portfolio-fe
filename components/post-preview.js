import Link from 'next/link'

export default function PostPreview({
  slug,
  title,
  date,
  excerpt,
}) {
  return (
      <Link href={`/posts/${slug}`}>
        <div className="cursor-pointer -mb-10 md:-mb-5 md:pr-10 pt-5" >
          <h3 className="mb-3 text-lg hover:underline text-slate-900 dark:text-slate-100">
              {title}
          </h3>
          {/* <p>{date}</p> */}
          <p className="mb-4 text-sm text-slate-600 dark:text-slate-400">{excerpt}</p>
        </div>
      </Link>

  )
}
