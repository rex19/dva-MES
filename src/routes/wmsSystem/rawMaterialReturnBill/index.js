
import React from 'react'
import { Form, Input, Row, Col, Radio, Select, DatePicker, Button, Icon } from 'antd'
import { connect } from 'dva'
import { WMSTableComponents } from '../../../components'
import globalConfig from 'utils/config'
import {
  wmsRawMaterialReceiptsColums,
  wmsRawMaterialReceipts_DetailsColums,
  wmsRawMaterialReceipts_Details_InfoColums
} from '../../../mock/wmsTableColums'
import moment from 'moment';
const FormItem = Form.Item
import './index.less'

const dateFormat = 'YYYY-MM-DD';
//每个table可能不同的变量字段(1)
const TableName = 'rawMaterialReturnBill'
const TableColumns = wmsRawMaterialReceiptsColums
const SearchFormLayout = [
  'FormNumberForm',
  'SearchDate_FromForm',
  'SearchDate_ToForm'
]


const RawMaterialReturnBillTableComponents = ({
  rawMaterialReturnBill,
  dispatch,
  location,
  form
}) => {
  const {
    pagination,
    rawMaterialReturnBillTableList,
    rawMaterialReturnBill_DetailsTableList,
    rawMaterialReturnBill_Details_InfoTableList
  } = rawMaterialReturnBill
  console.log('RawMaterialReturnBillTableComponents', rawMaterialReturnBill)
  const formItemLayout = globalConfig.table.formItemLayout
  const { getFieldDecorator, validateFields, resetFields } = form

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
      type: `${TableName}/GetMovementRecordMaterialReceivingBackByWMSFormId`,
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
    render: (text, record) => <a onClick={() => getReceivingQuantityRequest(record.WMSFormId, record.ItemNumber)}>{text}</a>,
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
                <FormItem {...formItemLayout} label={`原材料收货单号`}>
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

      <h2 style={{ margin: '20px' }}>原材料退货单</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={rawMaterialReturnBillTableList}
          columns={wmsRawMaterialReceiptsColums}
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
          data={rawMaterialReturnBill_DetailsTableList}
          columns={wmsRawMaterialReceipts_DetailsColums}
          TableWidth={1000}
          paginationDisplay={'no'}
          pagination={pagination}
        />
      </div>
      <h2 style={{ margin: '20px' }}>原材料已收货信息</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={rawMaterialReturnBill_Details_InfoTableList}
          columns={wmsRawMaterialReceipts_Details_InfoColums}
          TableWidth={1000}
          paginationDisplay={'no'}
          pagination={pagination}
        />
      </div>
    </div>
  )
}



export default connect(({ rawMaterialReturnBill }) => ({ rawMaterialReturnBill }))(Form.create()(RawMaterialReturnBillTableComponents))
