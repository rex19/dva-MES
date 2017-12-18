const path = require('path')
const { version } = require('./package.json')

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd').replace(/index\.js$/, '')
]

const NodeUrl = 'http://localhost:3009'
// const url = 'http://localhost:3009'
const url = 'http://192.168.1.252/SFMES'
export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  theme: "./theme.config.js",
  publicPath: `/${version}/`,
  outputPath: `./dist/${version}`,
  // 接口代理示例
  proxy: {
    "/api/weather": {
      "target": NodeUrl,
      "changeOrigin": true,
      "pathRewrite": { "^/api/weather": "/v3/weather" }
    },
    "/api/user": {
      "target": NodeUrl,
      "changeOrigin": true,
      "pathRewrite": { "^/api/user": "/api/user" }
    },
    "/api/menus": {
      "target": NodeUrl,
      "changeOrigin": true,
      "pathRewrite": { "^/api/menus": "/api/menus" }
    },
    "/api/StationGroup": {
      "target": NodeUrl,
      "changeOrigin": true,
      "pathRewrite": { "^/api/StationGroup": "/api/StationGroup" }
    },
    "/api/Station": {
      "target": url,
      "changeOrigin": true,
      "pathRewrite": { "^/api/Station": "/api/Station" }
    },

    "/api/Staff": {
      "target": url,
      "changeOrigin": true,
      "pathRewrite": { "^/api/Staff": "/api/Staff" }
    },
    "/api/Role": {
      "target": url,
      "changeOrigin": true,
      "pathRewrite": { "^/api/Role": "/api/Role" }
    },
    "/api/Cell": {
      "target": url,
      "changeOrigin": true,
      "pathRewrite": { "^/api/Cell": "/api/Cell" }
    },

  },
  env: {
    development: {
      extraBabelPlugins: [
        "dva-hmr",
        "transform-runtime",
        [
          "import", {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    },
    production: {
      extraBabelPlugins: [
        "transform-runtime",
        [
          "import", {
            "libraryName": "antd",
            "style": true
          }
        ]
      ]
    }
  },
  dllPlugin: {
    exclude: ["babel-runtime", "roadhog", "cross-env"],
    include: ["dva/router", "dva/saga", "dva/fetch"]
  }
}
