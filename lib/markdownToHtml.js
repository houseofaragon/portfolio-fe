import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
import matter from 'gray-matter'
import { unified } from 'unified'

import hljs from 'highlight.js/lib/core'
import js from 'highlight.js/lib/languages/javascript'
import hljsMarkdown from 'highlight.js/lib/languages/markdown'
import typescript from 'highlight.js/lib/languages/typescript'
import bash from 'highlight.js/lib/languages/bash'

hljs.registerLanguage('javascript', js)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('markdown', hljsMarkdown)
hljs.registerLanguage('bash', bash);

const findNodes = (nodes, condition) => {
  const matchingNodes = nodes.reduce((prev, curr) => {
    if (condition(curr)) {
      return [...prev, curr]
    } else if (curr.children && (curr.children.length > 0)) {
      return [...prev, ...findNodes(curr.children, condition)]
    }
    return prev
  }, [])
  return matchingNodes
}

const htmlParser = () => (tree) => {
  const nodes = tree.children || [];
  const images = findNodes(nodes, node => node.tagName === 'img');
  images.forEach((img) => {
      img.properties.loading = 'lazy';
      img.properties.src = `http://localhost:1337${img.properties.src}`
  });

  const preCodeBlocks = findNodes(nodes, node => {
      return node.tagName === 'pre' && (node.children).some(child => child.tagName === 'code');
  });

  preCodeBlocks.forEach(pre => {
      const codeEl = (pre.children).find(child => child.tagName === 'code');
      const codeContent = codeEl.children[0].value || "";
      codeEl.children = [{
          type: 'raw',
          value: hljs.highlightAuto(codeContent).value
      }];
      
      if (!codeEl.properties.className) {
          codeEl.properties.className = [];
      }

      (codeEl.properties.className).push('hljs');
  });

  const headersElements = findNodes(nodes, node => {
      return ['h1', 'h2', 'h3', 'h4', 'h5'].includes(node.tagName);
  });
  headersElements.forEach((header) => {
      const textNode = findNodes((header.children || []), (node) => node.type === 'text')[0];
      const text = textNode.value || '-empty-';
      const id = text.toLowerCase().replace(/\W/g, '-');
      header.properties.id = id;
  });
};

export const markdownToHtml = async (postContent) => {
  if (!postContent) return ''

  const postMatter = matter(postContent)
  const postHtml = await unified()
    .use(markdown)
    .use(remark2rehype)
    .use(htmlParser)
    .use(html, { allowDangerousHtml: true })
    .process(postMatter.content)

  return postHtml.toString()
}