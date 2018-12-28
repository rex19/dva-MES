import modelExtend from 'dva-model-extend'
import { query, create, deleted, edit, getAddModalData, getEditModalData, getDetailsModalData, GetMaterialByMaterialNumber, addKey } from 'services/bomTable'
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
const TableName = 'bomTable'
const QueryResponseDTO = 'Tdto'
const QueryRequestDTO = 'TDto'
const EditData = {
  "Id": 1,
  "MaterialId": 1,
  "MaterieNumber": "test001KeyBoard",
  "Version": 1,
  "Name": "test",
  "ValidBegin": "2017-12-21T00:00:00",
  "ValidEnd": "2018-01-01T00:00:00",
  "Creator": "admin",
  "CreationDateTime": "2017-12-21T00:00:00",
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
    DetailsData: {
      BomHead: {},
      BomItemList: [],
      BomItemStatistics: []
    },
    FromParams: {},
    //每个table可能不同的变量字段
    Name_Version: '',
    FactoryList: [],
    UnitList: [],
    StationGroup: [],
    MaterialList: [],
    MaterialListDataSource: [],
    MaterialItemList: [],
    StationGroup: [],
    BomItemList: [],
    BomItemListCount: 0,
    Version: '',
    AddBomItemDtoDataSource: [],
    EditBomItemDtoDataSource: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      console.log('bom-subscriptions', dispatch, history)
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
        } else if (location.pathname !== `/masterdata/${TableName}`) {
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
      yield put({ type: 'FromParamsChanger', payload: payload })
      const data = yield call(query, payload)
      const pagination = yield select(state => state[TableName].pagination)
      if (data.Status !== 200) {
        return errorMessage(data.ErrorMessage)
      } else if (data.Status === 200) {
        const result = yield call(addKey, data.Data[QueryResponseDTO]) //+1
        yield put({
          type: 'querySuccess',
          payload: {
            list: result,
          },
        })
        yield put({
          type: 'tablePaginationChanger',
          payload: {
            PageIndex: payload.PageIndex,
            PageSize: payload.PageSize,
            total: data.Data.RowCount
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
        return errorMessage(data.ErrorMessage)
      } else if (data.Status === 200) {
        const FromParams = yield select(state => state[TableName].FromParams)
        yield put({ type: 'hideModal', payload: 'addModalVisible' })
        yield put({
          type: 'query',
          payload: {
            ...FromParams
          },
        })
        return successMessage(data.ErrorMessage)
      } else {
        throw data
      }
    },
    * delete({
      payload,
    }, { call, put, select }) {
      const data = yield call(deleted, payload)
      const pagination = yield select(state => state[TableName].pagination)
      if (data.Status !== 200) {
        return errorMessage(data.ErrorMessage)
      } else if (data.Status === 200 && data.Data !== 0) {
        return errorMessage(data.ErrorMessage)
      } else if (data.Status === 200 && data.Data === 0) {
        const FromParams = yield select(state => state[TableName].FromParams)
        yield put({ type: 'hideModal', payload: 'deleteModalVisible' })
        yield put({
          type: 'query',
          payload: {
            ...FromParams
          },
        })
        return successMessage(data.ErrorMessage)
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
        return errorMessage(data.ErrorMessage)
      } if (data.Status === 200) {
        const FromParams = yield select(state => state[TableName].FromParams)
        yield put({ type: 'hideModal', payload: 'editModalVisible' })
        yield put({
          type: 'query',
          payload: {
            ...FromParams
          },
        })
        return successMessage(data.ErrorMessage)
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
      } else if (payload.modalType === 'getName_Version') {
        const data = yield call(GetMaterialByMaterialNumber, payload.Params)
        console.log('GetMaterialByMaterialNumber', data)
        if (data.Status === 200) {
          yield put({ type: 'ChangeVersion', payload: { modalType: 'GetMaterialByMaterialNumber', data: data.Data } })
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
      // console.log('hideModal', payload)
      // if(payload==='editModalVisible'){

      // }
      window.BOMTempRender = false
      return { ...state, ...payload, [payload]: false }
    },
    //Modals初始化数据   不同table可能需要修改的reducers函数
    showModalData(state, { payload }) {
      if (payload.modalType === 'editModalVisible') {
        console.log('editModalVisible-showModalData', payload)
        return {
          ...state, ...payload,
          // MaterialList: payload.data.MaterialList,
          // MaterialItemList: payload.data.MaterialItemList,
          StationGroup: payload.data.StationGroup,
          FactoryList: payload.data.FactoryList,
          BomItemList: payload.data.BomItemList,
          UnitList: payload.data.UnitList,
          BomItemListCount: payload.data.BomItemListCount,
          EditData: payload.data.BomHead == null ? state.EditData : payload.data.BomHead
        }
      } else if (payload.modalType === 'addModalVisible') {
        return {
          ...state, ...payload,
          UnitList: payload.data.UnitList,
          FactoryList: payload.data.FactoryList,
          // MaterialList: eval(payload.data.MaterialList),
          StationGroup: payload.data.StationGroup,
          MaterialListDataSource: payload.data,
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
      return {
        ...state, ...payload,
        pagination: {
          PageIndex: payload.PageIndex,
          PageSize: payload.PageSize,
          total: payload.total
        }
      }
    },
    // 改变table 查询条件
    FromParamsChanger(state, { payload }) {
      return { ...state, ...payload, FromParams: payload }
    },
    // 离开页面清空
    ClearDataChanger(state, { payload }) {
      return {
        ...state, ...payload,
        clearBool: true
      }
    },
    //改变editable的datasource
    editableDataChanger(state, { payload }) {
      if (payload.type === 'RowEditableAddTable') {
        return { ...state, ...payload, AddBomItemDtoDataSource: payload.BomItemDtoDataSource }
      } else if (payload.type === 'RowEditableEditTable') {
        return { ...state, ...payload, EditBomItemDtoDataSource: payload.BomItemDtoDataSource }
      }
    },
    //改变 Version
    ChangeVersion(state, { payload }) {
      console.log('ChangeVersion', payload)

      if (payload.modalType === 'GetMaterialByMaterialNumber') {
        return { ...state, ...payload, Name_Version: `${payload.data.version}/${payload.data.materialName}` }
      } else if (payload.modalType === '') {
        // return { ...state, ...payload, Name_Version: `${payload.data.Version}/${payload.data.MaterialName}` }
      }
    },
  },
})
