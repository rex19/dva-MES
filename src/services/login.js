import { request, config } from 'utils'
import axios from 'axios'

const { api } = config
const { GetTokenForLogin, postLogin } = api

export async function login(data) {
  console.log('++++', GetTokenForLogin, data, )
  return request({
    url: GetTokenForLogin,
    method: 'post',
    data,
  })
  // let y = x.json()
  // console.log('+++--', x)
  // return x
}

//update =>
// export async function login(data) {
//   console.log('-----', postLogin, data, )

//   axios.post(`http://192.168.1.252/{postLogin}`,{
//     firstName:'Fred',
//     lastName:'Flintstone'
//   })
//   .then(function(res){
//     console.log(res);
//   })
//   .catch(function(err){
//     console.log(err);
//   });

// }
