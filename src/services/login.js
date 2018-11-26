import { request, config } from 'utils'
import axios from 'axios'

const { api } = config
const { GetTokenForLogin, postLogin } = api



//java
export async function login(data) {
  return request({
    url: GetTokenForLogin,
    method: 'post',
    data,
  })
}
