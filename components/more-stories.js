import PostPreview from './post-preview'

export default function MoreStories({ posts }) {
  return (
    <section className='pb-1'>
      <h2 className="mb-4 text-xl md:text-l font-bold leading-tight">
        More Writing
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-10 md:gap-y-22 mb-32">
        {posts.map((post) => {
          return <PostPreview
            key={post.attributes.slug}
            title={post.attributes.title}
            coverImage="{post.attributes.cover}"
            slug={post.attributes.slug}
            excerpt={post.attributes.excerpt}
          />
      })}
      </div>
    </section>
  )
}
