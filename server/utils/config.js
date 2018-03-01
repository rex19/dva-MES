

// const APIV1 = 'http://dsm.smart-flow.cn:7002/sfmes/api'
// const APIV1 = '/api'
// const APIV3 = '/sfmeswms/api'
// const APIV1 = '/api/v1'
// const APIV2 = '/api/v2'
// const APIV3 = '/api/v3'
// const WMSAPI = 'http://localhost:3009/sfwms'
// const tokenUrl = 'http://dsm.smart-flow.cn:7002/sfmes/token'
// const Container = 'http://192.168.1.252/sfmeswms/Api/Container/GetTByCondition'

//瑞阳
// const ip = '192.168.1.230'
// const post = '80'
// const api = 'sfmeswms/Api'

//dev
const ip = '192.168.1.252'
const post = '80'
const api = 'sfmeswms/Api'
module.exports = {
  tokenUrl: `http://${ip}:${post}/sfmes/token`,

  //容器
  ContainerGetTByConditionUrl: `http://${ip}:${post}/${api}/Container/GetTByCondition`,
  ContainerGetMovementRecordByContainerUrl: `http://${ip}:${post}/${api}/MovementRecord/GetMovementRecordByContainer/?containerId=`,

  //容器
  //http://192.168.1.252/sfmeswms/Api/Container/GetTByCondition
  //http://192.168.1.252/sfmeswmsapi/MovementRecord/GetMovementRecordByContainer/?containerId=14
  //http://192.168.1.252/sfmeswms/api/PackingInformation/GetPackingInformatioByContainer/?containerId=10106

  //成品箱
  //ContainerGetTByConditionUrl: `http://${ip}:${post}/${api}/Container/GetTByCondition`,
  GetPackingMovementRecordByContainerUrl: `http://${ip}:${post}/${api}/MovementRecord/GetMovementRecordByContainer/?containerId=`,
  GetPackingInformatioByContainerUrl: `http://${ip}:${post}/${api}/PackingInformation/GetPackingInformatioByContainer/?containerId=`,

  //销售出库单
  ProductDeliveryRequestGetTByConditionUrl: `http://${ip}:${post}/${api}/ProductDeliveryRequest/GetTByCondition`,
  GetProductDeliveryRequestFormItemByFormIdForListUrl: `http://${ip}:${post}/${api}/ProductDeliveryRequest/GetProductDeliveryRequestFormItemByFormIdForList?productDeliveryRequestFormId=`,
  GetMovementRecordProductDeliveryRequestByWMSFormIdUrl: `http://${ip}:${post}/${api}/MovementRecord/GetMovementRecordProductDeliveryRequestByWMSFormId/?WMSFormId=`,


  //原材料收货单
  MaterialReceivingGetTByConditionUrl: `http://${ip}:${post}/${api}/MaterialReceiving/GetTByCondition`,
  GetMaterialReceivingFormItemByFormIdForListUrl: `http://${ip}:${post}/${api}/MaterialReceiving/GetMaterialReceivingFormItemByFormIdForList?materialReceivingFormId=`,
  GetContainerGenerateRecordByFormItemNumberForListUrl: `http://${ip}:${post}/${api}/MaterialReceiving/GetContainerGenerateRecordByFormItemNumberForList?materialReceivingFormId=`,

  //生产物料领用单
  MaterialPickingGetTByConditionUrl: `http://${ip}:${post}/${api}/MaterialPicking/GetTByCondition`,
  GetMaterialPickingFormItemByFormIdForListUrl: `http://${ip}:${post}/${api}/MaterialPicking/GetMaterialPickingFormItemByFormIdForList?materialPickingFormId=`,
  GetMovementRecordMaterialPickingByWMSFormIdUrl: `http://${ip}:${post}/${api}/MovementRecord/GetMovementRecordMaterialPickingByWMSFormId/?WMSFormId=`,

  //生产物料退料记录
  ManufacturingMaterialReturnGetTByConditionUrl: `http://${ip}:${post}/${api}/ManufacturingMaterialReturn/GetTByCondition`,

  //成品入库单
  ProductInStockingGetTByConditionUrl: `http://${ip}:${post}/${api}/ProductInStocking/GetTByCondition`,
  GetProductInStockingFormItemByFormIdForListUrl: `http://${ip}:${post}/${api}/ProductInStocking/GetProductInStockingFormItemByFormIdForList?productInStockingFormId=`,
  GetMovementRecordProductInStockingByWMSFormIdUrl: `http://${ip}:${post}/${api}/MovementRecord/GetMovementRecordProductInStockingByWMSFormId/?WMSFormId=`,


  //SF FPS-FIS 工单
  GetWorkOrderListInitialUrl: `http://${ip}:${post}/SFPFSFIS/api/WorkOrder/GetWorkOrderListInitial`,
  WorkOrderGetTByConditionUrl: `http://${ip}:${post}/SFPFSFIS/api/WorkOrder/GetWorkOrderListByCondition`,

  //创建工单-初始化数据
  GetLineListAndShiftListForCreateWorkOrderUrl: `http://${ip}:${post}/SFPFSFIS/api/WorkOrder/GetLineListAndShiftListForCreateWorkOrder`,
  //创建工单-通过输入物料号和版本号查询获取部件列表
  GetPartInformationListForCreateWorkOrderUrl: `http://${ip}:${post}/SFPFSFIS/api/WorkOrder/GetPartInformationListForCreateWorkOrder`,
  //创建工单页面-通过部件Id找到工艺列表
  GetProcessListForCreateWorkOrderUrl: `http://${ip}:${post}/SFPFSFIS/api/WorkOrder/GetProcessListForCreateWorkOrder?workOrderId=1`,
  //创建工单页面-创建工单
  CreateWorkOrderUrl: `http://${ip}:${post}/SFPFSFIS/api/WorkOrder/CreateWorkOrder`,
  //创建工单页面-根据线体名和产品获取基准节拍和OEE
  GetBaseLineInformationUrl: `http://${ip}:${post}/SFPFSFIS/api/WorkOrder/GetBaseLineInformation`,
  //修改工单页面-获取单个工单信息用于修改页面显示
  GetWorkOrderInformationForEditUrl: `http://${ip}:${post}/SFPFSFIS/api/WorkOrder/GetWorkOrderInformationForEdit?input=1`,
  //修改工单页面-修改工单
  EditWorkOrderUrl: `http://${ip}:${post}/SFPFSFIS/api/WorkOrder/EditWorkOrder`,


  //激活工单页面-获取生产线列表
  GetAllLineNamesForActiveWorkOrderComboxUrl: `http://${ip}:${post}/SFPFSFIS/api/WorkOrder/GetAllLineNamesForActiveWorkOrderCombox`,
  GetActivedWorkOrderListOfLineUrl: `http://${ip}:${post}/SFPFSFIS/api/WorkOrder/GetActivedWorkOrderListOfLine?lineName=1`,
  GetWorkOrderListForActiveUrl: `http://${ip}:${post}/SFPFSFIS/api/WorkOrder/GetWorkOrderListForActive?lineName=1`,
  ActiveWorkOrderToLineUrl: `http://${ip}:${post}/SFPFSFIS/api/WorkOrder/ActiveWorkOrderToLine`,


  //设置情况页面-获取工位列表给Combox
  GetStationInformationForSetupInformationUrl: `http://${ip}:${post}/SFPFSFIS/api/WorkOrder/GetStationInformationForSetupInformation`,
  GetSetupActivationInformationByWorkOrderAndStationNumberUrl: `http://${ip}:${post}/SFPFSFIS/api/WorkOrder/GetSetupActivationInformationByWorkOrderAndStationNumber`,
  GetWorkOrderPerformanceDataUrl: `http://${ip}:${post}/SFPFSFIS/api/WorkOrder/GetWorkOrderPerformanceData?workOrderNumber=1`,
  //工单激活
  GetSetupActivationInformationByWorkOrderAndStationNumber: `http://${ip}:${post}/SFPFSFIS/api/WorkOrder/GetSetupActivationInformationByWorkOrderAndStationNumber`,


}
