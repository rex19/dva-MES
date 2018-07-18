import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router';
import {
  WMS_GetAreaListWeb,
  query,
  WMS_GetMaterialCheckBillGroupByFormId,
  WMS_SetMateriallCheckBillFormEnd,
  WMS_GetMaterialCheckInformationByMaterialIdForList,
  WMS_DoMateriallCheckBillContainerAdjust,
  WMS_SaveFileMaterialCheckBillGroupByFormId,

  GetPutStorageOfFinishedProduct_ProjectInfoList,
  GetPutStorageOfFinishedProduct_OutputMaterialBoxInfoList,
  addKey
} from 'services/wmsSystem/checkListTable'
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
const TableName = 'checkList'
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
    PutStorageOfFinishedProductList: [],
    PutStorageOfFinishedProduct_ProjectInfoList: [],
    PutStorageOfFinishedProduct_OutputMaterialBoxInfoList: [],

    checkListTableList: [],
    CheckList_ClassificationInfoList: [],
    CheckList_ScanRecordList: [],

    //盘点单
    AreaIdArray: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === `/wmsSystem/${TableName}`) {
          dispatch({
            type: 'WMS_GetAreaListWeb',
            payload: {}
          })
        }
      })
    },
  },


  effects: {
    * WMS_GetAreaListWeb({
      payload,
    }, { call, put, select }) {

      const data = yield call(WMS_GetAreaListWeb, payload)
      console.log('WMS_GetAreaListWeb', data)
      yield put({
        type: 'showFormData',
        payload: {
          modalType: 'InitFormData',
          AreaIdArray: data.Data,
        }
      })
    },

    * query({
      payload,
    }, { call, put, select }) {
      yield put({ type: 'loadingChanger', payload: 'showLoading' })
      yield put({ type: 'tablePaginationChanger', payload: payload })

      const data = yield call(query, payload)
      const pagination = yield select(state => state[TableName].pagination)
      console.log('query-+-', data, pagination)
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

    * WMS_GetMaterialCheckBillGroupByFormId({
      payload,
    }, { call, put, select }) {
      console.log('WMS_GetMaterialCheckBillGroupByFormId1', payload)
      const data = yield call(WMS_GetMaterialCheckBillGroupByFormId, payload)
      // const pagination = yield select(state => state[TableName].pagination)
      if (data.Status !== 200) {
        return errorMessage(data.ErrorMessage || '查询失败')
      } else if (data.Status === 200) {
        const result = yield call(addKey, data.Data) //+1
        console.log('WMS_GetMaterialCheckBillGroupByFormId++--', result)
        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'CheckList_ClassificationInfoList',
            CheckList_ClassificationInfoList: result,
          }
        })
        yield put({ type: 'loadingChanger', payload: 'closeLoading' })
      } else {
        throw data
      }
    },

    * WMS_GetMaterialCheckInformationByMaterialIdForList({
      payload,
    }, { call, put, select }) {

      const data = yield call(WMS_GetMaterialCheckInformationByMaterialIdForList, payload)
      // const pagination = yield select(state => state[TableName].pagination)
      if (data.Status !== 200) {
        return errorMessage(data.ErrorMessage || '查询失败')
      } else if (data.Status === 200) {
        const result = yield call(addKey, data.Data) //+1

        yield put({
          type: 'querySuccessed',
          payload: {
            type: 'CheckList_ScanRecordList',
            CheckList_ScanRecordList: result,
          },
        })
        yield put({ type: 'loadingChanger', payload: 'closeLoading' })
      } else {
        throw data
      }
    },
    //固化报告
    * WMS_SetMateriallCheckBillFormEnd({
      payload,
    }, { call, put, select }) {

      const data = yield call(WMS_SetMateriallCheckBillFormEnd, payload)
      console.log('WMS_SetMateriallCheckBillFormEnd', data)
      // const pagination = yield select(state => state[TableName].pagination)
      if (data.Status !== 200) {
        return errorMessage(data.ErrorMessage || '查询失败')
      } else if (data.Status === 200) {
        if (data.Data.ReturnCode === 0) {
          return errorMessage(data.Data.Message || 'success')
        } else {
          return errorMessage(data.Data.Message + '。' || '查询失败')
        }

      } else {
        throw data
      }
    },
    //生成文件
    * WMS_SaveFileMaterialCheckBillGroupByFormId({
      payload,
    }, { call, put, select }) {

      const data = yield call(WMS_SaveFileMaterialCheckBillGroupByFormId, payload)
      console.log('WMS_SaveFileMaterialCheckBillGroupByFormId', data)
      // const pagination = yield select(state => state[TableName].pagination)
      if (data.Status !== 200) {
        return errorMessage(data.ErrorMessage || '失败')
      } else if (data.Status === 200) {
        if (data.Data.ReturnCode === 0) {
          const DownLoadFileUrl = data.Data.DownLoadFileUrl
          window.location = DownLoadFileUrl;
          // return errorMessage(data.Data.Message || 'success')
        } else {
          return errorMessage(data.Data.Message + '。' || '查询失败')
        }
      } else {
        throw data
      }
    },

    //调整
    * WMS_DoMateriallCheckBillContainerAdjust({
     payload,
   }, { call, put, select }) {

      const data = yield call(WMS_DoMateriallCheckBillContainerAdjust, payload)
      console.log('WMS_DoMateriallCheckBillContainerAdjust', data)
      // const pagination = yield select(state => state[TableName].pagination)
      if (data.Status !== 200) {
        return errorMessage(data.ErrorMessage || '查询失败')
      } else if (data.Status === 200) {
        if (data.Data.ReturnCode === 0) {
          yield put({
            type: `WMS_GetMaterialCheckBillGroupByFormId`,
            payload: {
              Id: payload.MaterialCheckBillFormId
            }
          })
          return errorMessage(data.Data.Message || 'success')

        } else {
          return errorMessage(data.Data.Message + '。' || '查询失败')
        }

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
          checkListTableList: payload.result,
          CheckList_ClassificationInfoList: [],
          CheckList_ScanRecordList: []



        }
      } else if (payload.type === 'CheckList_ClassificationInfoList') {
        return {
          ...state, ...payload,
          CheckList_ClassificationInfoList: payload.CheckList_ClassificationInfoList,
          CheckList_ScanRecordList: []
        }
      } else if (payload.type === 'CheckList_ScanRecordList') {
        return {
          ...state, ...payload,
          CheckList_ScanRecordList: payload.CheckList_ScanRecordList,
        }
      }
    },
    //Form初始化数据
    showFormData(state, { payload }) {
      if (payload.modalType === 'InitFormData') {
        return {
          ...state,
          ...payload,
          AreaIdArray: payload.AreaIdArray
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
    }
  },
})
