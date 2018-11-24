const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
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
    ], {}),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  devServer: {
    contentBase: './docs',
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          "css-loader"
        ]
      },
    ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs')
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  }
};