const path = require('path')
const { version } = require('./package.json')

const svgSpriteDirs = [
  path.resolve(__dirname, 'src/svg/'),
  require.resolve('antd').replace(/index\.js$/, '')
]

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  theme: "./theme.config.js",
  publicPath: `/${version}/`,
  outputPath: `./dist/${version}`,
  // 接口代理示例
  proxy: {
    "/api/v1/weather": {
      "target": "https://api.seniverse.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1/weather": "/v3/weather" }
    },
    "/api/v1/user": {
      "target": "http://localhost:3009",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1/user": "/api/v1/user" }
    },
    "/api/v1/menus": {
      "target": "http://localhost:3009",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1/menus": "/api/v1/menus" }
    },
    "/api/v1/stationTable": {
      "target": "http://localhost:3009",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1/stationTable": "/api/v1/stationTable" }
    },
    "/api/v1/staffTable": {
      "target": "http://localhost:3009",
      "changeOrigin": true,
      "pathRewrite": { "^/api/v1/staffTable": "/api/v1/staffTable" }
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
