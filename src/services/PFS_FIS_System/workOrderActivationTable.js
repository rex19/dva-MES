import { request } from 'utils'
import globalConfig from 'utils/config'
//每个table可能不同的变量字段
const tableName = globalConfig.api.workOrderActivation

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
