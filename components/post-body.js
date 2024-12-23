import './markdown-styles.module.css'

export default function PostBody({ content }) {
  return (
      <div
      className='markdown'
        dangerouslySetInnerHTML={{ __html: content }}
      />
  )
}
