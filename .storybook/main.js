const path = require('path');
const rootPath = path.resolve(__dirname, '../src')

module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-viewport'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            data: `
                      @import "@/assets/scss/_config.scss";
					`
          }
        }
      ],
    })

    config.resolve.alias['@'] = rootPath
    config.resolve.alias['~'] = rootPath

    return config;
  }
};
