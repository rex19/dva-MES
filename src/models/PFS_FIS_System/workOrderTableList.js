import modelExtend from 'dva-model-extend'
import {
  query,
  InitialQuery,
  GetLineListAndShiftListForCreateWorkOrder,
  GetPartInformationListForCreateWorkOrder,
  GetProcessListForCreateWorkOrder,
  CreateWorkOrder,
  GetBaseLineInformation,
  GetWorkOrderInformationForEdit,//修改modal初始化数据
  EditWorkOrder,
  ActiveWorkOrderToGetWorkOrderPerformanceDataLine,
  getAddModalData, getEditModalData, getDetailsModalData, addKey
} from 'services/PFS_FIS_System/workOrderTableListTable'
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
const TableName = 'workOrderTableList'
const QueryResponseDTO = 'Tdto'
const QueryRequestDTO = 'TDto'
const EditData = {
  "PartId": 0,
  "PartNumber": "0",
  "Version": 0,
  "WorkOrderNumber": "000",
  "WorkOrderState": "[\"已计划\"]",
  "Quantity": 0,
  "LineCode": "0",
  "LineName": "0",
  "ShiftCode": "0",
  "ShiftName": "0",
  "PlanStartDateTime": "0",
  "PlanEndDateTime": "0",
  "Comment": "000"
}
const DetailsData = {
  "WorkOrderState": "",
  "PartNumber": "",
  "PartDescription": "",
  "ProcessNumber": "",
  "PlannedQuantity": 0,
  "LineName": "",
  "ShiftName": "",
  "PlanStartDateTime": "",
  "PlanEndDateTime": "",
  "ActualStartDateTime": "",
  "ActualEndDateTime": "",
  "Comment": "备注",
  "CycleTimeInTheory": 0,
  "ActualCycleTime": 0,
  "OEEInTheory": 0,
  "ActualOEE": 0,
  "FPY": 0,
  "GoodRate": 0,
  "EachStationPerformanceData": []
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

    DetailsData: DetailsData,
    //每个table可能不同的变量字段
    list: [],
    AreaList: [],

    LineNames: [],
    ShiftNames: [],
    addModalLineNames: [],
    addModalShiftNames: [],
    VMPartInformation: [],
    VMProcessInformation: [],
    CycleTimeInTheory: 0,
    OEEInTheory: 0,

    EditAllLineNames: [],
    EditAllShiftNames: [],
    EditAllWorkOrderStates: [],
    EditData: EditData,
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === `/PFS_FIS_System/${TableName}`) {
          dispatch({
            type: 'InitialQuery',
          })
          // dispatch({
          //   type: 'query',
          //   payload: {
          //     PageIndex: Number(globalConfig.table.paginationConfig.PageIndex), //当前页数
          //     PageSize: Number(globalConfig.table.paginationConfig.PageSize),// 表格每页显示多少条数据
          //     [QueryRequestDTO]: null
          //   }
          // })
        }
      })
    },
  },

  effects: {
    * InitialQuery({
      payload,
    }, { call, put, select }) {

      const data = yield call(InitialQuery, payload)
      console.log('data---', data)
      console.log('InitialQuery', data)
      yield put({
        type: 'showModalData',
        payload: {
          Data: data.Data,
          modalType: 'InitialQueryData'
        },
      })
    },
    * query({
      payload,
    }, { call, put, select }) {
      yield put({ type: 'loadingChanger', payload: 'showLoading' })
      yield put({ type: 'tablePaginationChanger', payload: payload })

      const data = yield call(query, payload)
      console.log('SearchTableList-query', payload, data)
      const pagination = yield select(state => state[TableName].pagination)
      const result = yield call(addKey, data.Data.WorkOrderList) //+1
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

    },

    * create({
      payload,
    }, { call, put, select }) {

      const data = yield call(CreateWorkOrder, payload)
      console.log('create----', payload, data)
      // const pagination = yield select(state => state[TableName].pagination)
      if (data.ReturnCode !== 0) {
        return errorMessage(data.ErrorMessage || '创建失败')
      } else if (data.ReturnCode === 0) {
        yield put({ type: 'hideModal', payload: 'addModalVisible' })
        // yield put({
        //   type: 'query', payload: {
        //     PageIndex: Number(pagination.PageIndex),
        //     PageSize: Number(pagination.PageSize),
        //     [QueryRequestDTO]: null
        //   }
        // })
        return successMessage(data.ErrorMessage || '创建成功')
      } else {
        throw data
      }
    },

    * edit({
        payload,
      }, { call, put, select }) {
      const data = yield call(EditWorkOrder, payload)
      console.log('edit----', payload, data)
      // const pagination = yield select(state => state[TableName].pagination)
      if (data.ReturnCode !== 0) {
        return errorMessage(data.ErrorMessage || '编辑失败')
      } else if (data.ReturnCode === 0) {
        yield put({ type: 'hideModal', payload: 'editModalVisible' })
        // yield put({
        //   type: 'query', payload: {
        //     PageIndex: Number(pagination.PageIndex),
        //     PageSize: Number(pagination.PageSize),
        //     [QueryRequestDTO]: null
        //   }
        // })
        return successMessage(data.ErrorMessage || '编辑成功')
      } else {
        throw data
      }
    },
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
        const data = yield call(GetWorkOrderInformationForEdit, payload)
        // if (data.Status === 200) {
        console.log('showModalAndAjax-edit', data)
        yield put({ type: 'showModal', payload: payload })
        yield put({ type: 'showModalData', payload: { modalType: payload.modalType, data: data.Data } })
        // } else {
        //   throw data
        // }
      } else if (payload.modalType === 'addModalVisible') {
        const data = yield call(GetLineListAndShiftListForCreateWorkOrder)
        // if (data.Status === 200) {
        yield put({ type: 'showModal', payload: payload })
        yield put({
          type: 'showModalData', payload: {
            modalType: payload.modalType,
            Data: data.Data
          }
        })
      } else if (payload.modalType === 'detailsModalVisible') {
        const data = yield call(ActiveWorkOrderToGetWorkOrderPerformanceDataLine, payload.record.WorkOrderNumber)
        console.log('showModalAndAjax-details', data, payload)
        yield put({ type: 'showModal', payload: payload })
        yield put({ type: 'showModalData', payload: { modalType: payload.modalType, data: data.Data } })

        //根据成品半成品料号查询成品半成品列表的下拉菜单数据
      } else if (payload.modalType === 'SearchGetPartInformationListForCreateWorkOrder') {
        const GetPartInformationListForCreateWorkOrderData = yield call(GetPartInformationListForCreateWorkOrder, payload.params)
        console.log('SearchGetPartInformationListForCreateWorkOrder', GetPartInformationListForCreateWorkOrderData)
        yield put({
          type: 'showModalData', payload: {
            modalType: 'SearchGetPartInformationListForCreateWorkOrder',
            Data: GetPartInformationListForCreateWorkOrderData.Data
          }
        })

        const GetProcessListForCreateWorkOrderData = yield call(GetProcessListForCreateWorkOrder, payload.params)
        yield put({
          type: 'showModalData', payload: {
            modalType: 'SearchGetProcessListForCreateWorkOrder',
            Data: GetProcessListForCreateWorkOrderData.Data
          }
        })

      } else if (payload.modalType === 'SearchGetProcessListForCreateWorkOrder') {
        const data = yield call(GetProcessListForCreateWorkOrder, payload.params)
        console.log('SearchGetProcessListForCreateWorkOrder', data)
        yield put({
          type: 'showModalData', payload: {
            modalType: payload.modalType,
            Data: data.Data
          }
        })
      }
      //  else if (payload.modalType === 'SearchGetBaseLineInformation') {
      //   const data = yield call(GetBaseLineInformation, payload.params)
      //   console.log('SearchGetBaseLineInformation', data)
      //   yield put({
      //     type: 'showModalData', payload: {
      //       modalType: payload.modalType,
      //       Data: data.Data
      //     }
      //   })
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

    //Modals初始化数据   不同table可能需要修改的reducers函数
    showModalData(state, { payload }) {
      if (payload.modalType === 'InitialQueryData') {
        return { ...state, ...payload, LineNames: eval(payload.Data.LineNames), ShiftNames: eval(payload.Data.ShiftNames) }
      } else if (payload.modalType === 'addModalVisible') {
        return { ...state, ...payload, addModalLineNames: eval(payload.Data.LineNames), addModalShiftNames: eval(payload.Data.ShiftNames) }
      } else if (payload.modalType === 'SearchGetPartInformationListForCreateWorkOrder') {
        return { ...state, ...payload, VMPartInformation: eval(payload.Data.VMPartInformation) }
      } else if (payload.modalType === 'SearchGetProcessListForCreateWorkOrder') {
        return { ...state, ...payload, VMProcessInformation: eval(payload.Data.VMProcessInformation) }
      } else if (payload.modalType === 'SearchGetBaseLineInformation') {
        console.log('SearchGetBaseLineInformation', payload)
        return { ...state, ...payload, CycleTimeInTheory: payload.Data.CycleTimeInTheory, OEEInTheory: payload.Data.OEEInTheory }
      }
      //edit modal初始化数据
      else if (payload.modalType === 'editModalVisible') {
        console.log('payload.modalType === editModalVisible', payload)
        return {
          ...state, ...payload,
          EditAllLineNames: payload.data.AllLineNames,
          EditAllShiftNames: payload.data.AllShiftNames,
          EditAllWorkOrderStates: payload.data.AllWorkOrderStates,
          EditData: payload.data == null ? state.EditData : payload.data.EditableData
        }
      } else if (payload.modalType === 'detailsModalVisible') {
        console.log('payload.modalType === detailsModalVisible', payload)
        return {
          ...state, ...payload,
          DetailsData: payload.data,
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
