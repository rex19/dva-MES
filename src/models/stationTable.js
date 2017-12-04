import modelExtend from 'dva-model-extend'
import { query, create, deleted, edit, addKey } from 'services/stationTable'
import { pageModel } from 'models/common'
import queryString from 'query-string'

export default modelExtend(pageModel, {

  namespace: 'stationTable',
  state: {
    mockData: [],
    targetKeys: [],
    addModalVisible: false,
    editModalVisible: false,
    detailsModalVisible: false,
    deleteModalVisible: false,
    modalType: 'create',
    ModalValueRecord: {
      id: 1,
      stationNo: '1',
      name: '1',
      type: '111',
      status: '112',
      plant: 1,
      createTimeAt: '123',
      lastModifyAt: '123',
      Modifier: '115',
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/masterdata/stationTable') {
          dispatch({
            type: 'query',
            payload: {
              pageindex: 1,  //第几页
              rowcount: 20,  //行数 作废
              pagesize: 1,  //页数
              IsAsc: true,  //排序
              UserQueryEntity: [], //多条件查询参数
              UserOrderbyEntity: [], //多条件查询排序参数
              // ...queryString.parse(location.search),
            }
          })
        }
      })
    },
  },

  effects: {
    * query({
      payload,
    }, { call, put }) {
      const data = yield call(query, payload)
      console.log('query======', data)
      if (data.success) {
        const result = yield call(addKey, data.data)
        yield put({
          type: 'querySuccess',
          payload: {
            list: result,
            // pagination: {
            //   current: Number(payload.page) || 1,
            //   pageSize: Number(payload.pageSize) || 10,
            //   total: data.total,
            // },
          },
        })
      } else {
        throw data
      }
    },
    * create({
      payload,
    }, { call, put }) {
      const data = yield call(create, payload)
      if (data.success) {
        yield put({ type: 'hideModal', payload: 'addModalVisible' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    * delete({
      payload,
    }, { call, put }) {
      const data = yield call(deleted, payload)
      if (data.success) {
        yield put({ type: 'hideModal', payload: 'deleteModalVisible' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    * edit({
      payload,
    }, { call, put }) {
      const data = yield call(edit, payload)
      if (data.success) {
        yield put({ type: 'hideModal', payload: 'editModalVisible' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },

  },
  reducers: {

    showModal(state, { payload }) {
      return { ...state, ...payload, ModalValueRecord: payload.record, [payload.modalType]: true }
    },

    hideModal(state, { payload }) {
      console.log('hideModal______', payload)
      return { ...state, ...payload, [payload]: false }
    },

    switchIsMotion(state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
