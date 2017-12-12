import modelExtend from 'dva-model-extend'
import { query, create, deleted, edit, getAddModalData, getEditModalData, getDetailsModalData, addKey } from 'services/roleTable'
import { pageModel } from 'models/common'
import { errorMessage } from '../components/Message/message.js'
import queryString from 'query-string'

const TableName = 'roleTable'

export default modelExtend(pageModel, {

  namespace: TableName,
  state: {
    addModalVisible: false,
    editModalVisible: false,
    detailsModalVisible: false,
    deleteModalVisible: false,
    modalType: 'create',
    TotalMultiselectData: [],
    AllocatedMultiselectData: [],
    platfrom: [],
    EditData: {
      "Id": 2,
      "RoleName": "testRole",
      "State": 1,
      "PlatfromId": "1",
      "PlatfromName": "adm管理",
      "CreationDateTime": "2017-11-01T15:36:38",
      "Creator": "admin",
      "EditDateTime": "2017-12-09T13:29:12.6622339",
      "Editor": "",
      "User": "1"
    },
    DetailsData: {}
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === `/masterdata/${TableName}`) {
          dispatch({
            type: 'query',
            payload: {
              PageIndex: 1,  //第几页
              PageSize: 20,  //多少行
              TDto: null
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
        const result = yield call(addKey, data.Data.Roledto) //+1
        yield put({
          type: 'querySuccess',
          payload: {
            list: result,
            pagination: {
              current: Number(payload.pageSize) || 1,
              pageSize: Number(payload.PageIndex) || 10,
              total: data.Data.RowCount,
            },
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
        const data = yield call(getEditModalData, payload.record.Id)
        if (data.Status === 200) {
          yield put({ type: 'showModal', payload: payload })
          yield put({ type: 'showModalData', payload: { modalType: payload.modalType, data: data.Data } })
        } else {
          throw data
        }
      } else if (payload.modalType === 'addModalVisible') {

        const data = yield call(getAddModalData)
        if (data.Status === 200) {
          yield put({ type: 'showModal', payload: payload })
          yield put({ type: 'showModalData', payload: { modalType: payload.modalType, data: data.Data } })
        } else {
          throw data
        }
      } else if (payload.modalType === 'detailsModalVisible') {
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
        return { ...state, ...payload, TotalMultiselectData: eval(payload.data.TotalUser), AllocatedMultiselectData: eval(payload.data.AllocatedUser), platfrom: eval(payload.data.TotalPlatfrom), EditData: payload.data.Role }
      } else if (payload.modalType === 'addModalVisible') {
        console.log('else if (payload.modalType==addModalVisible', payload)
        return { ...state, ...payload, TotalMultiselectData: eval(payload.data.TotalUser), platfrom: eval(payload.data.TotalPlatfrom) }
      } else if (payload.modalType === 'detailsModalVisible') {
        console.log('else if (payload.modalType === detailsModalVisible) {', payload)
        return { ...state, ...payload, DetailsData: payload.data }
      }
    },
  },
})
