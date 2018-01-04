// import React from 'react'
// import { Icon } from 'antd'
// import styles from './index.less'

// const Error = () => (<div className="content-inner">
//   <div className={styles.error}>
//     <h1>原材料收货单 rawMaterialReceipts</h1>
//   </div>
// </div>)

// export default Error


import React from 'react'
import { Form, Input, Row, Col, Radio, Select, DatePicker } from 'antd'
import { connect } from 'dva'
import { WMSTableComponents } from '../../../components'
import globalConfig from 'utils/config'
import {
  wmsRawMaterialReceiptsColums,
  wmsRawMaterialReceipts_DetailsColums,
  wmsRawMaterialReceipts_Details_InfoColums
} from '../../../mock/wmsTableColums'
import moment from 'moment';
import './index.less'


//每个table可能不同的变量字段(1)
const TableName = 'rawMaterialReceipts'
const TableColumns = wmsRawMaterialReceiptsColums

const RawMaterialReceiptsTableComponents = ({
  rawMaterialReceipts,
  dispatch,
  location,
  form
}) => {
  // const { list } = rawMaterialReceipts
  // const TableModelsData = rawMaterialReceipts
  // const { list } = TableModelsData
  const list = [{
    "Id": 5,
    "FormNumber": "FORM_MR000001",
    "PurchaseOrderNumber": "MO000001",
    "State": 2,
    "StateName": "已入库",
    "CreationDateTime": "2017-12-18T17:10:00",
    "CreatorUserName": "test1129"
  },
  {
    "Id": 6,
    "FormNumber": "FORM_MR000002",
    "PurchaseOrderNumber": "MO000002",
    "State": 1,
    "StateName": "已打印",
    "CreationDateTime": "2017-12-18T17:10:00",
    "CreatorUserName": "test1129"
  },
  {
    "Id": 7,
    "FormNumber": "FORM_MR000003",
    "PurchaseOrderNumber": "MO000003",
    "State": 1,
    "StateName": "已打印",
    "CreationDateTime": "2017-12-18T17:10:00",
    "CreatorUserName": "test1129"
  },
  {
    "Id": 8,
    "FormNumber": "FORM_MR000004",
    "PurchaseOrderNumber": "MO000004",
    "State": 0,
    "StateName": "未注册",
    "CreationDateTime": "2017-12-18T17:10:00",
    "CreatorUserName": "test1129"
  },
  {
    "Id": 9,
    "FormNumber": "FORM_MR000005",
    "PurchaseOrderNumber": "MO000005",
    "State": 0,
    "StateName": "未注册",
    "CreationDateTime": "2017-12-18T17:10:00",
    "CreatorUserName": "test1129"
  }]

  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
      <div style={{ marginBottom: '20px', borderColor: 'red', borderWidth: '1px' }}>
        <h1>FormComponents</h1>
      </div>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={list}
          columns={TableColumns}
          TableWidth={1000}
        />
      </div>
    </div>
  )
}


export default connect(({ RawMaterialReceiptsTable }) => ({ RawMaterialReceiptsTable }))(RawMaterialReceiptsTableComponents)

