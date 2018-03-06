import React from 'react'
import { Form, Input, Row, Col, Radio, Select, DatePicker } from 'antd'
import { connect } from 'dva'
import { WMSTableComponents } from '../../../components'
import globalConfig from 'utils/config'
// import {
//   wmsProductDeliveryRequestColums,
//   wmsProductDeliveryRequest_MoveRecordColums,
//   wmsProductDeliveryRequest_ProductInfoColums
// } from '../../../mock/wmsTableColums'
import moment from 'moment';
import './index.less'

const data = []
//每个table可能不同的变量字段(1)
const TableName = 'productDeliveryRequest'
// const TableColumns = wmsProductDeliveryRequestColums

const ProductDeliveryRequestTableComponents = ({
  productDeliveryRequest,
  dispatch,
  location,
  form
}) => {
  const {
    ProductDeliveryRequestList,
    ProductDeliveryRequest_ProjectInfoList,
    ProductDeliveryRequest_OutputMaterialBoxInfoList
  } = productDeliveryRequest
  console.log('ProductDeliveryRequestTableComponents', productDeliveryRequest)


  const handleClickSearch = (Id) => {
    dispatch({
      type: `${TableName}/GetProductDeliveryRequest_ProjectInfoList`,
      payload: {
        Id: Id,
      },
    })
  }
  const getScannedQuantityRequest = (WMSFormId, ItemNumber) => {
    dispatch({
      type: `${TableName}/GetProductDeliveryRequest_OutputMaterialBoxInfoList`,
      payload: {
        WMSFormId: WMSFormId,
        ItemNumber: ItemNumber
      },
    })
  }

  const wmsProductDeliveryRequestColums = [{
    title: 'Id',
    dataIndex: 'Id',
  }, {
    title: '单据号',
    dataIndex: 'FormNumber',
  }, {
    title: '状态',
    dataIndex: 'StateName',
  }, {
    title: '创建时间',
    dataIndex: 'CreationDateTime',
  }, {
    title: '创建人',
    dataIndex: 'CreatorUserName',
  }, {
    title: '采购单号',
    dataIndex: 'PurchaseOrderNumber',
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

  const wmsProductDeliveryRequest_ProjectInfoColums = [{
    title: '项目号',
    dataIndex: 'ItemNumber',
  }, {
    title: '状态',
    dataIndex: 'StateName',
  }, {
    title: '料号',
    dataIndex: 'MaterialNumber',
  }, {
    title: '批次号',
    dataIndex: 'BatchNumber',
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
  }]
  const wmsProductDeliveryRequest_OutputMaterialBoxInfoColums = [{
    title: 'Id',
    dataIndex: 'Id',
  }, {
    title: '容器UID',
    dataIndex: 'ContainerNumber',
  }, {
    title: '状态',
    dataIndex: 'StateName',
  }, {
    title: '料号',
    dataIndex: 'MaterialNumber',
  }, {
    title: '容量',
    dataIndex: 'TotalQuantity',
  }, {
    title: '目前库位',
    dataIndex: 'CurrentLocationNumber',
  }]


  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
      <h2 style={{ margin: '20px' }}>材料容器信息</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={ProductDeliveryRequestList}
          columns={wmsProductDeliveryRequestColums}
          TableWidth={1500}
        />
      </div>
      <div style={{ margin: '20px' }}></div>
      <h2 style={{ margin: '20px' }}>移动履历</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={ProductDeliveryRequest_ProjectInfoList}
          columns={wmsProductDeliveryRequest_ProjectInfoColums}
          TableWidth={1300}
        />
      </div>
      <div style={{ margin: '20px' }}></div>
      <h2 style={{ margin: '20px' }}>箱中产品信息</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={ProductDeliveryRequest_OutputMaterialBoxInfoList}
          columns={wmsProductDeliveryRequest_OutputMaterialBoxInfoColums}
          TableWidth={1000}
        />
      </div>
    </div>
  )
}


export default connect(({ productDeliveryRequest }) => ({ productDeliveryRequest }))(ProductDeliveryRequestTableComponents)

