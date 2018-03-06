

// const APIV1 = 'http://dsm.smart-flow.cn:7002/sfmes/api'
// const APIV1 = '/api'
// const APIV3 = '/sfmeswms/api'
// const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
const APIV3 = '/api/v3'

// const APIV1 = 'http://192.168.1.230:3009/api'
// const ADMAPI = 'http://192.168.1.230/SFMES/api'
// const WMSAPI = 'http://192.168.1.230:3009/sfwms'

const APIV1 = 'http://localhost:3009/api'
const ADMAPI = 'http://192.168.1.252/SFMES/api'
const WMSAPI = 'http://localhost:3009/sfwms'
const SFPFSFIS = 'http://localhost:3009/sfpfsfis'


module.exports = {
  name: '翊流智能',
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

    stationTable: `${ADMAPI}/Station`,
    stationGroupTable: `${ADMAPI}/StationGroup`,
    staffTable: `${ADMAPI}/Staff`,
    roleTable: `${ADMAPI}/Role`,
    lineTable: `${ADMAPI}/Cell`,
    materielTable: `${ADMAPI}/Material`,
    processTable: `${ADMAPI}/Process`,
    regionTable: `${ADMAPI}/Area`,
    locationTable: `${ADMAPI}/Location`,
    customerTable: `${ADMAPI}/Customer`,
    supplierTable: `${ADMAPI}/Supplier`,
    failureTypeTable: `${ADMAPI}/FailureType`,
    bomTable: `${ADMAPI}/BOM`,
    //sfwms
    rawMaterialReceiptsTable: `${WMSAPI}/MaterialReceiving`,//原材料收货单
    containerInfoTable: `${WMSAPI}/Container`,//容器信息
    packingFlagTable: `${WMSAPI}/PackingFlag`,//成品箱信息查询
    productDeliveryRequestTable: `${WMSAPI}/ProductDeliveryRequest`, //销售出库单

    productionMaterialCollarOrderTable: `${WMSAPI}/ProductionMaterialCollarOrder`,  //生产物料领用单
    retreatingRecordsOfProductionMaterialsTable: `${WMSAPI}/ManufacturingMaterialReturn`,//生产物料退料记录
    putStorageOfFinishedProductTable: `${WMSAPI}/ProductInStocking`,//成品入库单
    //未做
    rawMaterialReturnListTable: `${WMSAPI}/ProductInStocking`,//原材料退货单
    workOrderBookingTable: `${WMSAPI}/ProductInStocking`,//工单报工
    retreatingRecordsOfFinishedProductTable: `${WMSAPI}/ProductInStocking`,//成品退货单
    inventoryListTable: `${WMSAPI}/ProductInStocking`,//盘点单

    //SF-PFS-FIS
    workOrder: `${SFPFSFIS}/workOrder`,
    workOrderActivation: `${SFPFSFIS}/workOrderActivation`,
  },
  crudApi: {
    postAddData: 'Post',  //新增
    postEditData: 'Put',  //编辑
    postDeleteData: 'Delete',   //删除

    getAddModalInitData: 'GetAddInitialize',  //新增Modals初始化数据api
    getEditModalInitData: 'GetEditinitialize', //编辑Modals初始化数据api
    getDetailsModalInitData: 'GetTById', //详细信息Modals初始化数据api
    getTableInitData: 'GetTByCondition',//表格初始化数据api

    //wms 容器
    GetMovementRecordByContainer: 'GetMovementRecordByContainer',
    GetPackingInformatioByContainer: 'GetPackingInformatioByContainer',
    //销售发货单
    GetProductDeliveryRequestFormItemByFormIdForList: 'GetProductDeliveryRequestFormItemByFormIdForListUrl',
    GetMovementRecordProductDeliveryRequestByWMSFormId: 'GetMovementRecordProductDeliveryRequestByWMSFormIdUrl',
    //  //wms 成品箱
    //  GetMovementRecordByContainer: 'GetMovementRecordByContainer',
    //  GetPackingInformatioByContainer: 'GetPackingInformatioByContainer'

    //原材料收货单
    GetMaterialReceivingFormItemByFormIdForList: 'GetMaterialReceivingFormItemByFormIdForList',
    GetContainerGenerateRecordByFormItemNumberForList: 'GetContainerGenerateRecordByFormItemNumberForList',

    //生产物料领用单
    GetMaterialPickingFormItemByFormId: 'GetMaterialPickingFormItemByFormIdForList',
    GetMovementRecordMaterialPickingByWMSFormId: 'GetMovementRecordMaterialPickingByWMSFormId',
    //生产物料退料记录

    //成品入库单
    GetProductInStockingFormItemByFormIdRequest: 'GetProductInStockingFormItemByFormIdForList',
    GetMovementRecordProductInStockingByWMSFormIdRequest: 'GetMovementRecordProductInStockingByWMSFormId',



    //SF-PFS-FIS  工单新增，修改，查询，设置 api
    workOrderCreator: '',
    workOrderEditor: '',
    //工单列表
    GetWorkOrderListInitial: 'GetWorkOrderListInitial',
    workOrderGetAll: 'GetTListByCondition',
    //工单创建
    GetLineListAndShiftListForCreateWorkOrder: 'GetLineListAndShiftListForCreateWorkOrder',
    GetPartInformationListForCreateWorkOrder: 'GetPartInformationListForCreateWorkOrder',
    GetProcessListForCreateWorkOrder: 'GetProcessListForCreateWorkOrder',
    CreateWorkOrder: 'CreateWorkOrder',
    GetBaseLineInformation: 'GetBaseLineInformation',
    //修改工单页面
    GetWorkOrderInformationForEdit: 'GetWorkOrderInformationForEdit',
    EditWorkOrder: 'EditWorkOrder',
    //激活工单
    GetAllLineNamesForActiveWorkOrderCombox: 'GetAllLineNamesForActiveWorkOrderCombox',
    GetActivedWorkOrderListOfLine: 'GetActivedWorkOrderListOfLine',
    GetWorkOrderListForActive: 'GetWorkOrderListForActive',
    ActiveWorkOrderToLine: 'ActiveWorkOrderToLine',
    //设置情况页面
    GetStationInformationForSetupInformation: 'GetStationInformationForSetupInformation',
    GetSetupActivationInformationByWorkOrderAndStationNumber: 'GetSetupActivationInformationByWorkOrderAndStationNumber',
    //生产效率页面
    ActiveWorkOrderToGetWorkOrderPerformanceDataLine: 'GetWorkOrderPerformanceData',
    //工单激活
    GetSetupActivationInformationByWorkOrderAndStationNumber: 'GetSetupActivationInformationByWorkOrderAndStationNumber',
    workOrderConfig: ''
    //SF-PFS-Trace
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
