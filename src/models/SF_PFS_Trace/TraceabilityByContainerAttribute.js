import modelExtend from 'dva-model-extend'
// import { query, create, deleted, edit, getAddModalData, getEditModalData, getDetailsModalData, addKey } from 'services/stationTable'
import { GetContainerAttributeList, GetContainerInformationByAttribute, addKey } from 'services/SF_PFS_Trace/TraceByAttribute'
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
const TableName = 'traceabilityByContainerAttribute'
const QueryResponseDTO = 'Tdto'
const QueryRequestDTO = 'TDto'
const EditData = {

  "State": 1,
  "FactoryId": "1"
}

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
    DetailsData: {},
    //每个table可能不同的变量字段
    SelectInitData: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === `/SF_PFS_Trace/TraceabilityByContainerAttribute`) {
          console.log('/SF_PFS_Trace/${TableName}')
          dispatch({
            type: 'InitQuery',
            // payload: {
            //   PageIndex: Number(globalConfig.table.paginationConfig.PageIndex), //当前页数
            //   PageSize: Number(globalConfig.table.paginationConfig.PageSize),// 表格每页显示多少条数据
            //   [QueryRequestDTO]: null
            // }
          })

          dispatch({
            type: 'querySuccess',
            payload: {
              list: [],
            },
          })
        }
      })
    },
  },

  effects: {
    * InitQuery({
      payload,
    }, { call, put, select }) {
      const data = yield call(GetContainerAttributeList, payload)
      console.log('traceabilityByContainerAttribute-query', data)
      // const pagination = yield select(state => state[TableName].pagination)
      if (data.ReturnCode !== 0) {
        return errorMessage(data.Message || '查询失败')
      } else if (data.ReturnCode === 0) {
        yield put({
          type: 'InitQueryReducers',
          payload: {
            SelectInitData: data.AttributeCodeListData,
            type: 'InitQuery'
          },
        })
      } else {
        throw data
      }
    },

    * GetContainerInformationByAttributeQuery({
      payload,
    }, { call, put, select }) {
      yield put({ type: 'loadingChanger', payload: 'showLoading' })
      yield put({ type: 'tablePaginationChanger', payload: payload })
      const data = yield call(GetContainerInformationByAttribute, payload)
      console.log('GetContainerInformationByAttribute-query', data)
      // const pagination = yield select(state => state[TableName].pagination)
      if (data.ReturnCode !== 0) {
        return errorMessage(data.Message || '查询失败')
        yield put({ type: 'loadingChanger', payload: 'closeLoading' })
      } else if (data.ReturnCode === 0) {
        const result = yield call(addKey, data.ContainerInformationData) //+1

        yield put({
          type: 'querySuccess',
          payload: {
            list: result,
          },
        })
        yield put({ type: 'loadingChanger', payload: 'closeLoading' })
      } else {
        throw data
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
        return { ...state, ...payload, TotalStationGroup: eval(payload.data.TotalStationGroup), SelectedStationGroup: eval(payload.data.SelectedStationGroup), EditData: payload.data.Station == null ? state.EditData : payload.data.Station }
      } else if (payload.modalType === 'addModalVisible') {
        return { ...state, ...payload, TotalStationGroup: eval(payload.data.TotalStationGroup) }
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
    InitQueryReducers(state, { payload }) {
      if (payload.type === 'InitQuery') {
        console.log('InitQueryReducers--+', payload)
        return { ...state, ...payload, SelectInitData: payload.SelectInitData }
      }
    },
    //改变table pageIndex pageSize
    tablePaginationChanger(state, { payload }) {
      return { ...state, ...payload, pagination: { PageIndex: payload.PageIndex, PageSize: payload.PageSize } }
    }
  },
})
