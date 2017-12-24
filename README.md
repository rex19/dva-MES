# SF-MES

## 开发构建

### 目录结构

```bash
├── /dist/           # 项目输出目录
├── /src/            # 项目源码目录
│ ├── /public/       # 公共文件，编译时copy至dist目录
│ ├── /components/   # UI组件及UI相关方法
│ │ ├── skin.less    # 全局样式
│ │ └── vars.less    # 全局样式变量
│ ├── /routes/       # 路由组件
│ │ └── app.js       # 路由入口
│ ├── /models/       # 数据模型
│ ├── /services/     # 数据接口
│ ├── /themes/       # 项目样式
│ ├── /mock/         # 数据mock
│ ├── /utils/        # 工具函数
│ │ ├── config.js    # 项目常规配置
│ │ ├── menu.js      # 菜单及面包屑配置
│ │ ├── config.js    # 项目常规配置
│ │ ├── request.js   # 异步请求函数
│ │ └── theme.js     # 项目需要在js中使用到样式变量
│ ├── route.js       # 路由配置
│ ├── index.js       # 入口文件
│ └── index.html     # 跨IDE编码风格配置
├── package.json     # 项目信息
├── .editorconfig    # Eslint配置
├── .eslintignore    # Eslint忽略文件
├── .eslintrc        # Eslint配置
├── .gitignore       # Git忽略文件
├── .roadhogrc.js    # roadhog配置
├── .roadhogrc.mock.js  # 导入src/mock下的模拟数据
├── LICENSE           # 许可
├── package-lock.json # 项目依赖snapshot 类似yarn.lock
├── package.json      # 项目依赖
├── theme.config.js   # 导入src/themes下的主题css
├── version.js        # 
├── webpack.config.js # webpack配置文件
└── yarn.lock         # 添加依赖或者更新包版本相关版本信息

```


### 快速开始

进入目录安装依赖:

```bash
#开始前请确保没有安装roadhog、webpack到NPM全局目录
npm i 或者 yarn install
```

开发：
nodeMock:
```bash
cd ./server
npm start
```
前端:
```bash
npm run build:dll #第一次npm run dev时需运行此命令，使开发时编译更快
npm run dev
打开 http://localhost:8000
```


```bash
npm run build

将会打包至dist/{version}目录 #package.json里version字段

npm run build:new

将会打包至dist/{version增加1}目录 #package.json里version字段
```

代码检测：

```bash
npm run lint
```

