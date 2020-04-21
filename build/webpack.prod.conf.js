var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var glob = require('glob');
var bundleConfig = require("../static/dll/bundle-config.json")//调入生成的的路径json
var CleanWebpackPlugin = require('clean-webpack-plugin');//清空文件夹

var ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  //devtool: config.build.productionSourceMap ? '#source-map' : false,
  devtool: false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.UglifyJsPlugin({
	  exclude:/\.min\.js$/,
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      },
	  output: { comments: false },
      sourceMap: true
    }),
	new ParallelUglifyPlugin({
           cacheDir: '.cache/',
           uglifyJS:{
             output: {
               comments: false
             },
             compress: {
               warnings: false
             }
           }
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      // cssProcessorOptions: {
      //   safe: true
      // },
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    }),
    // generate dist publishService.html with correct asset hash for caching.
    // you can customize output by editing /publishService.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      libJsName: bundleConfig.libs.js,
      libCssName: bundleConfig.libs.css,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // 添加hashid
    new webpack.HashedModuleIdsPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    // new HtmlWebpackPlugin({
    //     libJsName: bundleConfig.libs.js,
    //     libCssName: bundleConfig.libs.css,
    //   }),
    new CleanWebpackPlugin(['dist'], {
        root: path.resolve(__dirname, '../'),    // 设置绝对路径
        verbose: true,
        dry: false
      }),
      // new PrerenderSPAPlugin({
      //     // Required - The path to the webpack-outputted app to prerender.
      //     staticDir: path.join(__dirname, '../dist'),
      //     // Required - Routes to render.
      //     routes: [ '/', '/index'],
      //     renderer: new Renderer({
      //         inject: {
      //             foo: 'bar'
      //         },
      //         headless: false,
      //         // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
      //         renderAfterDocumentEvent: 'render-event',
      //         args: ['--no-sandbox', '--disable-setuid-sandbox'],
      //     })
      // })
  ]
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

// var pages = baseWebpackConfig.entry;
// for(var page in pages) {
//   // 配置生成的html文件，定义路径等
//   var conf = {
//     filename: page + '.html',
//     template: pages[page].slice(0,pages[page].length-2)+ 'html', //模板路径
//     // 是否注入 html
//     inject: true,
//     libJsName: bundleConfig.libs.js,
//     libCssName: bundleConfig.libs.css,
//     // 压缩的方式
//     minify: {
//       removeComments: true,
//       collapseWhitespace: true,
//       removeAttributeQuotes: true
//       // more options:
//       // https://github.com/kangax/html-minifier#options-quick-reference
//     },
//     // necessary to consistently work with multiple chunks via CommonsChunkPlugin
//     chunksSortMode: 'dependency',
//     // excludeChunks 允许跳过某些chunks, 而chunks告诉插件要引用entry里面的哪几个入口
//     // 如何更好的理解这块呢？举个例子：比如本demo中包含两个模块（index和about），最好的当然是各个模块引入自己所需的js，
//     // 而不是每个页面都引入所有的js，你可以把下面这个excludeChunks去掉，然后npm run build，然后看编译出来的index.html和about.html就知道了
//     // filter：将数据过滤，然后返回符合要求的数据，Object.keys是获取JSON对象中的每个key
//     excludeChunks: Object.keys(pages).filter(item => {
//       return (item != page)
//     })
//   }
//   // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
//   webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
// }
module.exports = webpackConfig



