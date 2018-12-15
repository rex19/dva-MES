/* global window */
/* global document */
/* global location */
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import config from 'config'
import { EnumRoleType } from 'enums'
import { query, logout } from 'services/app'
// import * as menusService from 'services/menus'
import menusJson from '../mock/menus.json'
import queryString from 'query-string'
import Cookies from 'js-cookie'

const { prefix } = config

export default {
  namespace: 'app',
  state: {
    user: {},
    permissions: {
      visit: [],
    },
    menu: [
      {
        id: 1,
        icon: 'laptop',
        name: 'Dashboard',
        router: '/dashboard',
      },
    ],
    menuPopoverVisible: false,
    siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    locationPathname: '',
    locationQuery: {},
  },
  subscriptions: {

    setupHistory({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search),
          },
        })
      })
    },

    setup({ dispatch }) {
      dispatch({ type: 'query' })
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },

  },
  effects: {
    //恒晖项目
    * query({
      payload,
    }, { call, put, select }) {
      // const { Status, Data } = yield call(query, payload)     //call ajax=>  /api/v1/user/:id
      const { locationPathname } = yield select(_ => _.app)
      //new
      const Status = true
      const Data = {
        user: {
          permissions: {
            role: ["guest"],
            visit: [
              "1",
              "621", "6", "626", "61", "62", "63",
              "4", "41", "42", "43",
              "5", "51", "52", "53", "54"
            ]
          },
          userId: 42,
          username: 'guest'
        }
        // permissions: {role: ["swj"], visit: ["1", "621", "6", "626", "61", "62", "63"]}
        // userId: 42
        // username: "swj"
      }
      if (Status && Data) {

        const { user } = Data
        const { permissions } = user
        let menu = menusJson
        console.log('menus==1', menu)
        //update
        menu = menusJson.filter((item) => {
          const cases = [
            permissions.visit.includes(item.id),
            item.mpid ? permissions.visit.includes(item.mpid) || item.mpid === '-1' : true,
            item.bpid ? permissions.visit.includes(item.bpid) : true,
          ]
          return cases.every(_ => _)
        })
        yield put({
          type: 'updateState',
          payload: {
            user,
            permissions,
            menu,
          },
        })
        if (location.pathname === '/login') {
          yield put(routerRedux.push({
            pathname: '/welcome',
          }))
        }
      } else if (config.openPages && config.openPages.indexOf(locationPathname) < 0) {
        yield put(routerRedux.push({
          pathname: '/login',
          search: queryString.stringify({
            from: locationPathname,
          }),
        }))
      }
    },

    // * query({
    //   payload,
    // }, { call, put, select }) {
    //   const { Status, Data } = yield call(query, payload)     //call ajax=>  /api/v1/user/:id
    //   const { locationPathname } = yield select(_ => _.app)
    //   if (Status && Data) {
    //     // const data1 = yield call(menusService.query)
    //     // const { list } = yield call(menusService.query)        //call ajax=>  /api/v1/menus
    //     // console.log('menus-new', data1, list, menusJson)
    //     const { user } = Data
    //     const { permissions } = user
    //     let menu = menusJson
    //     console.log('menus==1', menu)
    //     //update
    //     menu = menusJson.filter((item) => {
    //       const cases = [
    //         permissions.visit.includes(item.id),
    //         item.mpid ? permissions.visit.includes(item.mpid) || item.mpid === '-1' : true,
    //         item.bpid ? permissions.visit.includes(item.bpid) : true,
    //       ]
    //       return cases.every(_ => _)
    //     })

    //     // if (permissions.role === EnumRoleType.ADMIN || permissions.role === EnumRoleType.DEVELOPER) {
    //     //   console.log('menus==2', permissions)
    //     //   permissions.visit = list.map(item => item.id)
    //     // } else {
    //     //   menu = list.filter((item) => {
    //     //     const cases = [
    //     //       permissions.visit.includes(item.id),
    //     //       item.mpid ? permissions.visit.includes(item.mpid) || item.mpid === '-1' : true,
    //     //       item.bpid ? permissions.visit.includes(item.bpid) : true,
    //     //     ]
    //     //     return cases.every(_ => _)
    //     //   })
    //     //   console.log('menus==3', menu)
    //     // }
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         user,
    //         permissions,
    //         menu,
    //       },
    //     })
    //     if (location.pathname === '/login') {
    //       yield put(routerRedux.push({
    //         pathname: '/welcome',
    //       }))
    //     }
    //   } else if (config.openPages && config.openPages.indexOf(locationPathname) < 0) {
    //     yield put(routerRedux.push({
    //       pathname: '/login',
    //       search: queryString.stringify({
    //         from: locationPathname,
    //       }),
    //     }))
    //   }
    // },

    * logout({
      payload,
    }, { call, put }) {
      Cookies.remove('token');
      yield put(routerRedux.push({
        pathname: '/login',
      }))
      console.log('logout')
      // const data = yield call(logout, parse(payload))   //call ajax=>  /api/v1/logout
      // if (data.success) {
      //   yield put({ type: 'query' })
      // } else {
      //   throw (data)
      // }
    },

    * changeNavbar(action, { put, select }) {
      const { app } = yield (select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    switchSider(state) {
      window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme(state) {
      window.localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar(state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys(state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
  },
}
