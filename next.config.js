module.exports = {
  i18n: {
    locales: ['en'], // Example locales
    defaultLocale: 'en',
  },
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