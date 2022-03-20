import markdownStyles from './markdown-styles.module.css'

export default function PostBody({ title, content }) {
  return (
      <div
        dangerouslySetInnerHTML={{ __html: content }}
      />
  )
}
