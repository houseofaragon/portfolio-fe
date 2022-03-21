//const fetch = require('isomorphic-unfetch');

module.exports = {
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/' },
      '/work': { page: '/work' },
      '/posts': { page: '/posts' },
      '/cv': { page: '/cv' }

    };
    const res = await fetch('http://localhost:1337/api/posts');
    const { data } = await res.json();
    const slugs = data.map(entry => entry.attributes.slug);

    slugs.forEach(slug => {
      paths[`/posts/${slug}`] = { page: '/posts/[slug]'};
    });

    return paths;
  }
};