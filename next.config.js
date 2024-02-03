/** @type {import('next').NextConfig} */
module.exports = {
    webpack: (config, options) => {
      config.module.rules.push({
        test: /\.mdx/,
        use: [
          options.defaultLoaders.babel,
          {
            loader: '@mdx-js/loader',
            options: {} // Assuming you want to use default options for @mdx-js/loader
          },
        ],
      });
  
      config.optimization = {
        minimize: false,
      };
  
      return config;
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
      }
  };
