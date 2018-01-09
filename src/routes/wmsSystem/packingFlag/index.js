import React from 'react'
import { Form, Input, Row, Col, Radio, Select, DatePicker } from 'antd'
import { connect } from 'dva'
import { WMSTableComponents } from '../../../components'
import globalConfig from 'utils/config'
// import {
//   wmsPackingFlagColums,
//   wmsPackingFlag_MoveRecordColums,
//   wmsPackingFlag_ProductInfoColums
// } from '../../../mock/wmsTableColums'
import moment from 'moment';
import './index.less'


//每个table可能不同的变量字段(1)
const TableName = 'packingFlag'
// const TableColumns = wmsPackingFlagColums

const PackingFlagTableComponents = ({
  packingFlag,
  dispatch,
  location,
  form
}) => {
  const {
    PackingFlagTableList,
    PackingFlag_MoveRecordContainerInfoTableList,
    PackingInformatioByContainerList
  } = packingFlag
  console.log('PackingFlagTableComponents', packingFlag)


  const getNumberRequest = (ContainerNumber, CustomerBoxNumber) => {
    console.log('getNumberRequest', ContainerNumber, CustomerBoxNumber)
    dispatch({
      type: `${TableName}/GetMovementRecordByContainer`,
      payload: ContainerNumber
    })

    dispatch({
      type: `${TableName}/GetPackingInformatioByContainer`,
      payload: CustomerBoxNumber
    })
  }


  const wmsPackingFlagColums = [{
    title: 'Id',
    dataIndex: 'Id',
  }, {
    title: '料号',
    dataIndex: 'MaterialNumber',
  }, {
    title: '容器UID',
    dataIndex: 'ContainerNumber',
    render: (text, record) => <a onClick={() => getNumberRequest(record.ContainerNumber, record.CustomerBoxNumber)}>{text}</a>,
  }, {
    title: '客户箱号',
    dataIndex: 'CustomerBoxNumber',
    render: (text, record) => <a onClick={() => getNumberRequest(record.ContainerNumber, record.CustomerBoxNumber)}>{text}</a>,
  }, {
    title: '状态',
    dataIndex: 'StateName',
  }, {
    title: '单位',
    dataIndex: 'UnitName',
  }, {
    title: '容量',
    dataIndex: 'TotalQuantity',
  }, {
    title: '现在数量',
    dataIndex: 'Quantity',
  }, {
    title: '目前所在库位',
    dataIndex: 'CurrentLocationNumber',
  }, {
    title: '供应商',
    dataIndex: 'SupplierName',
  }, {
    title: '批次',
    dataIndex: 'BatchNumber',
  }, {
    title: '制造时间',
    dataIndex: 'ManufacturingDateTime',
  }, {
    title: '创建时间',
    dataIndex: 'CreationDateTime',
  }, {
    title: '创建人',
    dataIndex: 'CreatorName',
  }]

  const wmsPackingFlag_MoveRecordColums = [{
    title: 'Id',
    dataIndex: 'Id',
  }, {
    title: '容器UID',
    dataIndex: 'ContainerNumber',
  }, {
    title: '源库位',
    dataIndex: 'SourceLocationNumber',
  }, {
    title: '目的库位',
    dataIndex: 'DestinationLocationNumber',
  }, {
    title: '操作类型',
    dataIndex: 'OperationFormTypeName',
  }, {
    title: '操作时间',
    dataIndex: 'OperationDateTime',
  }, {
    title: '操作人员',
    dataIndex: 'OperatorUserName',
  }, {
    title: '表单号',
    dataIndex: 'OperationFormNumber',
  }, {
    title: '单据子项号',
    dataIndex: 'OperationFormItemNumber',
  }]
  const wmsPackingFlag_ProductInfoColums = [{
    title: 'Id',
    dataIndex: 'Id',
  }, {
    title: '产品序列号',
    dataIndex: 'SerialNumber',
  }, {
    title: '装箱时间',
    dataIndex: 'PackingDateTime',
  }, {
    title: '装箱人',
    dataIndex: 'CreatorUesrName',
  }]
  const onClick = (x) => {
    console.log('onClick---', x)
  }

  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
      <h2 style={{ margin: '20px' }}>材料容器信息</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={PackingFlagTableList}
          columns={wmsPackingFlagColums}
          TableWidth={1000}
        />
      </div>
      <div style={{ margin: '20px' }}></div>
      <h2 style={{ margin: '20px' }}>移动履历</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={PackingFlag_MoveRecordContainerInfoTableList}
          columns={wmsPackingFlag_MoveRecordColums}
          TableWidth={1000}
        />
      </div>
      <div style={{ margin: '20px' }}></div>
      <h2 style={{ margin: '20px' }}>箱中产品信息</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={PackingInformatioByContainerList}
          columns={wmsPackingFlag_ProductInfoColums}
          TableWidth={1000}
        />
      </div>
    </div>
  )
}


export default connect(({ packingFlag }) => ({ packingFlag }))(PackingFlagTableComponents)

