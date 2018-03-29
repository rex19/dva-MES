import { request } from 'utils'
import globalConfig from 'utils/config'
//每个table可能不同的变量字段
const tableName = globalConfig.api.TraceBoxByDeliveryNote




export async function GetBoxInformationByDeliveryNote(params) {
  return request({
    url: `${tableName}/${globalConfig.crudApi.GetBoxInformationByDeliveryNote}`,
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
