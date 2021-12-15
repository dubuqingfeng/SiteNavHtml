const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const leftLinks = require('./json/left_links.json');
const rightLinks = require('./json/right_links.json');

module.exports = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      title: '这是一个网址导航',
      lang: 'zh-cn',
      left_links: leftLinks,
      right_links: rightLinks,
      template: 'src/index.ejs',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './CNAME',
          to: './CNAME',
          toType: 'file'
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
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