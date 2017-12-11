import { request, config } from 'utils'

const { api } = config
const { roleTable } = api
const tableName = roleTable

export async function query(params) {
  return request({
    url: tableName,
    method: 'post',
    data: params,
  })
}

export async function create(params) {
  return request({
    url: tableName + '/create',
    method: 'post',
    data: params,
  })
}
export async function deleted(params) {
  return request({
    url: tableName + '/deleted',
    method: 'post',
    data: params,
  })
}

export async function edit(params) {
  return request({
    url: tableName + '/edit',
    method: 'post',
    data: params,
  })
}

export async function getAddModalData(params) {
  return request({
    url: tableName + '/getAddModalData',
    method: 'get',
    data: params,
  })
}

export async function getEditModalData(params) {
  console.log('getEditModalData', params)
  return request({
    url: tableName + '/getEditModalData',
    method: 'get',
    data: params,
  })
}

export async function getDetailsModalData(params) {
  console.log('getDetailsModalData', params)
  return request({
    url: tableName + '/getDetailsModalData',
    method: 'get',
    data: params,
  })
}

export async function addKey(params) {
  for (let i = 0; i < params.length; i++) {
    params[i].key = i;
  }
  return params
}

