import { request } from 'utils'
import globalConfig from 'utils/config'
//每个table可能不同的变量字段
const tableName = globalConfig.api.workOrder

//获取初始化数据-查询条件
export async function InitialQuery() {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetWorkOrderListInitial}`,
    method: 'get',
  })
}
//查询整表
export async function query(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.workOrderGetAll}`,
    method: 'post',
    data: params,
  })
}

//创建工单界面  获取初始化数据
export async function GetLineListAndShiftListForCreateWorkOrder(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetLineListAndShiftListForCreateWorkOrder}`,
    method: 'get',
    data: params,
  })
}
//创建工单界面  通过输入物料号和版本号查询获取部件列表
export async function GetPartInformationListForCreateWorkOrder(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetPartInformationListForCreateWorkOrder}`,
    method: 'post',
    data: params,
  })
}
//创建工单页面-通过部件Id找到工艺列表
export async function GetProcessListForCreateWorkOrder(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetProcessListForCreateWorkOrder}`,
    method: 'post',
    data: params,
  })
}
//创建工单页面-创建工单
export async function CreateWorkOrder(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.CreateWorkOrder}`,
    method: 'post',
    data: params,
  })
}
//创建工单页面-创建工单
export async function GetBaseLineInformation(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetBaseLineInformation}`,
    method: 'post',
    data: params,
  })
}


//新增数据保存
export async function create(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.postAddData}`,
    method: 'post',
    data: params,
  })
}
//删除数据
export async function deleted(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.postDeleteData}/${params}`,
    method: 'delete',
    data: params,
  })
}
//修改数据
export async function edit(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.postEditData}`,
    method: 'put',
    data: params,
  })
}
//获取新增Modal初始化数据
export async function getAddModalData(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.getAddModalInitData}`,
    method: 'get',
    data: params,
  })
}
//获取修改Modal初始化数据
export async function getEditModalData(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.getEditModalInitData}/${params}`,
    method: 'get',
    data: params,
  })
}
//获取详情Modal初始化数据
export async function getDetailsModalData(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.getDetailsModalInitData}/${params}`,
    method: 'get',
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
