import { routerRedux } from 'dva/router'
import { login } from 'services/login'
import Cookies from 'js-cookie'

export default {
  namespace: 'login',

  state: {},

  effects: {
    //恒晖项目 login 方法
    * login({
      payload,
    }, { put, call, select }) {
      console.log('login-effects-data1', login, payload)
      // const data = yield call(login, payload)
      console.log('login-effects-data2', data)
      const data = {
        Data: {
          token: {
            Access_Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6ImUxMGFkYzM5NDliYTU5YWJiZTU2ZTA1N2YyMGY4ODNlIiwidXNlck5hbWUiOiJzd2oiLCJleHAiOjE1NDI4NTg4MDQsInVzZXJJZCI6NDIsImlhdCI6MTU0Mjg1NzAwNH0.9kR5Xt42nqw4v8vvoeloRRtrIRZecDOmSTv23qlgBDs",
            Expires_In: "300",
            Token_Type: "Authorization"
          }
        },
        ErrorMessage: "登陆成功~",
        Other: "rex",
        Status: 200,
        message: "Ok",
        success: true
      }
      const { locationQuery } = yield select(_ => _.app)
      if (data.Status) {
        //新增添加token到cookie
        const {
          Access_Token,
          Token_Type,
          Expires_In
         } = data.Data.token
        Cookies.set('token', Access_Token);

        console.log('cookie', Cookies.get('token'), locationQuery)

        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (from && from !== '/login') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/welcome'))
        }
      } else {
        throw data
      }
    },


    // * login({
    //   payload,
    // }, { put, call, select }) {
    //   console.log('login-effects-data1', login, payload)
    //   const data = yield call(login, payload)
    //   console.log('login-effects-data2', data)
    //   const { locationQuery } = yield select(_ => _.app)
    //   if (data.Status) {
    //     //新增添加token到cookie
    //     const {
    //       Access_Token,
    //       Token_Type,
    //       Expires_In
    //      } = data.Data.token
    //     Cookies.set('token', Access_Token);

    //     console.log('cookie', Cookies.get('token'), locationQuery)

    //     const { from } = locationQuery
    //     yield put({ type: 'app/query' })
    //     if (from && from !== '/login') {
    //       yield put(routerRedux.push(from))
    //     } else {
    //       yield put(routerRedux.push('/welcome'))
    //     }
    //   } else {
    //     throw data
    //   }
    // },
  },
}
