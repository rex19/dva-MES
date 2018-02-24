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
  const {
    rawMaterialReceiptsTableList,
    rawMaterialReceipts_DetailsTableList,
    rawMaterialReceipts_Details_InfoTableList
  } = rawMaterialReceipts
  console.log('RawMaterialReceiptsTableComponents', rawMaterialReceipts)


  const handleChange = () => {
    console.log('handleChange')
  }
  const handleClickSearch = (Id) => {
    console.log('handleClickSearch', Id)
    dispatch({
      type: `${TableName}/GetMaterialReceivingFormItemByFormIdForList`,
      payload: {
        Id: Id,
      },
    })
  }
  const getReceivingQuantityRequest = (MaterialReceivingFormId, ItemNumber) => {
    dispatch({
      type: `${TableName}/GetContainerGenerateRecordByFormItemNumberForList`,
      payload: {
        MaterialReceivingFormId: MaterialReceivingFormId,
        ItemNumber: ItemNumber
      },
    })
  }
  const wmsRawMaterialReceiptsColums = [{
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
  const wmsRawMaterialReceipts_DetailsColums = [{
    title: '项目号',
    dataIndex: 'ItemNumber',
  }, {
    title: '状态',
    dataIndex: 'StateName',
  }, {
    title: '料号',
    dataIndex: 'MaterialNumber',
  }, {
    title: '供应商',
    dataIndex: 'SupplierName',
  }, {
    title: '批次号',
    dataIndex: 'BatchNumber',
  }, {
    title: '单位',
    dataIndex: 'UnitName',
  }, {
    title: '需要数量',
    dataIndex: 'Quantity',
  }, {
    title: '实际收货数量',
    dataIndex: 'ReceivingQuantity',
    render: (text, record) => <a onClick={() => getReceivingQuantityRequest(record.MaterialReceivingFormId, record.ItemNumber)}>{text}</a>,
  }, {
    title: '收获库位',
    dataIndex: 'ReceivingLocationNumber',
  }, {
    title: '收货人',
    dataIndex: 'ReceiverUserName',
  }, {
    title: '制造时间',
    dataIndex: 'ManufacturingDateTime',
  }, {
    title: '过期时间',
    dataIndex: 'ExpireDateTime',
  }]

  const wmsRawMaterialReceipts_Details_InfoColums = [{
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



  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
      <h2 style={{ margin: '20px' }}>材料容器信息</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={rawMaterialReceiptsTableList}
          columns={wmsRawMaterialReceiptsColums}
          TableWidth={1000}
        />
      </div>
      <div style={{ margin: '20px' }}></div>
      <h2 style={{ margin: '20px' }}>项目明细</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={rawMaterialReceipts_DetailsTableList}
          columns={wmsRawMaterialReceipts_DetailsColums}
          TableWidth={1000}
        />
      </div>
      <h2 style={{ margin: '20px' }}>原材料已收货信息</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={rawMaterialReceipts_Details_InfoTableList}
          columns={wmsRawMaterialReceipts_Details_InfoColums}
          TableWidth={1000}
        />
      </div>
    </div>
  )
}


export default connect(({ rawMaterialReceipts }) => ({ rawMaterialReceipts }))(RawMaterialReceiptsTableComponents)

