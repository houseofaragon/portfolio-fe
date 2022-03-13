import Avatar from './avatar'
import Date from './date'
import CoverImage from './cover-image'
import Link from 'next/link'

export default function PostPreview({
  title,
  coverImage,
  excerpt,
  slug,
}) {
  return (
      <Link href={`/posts/${slug}`}>
        <div className="cursor-pointer pr-10 pt-5 transition ease-in-out delay-150 hover:bg-slate-50 duration-300" >
          <h3 className="mb-3">
              {title}
          </h3>
          <p className="text-sm leading-relaxed mb-4">{excerpt}</p>
        </div>
      </Link>

  )
}
