import { request } from 'utils'
import globalConfig from 'utils/config'
//每个table可能不同的变量字段
const tableName = globalConfig.api.productionMaterialCollarOrderTable

//查询整表
export async function query(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.getTableInitData}`,
    method: 'post',
    data: params,
  })
}
// GetProductionMaterialCollarOrder_DetailsTableList, GetProductionMaterialCollarOrder_Details_InfoTableList,
//项目明细
export async function GetProductionMaterialCollarOrder_DetailsRequest(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetMaterialPickingFormItemByFormId}?materialPickingFormId=${params.Id}`,
    method: 'get',
  })
}

//已出库料箱信息  ---
export async function GetProductionMaterialCollarOrder_Details_InfoTableList(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetMovementRecordMaterialPickingByWMSFormId}?WMSFormId=${params.WMSFormId}&formItemNumber=${params.ItemNumber}`,
    method: 'get',
  })
}

//给数据加key
export async function addKey(params) {
  for (let i = 0; i < params.length; i++) {
    params[i].key = i;
  }
  return params
}
