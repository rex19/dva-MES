import modelExtend from 'dva-model-extend'
import {
  query,
  GetMaterialReceivingFormItemByFormIdForList,
  GetMovementRecordMaterialReceivingBackByWMSFormId,
  addKey
} from 'services/wmsSystem/rawMaterialReturnBillTable'
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
const TableName = 'rawMaterialReturnBill'
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
    rawMaterialReturnBillTableList: [],//原材料收货通知单
    rawMaterialReturnBill_DetailsTableList: [], //项目明细
    rawMaterialReturnBill_Details_InfoTableList: [] // 原材料已收货信息
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

    * GetMaterialReceivingFormItemByFormIdForList({
      payload,
    }, { call, put, select }) {

      const data = yield call(GetMaterialReceivingFormItemByFormIdForList, payload)
      // const pagination = yield select(state => state[TableName].pagination)
      if (data.Status !== 200) {
        return errorMessage(data.ErrorMessage || '查询失败')
      } else if (data.Status === 200) {
        const result = yield call(addKey, data.Data) //+1
        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'GetMaterialReceivingFormItemByFormIdForList',
            rawMaterialReturnBill_DetailsTableList: result,

          },
        })
        yield put({ type: 'loadingChanger', payload: 'closeLoading' })
      } else {
        throw data
      }
    },

    * GetMovementRecordMaterialReceivingBackByWMSFormId({
      payload,
    }, { call, put, select }) {

      const data = yield call(GetMovementRecordMaterialReceivingBackByWMSFormId, payload)
      // const pagination = yield select(state => state[TableName].pagination)
      if (data.Status !== 200) {
        return errorMessage(data.ErrorMessage || '查询失败')
      } else if (data.Status === 200) {
        const result = yield call(addKey, data.Data) //+1

        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'GetMovementRecordMaterialReceivingBackByWMSFormId',
            rawMaterialReturnBill_Details_InfoTableList: result,
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
          rawMaterialReturnBillTableList: payload.result,
          rawMaterialReturnBill_DetailsTableList: [],
          rawMaterialReturnBill_Details_InfoTableList: []
        }
      } else if (payload.type === 'GetMaterialReceivingFormItemByFormIdForList') {
        return {
          ...state, ...payload,
          rawMaterialReturnBill_DetailsTableList: payload.rawMaterialReturnBill_DetailsTableList,
          rawMaterialReturnBill_Details_InfoTableList: []
        }
      } else if (payload.type === 'GetMovementRecordMaterialReceivingBackByWMSFormId') {
        return { ...state, ...payload, rawMaterialReturnBill_Details_InfoTableList: payload.rawMaterialReturnBill_Details_InfoTableList }
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
        rawMaterialReturnBillTableList: [],
        rawMaterialReturnBill_DetailsTableList: [],
        rawMaterialReturnBill_Details_InfoTableList: []
      }
    }
  },
})



