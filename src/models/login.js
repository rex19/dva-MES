import { routerRedux } from 'dva/router'
import { login } from 'services/login'
import Cookies from 'js-cookie'

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login({
      payload,
    }, { put, call, select }) {
      console.log('login-effects-data1', login, payload)
      const data = yield call(login, payload)
      console.log('login-effects-data2', data)
      const { locationQuery } = yield select(_ => _.app)
      if (data.success) {
        //新增添加token到cookie
        const {
          access_token,
          expires_in
         } = data.token
        Cookies.set('token', access_token, {
          expires: expires_in
        });
        console.log(Cookies.get('token'))

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
  },



}
