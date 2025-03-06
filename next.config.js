module.exports = {
  exportPathMap: async function() {
    const paths = {
      '/': { page: '/' },
      '/work': { page: '/work' },
      '/posts': { page: '/posts' },
      '/about': { page: '/about' }
    };
    return paths;
  }
};