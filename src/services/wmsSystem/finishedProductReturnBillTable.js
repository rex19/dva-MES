
import { request } from 'utils'
import globalConfig from 'utils/config'
//每个table可能不同的变量字段
const tableName = globalConfig.api.finishedProductReturnBillTable

//查询整表
export async function query(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.getTableInitData}`,
    method: 'post',
    data: params,
  })
}

//项目明细
export async function GetProductDeliveryRequestBackFormItemByFormIdForList(params) {
  console.log('GetProductDeliveryRequestBackFormItemByFormIdForList', `${tableName}/${globalConfig.crudApi.GetProductDeliveryRequestBackFormItemByFormIdForList}?productDeliveryRequestFormId=${params.Id}`)
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetProductDeliveryRequestBackFormItemByFormIdForList}?productDeliveryRequestFormId=${params.Id}`,
    method: 'get',
  })
}

//容器信息  ---
export async function GetMovementRecordProductDeliveryRequestBackByWMSFormId(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetMovementRecordProductDeliveryRequestBackByWMSFormId}?WMSFormId=${params.MaterialReceivingFormId}&formItemNumber=${params.ItemNumber}`,
    // url: `http://192.168.1.180/SFMESWMS/api/MovementRecord/GetMovementRecordMaterialReceivingBackByWMSFormId/?WMSFormId=5211&formItemNumber=10`,
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
