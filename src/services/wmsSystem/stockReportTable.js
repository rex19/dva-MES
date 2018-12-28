
import { request } from 'utils'
import globalConfig from 'utils/config'
//每个table可能不同的变量字段
const tableName = globalConfig.api.stockReportTable


//查询整表
export async function GetAreaListWeb(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetAreaListWeb}?FactoryId=${params.FactoryId}`,
    method: 'get',
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



//给数据加key
export async function addKey(params) {
  for (let i = 0; i < params.length; i++) {
    params[i].key = i;
  }
  return params
}
