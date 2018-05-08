import { request, config } from 'utils'

const { api } = config
const { user, userLogout, userLogin } = api

export async function login(params) {
  console.log('login-services', params, userLogin)
  return request({
    url: userLogin,
    method: 'post',
    data: params,
  })
}

export async function logout(params) {
  return request({
    url: userLogout,
    method: 'get',
    data: params,
  })
}

export async function query(params) {
  console.log('user-services', params, user)
  return request({
    url: user.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}


//sfmes
/**
 * getUserInfo = user api
 * postLogin = login api
 * getUserInfo = user api
 */
export async function getUserInfo(params) {
  console.log('getUserInfo-services', params, user)
  return request({
    url: user.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}
export async function postLogin(params) {
  console.log('postLogin-services--', params, userLogin)
  return request({
    url: userLogin,
    method: 'post',
    data: params,
  })
}

