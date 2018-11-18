const fs = require('fs')
// const path = require('path')
// const glob = require('glob')

// function getEntry(globPath) {
//   let entries = {}
//   glob.sync(globPath).forEach(filePath => {
//     // filePath is like 'D:/code/vue-cli3-multipage/src/pages/page1/main.js
//     console.log('filePath', filePath)
//     const pageName = path.basename(path.dirname(filePath))
//     console.log('pageName', pageName)
//     entries[pageName] = {
//       entry: filePath,
//       template: `${path.dirname(filePath)}/${pageName}.html`,
//       filename: `${pageName}.html`,
//       chunks: ['chunk-vendors', 'chunk-common', pageName]
//     }
//   })
//   console.log('entries', entries)
//   return entries
// }
// 配置 pages 目录下的多页面，通过循环获取每一个 page 文件夹下的 html 和 js
// const PAGES_PATH = path.resolve(__dirname, './src/pages')
// let pages = getEntry(PAGES_PATH + '/*/main.js')
// console.log('pages', pages)

module.exports = {
  parallel: require('os').cpus().length > 1,
  devServer: {
    index: 'web.html',
    port: 3007,
    // host: 'localhost',
    open: true,
    historyApiFallback: {
      index: '/web.html',
      rewrites: [
        // {
        //   from: /^\//,
        //   to: context => {
        //     let toPath = context.parsedUrl.pathname
        //     //     if (!/^\/(login|signup|cms|img)/.test(toPath)) {
        //     //       toPath = '/web.html'
        //     //     }
        //     console.log('context.parsedUrl.pathname', context.parsedUrl.pathname)
        //     console.log('toPath', toPath)
        //     console.log('---------------')
        //     return toPath
        //   }
        // },
        { from: /^\/login/, to: '/login.html' },
        { from: /^\/signup/, to: '/signup.html' },
        { from: /^\/cms/, to: '/cms.html' },
        { from: /^\/logout/, to: '/login.html' },
      ],
      // htmlAcceptHeaders: [
      //   'text/html',
      //   // 'application/xhtml+xml'
      // ]
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
      '/uploads': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/uploads': '/uploads'
        }
      }
    }
  },
  chainWebpack: config => {
    if (process.env.npm_config_report) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
    const UglifyPlugin = require('uglifyjs-webpack-plugin')
    config.optimization.minimizer([
      new UglifyPlugin({
        uglifyOptions: {
          compress: {
            // warnings: false,
            drop_console: true, // console
            pure_funcs: ['console.log']// 移除console
          }
        }
      })
    ])
  },
  configureWebpack: {
    resolve: {
      alias: {
        // '@pages': path.resolve(__dirname, 'src/pages/'),
      }
    },
  },
  pages: {
    web: {
      // page 的入口
      entry: 'src/web/web.js',
      // 模板来源
      template: 'src/web/web.html',
      // 在 dist/index.html 的输出
      filename: 'web.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Russell-blog',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'web']
    },
    login: {
      entry: 'src/login/login.js',
      template: 'src/login/login.html',
      filename: 'login.html',
      title: '登陆',
      chunks: ['chunk-vendors', 'chunk-common', 'login']
    },
    signup: {
      entry: 'src/signup/signup.js',
      template: 'src/signup/signup.html',
      filename: 'signup.html',
      title: '注册',
      chunks: ['chunk-vendors', 'chunk-common', 'signup']
    },
    cms: {
      entry: 'src/cms/cms.js',
      template: 'src/cms/cms.html',
      filename: 'cms.html',
      title: 'RUSSELL-CMS',
      chunks: ['chunk-vendors', 'chunk-common', 'cms']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    // subpage: 'src/subpage.js'
  },
  css: {
    loaderOptions: {
      sass: {
        data: fs.readFileSync('src/web/styles/variable.scss', 'utf-8')
      }
    }
  }
}
