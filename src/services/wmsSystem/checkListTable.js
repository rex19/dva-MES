import { request } from 'utils'
import globalConfig from 'utils/config'
//每个table可能不同的变量字段
const tableName = globalConfig.api.checkListTable



//初始化区域下拉菜单
export async function WMS_GetAreaListWeb(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.WMS_GetAreaListWeb}?FactoryId=5`,
    method: 'get',
  })
}

//MaterialCheckBill 查询整表
export async function query(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.getTableInitData}`,
    method: 'post',
    data: params,
  })
}

//MaterialCheckBill 查看
export async function WMS_GetMaterialCheckBillGroupByFormId(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.WMS_GetMaterialCheckBillGroupByFormId}?materialCheckBillFormId=${params.Id}`,
    method: 'get',
  })
}

//MaterialCheckBill 固化报告
export async function WMS_SetMateriallCheckBillFormEnd(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.WMS_SetMateriallCheckBillFormEnd}`,
    method: 'post',
    data: params,
  })
}
//MaterialCheckBill  根据物料代码拉第三表
export async function WMS_GetMaterialCheckInformationByMaterialIdForList(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.WMS_GetMaterialCheckInformationByMaterialIdForList}`,
    method: 'post',
    data: params,
  })
}

//MaterialCheckBill  调整
export async function WMS_DoMateriallCheckBillContainerAdjust(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.WMS_DoMateriallCheckBillContainerAdjust}`,
    method: 'post',
    data: params,
  })
}

//MaterialCheckBill 生成文件
export async function WMS_SaveFileMaterialCheckBillGroupByFormId(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.WMS_SaveFileMaterialCheckBillGroupByFormId}`,
    method: 'post',
    data: params,
  })
}



//项目明细
export async function GetPutStorageOfFinishedProduct_ProjectInfoList(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetProductInStockingFormItemByFormIdRequest}?productInStockingFormId=${params.Id}`,
    method: 'get',
  })
}

//已出库料箱信息  ---
export async function GetPutStorageOfFinishedProduct_OutputMaterialBoxInfoList(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetMovementRecordProductInStockingByWMSFormIdRequest}?WMSFormId=${params.WMSFormId}&formItemNumber=${params.ItemNumber}`,
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
