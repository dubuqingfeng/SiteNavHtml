const leftLinks = require('./outputs/left_links.json');
const rightLinks = require('./outputs/right_links.json');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const glob = require('glob');

function getEntry() {
  const entry = {};
  glob.sync('./src/**.js').forEach((file) => {
    const name = file.match(/src\/(.+)\.js/)[1];
    entry[name] = file;
  });
  return entry;
}

function getHtmlTemplate() {
  return glob
    .sync('./src/pages/**/index.ejs')
    .map((file) => {
      return { name: file.match(/\/pages\/(.+)\/index.ejs/)[1], path: file };
    })
    .map(
      (template) =>
        new HtmlWebpackPlugin({
          title: '这是一个 网址导航',
          left_links: leftLinks,
          right_links: rightLinks,
          template: template.path,
          filename: `${template.name}.html`,
        })
    );
}

module.exports = {
  entry: getEntry(),
  plugins: [
    ...getHtmlTemplate(),
    // new HtmlWebpackPlugin({
    //   title: '这是一个 网址导航',
    //   lang: 'zh-cn',
    //   left_links: leftLinks,
    //   right_links: rightLinks,
    //   template: 'src/index.ejs',
    // }),
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
    static:'./docs',
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
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"],
        },
      },
    ],
  },
  output: {
    filename: 'js/[name].js',
    path: path.resolve(__dirname, 'docs')
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
};