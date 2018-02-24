

import React from 'react'
import { Form, Input, Row, Col, Radio, Select, DatePicker } from 'antd'
import { connect } from 'dva'
import { WMSTableComponents } from '../../../components'
import globalConfig from 'utils/config'
import moment from 'moment';
import './index.less'


//每个table可能不同的变量字段(1)
const TableName = 'workOrderList'
// const TableColumns = wmsworkOrderListColums

const WorkOrderListComponent = ({
  workOrderList,
  dispatch,
  location,
  form
}) => {
  const { workOrderListTableList } = workOrderList
  console.log('workOrderListTableComponents--', workOrderList)

  const getContainerNumberRequest = (Id) => {
    console.log('getContainerNumberRequest', Id)
    dispatch({
      type: `${TableName}/getContainerNumberRequest`,
      payload: {
        Id: Id,
      },
    })
  }

  const handleClickEdit = (e) => {
    console.log('handleClickEdit', e)
  }

  const workOrderListColums = [{
    title: '工单号',
    dataIndex: 'WorkOrderNumber',
  }, {
    title: '料号',
    dataIndex: 'MaterialNumber',
  }, {
    title: '产品描述',
    dataIndex: 'MaterialDescription',
  }, {
    title: '计划数量',
    dataIndex: 'PlannedQuantity',
  }, {
    title: '已完成数量',
    dataIndex: 'FinishedQuantity',
  }, {
    title: '工单备注',
    dataIndex: 'WorkOrderComment',
  }, {
    title: '工单状态',
    dataIndex: 'WorkOrderState',
  }, {
    title: '班别',
    dataIndex: 'ShiftName',
  }, {
    title: '总线体',
    dataIndex: 'LineName',
  }, {
    title: '计划生产时间',
    dataIndex: 'PlannedStartDateTime',
  }, {
    title: '实际生产时间',
    dataIndex: 'ActualStartDateTime',
  }, {
    title: '计划完成时间',
    dataIndex: 'PlannedEndDateTime',
  }, {
    title: '实际完成时间',
    dataIndex: 'ActualEndDateTime',
  }, {
    title: '操作',
    key: (new Date()).valueOf(),
    fixed: 'right',
    width: 100,
    render: (text, record) => (
      <span>
        <a onClick={() => handleClickEdit(record.Id)} className="ant-dropdown-link">
          修改
      </a>
      </span>
    ),
  }]




  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
      <h2 style={{ margin: '20px' }}>工单列表</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={workOrderListTableList}
          columns={workOrderListColums}
          TableWidth={1800}
        />
      </div>
    </div>
  )
}


export default connect(({ workOrderList }) => ({ workOrderList }))(WorkOrderListComponent)


