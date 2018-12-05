import React from 'react'
import { Form, Button, Input, Row, Col, Radio, Icon, Select, DatePicker } from 'antd'
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
const FormItem = Form.Item
const dateFormat = 'YYYY-MM-DD';
const SearchFormLayout = [
  'MaterialNumberForm'
]

const PackingFlagTableComponents = ({
  packingFlag,
  dispatch,
  location,
  form
}) => {
  const {
    pagination,
    PackingFlagTableList,
    PackingFlag_MoveRecordContainerInfoTableList,
    PackingInformatioByContainerList
  } = packingFlag
  console.log('PackingFlagTableComponents', packingFlag)
  const formItemLayout = globalConfig.table.formItemLayout
  const { getFieldDecorator, validateFields, resetFields } = form


  const getNumberRequest = (Id) => {
    dispatch({
      type: `${TableName}/GetMovementRecordByContainer`,
      payload: {
        Id: Id,
      },
    })

    dispatch({
      type: `${TableName}/GetPackingInformatioByContainer`,
      payload: {
        Id: Id,
      },
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
    render: (text, record) => <a onClick={() => getNumberRequest(record.ContainerId)}>{text}</a>,
  }, {
    title: '客户箱号',
    dataIndex: 'CustomerBoxNumber',
    render: (text, record) => <a onClick={() => getNumberRequest(record.ContainerId)}>{text}</a>,
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
  const handleSearch = (e) => {
    console.log('handleSearch')
    e.preventDefault();
    validateFields(SearchFormLayout, (err, payload) => {
      if (!err) {
        const Params = {
          MaterialNumber: payload.MaterialNumberForm || '',
          PackingFlag: 1
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
          MaterialNumber: payload.MaterialNumberForm,
          PackingFlag: 1
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
      <h2 style={{ margin: '20px' }}>成品箱信息查询</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={PackingFlagTableList}
          columns={wmsPackingFlagColums}
          TableWidth={1500}
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
          data={PackingFlag_MoveRecordContainerInfoTableList}
          columns={wmsPackingFlag_MoveRecordColums}
          TableWidth={1300}
          paginationDisplay={'no'}
          pagination={pagination}
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
          paginationDisplay={'no'}
          pagination={pagination}
        />
      </div>
    </div>
  )
}




export default connect(({ packingFlag }) => ({ packingFlag }))(Form.create()(PackingFlagTableComponents))
