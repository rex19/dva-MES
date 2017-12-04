import { request, config } from 'utils'

const { api } = config
const { stationTable } = api
const tableName = stationTable

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


export async function addKey(params) {
  for (let i = 0; i < params.length; i++) {
    params[i].key = i;
  }
  return params
}

