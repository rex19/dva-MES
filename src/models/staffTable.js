import modelExtend from 'dva-model-extend'
import { query, create, deleted, edit, getAddModalData, getEditModalData, getDetailsModalData, addKey } from 'services/staffTable'
import { pageModel } from 'models/common'
import { errorMessage } from '../components/Message/message.js'
import queryString from 'query-string'

export default modelExtend(pageModel, {

  namespace: 'staffTable',
  state: {
    addModalVisible: false,
    editModalVisible: false,
    detailsModalVisible: false,
    deleteModalVisible: false,
    modalType: 'create',
    role: [],
    allocatedRole: [],
    platfrom: [],
    EditData: {
      "Id": 1,
      "Account": "sample string 2",
      "UserName": "sample string 3",
      "Password": "sample string 4",
      "PlatfromId": 0,
      "EmailAddress": "sample string 6",
      "Phone": "sample string 7",
      "CreationDateTime": "2017-12-11T18:37:26.6857026+08:00",
      "LastLoginTime": "2017-12-11T18:37:26.6857026+08:00",
      "State": 0
    },
    DetailsData: {},
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
        const result = yield call(addKey, data.Data.Tdto)
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
      if (data.Status === 200) {
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
      const data = yield call(deleted, payload.Id)
      if (data.Status !== 200) {
        return errorMessage(data.ErrorMessage)
      } else if (data.Status === 200) {
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
      if (data.Status !== 200) {
        return errorMessage(data.ErrorMessage)
      } else if (data.Status === 200) {
        yield put({ type: 'hideModal', payload: 'editModalVisible' })
        yield put({ type: 'query' })
      } else {
        throw data
      }
    },
    * showModalAndAjax({
      payload,
    }, { call, put }) {
      if (payload.modalType === 'editModalVisible') {
        console.log('payload.modalType ===editModalVisible,', payload)
        const data = yield call(getEditModalData, payload.record.Id)
        if (data.Status === 200) {
          yield put({ type: 'showModal', payload: payload })
          yield put({ type: 'showModalData', payload: { modalType: payload.modalType, data: data.Data } })
        } else {
          throw data
        }
      } else if (payload.modalType === 'addModalVisible') {

        const data = yield call(getAddModalData)
        console.log('showModalAndAjax==addModalVisible', payload, data)
        if (data.Status === 200) {
          yield put({ type: 'showModal', payload: payload })
          yield put({ type: 'showModalData', payload: { modalType: payload.modalType, data: data.Data } })
        } else {
          throw data
        }
      } else if (payload.modalType === 'detailsModalVisible') {
        console.log('showModalAndAjax==detailsModalVisible', payload)
        const data = yield call(getDetailsModalData, payload.record.Id)
        if (data.Status === 200) {
          yield put({ type: 'showModal', payload: payload })
          yield put({ type: 'showModalData', payload: { modalType: payload.modalType, data: data.Data } })
        } else {
          throw data
        }
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
      if (payload.modalType === 'editModalVisible') {
        console.log('else if (payload.modalType==editModalVisible', payload)
        return { ...state, ...payload, role: eval(payload.data.TotalRole), platfrom: eval(payload.data.TotalPlatfrom), allocatedRole: eval(payload.data.AllcatedRole), EditData: payload.data.UserInitilizeDTO }
      } else if (payload.modalType === 'addModalVisible') {
        console.log('else if (payload.modalType==addModalVisible', payload)
        return { ...state, ...payload, role: eval(payload.data.TotalRole), platfrom: eval(payload.data.TotalPlatfrom) }
      } else if (payload.modalType === 'detailsModalVisible') {
        console.log('else if (payload.modalType === detailsModalVisible) {', payload)
        return { ...state, ...payload, DetailsData: payload.data }
      }
    },

    switchIsMotion(state) {
      window.localStorage.setItem(`${prefix}userIsMotion`, !state.isMotion)
      return { ...state, isMotion: !state.isMotion }
    },
  },
})
