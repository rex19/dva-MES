import React from 'react'
import { Form, Input, Row, Col, Radio, Select, Button, Icon, DatePicker, Badge } from 'antd'
import { connect } from 'dva'
import FormComponents from '../components/CreatProductionInitialOrderBlankFormComponent'
import TableComponents from '../components/CreatProductionInitialOrderBlankTableComponent'
import globalConfig from 'utils/config'
import moment from 'moment';
// import './index.less'

const { Option } = Select
const RadioGroup = Radio.Group
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const FormItem = Form.Item
//每个table可能不同的变量字段(1)
const TableName = 'invoiceList'
const AddFormLayout = [
  'AddLocationNumber',
  'AddDescription',
  'AddAreaId',
  'AddX',
  'AddY',
  'AddZ',
  'AddState']
const EditFormLayout = [
  'EditId',
  'EditLocationNumber',
  'EditDescription',
  'EditAreaId',
  'EditX',
  'EditY',
  'EditZ',
  'EditState']
const SearchFormLayout = [
  'areaIdForm',
  'locationIdForm',
  'requestStartTimeForm',
  'requestEndTimeForm',
  'MaterialForm',
  'stateForm'
]


const invoiceListColums = [{
  title: '状态',
  dataIndex: 'stateValue',
  render: (text, record) => <span><Badge status={record.stateColor} />{record.stateValue}</span>
}, {
  title: '请求时间',
  dataIndex: 'createDateTime',
}, {
  title: '请求地点',
  dataIndex: 'locationNumber',
}, {
  title: '找料区域',
  dataIndex: 'areaNumber',
}, {
  title: '物料料号',
  dataIndex: 'MaterialNumber',
}, {
  title: '请求数量',
  dataIndex: 'Quantity',
}]
const invoiceListColums1 = [{
  title: '状态',
  dataIndex: 'stateValue',
  render: (text, record) => <span><Badge status={record.stateColor} />{record.stateValue}</span>
}, {
  title: '请求时间',
  dataIndex: 'createDateTime',
}, {
  title: '请求地点',
  dataIndex: 'locationNumber',
}, {
  title: '找料区域',
  dataIndex: 'areaNumber',
}, {
  title: '物料料号',
  dataIndex: 'MaterialNumber',
}, {
  title: '请求数量',
  dataIndex: 'Quantity',
}]
const InvoiceListComponent = ({
  invoiceList,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = invoiceList
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, TableComponentsValueToWorkOrderSettingState, GetStationInformationInitData,
    pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, EditData, DetailsData, AreaList,
    areaIdFormData, locationIdFormData, MaterialFormData,
    MaterialRequestFormId, PreviewSubTableList } = TableModelsData

  console.log('WorkOrderListComponent-WorkOrderList-', TableModelsData)
  /**
   * crud modal
   */
  // 定义表单域 =>发出Action  每个table可能不同的变量字段(3)
  const handleAdd = (modalType) => {
    if (modalType === 'create') {
      validateFields(AddFormLayout, (err, payload) => {
        const createParam = { LocationNumber: payload.AddLocationNumber, Description: payload.AddDescription, AreaId: parseInt(payload.AddAreaId), X: payload.AddX, Y: payload.AddY, Z: payload.AddZ, State: parseInt(payload.AddState) }
        if (!err) {
          dispatch({
            type: `${TableName}/${modalType}`,
            payload: createParam,
          })
          resetFields(AddFormLayout)
        }
      })
    } else if (modalType === 'edit') {
      validateFields(EditFormLayout, (err, payload) => {
        const editParam = { Id: payload.EditId, LocationNumber: payload.EditLocationNumber, Description: payload.EditDescription, AreaId: parseInt(payload.EditAreaId), X: payload.EditX, Y: payload.EditY, Z: payload.EditZ, State: parseInt(payload.EditState) }
        if (!err) {
          dispatch({
            type: `${TableName}/${modalType}`,
            payload: editParam,
          })
        }
      })
    }
  }

  /**
   * modal 开关
   */
  const handleAddModalOpen = (modalVisible) => {
    dispatch({
      type: `${TableName}/showModal`,
      payload: {
        modalType: modalVisible,
      },
    })
  }

  /**
 * formComponent 触发查询
 */
  const handleSearchFormComponents = (Params, modalType) => {

    console.log('handleSearchFormComponents', Params, modalType)
    dispatch({
      type: `${TableName}/handleSearchFormComponents`,
      payload: {
        modalType: modalType,
        Params: Params
      },
    })
  }
  //每个table可能不同的变量字段(4)
  const formComponentsValue = () => {
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    }
    return (
      <div>
        formComponentsValue
    </div>
    )
  }
  const addModalValue = () => {
    return (
      <div>
        <Form >
          <FormItem
            {...formItemLayout}
            label="库位编号"
          >
            {getFieldDecorator('AddLocationNumber', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
        </Form>
      </div>
    )
  }
  const editModalValue = () => {
    return (
      <div>
        <Form >
          <FormItem
            {...formItemLayout}
            label="ID"
          >
            {getFieldDecorator('EditId', {
              initialValue: EditData.Id,
            })(<Input disabled />)}
          </FormItem>

        </Form>
      </div>
    )
  }
  const detailsModalValue = () => {
    return (
      <div>
        <FormItem
          {...formItemLayout}
          label="ID"
        >
          <Input disabled value={DetailsData.Id} />
        </FormItem>

      </div>
    )
  }
  const handleSearch = (e) => {
    e.preventDefault();
    validateFields(SearchFormLayout, (err, payload) => {
      if (!err) {
        const Params = {
          areaId: payload.areaIdForm,
          locationId: payload.locationIdForm,
          materialId: payload.MaterialForm,
          state: payload.stateForm,
          factoryId: 1,
          requestStartTime: moment(payload.requestStartTimeForm).format(dateFormat),
          requestEndTime: moment(payload.requestEndTimeForm).format(dateFormat)
          // pageIndex: 1,
          // pageSize: 10
        }
        console.log('handleSearch-Params', Params)
        SearchTableList(Params, pagination.PageIndex, pagination.PageSize)
        // this.props.handleSearchFormComponents(Params, 'formComponentsValueToSettingState')
        // dispatch({
        //   type: `${TableName}/query`,
        //   payload: Params,
        // })
      }
    });
  }

  const PaginationComponentsChanger = (PageIndex, PageSize) => {
    validateFields(SearchFormLayout, (err, payload) => {

      if (!err) {
        const Params = {
          areaId: payload.areaIdForm,
          locationId: payload.locationIdForm,
          materialId: payload.MaterialForm,
          state: payload.stateForm,
          factoryId: 1,
          requestStartTime: moment(payload.requestStartTimeForm).format(dateFormat),
          requestEndTime: moment(payload.requestEndTimeForm).format(dateFormat),
        }
        console.log('PaginationComponentsChanger', Params);
        SearchTableList(Params, PageIndex, PageSize)

      }
    })
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
  const FormDataoOnChange = (key) => (value) => {
    console.log('FormDataoOnChange', key, value)
    // this.setState({ [key]: value });
    dispatch({
      type: `${TableName}/ChangerState`,
      payload: {
        modalType: key,
        [key]: value
        // materialRequestFormItemId: MaterialRequestFormId
      },
    })
  }

  //配货单预览
  const previewClick = (modalVisible) => {
    console.log('success preview!', MaterialRequestFormId)
    dispatch({
      type: `${TableName}/showModalAndAjax`,
      payload: {
        modalType: modalVisible,
        data: MaterialRequestFormId
      },
    })
  }

  // //打开模态框
  // const handleModalShow = (modalVisible, record = {}) => {
  //   console.log('handleModalShow', modalVisible, tableName)
  //   dispatch({
  //     type: `${tableName}/showModalAndAjax`,
  //     payload: {
  //       modalType: modalVisible,
  //       record: record
  //     },
  //   })
  // }
  // const SearchFormLayout = ['areaIdForm', 'locationIdForm', 'requestStartTimeForm', 'requestEndTimeForm']
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
                <FormItem {...formItemLayout} label={`状态`}>
                  {getFieldDecorator(`stateForm`)(
                    <Select>
                      <Option key={1} value='1'>新</Option>
                      <Option key={2} value='2'>正在配货</Option>
                      <Option key={3} value='3'>配货完成</Option>
                      <Option key={-1} value='-1'>已关闭</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`找料区域`}>
                  {getFieldDecorator(`areaIdForm`)(
                    <Select>
                      {areaIdFormData.map(function (item, index) {
                        return <Option key={index} value={item.key}>{item.label}</Option>
                      })}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={3} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`请求地点`}>
                  {getFieldDecorator(`locationIdForm`)(
                    <Select>
                      {locationIdFormData.map(function (item, index) {
                        return <Option key={index} value={item.key}>{item.label}</Option>
                      })}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`料号`}>
                  {getFieldDecorator(`MaterialForm`)(
                    <Select>
                      {MaterialFormData.map(function (item, index) {
                        return <Option key={index} value={item.key}>{item.label}</Option>
                      })}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`开始时间`}>
                  {getFieldDecorator(`requestStartTimeForm`, {
                    initialValue: '',
                  })(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss" />
                    )}
                </FormItem>
              </Col>
              <Col span={8} key={3} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`结束时间`}>
                  {getFieldDecorator(`requestEndTimeForm`, {
                    initialValue: '',
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
      <div>

        <TableComponents
          tableName={TableName}
          data={list}
          tableLoading={tableLoading}
          pagination={pagination}
          columns={invoiceListColums}
          TableWidth={1300}
          addModalValue={addModalValue()}
          editModalValue={editModalValue()}
          detailsModalValue={detailsModalValue()}
          handleAdd={handleAdd}
          tableModels={TableModelsData}
          PreviewSubTableList={PreviewSubTableList}
          PaginationComponentsChanger={PaginationComponentsChanger}
        />
      </div>
    </div>
  )
}


export default connect(({ invoiceList }) => ({ invoiceList }))(Form.create()(InvoiceListComponent))


  // <Select>
  // {InitData.map(function (item, index) {
  //   return <Option key={index} value={item.key}>{item.label}</Option>
  // })}
  // </Select>

//   < Select onChange= { FormDataoOnChange('areaId') } >
//     {
//       areaIdFormData.map(function (item, index) {
//         return <Option key={index} value={item.key}>{item.label}</Option>
//       })
//     }
// </Select >

  // <Select onChange={FormDataoOnChange('locationId')}>
  //   {locationIdFormData.map(function (item, index) {
  //     return <Option key={index} value={item.key}>{item.label}</Option>
  //   })}
  // </Select>
