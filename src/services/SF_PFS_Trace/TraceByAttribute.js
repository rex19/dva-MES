import { request } from 'utils'
import globalConfig from 'utils/config'
//每个table可能不同的变量字段
const tableName = globalConfig.api.TraceByAttribute

// //通过属性追溯工件页面-TraceByAttribute
// GetPartAttributeList: `GetPartAttributeList`,
// GetWorkOrderAttributeList: `GetWorkOrderAttributeList`,
// GetContainerAttributeList: `GetContainerAttributeList`,
// GetPartInformationByAttribute: `GetPartInformationByAttribute`,
// GetWorkOrderInformationByAttribute: `GetWorkOrderInformationByAttribute`,
// GetContainerInformationByAttribute: `GetContainerInformationByAttribute`,

//
export async function GetPartAttributeList(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetPartAttributeList}`,
    method: 'post',
    data: params,
  })
}
export async function GetPartInformationByAttribute(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetPartInformationByAttribute}`,
    method: 'post',
    data: params,
  })
}
//
export async function GetWorkOrderAttributeList(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetWorkOrderAttributeList}`,
    method: 'post',
    data: params,
  })
}

export async function GetWorkOrderInformationByAttribute(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetWorkOrderInformationByAttribute}`,
    method: 'post',
    data: params,
  })
}


//
export async function GetContainerAttributeList(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetContainerAttributeList}`,
    method: 'post',
    data: params,
  })
}


export async function GetContainerInformationByAttribute(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetContainerInformationByAttribute}`,
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
