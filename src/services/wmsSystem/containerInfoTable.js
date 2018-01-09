import { request } from 'utils'
import globalConfig from 'utils/config'
import axios from 'axios'
import qs from 'qs'

//每个table可能不同的变量字段
const tableName = globalConfig.api.containerInfoTable


export async function query(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.getTableInitData}`,
    method: 'post',
    data: params,
  })
}

export async function getContainerNumberRequestQuery(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetMovementRecordByContainer}`,
    method: 'get'
  })
}


//给数据加key
export async function addKey(params) {
  for (let i = 0; i < params.length; i++) {
    params[i].key = i;
  }
  return params
}
