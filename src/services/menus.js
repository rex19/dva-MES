import { request, config } from 'utils'

const { api } = config
const { menus } = api
// const menus = '../mock/menus.json'


export async function query(params) {
  console.log('query(params)', menus)
  return request({
    url: menus,
    method: 'get',
    data: params,
  })
}
