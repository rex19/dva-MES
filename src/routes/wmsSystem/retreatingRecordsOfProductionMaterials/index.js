
import React from 'react'
import { Form, Input, Row, Col, Radio, Select, DatePicker } from 'antd'
import { connect } from 'dva'
import { WMSTableComponents } from '../../../components'
import globalConfig from 'utils/config'
import moment from 'moment';
// import './index.less'


//每个table可能不同的变量字段(1)
const TableName = 'retreatingRecordsOfProductionMaterials'
// const TableColumns = wmsRetreatingRecordsOfProductionMaterialsColums

const RetreatingRecordsOfProductionMaterialsTableComponents = ({
  retreatingRecordsOfProductionMaterials,
  dispatch,
  location,
  form
}) => {
  const { pagination,
    RetreatingRecordsOfProductionMaterialsTableList
  } = retreatingRecordsOfProductionMaterials
  console.log('RetreatingRecordsOfProductionMaterialsTableComponents', retreatingRecordsOfProductionMaterials)


  const handleChange = () => {
    console.log('handleChange')
  }
  // const handleClickSearch = (Id) => {
  //   console.log('handleClickSearch', Id)
  //   dispatch({
  //     type: `${TableName}/GetRetreatingRecordsOfProductionMaterials_DetailsTableList`,
  //     payload: {
  //       Id: Id,
  //     },
  //   })
  // }
  // const getScannedQuantityRequest = (WMSFormId, ItemNumber) => {
  //   dispatch({
  //     type: `${TableName}/GetRetreatingRecordsOfProductionMaterials_Details_InfoTableList`,
  //     payload: {
  //       WMSFormId: WMSFormId,
  //       ItemNumber: ItemNumber
  //     },
  //   })
  // }
  const wmsRetreatingRecordsOfProductionMaterialsColums = [{
    title: 'Id',
    dataIndex: 'Id',
  }, {
    title: '工单号',
    dataIndex: 'WorkOrderCode',
  }, {
    title: '料号',
    dataIndex: 'MaterialNumber',
  }, {
    title: '容器UID',
    dataIndex: 'ContainerNumber',
  }, {
    title: '退库数量',
    dataIndex: 'ReturnQuantity',
  }, {
    title: '源库位',
    dataIndex: 'ReturnFromLocationCode',
  }, {
    title: '目标库位',
    dataIndex: 'ReturnToLocationCode',
  }, {
    title: '创建时间',
    dataIndex: 'CreationDateTime',
  }, {
    title: '创建人',
    dataIndex: 'CreatorUserName',
  }]
  const PaginationComponentsChanger = (PageIndex, PageSize) => {
    console.log('PaginationComponentsChanger-index', PageIndex, PageSize)

  }
  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
      <h2 style={{ margin: '20px' }}>生产物料退料记录</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={RetreatingRecordsOfProductionMaterialsTableList}
          columns={wmsRetreatingRecordsOfProductionMaterialsColums}
          TableWidth={1000}
          paginationDisplay={'yes'}
          pagination={pagination}
          PaginationComponentsChanger={PaginationComponentsChanger}
        />
      </div>
    </div>
  )
}


export default connect(({ retreatingRecordsOfProductionMaterials }) => ({ retreatingRecordsOfProductionMaterials }))(RetreatingRecordsOfProductionMaterialsTableComponents)

