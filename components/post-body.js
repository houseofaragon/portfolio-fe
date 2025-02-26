import { useEffect } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Ensure your theme is imported
import Link from 'next/link'

export default function PostBody({ content, prev, next }) {
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block);
    });
  }, []);

  return (
    <>
           <nav>
        {prev && (
          <Link href={`/posts/${prev}`}>
            <a>Previous</a>
          </Link>
        )}
        {next && (
          <Link href={`/posts/${next}`}>
            <a>Next</a>
          </Link>
        )}
      </nav>
      <div
      className='post-content'
        dangerouslySetInnerHTML={{ __html: content }}
      />
       <nav>
        {prev && (
          <Link href={`/posts/${prev}`}>
            <a>Previous</a>
          </Link>
        )}
        {next && (
          <Link href={`/posts/${next}`}>
            <a>Next</a>
          </Link>
        )}
      </nav>
    </>
  )
}
