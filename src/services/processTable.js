import { request } from 'utils'
import globalConfig from 'utils/config'
//每个table可能不同的变量字段
const tableName = globalConfig.api.processTable
const bomTable = globalConfig.api.bomTable

//初始化工厂可选数据
export async function GetInitializeList(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetInitializeList}`,
    method: 'get'
  })
}

//查询整表
export async function query(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.getTableInitData}`,
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
    url: `${tableName}/${globalConfig.crudApi.postDeleteData}`,
    method: 'post',
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
//根据料号获取名称版本号 =>公用的bom api
export async function GetMaterialByMaterialNumber(params) {
  return request({
    url: `${bomTable}/${globalConfig.crudApi.GetMaterialByMaterialNumberUrl}`,
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
