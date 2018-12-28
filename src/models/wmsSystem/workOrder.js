import modelExtend from 'dva-model-extend'
import { query, create, deleted, edit, getAddModalData, getEditModalData, getDetailsModalData, addKey } from 'services/materielTable'
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
const TableName = 'materielTable'
const QueryResponseDTO = 'Tdto'
const QueryRequestDTO = 'TDto'
const EditData = {
  "Id": 1,
  "MaterialNumber": "test001KeyBoard",
  "Version": 1,
  "Description": "test",
  "Specification": "test",
  "CustomerMaterialNumber": "customer001",
  "SupplierMaterialNumber": "supplier001",
  "MaterialGroupTypeId": 1,
  "IsProduct": true,
  "IsMultiPanel": true,
  "RequireBackflush": true,
  "NumberOfPanels": 1,
  "UnitId": 1,
  "SetupFlag": true,
  "ProcurementTypeId": 1,
  "MinimumPackageQuantity": 10,
  "ExpirationTime": 20,
  "SafetyStock": 1,
  "DefaultStorageLocationId": 7,
  "ContainerSize": 10,
  "MSLId": 4,
  "State": 1,
  "DefaultStationGroupId": 4,
  "CompanyId": 1,
  "FactoryId": "1",
  "ValidBegin": "2017-12-01T00:00:00",
  "ValidEnd": "2018-12-01T00:00:00"
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
    MaterialType: [],
    Unit: [],
    ProcurementType: [],
    Location: [],
    MSL: [],
    StationGroup: [],
    Company: [],
    Factory: [],

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
        return {
          ...state, ...payload,
          MaterialType: eval(payload.data.MaterialType),
          Unit: eval(payload.data.Unit),
          ProcurementType: eval(payload.data.ProcurementType),
          Location: eval(payload.data.Location),
          MSL: eval(payload.data.MSL),
          StationGroup: eval(payload.data.StationGroup),
          Company: eval(payload.data.Company),
          Factory: eval(payload.data.Factory),
          EditData: payload.data.TDto == null ? state.EditData : payload.data.TDto
        }
      } else if (payload.modalType === 'addModalVisible') {
        return {
          ...state, ...payload,
          MaterialType: eval(payload.data.MaterialType),
          Unit: eval(payload.data.Unit),
          ProcurementType: eval(payload.data.ProcurementType),
          Location: eval(payload.data.Location),
          MSL: eval(payload.data.MSL),
          StationGroup: eval(payload.data.StationGroup),
          Company: eval(payload.data.Company),
          Factory: eval(payload.data.Factory),
        }
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
    }
  },
})


// if (location.pathname !== `/wmsSystem/${TableName}`) {
//   dispatch({
//     type: 'ClearDataChanger',
//     payload: {}
//   })
// }
// ,
//  // 离开页面清空
//  ClearDataChanger(state, { payload }) {
//   return {
//     ...state, ...payload,
//     PutStorageOfFinishedProductList: [],
//     PutStorageOfFinishedProduct_ProjectInfoList: [],
//     PutStorageOfFinishedProduct_OutputMaterialBoxInfoList: []
//   }
// }
