
const APIV1 = 'http://192.168.1.127:3009/api'
// const APIV1 = 'http://dsm.smart-flow.cn:7002/sfmes/api'
// const APIV1 = '/api'
// const APIV3 = '/sfmeswms/api'
// const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
const APIV3 = '/api/v3'
const WMSAPI = 'http://192.168.1.127:3009/sfwms'

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
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,

    //sfmes
    postLogin: `sfmes/token`,

    stationTable: `${APIV1}/Station`,
    stationGroupTable: `${APIV1}/StationGroup`,
    staffTable: `${APIV1}/Staff`,
    roleTable: `${APIV1}/Role`,
    lineTable: `${APIV1}/Cell`,
    materielTable: `${APIV1}/Material`,
    processTable: `${APIV1}/Process`,
    regionTable: `${APIV1}/Area`,
    locationTable: `${APIV1}/Location`,
    customerTable: `${APIV1}/Customer`,
    supplierTable: `${APIV1}/Supplier`,
    failureTypeTable: `${APIV1}/FailureType`,
    bomTable: `${APIV1}/BOM`,
    //sfwms
    rawMaterialReceiptsTable: `${WMSAPI}/MaterialReceiving`,
    containerInfoTable: `${WMSAPI}/Container`,
    packingFlagTable: `${WMSAPI}/PackingFlag`,

  },
  crudApi: {
    postAddData: 'Post',  //新增
    postEditData: 'Put',  //编辑
    postDeleteData: 'Delete',   //删除

    getAddModalInitData: 'GetAddInitialize',  //新增Modals初始化数据api
    getEditModalInitData: 'GetEditinitialize', //编辑Modals初始化数据api
    getDetailsModalInitData: 'GetTById', //详细信息Modals初始化数据api
    getTableInitData: 'GetTByCondition',//表格初始化数据api

    //wms
    GetMovementRecordByContainer: 'GetMovementRecordByContainer',
    GetPackingInformatioByContainer: 'GetPackingInformatioByContainer'
  },
  table: {
    paginationConfig: {
      PageIndex: 1, //当前页数
      PageSize: 10, // 表格每页显示多少条数据
      Total: 0,
      ShowSizeChanger: true, // 是否可以修改每页显示多少条数据
      PageSizeOptions: ['10', '20', '50', '100'], // 指定每页可以显示多少条
    },
    formItemLayout: {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    },
    TempRender: {
      BOMTempRender: false,//window.属性，用于editable判断是否需要运行componentWillReceiveProps 去setState清空缓存数据
      ProcessTempRender: false
    }
  }
}
