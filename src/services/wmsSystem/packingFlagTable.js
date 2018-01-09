import { request } from 'utils'
import globalConfig from 'utils/config'
//每个table可能不同的变量字段
const tableName = globalConfig.api.packingFlagTable

//查询整表
export async function query(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.getTableInitData}`,
    method: 'post',
    data: params,
  })
}

//查询移动履历
export async function GetMovementRecordByContainer(params) {
  console.log('GetMovementRecordByContainer', params)
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetMovementRecordByContainer}?containerId=${params}`,
    method: 'get',
  })
}

//查询箱子产品
export async function GetPackingInformatioByContainer(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetPackingInformatioByContainer}`,
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
