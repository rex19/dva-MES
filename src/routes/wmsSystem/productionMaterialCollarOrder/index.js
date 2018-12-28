
//生产物料领用单
import React from 'react'
import { Form, Button, Input, Row, Col, Radio, Icon, Select, DatePicker } from 'antd'
import { connect } from 'dva'
import { WMSTableComponents } from '../../../components'
import globalConfig from 'utils/config'
// import {
//   wmsProductionMaterialCollarOrderColums,
//   wmsProductionMaterialCollarOrder_DetailsColums,
//   wmsProductionMaterialCollarOrder_Details_InfoColums
// } from '../../../mock/wmsTableColums'
import moment from 'moment';
import './index.less'

const FormItem = Form.Item
const dateFormat = 'YYYY-MM-DD';
const SearchFormLayout = [
  'FormNumberForm',
  'SearchDate_FromForm',
  'SearchDate_ToForm'
]
//每个table可能不同的变量字段(1)
const TableName = 'productionMaterialCollarOrder'
// const TableColumns = wmsProductionMaterialCollarOrderColums

const ProductionMaterialCollarOrderTableComponents = ({
  productionMaterialCollarOrder,
  dispatch,
  location,
  form
}) => {
  const {
    pagination,
    FromParams,
    ProductionMaterialCollarOrderTableList,
    ProductionMaterialCollarOrder_DetailsTableList,
    ProductionMaterialCollarOrder_Details_InfoTableList
  } = productionMaterialCollarOrder
  console.log('ProductionMaterialCollarOrderTableComponents', productionMaterialCollarOrder)
  const formItemLayout = globalConfig.table.formItemLayout
  const { getFieldDecorator, validateFields, resetFields } = form


  const handleClickSearch = (Id) => {
    console.log('handleClickSearch', Id)
    dispatch({
      type: `${TableName}/GetProductionMaterialCollarOrder_DetailsTableList`,
      payload: {
        Id: Id,
      },
    })
  }
  const getScannedQuantityRequest = (WMSFormId, ItemNumber) => {
    dispatch({
      type: `${TableName}/GetProductionMaterialCollarOrder_Details_InfoTableList`,
      payload: {
        WMSFormId: WMSFormId,
        ItemNumber: ItemNumber
      },
    })
  }
  const wmsProductionMaterialCollarOrderColums = [{
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
  const wmsProductionMaterialCollarOrder_DetailsColums = [{
    title: '项目号',
    dataIndex: 'ItemNumber',
  }, {
    title: '状态',
    dataIndex: 'StateName',
  }, {
    title: '料号',
    dataIndex: 'MaterialNumber',
  }, {
    title: '需求数量',
    dataIndex: 'RequestQuantity',
  }, {
    title: '实际领料数量',
    dataIndex: 'ScannedQuantity',
    render: (text, record) => <a onClick={() => getScannedQuantityRequest(record.WMSFormId, record.ItemNumber)}>{text}</a>,
  }, {
    title: '领料仓库',
    dataIndex: 'PickingAreaNumber',
  }, {
    title: '接收库位',
    dataIndex: 'RequestLocationNumber',
  }]

  const wmsProductionMaterialCollarOrder_Details_InfoColums = [{
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
    title: '接收库位',
    dataIndex: 'CurrentLocationNumber',
  }]
  const handleSearch = (e) => {
    console.log('handleSearch')
    e.preventDefault();
    validateFields(SearchFormLayout, (err, payload) => {
      if (!err) {
        const Params = {
          FormNumber: payload.FormNumberForm,
          SearchDate_From: moment(payload.SearchDate_FromForm).format(dateFormat),
          SearchDate_To: moment(payload.SearchDate_ToForm).format(dateFormat),
        }
        SearchTableList(Params, 1, pagination.PageSize)
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
          FormNumber: FromParams.FormNumber,
          SearchDate_From: FromParams.SearchDate_From,
          SearchDate_To: FromParams.SearchDate_To
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
                <FormItem {...formItemLayout} label={`物料领用单号`}>
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
      <h2 style={{ margin: '20px' }}>生产物料领用单</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={ProductionMaterialCollarOrderTableList}
          columns={wmsProductionMaterialCollarOrderColums}
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
          data={ProductionMaterialCollarOrder_DetailsTableList}
          columns={wmsProductionMaterialCollarOrder_DetailsColums}
          TableWidth={1000}
          paginationDisplay={'no'}
          pagination={pagination}
        />
      </div>
      <h2 style={{ margin: '20px' }}>生产物料已领用信息</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={ProductionMaterialCollarOrder_Details_InfoTableList}
          columns={wmsProductionMaterialCollarOrder_Details_InfoColums}
          TableWidth={1000}
          paginationDisplay={'no'}
          pagination={pagination}
        />
      </div>
    </div>
  )
}



export default connect(({ productionMaterialCollarOrder }) => ({ productionMaterialCollarOrder }))(Form.create()(ProductionMaterialCollarOrderTableComponents))
