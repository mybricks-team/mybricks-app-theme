const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const rootPath = path.resolve(__dirname, './../');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar')
const fs = require('fs')
const pkg = require('../../package.json');
// const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
	resolve: {
		alias: {},
	},
  devServer: {
    // contentBase: path.resolve(rootPath, './templates'),
    static: {
      directory: path.resolve(rootPath, './templates'),
    },
    port: 9988,
    host: 'localhost',
    hot: true,
    client: {
      logging: 'warn',
    },
    proxy: [
      {
        context: ['/api/theme/publish'],
        // target: 'https://my.mybricks.world',
        target: 'http://localhost:9002',
        secure: false,
        changeOrigin: true,
      },
      {
        context: ['/'],
        // target: 'http://testweb.manateeai.com/',
        // target: 'http://localhost:3100',
        target: 'https://my.mybricks.world',
        secure: false,
        changeOrigin: true,
        bypass: function (req) {
          const { url } = req;
          if (url.startsWith("/public/") || url.startsWith("/css")) {
            return url;
          }
        },
      },
    ]
  },
  plugins: [
    new WebpackBar(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      templateContent: ({htmlWebpackPlugin}) => {
        let content = fs.readFileSync(path.resolve(__dirname, '../templates/index.html'), 'utf-8');
        content = content.replace('<!-- _APP_CONFIG_ -->', `<script>const _APP_CONFIG_ = {namespace: '${pkg.name}'}</script>`)
        return content
      }
    }),
  ]
});
