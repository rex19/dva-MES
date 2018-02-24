import React from 'react'
import { Form, Input, Row, Col, Radio, Select, DatePicker } from 'antd'
import { connect } from 'dva'
import { WMSTableComponents } from '../../../components'
import globalConfig from 'utils/config'
// import {
//   wmsPutStorageOfFinishedProductColums,
//   wmsPutStorageOfFinishedProduct_MoveRecordColums,
//   wmsPutStorageOfFinishedProduct_ProductInfoColums
// } from '../../../mock/wmsTableColums'
import moment from 'moment';
import './index.less'

const data = []
//每个table可能不同的变量字段(1)
const TableName = 'putStorageOfFinishedProduct'
// const TableColumns = wmsPutStorageOfFinishedProductColums

const PutStorageOfFinishedProductTableComponents = ({
  putStorageOfFinishedProduct,
  dispatch,
  location,
  form
}) => {
  const {
    PutStorageOfFinishedProductList,
    PutStorageOfFinishedProduct_ProjectInfoList,
    PutStorageOfFinishedProduct_OutputMaterialBoxInfoList
  } = putStorageOfFinishedProduct
  console.log('PutStorageOfFinishedProductTableComponents', putStorageOfFinishedProduct)


  const handleClickSearch = (Id) => {
    dispatch({
      type: `${TableName}/GetPutStorageOfFinishedProduct_ProjectInfoList`,
      payload: {
        Id: Id,
      },
    })
  }
  const getScannedQuantityRequest = (WMSFormId, ItemNumber) => {
    dispatch({
      type: `${TableName}/GetPutStorageOfFinishedProduct_OutputMaterialBoxInfoList`,
      payload: {
        WMSFormId: WMSFormId,
        ItemNumber: ItemNumber
      },
    })
  }

  const wmsPutStorageOfFinishedProductColums = [{
    title: 'Id',
    dataIndex: 'Id',
  }, {
    title: '单据号',
    dataIndex: 'FormNumber',
  }, {
    title: '创建时间',
    dataIndex: 'CreationDateTime',
  }, {
    title: '创建人',
    dataIndex: 'CreatorUserName',
  }, {
    title: '操作',
    key: (new Date()).valueOf(),
    fixed: 'right',
    width: 140,
    render: (text, record) => (
      <span>
        <a onClick={() => handleClickSearch(record.Id)} className="ant-dropdown-link">
          查看
      </a>
      </span>
    ),
  }]

  const wmsPutStorageOfFinishedProduct_ProjectInfoColums = [{
    title: '项目号',
    dataIndex: 'ItemNumber',
  }, {
    title: '工单号',
    dataIndex: 'WorkOrderCode',
  }, {
    title: '料号',
    dataIndex: 'MaterialNumber',
  }, {
    title: '单位',
    dataIndex: 'UnitName',
  }, {
    title: '需出库数量',
    dataIndex: 'RequestQuantity',
  }, {
    title: '实际出库数量',
    dataIndex: 'ScannedQuantity',
    render: (text, record) => <a onClick={() => getScannedQuantityRequest(record.WMSFormId, record.ItemNumber)}>{text}</a>,
  }, {
    title: '目标库位',
    dataIndex: 'TargetLocationNumber',
  }]
  const wmsPutStorageOfFinishedProduct_OutputMaterialBoxInfoColums = [{
    title: 'Id',
    dataIndex: 'Id',
  }, {
    title: '容器UID',
    dataIndex: 'ContainerNumber',
  }, {
    title: '料号',
    dataIndex: 'MaterialNumber',
  }, {
    title: '入库数量',
    dataIndex: 'TotalQuantity',
  }, {
    title: '目前库位',
    dataIndex: 'CurrentLocationNumber',
  }]


  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
      <h2 style={{ margin: '20px' }}>成品入库单</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={PutStorageOfFinishedProductList}
          columns={wmsPutStorageOfFinishedProductColums}
          TableWidth={1500}
        />
      </div>
      <div style={{ margin: '20px' }}></div>
      <h2 style={{ margin: '20px' }}>项目明细</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={PutStorageOfFinishedProduct_ProjectInfoList}
          columns={wmsPutStorageOfFinishedProduct_ProjectInfoColums}
          TableWidth={1300}
        />
      </div>
      <div style={{ margin: '20px' }}></div>
      <h2 style={{ margin: '20px' }}>已入库料箱信息</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={PutStorageOfFinishedProduct_OutputMaterialBoxInfoList}
          columns={wmsPutStorageOfFinishedProduct_OutputMaterialBoxInfoColums}
          TableWidth={1000}
        />
      </div>
    </div>
  )
}


export default connect(({ putStorageOfFinishedProduct }) => ({ putStorageOfFinishedProduct }))(PutStorageOfFinishedProductTableComponents)

