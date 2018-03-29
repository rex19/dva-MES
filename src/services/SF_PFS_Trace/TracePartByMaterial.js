import { request } from 'utils'
import globalConfig from 'utils/config'
//每个table可能不同的变量字段
const tableName = globalConfig.api.TracePartByMaterial




export async function GetMaterialContainerByCondition(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetMaterialContainerByCondition}`,
    method: 'post',
    data: params,
  })
}

export async function GetPartInformationListByContainerNumber(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetPartInformationListByContainerNumber}`,
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
