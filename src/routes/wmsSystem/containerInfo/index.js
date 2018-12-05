import React from 'react'
import { Form, Button, Input, Row, Col, Radio, Icon, Select, DatePicker } from 'antd'
import { connect } from 'dva'
import { WMSTableComponents } from '../../../components'
import globalConfig from 'utils/config'
// import {
//   wmsContainerInfoColums,
//   wmsContainerInfo_MoveRecordColums,
// } from '../../../mock/wmsTableColums'
import moment from 'moment';
import './index.less'


//每个table可能不同的变量字段(1)
const TableName = 'containerInfo'
// const TableColumns = wmsContainerInfoColums
const FormItem = Form.Item
const dateFormat = 'YYYY-MM-DD';
const SearchFormLayout = [
  'MaterialNumberForm'
]

const ContainerInfoTableComponents = ({
  containerInfo,
  dispatch,
  location,
  form
}) => {
  const { pagination, ContainerInfoTableList, ContainerInfo_MoveRecordContainerInfoTableList } = containerInfo
  console.log('ContainerInfoTableComponents--', containerInfo)
  const formItemLayout = globalConfig.table.formItemLayout
  const { getFieldDecorator, validateFields, resetFields } = form

  const getContainerNumberRequest = (Id) => {
    console.log('getContainerNumberRequest', Id)
    dispatch({
      type: `${TableName}/getContainerNumberRequest`,
      payload: {
        Id: Id,
      },
    })
  }


  const wmsContainerInfoColums = [{
    title: 'Id',
    dataIndex: 'Id',
  }, {
    title: '料号',
    dataIndex: 'MaterialNumber',
  }, {
    title: '容器UID',
    dataIndex: 'ContainerNumber',
    render: (text, record) => <a onClick={() => getContainerNumberRequest(record.Id)}>{text}</a>,
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
    title: '过期时间',
    dataIndex: 'ExpirationDate',
  }, {
    title: '创建时间',
    dataIndex: 'CreationDateTime',
  }, {
    title: '创建人',
    dataIndex: 'CreatorName',
  }]


  const wmsContainerInfo_MoveRecordColums = [{
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
  const handleSearch = (e) => {
    console.log('handleSearch')
    e.preventDefault();
    validateFields(SearchFormLayout, (err, payload) => {
      if (!err) {
        const Params = {
          MaterialNumber: payload.MaterialNumberForm || ''
        }
        SearchTableList(Params, pagination.PageIndex, pagination.PageSize)
      }
    });
  }
  const SearchTableList = (payload, PageIndex, PageSize) => {
    dispatch({
      type: `${TableName}/query`,
      payload: {
        ...payload,
        pageIndex: PageIndex,
        pageSize: PageSize
      },
    })
  }
  const PaginationComponentsChanger = (PageIndex, PageSize) => {
    console.log('PaginationComponentsChanger-index', PageIndex, PageSize)
    validateFields(SearchFormLayout, (err, payload) => {

      if (!err) {
        const Params = {
          MaterialNumber: payload.MaterialNumberForm
        }
        SearchTableList(Params, PageIndex, PageSize)
      }
    })
  }
  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
      <div style={{ marginBottom: '20px', borderColor: 'red', borderWidth: '1px' }}>
        <Form
          className="ant-advanced-search-form"
          onSubmit={handleSearch}
        >
          <Form>
            <Row gutter={40}>
              <Col span={8} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`物料号`}>
                  {getFieldDecorator(`MaterialNumberForm`)(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
            </Col>
          </Row>
        </Form>

      </div>
      <h2 style={{ margin: '20px' }}>容器信息查询</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={ContainerInfoTableList}
          columns={wmsContainerInfoColums}
          TableWidth={1600}
          paginationDisplay={'yes'}
          pagination={pagination}
          PaginationComponentsChanger={PaginationComponentsChanger}
        />
      </div>
      <div style={{ margin: '20px' }}></div>
      <h2 style={{ margin: '20px' }}>移动履历</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={ContainerInfo_MoveRecordContainerInfoTableList}
          columns={wmsContainerInfo_MoveRecordColums}
          TableWidth={1000}
          paginationDisplay={'no'}
          pagination={pagination}
        />
      </div>
    </div>
  )
}


export default connect(({ containerInfo }) => ({ containerInfo }))(Form.create()(ContainerInfoTableComponents))
