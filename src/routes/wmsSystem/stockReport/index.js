
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
import './index.less'

const FormItem = Form.Item
const { Option } = Select
const dateFormat = 'YYYY-MM-DD';
//每个table可能不同的变量字段(1)
const TableName = 'stockReport'
const TableColumns = wmsRawMaterialReceiptsColums
const SearchFormLayout = [
  'AreaIdForm'
]


const StockReportTableComponents = ({
  stockReport,
  dispatch,
  location,
  form
}) => {
  const {
    pagination,
    AreaList,
    stockReportTableList
  } = stockReport
  console.log('StockReportTableComponents', stockReport)
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
    title: '区域',
    dataIndex: 'AreaCode',
  }, {
    title: '料号',
    dataIndex: 'PartNumber',
  }, {
    title: '物料描述',
    dataIndex: 'PartDescription',
  }, {
    title: '总数量',
    dataIndex: 'TotalQuantity',
  }, {
    title: '总箱量',
    dataIndex: 'TotalBoxQuantity',
  }]

  const handleSearch = (e) => {
    console.log('handleSearch')
    e.preventDefault();
    validateFields(SearchFormLayout, (err, payload) => {
      if (!err) {
        const Params = {
          AreaId: parseInt(payload.AreaIdForm),
          FactoryId: 5
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
          AreaId: parseInt(payload.AreaIdForm),
          FactoryId: 5
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
                <FormItem {...formItemLayout} label={`区域`}>
                  {getFieldDecorator(`AreaIdForm`, {
                    initialValue: '',
                  })(
                    <Select
                      style={{ width: 200 }}
                    // onChange={handleChange}
                    >
                      {AreaList.map(function (item, index) {
                        return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                      })}
                    </Select>
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

      <h2 style={{ margin: '20px' }}>库存查询</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={stockReportTableList}
          columns={wmsRawMaterialReceiptsColums}
          TableWidth={1000}
          paginationDisplay={'yes'}
          pagination={pagination}
          PaginationComponentsChanger={PaginationComponentsChanger}
        />
      </div>
    </div>
  )
}



export default connect(({ stockReport }) => ({ stockReport }))(Form.create()(StockReportTableComponents))
