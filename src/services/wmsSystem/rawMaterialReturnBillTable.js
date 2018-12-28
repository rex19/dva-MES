
import { request } from 'utils'
import globalConfig from 'utils/config'
//每个table可能不同的变量字段
const tableName = globalConfig.api.rawMaterialReturnBillTable

//查询整表
export async function query(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.getTableInitData}`,
    method: 'post',
    data: params,
  })
}

//项目明细
export async function GetMaterialReceivingFormItemByFormIdForList(params) {
  console.log('GetMaterialReceivingFormItemByFormIdForList', `${tableName}/${globalConfig.crudApi.GetMaterialReceivingFormItemByFormIdForList}?materialReceivingFormId=${params.Id}`)
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetMaterialReceivingFormItemByFormIdForList}?materialReceivingFormId=${params.Id}`,
    method: 'get',
  })
}

//容器信息  ---
export async function GetMovementRecordMaterialReceivingBackByWMSFormId(params) {
  console.log('GetMovementRecordMaterialReceivingBackByWMSFormId', `${tableName}/${globalConfig.crudApi.GetMovementRecordMaterialReceivingBackByWMSFormId}?WMSFormId=${params.MaterialReceivingFormId}&formItemNumber=${params.ItemNumber}`)

  return request({
    url: `${tableName}/${globalConfig.crudApi.GetMovementRecordMaterialReceivingBackByWMSFormId}?WMSFormId=${params.MaterialReceivingFormId}&formItemNumber=${params.ItemNumber}`,
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
