module.exports = {
  images: {
    domains: ['localhost'],
  },
  // https://github.com/vercel/next.js/issues/7755
  // webpack: (config, {isServer}) => {
  //   if (!isServer) {
  //     config.resolve.fallback.fs = false;
  //   }
  //   return config
  // }
}
