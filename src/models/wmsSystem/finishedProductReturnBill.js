import modelExtend from 'dva-model-extend'
import {
  query,
  GetProductDeliveryRequestBackFormItemByFormIdForList,
  GetMovementRecordProductDeliveryRequestBackByWMSFormId,
  addKey
} from 'services/wmsSystem/finishedProductReturnBillTable'
import { pageModel } from 'models/common'
import { errorMessage, successMessage } from '../../components/Message/message.js'
import queryString from 'query-string'
import globalConfig from 'utils/config'

/**
 * TableName 表名
 * QueryResponseDTO 查询结果DTO
 * QueryRequestDTO  查询条件DTO
 * EditData   编辑Modal初始化数据的初始化值
 */
const TableName = 'finishedProductReturnBill'
const QueryResponseDTO = 'Tdto'
const QueryRequestDTO = 'TDto'


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
    DetailsData: {},
    // list: []
    //每个table可能不同的变量字段

    queryParams: {},
    finishedProductReturnBillTableList: [],//原材料收货通知单
    finishedProductReturnBill_DetailsTableList: [], //项目明细
    finishedProductReturnBill_Details_InfoTableList: [] // 原材料已收货信息
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname !== `/wmsSystem/${TableName}`) {
          dispatch({
            type: 'ClearDataChanger',
            payload: {}
          })
        }
      })
    },
  },

  effects: {
    * query({
      payload,
    }, { call, put, select }) {
      yield put({ type: 'loadingChanger', payload: 'showLoading' })
      yield put({ type: 'tablePaginationChanger', payload: payload })
      yield put({
        type: 'ChangerState',
        payload: {
          modalType: 'queryParams',
          Params: payload
        }
      })
      const data = yield call(query, payload)
      const pagination = yield select(state => state[TableName].pagination)
      if (data.Status !== 200) {
        return errorMessage(data.ErrorMessage || '查询失败')
      } else if (data.Status === 200) {
        const result = yield call(addKey, data.Data[QueryResponseDTO]) //+1
        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'Init',
            result: result,
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

    * GetProductDeliveryRequestBackFormItemByFormIdForList({
      payload,
    }, { call, put, select }) {

      const data = yield call(GetProductDeliveryRequestBackFormItemByFormIdForList, payload)
      // const pagination = yield select(state => state[TableName].pagination)
      if (data.Status !== 200) {
        return errorMessage(data.ErrorMessage || '查询失败')
      } else if (data.Status === 200) {
        const result = yield call(addKey, data.Data) //+1
        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'GetProductDeliveryRequestBackFormItemByFormIdForList',
            finishedProductReturnBill_DetailsTableList: result,
            // pagination: {
            //   PageIndex: Number(pagination.PageIndex) || 1,
            //   PageSize: Number(pagination.PageSize) || 10,
            //   total: data.Data.RowCount,
            // },
          },
        })
        yield put({ type: 'loadingChanger', payload: 'closeLoading' })
      } else {
        throw data
      }
    },

    * GetMovementRecordProductDeliveryRequestBackByWMSFormId({
      payload,
    }, { call, put, select }) {

      const data = yield call(GetMovementRecordProductDeliveryRequestBackByWMSFormId, payload)
      // const pagination = yield select(state => state[TableName].pagination)
      if (data.Status !== 200) {
        return errorMessage(data.ErrorMessage || '查询失败')
      } else if (data.Status === 200) {
        const result = yield call(addKey, data.Data) //+1

        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'GetMovementRecordProductDeliveryRequestBackByWMSFormId',
            finishedProductReturnBill_Details_InfoTableList: result,
            // pagination: {
            //   PageIndex: Number(pagination.PageIndex) || 1,
            //   PageSize: Number(pagination.PageSize) || 10,
            //   total: data.Data.RowCount,
            // },
          },
        })
        yield put({ type: 'loadingChanger', payload: 'closeLoading' })
      } else {
        throw data
      }
    },
  },
  reducers: {
    querySuccessed(state, { payload }) {
      if (payload.type === 'Init') {
        return {
          ...state, ...payload,
          finishedProductReturnBillTableList: payload.result,
          finishedProductReturnBill_DetailsTableList: [],
          finishedProductReturnBill_Details_InfoTableList: []
        }
      } else if (payload.type === 'GetProductDeliveryRequestBackFormItemByFormIdForList') {
        return {
          ...state, ...payload,
          finishedProductReturnBill_DetailsTableList: payload.finishedProductReturnBill_DetailsTableList,
          finishedProductReturnBill_Details_InfoTableList: []
        }
      } else if (payload.type === 'GetMovementRecordProductDeliveryRequestBackByWMSFormId') {
        return { ...state, ...payload, finishedProductReturnBill_Details_InfoTableList: payload.finishedProductReturnBill_Details_InfoTableList }
      }

    },
    ChangerState(state, { payload }) {
      if (payload.modalType === 'queryParams') {
        return {
          ...state, ...payload, [payload]: false, queryParams: payload.Params
        }
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
    // 离开页面清空
    ClearDataChanger(state, { payload }) {
      return {
        ...state, ...payload,
        finishedProductReturnBillTableList: [],
        finishedProductReturnBill_DetailsTableList: [],
        finishedProductReturnBill_Details_InfoTableList: []
      }
    }
  },
})



