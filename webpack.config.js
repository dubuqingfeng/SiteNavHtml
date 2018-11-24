const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const leftLinks = require('./json/left_links.json');
const rightLinks = require('./json/right_links.json');
const recentlyUsed = require('./json/recently_used.json');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      title: '这是一个网址导航',
      lang: 'zh-cn',
      left_links: leftLinks,
      right_links: rightLinks,
      recently_used_links: recentlyUsed,
      template: 'src/index.ejs',
    }),
    new CleanWebpackPlugin(['docs']),
    new CopyWebpackPlugin([
      {
        from: './CNAME',
        to: './CNAME',
        toType: 'file'
      },
    ], {})
  ],
  devServer: {
    contentBase: './docs',
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"]
      },
    ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs')
  }
};