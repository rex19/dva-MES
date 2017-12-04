import modelExtend from 'dva-model-extend'
import { query, create, deleted, edit, getModalData, addKey } from 'services/staffTable'
import { pageModel } from 'models/common'
import queryString from 'query-string'

export default modelExtend(pageModel, {

  namespace: 'staffTable',
  state: {
    mockData: [],
    targetKeys: [],
    addModalVisible: false,
    editModalVisible: false,
    detailsModalVisible: false,
    deleteModalVisible: false,
    modalType: 'create',
    role: [],
    platfrom: [],
    ModalValueRecord: {
      UserID: 1,
      UserName: '1',
      PlatformID: '1',
      EmailAddress: '111',
      Phone: '112',
      UserState: 1,
      LastLoginTime: '123',
      CreateTime: '123',
      Createor: '115',
      EditTime: '114',
      Editor: 9,
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/masterdata/staffTable') {
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
      if (data.Status === 200) {
        const result = yield call(addKey, data.Data.Userdto)
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
      console.log('  * delete', payload)
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
    * showModalAndAjax({
      payload,
    }, { call, put }) {
      const data = yield call(getModalData)
      if (data.success) {
        yield put({ type: 'showModal', payload: payload })
        yield put({ type: 'showModalData', payload: data.Data })
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
      return { ...state, ...payload, [payload]: false }
    },

    showModalData(state, { payload }) {
      return { ...state, ...payload, role: eval(payload.Role), platfrom: eval(payload.Plarfrom) }
    },

    switchIsMotion(state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },

  },
})
