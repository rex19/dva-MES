import { request } from 'utils'
import globalConfig from 'utils/config'
//每个table可能不同的变量字段
const tableName = globalConfig.api.productDeliveryRequestTable

//查询整表
export async function query(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.getTableInitData}`,
    method: 'post',
    data: params,
  })
}

//项目明细
export async function GetProductDeliveryRequest_ProjectInfoList(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetProductDeliveryRequestFormItemByFormIdForList}?productDeliveryRequestFormId=${params.Id}`,
    method: 'get',
  })
}

//已出库料箱信息  ---
export async function GetProductDeliveryRequest_OutputMaterialBoxInfoList(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetMovementRecordProductDeliveryRequestByWMSFormId}?WMSFormId=${params.WMSFormId}&formItemNumber=${params.ItemNumber}`,
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
