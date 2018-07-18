import modelExtend from 'dva-model-extend'
import {
  RequestNeedView,

  PickBillLocationList,
  GetPickBillInChosenLocation,
  PickChosenBillRevocation,

  GetAllLineNamesForActiveWorkOrderCombox,
  GetActivedWorkOrderListOfLine,
  GetWorkOrderListForActive,
  GetSetupActivationInformationByWorkOrderAndStationNumber,
  GetStationInformationForSetupInformation,
  addKey
} from 'services/Ecall/electronicCallBoard'
import { pageModel } from 'models/common'
import { errorMessage, successMessage } from '../../components/Message/message.js'
import queryString from 'query-string'
import globalConfig from 'utils/config'
import axios from 'axios'
/**
 * TableName 表名
 * QueryResponseDTO 查询结果DTO
 * QueryRequestDTO  查询条件DTO
 * EditData   编辑Modal初始化数据的初始化值
 */
const TableName = 'electronicCallBoard'
const QueryResponseDTO = 'Tdto'
const QueryRequestDTO = 'TDto'
const EditData = {
  "Id": 7,
  "LocationNumber": "test001",
  "Description": "Y001",
  "Area": "电子仓库",
  "X": 1,
  "Y": 2,
  "Z": 3,
  "State": "正常",
  "CreateDateTime": "2017-12-14T00:00:00",
  "Creator": "admin",
  "Editor": null,
  "EditDateTime": "0001-01-01T00:00:00"
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
    list: [],
    AreaList: [],

    GetAllLineNamesInitData: [],
    GetStationInformationInitData: [],

    TableComponentsValueToActivatedWorkOrder: [],
    TableComponentsValueToOptionalWorkOrder: [],
    TableComponentsValueToWorkOrderSettingState: [],

    //ecall
    areaIdFormData: [],
    locationIdFormData: [],
    MaterialRequestFormId: [], //table上多选的行数据 id
    PreviewSubTableList: [] //配货单预览Table
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === `/Ecall/ElectronicCallBoard`) {
          console.log('ElectronicCallBoard=-')
          dispatch({
            type: 'InitQuery',
            payload: {
              areaNumber: '301'
            }
          })
        }
      })
    },
  },

  effects: {
    * InitQuery({
      payload,
    }, { call, put, select }) {
      // yield put({ type: 'loadingChanger', payload: 'showLoading' })
      // yield put({ type: 'tablePaginationChanger', payload: payload })

      const data = yield call(RequestNeedView, payload)
      console.log('InitQuery', data)
      // const pagination = yield select(state => state[TableName].pagination)
      const result = yield call(addKey, data.Data.requestNeedList) //+1
      // console.log('result', result)
      yield put({
        type: 'querySuccess',
        payload: {
          list: result,
        },
      })


      // const data = yield call(RequestNeedView, {})
      // console.log('PickBillLocationList2', data)
      // yield put({
      //   type: 'showFormData', payload: {
      //     modalType: 'InitFormData',

      //     areaIdFormData: data.Data.areaId,
      //     locationIdFormData: data.Data.locationId,
      //   }
      // })


      // const GetStationInformationForSetupInformationData = yield call(GetStationInformationForSetupInformation)
      // console.log('electronicCallBoard-model', GetAllLineNamesForActiveWorkOrderComboxData, GetStationInformationForSetupInformationData)
      // yield put({
      //   type: 'showFormData', payload: {
      //     modalType: 'InitWorkOrderFormData',
      //     GetAllLineNamesForActiveWorkOrderComboxData: GetAllLineNamesForActiveWorkOrderComboxData.Data,
      //     GetStationInformationForSetupInformationData: GetStationInformationForSetupInformationData.Data,
      //   }
      // })


      // const pagination = yield select(state => state[TableName].pagination)
      // const result = yield call(addKey, data.Data) //+1
      // console.log('result', result)
      // yield put({
      //   type: 'querySuccess',
      //   payload: {
      //     list: result,
      //     pagination: {
      //       PageIndex: Number(pagination.PageIndex) || 1,
      //       PageSize: Number(pagination.PageSize) || 10,
      //       total: data.Data.RowCount,
      //     },
      //   },
      // })
      // yield put({ type: 'loadingChanger', payload: 'closeLoading' })

    },


    * query({
      payload,
    }, { call, put, select }) {
      // yield put({ type: 'loadingChanger', payload: 'showLoading' })
      // yield put({ type: 'tablePaginationChanger', payload: payload })
      const data = yield call(GetPickBillInChosenLocation, payload)
      const pagination = yield select(state => state[TableName].pagination)
      const result = yield call(addKey, data.Data.requestFormList) //+1
      // console.log('result', result)
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
      // yield put({ type: 'loadingChanger', payload: 'closeLoading' })
    },

    // * create({
    //   payload,
    // }, { call, put, select }) {
    //   const data = yield call(create, payload)
    //   const pagination = yield select(state => state[TableName].pagination)
    //   if (data.Status !== 200) {
    //     return errorMessage(data.ErrorMessage || '创建失败')
    //   } else if (data.Status === 200) {
    //     yield put({ type: 'hideModal', payload: 'addModalVisible' })
    //     yield put({
    //       type: 'query', payload: {
    //         PageIndex: Number(pagination.PageIndex),
    //         PageSize: Number(pagination.PageSize),
    //         [QueryRequestDTO]: null
    //       }
    //     })
    //     return successMessage(data.ErrorMessage || '创建成功')
    //   } else {
    //     throw data
    //   }
    // },
    // * delete({
    //   payload,
    // }, { call, put, select }) {
    //   const data = yield call(deleted, payload.Id)
    //   const pagination = yield select(state => state[TableName].pagination)
    //   if (data.Status !== 200) {
    //     return errorMessage(data.ErrorMessage || '删除失败')
    //   } else if (data.Status === 200) {
    //     yield put({ type: 'hideModal', payload: 'deleteModalVisible' })
    //     yield put({
    //       type: 'query', payload: {
    //         PageIndex: Number(pagination.PageIndex),
    //         PageSize: Number(pagination.PageSize),
    //         [QueryRequestDTO]: null
    //       }
    //     })
    //     return successMessage(data.ErrorMessage || '删除成功')
    //   } else {
    //     throw data
    //   }
    // },
    // * edit({
    //   payload,
    // }, { call, put, select }) {
    //   const data = yield call(edit, payload)
    //   const pagination = yield select(state => state[TableName].pagination)
    //   if (data.Status !== 200) {
    //     return errorMessage(data.ErrorMessage || '编辑失败')
    //   } if (data.Status === 200) {
    //     yield put({ type: 'hideModal', payload: 'editModalVisible' })
    //     yield put({
    //       type: 'query', payload: {
    //         PageIndex: Number(pagination.PageIndex),
    //         PageSize: Number(pagination.PageSize),
    //         [QueryRequestDTO]: null
    //       }
    //     })
    //     return successMessage(data.ErrorMessage || '编辑成功')
    //   } else {
    //     throw data
    //   }
    // },
    * showModalAndAjax({
      payload,
    }, { call, put }) {
      if (payload.modalType === 'editModalVisible') {
        // const data = yield call(getEditModalData, payload.record.Id)
        // if (data.Status === 200) {
        //   console.log('showModalAndAjax-edit', data)
        yield put({ type: 'showModal', payload: payload })
        //   yield put({ type: 'showModalData', payload: { modalType: payload.modalType, data: data.Data } })
        // } else {
        //   throw data
        // }
      } else if (payload.modalType === 'addModalVisible') {
        // const data = yield call(getAddModalData)
        // if (data.Status === 200) {
        yield put({ type: 'showModal', payload: payload })
        // yield put({ type: 'showModalData', payload: { modalType: payload.modalType, data: data.Data } })
        // } else {
        //   throw data
        // }
      } else if (payload.modalType === 'detailsModalVisible') {
        console.log('detailsModalVisible--------`', payload.data)
        // const data = yield call(getDetailsModalData, payload.record.Id)
        // if (data.Status === 200) {
        yield put({ type: 'showModal', payload: payload })
        //   yield put({ type: 'showModalData', payload: { modalType: payload.modalType, data: data.Data } })
        // } else {
        //   throw data
        // }
      } else if (payload.modalType === 'Revoke') {
        console.log('Revoke!', payload.record.id)
        const data = yield call(PickChosenBillRevocation, payload.record.id)
        console.log('Revoke', data)
        // if (data.Status === 200) {
        // yield put({ type: 'showModal', payload: payload })
        //   yield put({ type: 'showModalData', payload: { modalType: payload.modalType, data: data.Data } })
        // } else {
        //   throw data
        // }
      }
    },


    * handleSearchFormComponents({
      payload,
    }, { call, put }) {
      if (payload.modalType === 'formComponentsValueToActivatedWorkOrder') {

        const data = yield call(GetActivedWorkOrderListOfLine, payload.Params)
        console.log('payload.modalType === formComponentsValueToActivatedWorkOrder', data)
        yield put({ type: 'showTableData', payload: { modalType: payload.modalType, data: data.Data } })
      } else if (payload.modalType === 'formComponentsValueToOptionalWorkOrder') {
        const data = yield call(GetWorkOrderListForActive, payload.Params)
        console.log('payload.modalType === formComponentsValueToOptionalWorkOrder', data)
        yield put({ type: 'showTableData', payload: { modalType: payload.modalType, data: data.Data } })
      } else if (payload.modalType === 'formComponentsValueToSettingState') {
        const data = yield call(GetSetupActivationInformationByWorkOrderAndStationNumber, payload.Params)
        yield put({ type: 'showTableData', payload: { modalType: payload.modalType, data: data.Data } })
      } else {
        throw data
      }

      // }
      // else if (payload.modalType === 'addModalVisible') {
      //   // const data = yield call(getAddModalData)
      //   // if (data.Status === 200) {
      //   yield put({ type: 'showModal', payload: payload })
      //   // yield put({ type: 'showModalData', payload: { modalType: payload.modalType, data: data.Data } })
      //   // } else {
      //   //   throw data
      //   // }
      // }
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

    //Form初始化数据
    showFormData(state, { payload }) {
      if (payload.modalType === 'InitFormData') {
        console.log('InitFormData', payload.aeraIdFormData, payload.locationIdFormData)
        return {
          ...state,
          ...payload,
          areaIdFormData: payload.areaIdFormData,
          locationIdFormData: payload.locationIdFormData,
          // GetAllLineNamesInitData: eval(payload.GetAllLineNamesForActiveWorkOrderComboxData.LineName),
          // GetStationInformationInitData: eval(payload.GetStationInformationForSetupInformationData.StationInformation)
        }
      }
    },
    //Modals初始化数据   不同table可能需要修改的reducers函数
    showModalData(state, { payload }) {
      if (payload.modalType === 'editModalVisible') {
        return { ...state, ...payload, AreaList: eval(payload.data.AreaList), EditData: payload.data.locationDto == null ? state.EditData : payload.data.locationDto }
      } else if (payload.modalType === 'addModalVisible') {
        return { ...state, ...payload, AreaList: eval(payload.data.AreaList) }
      } else if (payload.modalType === 'detailsModalVisible') {
        return { ...state, ...payload, DetailsData: payload.data }
      }
    },
    //Tables初始化数据
    showTableData(state, { payload }) {
      if (payload.modalType === 'formComponentsValueToActivatedWorkOrder') {
        return { ...state, ...payload, TableComponentsValueToActivatedWorkOrder: payload.data }
      } else if (payload.modalType === 'formComponentsValueToOptionalWorkOrder') {
        return { ...state, ...payload, TableComponentsValueToOptionalWorkOrder: payload.data }
      } else if (payload.modalType === 'formComponentsValueToSettingState') {
        return { ...state, ...payload, TableComponentsValueToWorkOrderSettingState: payload.data }
      } else if (payload.modalType === 'selectedRowKeysChanger') { //更改table选中的行id
        return { ...state, ...payload, MaterialRequestFormId: payload.data }
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
