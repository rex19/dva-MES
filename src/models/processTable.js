import modelExtend from 'dva-model-extend'
import { query, create, deleted, edit, getAddModalData, getEditModalData, getDetailsModalData, addKey } from 'services/processTable'
import { pageModel } from 'models/common'
import { errorMessage, successMessage } from '../components/Message/message.js'
import queryString from 'query-string'
import globalConfig from 'utils/config'
/**
 * TableName 表名
 * QueryResponseDTO 查询结果DTO
 * QueryRequestDTO  查询条件DTO
 * EditData   编辑Modal初始化数据的初始化值
 */
const TableName = 'processTable'
const QueryResponseDTO = 'Tdto'
const QueryRequestDTO = 'TDto'
const EditData = {
  "Process": {
    "Id": 1,
    "ProcessNumber": "test001",
    "MaterialNumber": "test001KeyBoard",
    "Factory": "车间",
    "State": "正常",
    "ValidBegin": "0001-01-01T00:00:00",
    "ValidEnd": "0001-01-01T00:00:00",
    "CreationDateTime": "2017-12-20T00:00:00",
    "EditDateTime": "0001-01-01T00:00:00",
    "Editor": null
  },
  "ProcessStep": [
    {
      "Secquence": 1,
      "Description": "teststep",
      "StationGroupId": "0010401",
      "IsMandatory": "True",
      "IsNeedSetupCheck": "True",
      "IsBackflush": "True",
      "Side": 1,
      "MaximumTestCount": 10,
      "Editor": "admin",
      "EditDateTime": "0001-01-01T00:00:00"
    }
  ]
}
// const isClose = () => {
//   return Cookie.get('user_session') && Cookie.get('user_session') > new Date().getTime()
// }

