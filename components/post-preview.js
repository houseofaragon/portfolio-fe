import Link from 'next/link'

export default function PostPreview({
  title,
  excerpt,
  slug,
}) {
  return (
      <Link href={`/posts/${slug}`}>
        <div className="cursor-pointer -mb-10 md:-mb-5 md:pr-10 pt-5" >
          <h3 className="mb-3 hover:underline">
              {title}
          </h3>
          <p className="leading-relaxed mb-4 text-slate-600 dark:text-slate-300">{excerpt}</p>
        </div>
      </Link>

  )
}
