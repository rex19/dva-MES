import { request } from 'utils'
import globalConfig from 'utils/config'
//每个table可能不同的变量字段
const tableName = globalConfig.api.TracePartByStation



//通过工站追溯工件页面-获得工站选择下拉列表
export async function GetPageInit(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetPageInit}`,
    method: 'post',
    data: params,
  })
}

//查询整表
export async function GetTracePartByStation(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetTracePartByStation}`,
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
