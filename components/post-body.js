import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Ensure your theme is imported
import Link from 'next/link'

const Navigation = ({prev, next}) => {
  return (
    <div className='post-navigation'>
      {prev && (
        <Link href={`/posts/${prev}`}>
          <a>&larr;</a>
        </Link>
      )}
      {next && (
        <Link href={`/posts/${next}`}>
          <a>&rarr;</a>
        </Link>
      )}
    </div>
  )
}

export default function PostBody({ content, prev, next }) {
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  }, []);

  return (
    <div className='post-content'>
      <Navigation prev={prev} next={next} />
      <div
      
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <Navigation prev={prev} next={next} />
    </div>
  )
}
