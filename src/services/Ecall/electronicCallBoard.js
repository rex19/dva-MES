import { request } from 'utils'
import globalConfig from 'utils/config'
//每个table可能不同的变量字段
const tableName = globalConfig.api.electronicCallBoard


/**
 * 创建配货单
 * @param {*} params
 */
//获得找料区域与请求地点   /PickBill/PickBillLocationList
export async function PickBillLocationList(params) {
  return request({
    // url: `${tableName}/${globalConfig.crudApi.GetAllLineNamesForActiveWorkOrderCombox}`,
    url: `http://192.168.1.116:8080/ecall/PickBill/PickBillLocationList`,
    method: 'post',
    data: params,
  })
}
//叫料单   /PickBill/GetPickBillInChosenLocation
export async function GetPickBillInChosenLocation(params) {
  return request({
    url: `http://192.168.1.116:8080/ecall/PickBill/GetPickBillInChosenLocation`,
    method: 'post',
    data: params,
  })
}

//撤销已选中的叫料单号   /PickBill/PickChosenBillRevocation
export async function PickChosenBillRevocation(params) {
  return request({
    url: `http://192.168.1.116:8080/ecall/PickBill/PickChosenBillRevocation/${params}`,
    method: 'get',
    data: params,
  })
}




//激活工单页面-获取生产线列表
export async function GetAllLineNamesForActiveWorkOrderCombox(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetAllLineNamesForActiveWorkOrderCombox}`,
    method: 'get',
    data: params,
  })
}
//激活工单页面-刷新获取当前激活工站的状态
export async function GetActivedWorkOrderListOfLine(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetActivedWorkOrderListOfLine}`,
    method: 'get',
    data: params,
  })
}
//激活工单页面-获取可选工单列表
export async function GetWorkOrderListForActive(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetWorkOrderListForActive}`,
    method: 'get',
    data: params,
  })
}
//激活工单页面-激活工单
export async function ActiveWorkOrderToLine(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.ActiveWorkOrderToLine}`,
    method: 'post',
    data: params,
  })
}

//设置情况页面-获取工位列表给Combox
export async function GetStationInformationForSetupInformation(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetStationInformationForSetupInformation}`,
    method: 'get',
    data: params,
  })
}

//查询工单设置整表
export async function GetSetupActivationInformationByWorkOrderAndStationNumber(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetSetupActivationInformationByWorkOrderAndStationNumber}`,
    method: 'post',
    data: params,
  })
}

//给数据加key
export async function addKey(params) {
  for (let i = 0; i < params.length; i++) {
    params[i].key = i;
  }
  return params
}