export default modelExtend(pageModel, {

  namespace: TableName,
  state: {
    tableLoading: false,
    addModalVisible: false,
    editModalVisible: false,
    detailsModalVisible: false,
    deleteModalVisible: false,
    modalType: 'create',
    pagination: {
      PageIndex: Number(globalConfig.table.paginationConfig.PageIndex) || 1, //当前页数
      PageSize: Number(globalConfig.table.paginationConfig.PageSize) || 10,// 表格每页显示多少条数据
      Total: Number(globalConfig.table.paginationConfig.Total) || 10,  //总条数
    },
    EditData: EditData,
    DetailsData: {
      Process: {},
      ProcessStep: [{}]
    },
    //每个table可能不同的变量字段
    MaterialNumber: [],
    StationGroup: [],
    AddProcessStepDataSource: [],
    EditProcessStepDataSource: [],
    // ModalsClosed: !!isClose(),  https://github.com/pmg1989/dva-admin/blob/master/src/models/app.js
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === `/masterdata/${TableName}`) {
          dispatch({
            type: 'query',
            payload: {
              PageIndex: Number(globalConfig.table.paginationConfig.PageIndex), //当前页数
              PageSize: Number(globalConfig.table.paginationConfig.PageSize),// 表格每页显示多少条数据
              [QueryRequestDTO]: null
            }
          })
        }
      })
    },

    // setup ({ dispatch }) {
    //   dispatch({ type: 'query' })
    //   let tid
    //   window.onresize = () => {
    //     clearTimeout(tid)
    //     tid = setTimeout(() => {
    //       dispatch({ type: 'changeNavbar' })
    //     }, 300)
    //   }
    // },

  },

  effects: {
    * query({
      payload,
    }, { call, put, select }) {
      yield put({ type: 'loadingChanger', payload: 'showLoading' })
      yield put({ type: 'tablePaginationChanger', payload: payload })
      const data = yield call(query, payload)
      const pagination = yield select(state => state[TableName].pagination)
      if (data.Status !== 200) {
        return errorMessage(data.ErrorMessage || '查询失败')
      } else if (data.Status === 200) {
        const result = yield call(addKey, data.Data[QueryResponseDTO]) //+1
        yield put({
          type: 'querySuccess',
          payload: {
            list: result,
            pagination: {
              PageIndex: Number(pagination.PageIndex) || 1,
              PageSize: Number(pagination.PageSize) || 10,
              total: data.Data.RowCount,
            },
          },
        })
        yield put({ type: 'loadingChanger', payload: 'closeLoading' })
      } else {
        throw data
      }
    },
    * create({
      payload,
    }, { call, put, select }) {
      const data = yield call(create, payload)
      const pagination = yield select(state => state[TableName].pagination)
      if (data.Status !== 200) {
        return errorMessage(data.ErrorMessage || '创建失败')
      } else if (data.Status === 200) {
        yield put({ type: 'hideModal', payload: 'addModalVisible' })
        yield put({
          type: 'query', payload: {
            PageIndex: Number(pagination.PageIndex),
            PageSize: Number(pagination.PageSize),
            [QueryRequestDTO]: null
          }
        })
        return successMessage(data.ErrorMessage || '创建成功')
      } else {
        throw data
      }
    },
    * delete({
      payload,
    }, { call, put, select }) {
      const data = yield call(deleted, payload.Id)
      const pagination = yield select(state => state[TableName].pagination)
      if (data.Status !== 200) {
        return errorMessage(data.ErrorMessage || '删除失败')
      } else if (data.Status === 200) {
        yield put({ type: 'hideModal', payload: 'deleteModalVisible' })
        yield put({
          type: 'query', payload: {
            PageIndex: Number(pagination.PageIndex),
            PageSize: Number(pagination.PageSize),
            [QueryRequestDTO]: null
          }
        })
        return successMessage(data.ErrorMessage || '删除成功')
      } else {
        throw data
      }
    },
    * edit({
      payload,
    }, { call, put, select }) {
      const data = yield call(edit, payload)
      const pagination = yield select(state => state[TableName].pagination)
      if (data.Status !== 200) {
        return errorMessage(data.ErrorMessage || '编辑失败')
      } if (data.Status === 200) {
        yield put({ type: 'hideModal', payload: 'editModalVisible' })
        yield put({
          type: 'query', payload: {
            PageIndex: Number(pagination.PageIndex),
            PageSize: Number(pagination.PageSize),
            [QueryRequestDTO]: null
          }
        })
        return successMessage(data.ErrorMessage || '编辑成功')
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
    //打开关闭Modals
    showModal(state, { payload }) {
      return { ...state, ...payload, [payload.modalType]: true }
    },
    hideModal(state, { payload }) {
      return { ...state, ...payload, [payload]: false }
    },
    //Modals初始化数据   不同table可能需要修改的reducers函数
    showModalData(state, { payload }) {
      if (payload.modalType === 'editModalVisible') {
        return { ...state, ...payload, MaterialNumber: eval(payload.data.MaterialNumber), StationGroup: eval(payload.data.StationGroup), EditData: payload.data.ProcessAndProcessStep == null ? state.EditData : payload.data.ProcessAndProcessStep }
      } else if (payload.modalType === 'addModalVisible') {
        return { ...state, ...payload, MaterialNumber: eval(payload.data.MaterialNumber), StationGroup: eval(payload.data.StationGroup) }
      } else if (payload.modalType === 'detailsModalVisible') {
        return { ...state, ...payload, DetailsData: payload.data }
      }
    },
    //teble loading处理
    loadingChanger(state, { payload }) {
      if (payload === 'showLoading') {
        return { ...state, ...payload, tableLoading: true }
      } else if (payload === 'closeLoading') {
        return { ...state, ...payload, tableLoading: false }
      }
    },
    //改变table pageIndex pageSize
    tablePaginationChanger(state, { payload }) {
      return { ...state, ...payload, pagination: { PageIndex: payload.PageIndex, PageSize: payload.PageSize } }
    },
    //改变editable的datasource
    editableDataChanger(state, { payload }) {
      if (payload.type === 'RowEditableAddTable') {
        return { ...state, ...payload, AddProcessStepDataSource: payload.ProcessStepDataSource }
      } else if (payload.type === 'RowEditableEditTable') {
        console.log('payload.type === RowEditableEditTable', payload)
        return { ...state, ...payload, EditProcessStepDataSource: payload.ProcessStepDataSource }
      }
    },
  },
})
