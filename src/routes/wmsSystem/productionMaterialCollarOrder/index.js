
import React from 'react'
import { Form, Input, Row, Col, Radio, Select, DatePicker } from 'antd'
import { connect } from 'dva'
import { WMSTableComponents } from '../../../components'
import globalConfig from 'utils/config'
// import {
//   wmsProductionMaterialCollarOrderColums,
//   wmsProductionMaterialCollarOrder_DetailsColums,
//   wmsProductionMaterialCollarOrder_Details_InfoColums
// } from '../../../mock/wmsTableColums'
import moment from 'moment';
import './index.less'


//每个table可能不同的变量字段(1)
const TableName = 'productionMaterialCollarOrder'
// const TableColumns = wmsProductionMaterialCollarOrderColums

const ProductionMaterialCollarOrderTableComponents = ({
  productionMaterialCollarOrder,
  dispatch,
  location,
  form
}) => {
  const {
    pagination,
    ProductionMaterialCollarOrderTableList,
    ProductionMaterialCollarOrder_DetailsTableList,
    ProductionMaterialCollarOrder_Details_InfoTableList
  } = productionMaterialCollarOrder
  console.log('ProductionMaterialCollarOrderTableComponents', productionMaterialCollarOrder)


  const handleChange = () => {
    console.log('handleChange')
  }
  const handleClickSearch = (Id) => {
    console.log('handleClickSearch', Id)
    dispatch({
      type: `${TableName}/GetProductionMaterialCollarOrder_DetailsTableList`,
      payload: {
        Id: Id,
      },
    })
  }
  const getScannedQuantityRequest = (WMSFormId, ItemNumber) => {
    dispatch({
      type: `${TableName}/GetProductionMaterialCollarOrder_Details_InfoTableList`,
      payload: {
        WMSFormId: WMSFormId,
        ItemNumber: ItemNumber
      },
    })
  }
  const wmsProductionMaterialCollarOrderColums = [{
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
    title: '工单号',
    dataIndex: 'WorkOrderNumber',
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
  const wmsProductionMaterialCollarOrder_DetailsColums = [{
    title: '项目号',
    dataIndex: 'ItemNumber',
  }, {
    title: '状态',
    dataIndex: 'StateName',
  }, {
    title: '料号',
    dataIndex: 'MaterialNumber',
  }, {
    title: '需求数量',
    dataIndex: 'RequestQuantity',
  }, {
    title: '实际领料数量',
    dataIndex: 'ScannedQuantity',
    render: (text, record) => <a onClick={() => getScannedQuantityRequest(record.WMSFormId, record.ItemNumber)}>{text}</a>,
  }, {
    title: '领用库位',
    dataIndex: 'RequestLocationNumber',
  }]

  const wmsProductionMaterialCollarOrder_Details_InfoColums = [{
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
    title: '现量',
    dataIndex: 'Quantity',
  }, {
    title: '目前库存',
    dataIndex: 'CurrentLocationNumber',
  }]

  const PaginationComponentsChanger = (PageIndex, PageSize) => {
    console.log('PaginationComponentsChanger-index', PageIndex, PageSize)

  }

  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
      <h2 style={{ margin: '20px' }}>生产物料领用单</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={ProductionMaterialCollarOrderTableList}
          columns={wmsProductionMaterialCollarOrderColums}
          TableWidth={1000}
          paginationDisplay={'yes'}
          pagination={pagination}
          PaginationComponentsChanger={PaginationComponentsChanger}
        />
      </div>
      <div style={{ margin: '20px' }}></div>
      <h2 style={{ margin: '20px' }}>项目明细</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={ProductionMaterialCollarOrder_DetailsTableList}
          columns={wmsProductionMaterialCollarOrder_DetailsColums}
          TableWidth={1000}
          paginationDisplay={'no'}
          pagination={pagination}
        />
      </div>
      <h2 style={{ margin: '20px' }}>原材料已收货信息</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={ProductionMaterialCollarOrder_Details_InfoTableList}
          columns={wmsProductionMaterialCollarOrder_Details_InfoColums}
          TableWidth={1000}
          paginationDisplay={'no'}
          pagination={pagination}
        />
      </div>
    </div>
  )
}


export default connect(({ productionMaterialCollarOrder }) => ({ productionMaterialCollarOrder }))(ProductionMaterialCollarOrderTableComponents)

