import { request } from 'utils'
import globalConfig from 'utils/config'
import axios from 'axios'
import qs from 'qs'

//每个table可能不同的变量字段
const tableName = globalConfig.api.containerInfoTable


var options = {
  method: 'GET',
  url: 'http://192.168.1.252/sfmeswms/Api/Container/GetTByCondition',
}
//查询整表
export function query(params) {
  console.log('query(params)', params)
  axios({ options })
    .then((response) => {
      return response.data
    }).then((responseData) => {
      console.log('query', responseData)
      return responseData
    }).catch((error) => {
      console.log(error)
    })
}
// export async function query(params) {
//   return request({
//     url: `${tableName}/${globalConfig.crudApi.getTableInitData}`,
//     method: 'post',
//     data: params,
//   })
// }


//给数据加key
export async function addKey(params) {
  for (let i = 0; i < params.length; i++) {
    params[i].key = i;
  }
  return params
}
