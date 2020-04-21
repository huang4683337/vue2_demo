var path = require('path')
var utils = require('./utils');
var config = require('../config');
var vueLoaderConfig = require('./vue-loader.conf');
var webpack = require("webpack");
var chalk = require('chalk')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
//var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 读取多页面
// var pages = utils.getEntries('./src/module/**/**/*.js' );

// pages = fileShouleLoad(pages);


// var HappyPack = require('happypack')
// var os = require('os')
// var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
//var ExtractTextPlugin = require('extract-text-webpack-plugin');

//var cssLoader = ExtractTextPlugin.extract({
//  use: [
//   'happypack/loader?id=happy-css'
//  ]
//})
//Object.assign(vueLoaderConfig.loaders, {
//  js: 'happypack/loader?id=happy-babel-vue',
//  css: cssLoader
//})

// console.log(pages)
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// function createHappyPlugin (id, loaders) {
//   return new HappyPack({
//     id: id,
//     loaders: loaders,
//     threadPool: happyThreadPool,
//     // make happy more verbose with HAPPY_VERBOSE=1
//     verbose: process.env.HAPPY_VERBOSE === '1'
//   })
// }

module.exports = {
  //context: path.resolve(__dirname, '../'),
  entry:{
    'babel-polyfill': 'babel-polyfill',
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  externals: {
    "echarts": "echarts"
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      // 'baseless':resolve('src/assets/css/base.less')
    }
  },
  module: {
	  noParse: /node_modules\/(element-ui\.js)/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
		    include: [resolve('src')],
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
         test: /\.less$/,
         loaders: ["style", "css", "less"]
      },
        {
            test: /\.less$/,
            loaders: ["style", "css", "less"]
        },
      {
        test: /\.css$/,
　　　　include: [
　　　　　/src/,
　　　　　'/node_modules/element-ui/lib/'
　　　　],
　　　　loader: 'style-loader!css-loader'
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('data/[name].[hash:7].[ext]')
        }
      },
    ]
  },
  plugins: [
    new ProgressBarPlugin({
        format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    }),
　　new webpack.ProvidePlugin({
　　　　$: "jquery",
　　　　jQuery: "jquery",
　　　　"windows.jQuery": "jquery"
　　}),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../static/dll/libs-mainfest.json') // 指向生成的manifest.json
    }),
　]
}


// function fileShouleLoad(pages){
//   var PathName = ["module/member/index",
//     "module/etc/login",
//     "module/gate/index",
//     "module/gate/homePage",
//     "module/member/pages/preview",
//     "module/gate/patentSearch/patentsSearch",
//     "module/gate/patentSearch/highSearch",
//     "module/gate/patentSearch/listSearch",
//     "module/gate/patentSearch/domesticDetail",
//     "module/gate/patentSearch/foreignDetails",
//     "module/search/searchDemand",
//     "module/search/searchProject",
//     "module/search/searchCard",
//     "module/gate/projectlib/index",
//     "module/gate/supplyAndDemand/index",
//     "module/summary/index",
//     /*"module/gate/hackerspace/index",
//     "module/gate/hackerspace/userCenter",
//     "module/pay/index",
//     "module/gate/supplyAndDemand/index",
//     "module/gate/hackerspace/workSpace"*/
//     ];
//   var obj = {};
//   for( key in pages) {
//     PathName.forEach(function(val){
//       // console.log(val);  module/example/loading
//       // console.log(val);  module/example/loading
//       if(val == key){
//         obj[val] = pages[key];
//       }
//     });

//   }
//   // console.log(obj);
//   return obj
// }
