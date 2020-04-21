#本项目采用是基于vue-cli多页面应用

> A Vue.js project

通过npm安装本地服务第三方依赖模块，在运行项目前请确保安装node.js,版本号请选折稳定版，大于5.9


1.安装依赖 npm install，

也可采用淘宝镜像 npm install -g cnpm --registry=https://registry.npm.taobao.org；
 cnpm install


2.启动服务 npm run dev，npm run start
启动服务(http://localhost:5050)


3.npm run build:dll
打包三方插件（没有变动不需要执行）

4.发布代码
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



├── build              // 构建服务和webpack配置
├── config             // 项目不同环境的配置
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── api         // 统一接口处理调用
│   ├── assets          // 公共的css js资源
│   ├── components     // 公共的组件
│   ├── module         // 所有模块页面
├── static              // 静态资源文件夹
│   ├── img 		// 存放静态的图片文件
│ 	 ├── plug          // 应用的一些插件
│   ├── dll 		// 三方插件打包json对应表
│   ├── one          // 一期迁移公共的东西
