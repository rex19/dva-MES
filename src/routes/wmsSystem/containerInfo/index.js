import React from 'react'
import { Form, Input, Row, Col, Radio, Select, DatePicker } from 'antd'
import { connect } from 'dva'
import { WMSTableComponents } from '../../../components'
import globalConfig from 'utils/config'
import {
  wmsContainerInfoColums,
  wmsContainerInfo_MoveRecordColums,
} from '../../../mock/wmsTableColums'
import moment from 'moment';
import './index.less'


//每个table可能不同的变量字段(1)
const TableName = 'containerInfo'
const TableColumns = wmsContainerInfoColums

const RawMaterialReceiptsTableComponents = ({
  containerInfo,
  dispatch,
  location,
  form
}) => {
  // const { list } = rawMaterialReceipts
  // const TableModelsData = rawMaterialReceipts
  // const { list } = TableModelsData
  const list = [{
    "Id": 1,
    "MaterialNumber": "test001PC",
    "ContainerNumber": "C000000070",
    "CustomerBoxNumber": "CUSTBOX_0000001",
    "State": 0,
    "StateName": "正常",
    "UnitName": "个",
    "TotalQuantity": 5,
    "Quantity": 5,
    "CurrentLocationNumber": "A-1-1-1",
    "SupplierName": "FirstSupplier",
    "BatchNumber": "Batch00002",
    "ManufacturingDateTime": "0001-01-01T00:00:00",
    "ExpirationDate": "0001-01-01T00:00:00",
    "CreationDateTime": "0001-01-01T00:00:00",
    "CreatorName": "admin"
  },
  {
    "Id": 2,
    "MaterialNumber": "test001PC",
    "ContainerNumber": "C000000071",
    "CustomerBoxNumber": "CUSTBOX_0000002",
    "State": 0,
    "StateName": "正常",
    "UnitName": "个",
    "TotalQuantity": 5,
    "Quantity": 5,
    "CurrentLocationNumber": "A-1-1-1",
    "SupplierName": "FirstSupplier",
    "BatchNumber": "Batch00002",
    "ManufacturingDateTime": "0001-01-01T00:00:00",
    "ExpirationDate": "0001-01-01T00:00:00",
    "CreationDateTime": "0001-01-01T00:00:00",
    "CreatorName": "admin"
  }]

  const list2 = [{
    "Id": 3,
    "ContainerNumber": "C000000001",
    "State": 0,
    "StateName": "正常",
    "MaterialNumber": "test001KeyBoard",
    "SupplierName": "FirstSupplier",
    "BatchNumber": "Batch00001",
    "TotalQuantity": 10,
    "Quantity": 10,
    "CurrentLocationNumber": "MP0000_LOC_A1",
    "PickUserName": "admin",
    "SourceLocationNumber": "MA0000_LOC",
    "DestinationLocationNumber": "K1-2-1",
    "OperationFormTypeId": 1,
    "OperationFormTypeName": "外购件收货单",
    "OperationDateTime": "2017-12-22T13:34:24.223",
    "OperatorUserName": "admin",
    "OperationFormId": 5,
    "OperationFormNumber": "FORM_MR000003",
    "OperationFormItemNumber": 1
  },
  {
    "Id": 14,
    "ContainerNumber": "C000000001",
    "State": 0,
    "StateName": "正常",
    "MaterialNumber": "test001KeyBoard",
    "SupplierName": "FirstSupplier",
    "BatchNumber": "Batch00001",
    "TotalQuantity": 10,
    "Quantity": 10,
    "CurrentLocationNumber": "MP0000_LOC_A1",
    "PickUserName": "admin",
    "SourceLocationNumber": "K1-2-1",
    "DestinationLocationNumber": "MP0000_LOC_A1",
    "OperationFormTypeId": 2,
    "OperationFormTypeName": "工单备料单",
    "OperationDateTime": "2017-12-25T11:39:34.537",
    "OperatorUserName": "admin",
    "OperationFormId": 9,
    "OperationFormNumber": "FORM_MP000010",
    "OperationFormItemNumber": 1
  },]

  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>

      <h2 style={{ margin: '20px' }}>容器信息</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={list}
          columns={wmsContainerInfoColums}
          TableWidth={1000}
        />
      </div>
      <div style={{ margin: '20px' }}></div>
      <h2 style={{ margin: '20px' }}>移动履历</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={list2}
          columns={wmsContainerInfo_MoveRecordColums}
          TableWidth={1000}
        />
      </div>
    </div>
  )
}


export default connect(({ RawMaterialReceiptsTable }) => ({ RawMaterialReceiptsTable }))(RawMaterialReceiptsTableComponents)

