
const APIV1 = '/api'
// const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
const APIV3 = '/api/v3'

module.exports = {
  name: 'SF-MES',
  title: '翊流智能',
  prefix: 'smartflow',
  footerText: '翊流智能 copyright © 2017',
  logo: '/sflogo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  APIV3,
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    stationTable: `${APIV1}/Station`,
    stationGroupTable: `${APIV1}/StationGroup`,
    staffTable: `${APIV1}/staffTable`,
    roleTable: `${APIV1}/Role`,
    lineTable: `${APIV1}/Cell`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
  crudApi: {
    postAddData: 'Post',  //新增
    postEditData: 'Put',  //编辑
    postDeleteData: 'Delete',   //删除

    getAddModalInitData: 'GetAddInitialize',  //新增Modals初始化数据api
    getEditModalInitData: 'GetEditinitialize', //编辑Modals初始化数据api
    getDetailsModalInitData: 'GetTById', //详细信息Modals初始化数据api
    getTableInitData: 'GetTByCondition',//表格初始化数据api
  }
}
