import { request } from 'utils'
import globalConfig from 'utils/config'
//每个table可能不同的变量字段
const tableName = globalConfig.api.PartProcessRecord




export async function PartProcessRecordGetPageInit(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.PartProcessRecordGetPageInit}`,
    method: 'post',
    data: params,
  })
}

export async function GetPartProcessRecordByStation(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetPartProcessRecordByStation}`,
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
