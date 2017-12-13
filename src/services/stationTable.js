import { request, config } from 'utils'

const { api, crudApi } = config
const { stationTable } = api
const { postAddData, postEditData, postDeleteData, getAddModalInitData, getEditModalInitData, getDetailsModalInitData, getTableInitData } = crudApi
const tableName = stationTable

//查询整表
export async function query(params) {
  return request({
    url: `${tableName}/${getTableInitData}`,
    method: 'post',
    data: params,
  })
}
//新增数据保存
export async function create(params) {
  return request({
    url: `${tableName}/${postAddData}`,
    method: 'post',
    data: params,
  })
}
//删除数据
export async function deleted(params) {
  return request({
    url: `${tableName}/${postDeleteData}/1`,
    method: 'delete',
    data: params,
  })
}
//修改数据
export async function edit(params) {
  return request({
    url: `${tableName}/${postEditData}`,
    method: 'put',
    data: params,
  })
}
//获取新增Modal初始化数据
export async function getAddModalData(params) {
  return request({
    url: `${tableName}/${getAddModalInitData}`,
    method: 'get',
    data: params,
  })
}
//获取修改Modal初始化数据
export async function getEditModalData(params) {
  return request({
    url: `${tableName}/${getEditModalInitData}/1`,
    method: 'get',
    data: params,
  })
}
//获取详情Modal初始化数据
export async function getDetailsModalData(params) {
  return request({
    url: `${tableName}/${getDetailsModalInitData}/1`,
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
