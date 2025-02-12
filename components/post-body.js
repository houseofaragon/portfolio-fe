import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Ensure your theme is imported


export default function PostBody({ content }) {
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  }, []);

  return (
      <div
      className='post-content'
        dangerouslySetInnerHTML={{ __html: content }}
      />
  )
}
