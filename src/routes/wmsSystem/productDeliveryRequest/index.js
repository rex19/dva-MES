import React from 'react'
import { Form, Button, Input, Row, Col, Radio, Icon, Select, DatePicker } from 'antd'
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

const FormItem = Form.Item
const dateFormat = 'YYYY-MM-DD';
const SearchFormLayout = [
  'FormNumberForm',
  'SearchDate_FromForm',
  'SearchDate_ToForm'
]

const ProductDeliveryRequestTableComponents = ({
  productDeliveryRequest,
  dispatch,
  location,
  form
}) => {
  const {
    pagination,
    ProductDeliveryRequestList,
    ProductDeliveryRequest_ProjectInfoList,
    ProductDeliveryRequest_OutputMaterialBoxInfoList
  } = productDeliveryRequest
  console.log('ProductDeliveryRequestTableComponents', productDeliveryRequest)

  const formItemLayout = globalConfig.table.formItemLayout
  const { getFieldDecorator, validateFields, resetFields } = form

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
    title: '客户',
    dataIndex: 'CustomerName',
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
    title: '数量',
    dataIndex: 'TotalQuantity',
  }]

  const handleSearch = (e) => {
    console.log('handleSearch')
    e.preventDefault();
    validateFields(SearchFormLayout, (err, payload) => {
      if (!err) {
        const Params = {
          FormNumber: payload.FormNumberForm || '',
          SearchDate_From: moment(payload.SearchDate_FromForm).format(dateFormat) || '',
          SearchDate_To: moment(payload.SearchDate_ToForm).format(dateFormat) || '',
        }
        console.log('handleSearch-Params', payload.SearchDate_ToForm, Params)
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
          FormNumber: payload.FormNumberForm,
          SearchDate_From: moment(payload.SearchDate_FromForm).format(dateFormat),
          SearchDate_To: moment(payload.SearchDate_ToForm).format(dateFormat),
        }
        console.log('PaginationComponentsChanger', payload.SearchDate_ToForm, Params);
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
                <FormItem {...formItemLayout} label={`销售出库单号`}>
                  {getFieldDecorator(`FormNumberForm`)(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`开始时间`}>
                  {getFieldDecorator(`SearchDate_FromForm`, {
                    initialValue: moment(new Date(), dateFormat),
                  })(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss" />
                    )}
                </FormItem>
              </Col>
              <Col span={8} key={3} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`结束时间`}>
                  {getFieldDecorator(`SearchDate_ToForm`, {
                    initialValue: moment(new Date(), dateFormat),
                  })(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss" />
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
      <h2 style={{ margin: '20px' }}>销售出库单</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={ProductDeliveryRequestList}
          columns={wmsProductDeliveryRequestColums}
          TableWidth={1500}
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
          data={ProductDeliveryRequest_ProjectInfoList}
          columns={wmsProductDeliveryRequest_ProjectInfoColums}
          TableWidth={1300}
          paginationDisplay={'no'}
          pagination={pagination}
        />
      </div>
      <div style={{ margin: '20px' }}></div>
      <h2 style={{ margin: '20px' }}>已出库箱料信息</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={ProductDeliveryRequest_OutputMaterialBoxInfoList}
          columns={wmsProductDeliveryRequest_OutputMaterialBoxInfoColums}
          TableWidth={1000}
          paginationDisplay={'no'}
          pagination={pagination}
        />
      </div>
    </div>
  )
}



export default connect(({ productDeliveryRequest }) => ({ productDeliveryRequest }))(Form.create()(ProductDeliveryRequestTableComponents))
