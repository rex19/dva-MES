import React from 'react'
import { Form, Input, Row, Col, Radio, Select, Button, Icon, DatePicker, } from 'antd'
import { connect } from 'dva'
import FormComponents from '../components/CreatProductionInitialOrderBlankFormComponent'
import TableComponents from '../components/CreatProductionInitialOrderBlankTableComponent'
import globalConfig from 'utils/config'
import moment from 'moment';
import './index.less'

const { Option } = Select
const RadioGroup = Radio.Group
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const FormItem = Form.Item
//每个table可能不同的变量字段(1)
const TableName = 'creatProductionInitialOrderBlank'
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
const SearchFormLayout = ['startCreateTimeForm', 'endCreateTimeForm']



const creatProductionInitialOrderBlankColums = [{
  title: '物料',
  dataIndex: 'materialNumber',
}, {
  title: '位号',
  dataIndex: 'designator',
}, {
  title: '工站组',
  dataIndex: 'groupNumber',
}, {
  title: '单个工件用量',
  dataIndex: 'quantity',
}, {
  title: '2小时JPH总用量',
  dataIndex: 'allQuality',
}]
const CreatProductionInitialOrderBlankComponent = ({
  creatProductionInitialOrderBlank,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = creatProductionInitialOrderBlank
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, TableComponentsValueToWorkOrderSettingState, GetStationInformationInitData,
    pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, EditData, DetailsData, AreaList,
    areaIdFormData, locationIdFormData, MaterialRequestFormId, PreviewSubTableList } = TableModelsData

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
          startCreateTime: moment(payload.startCreateTimeForm).format(dateFormat),
          endCreateTime: moment(payload.endCreateTimeForm).format(dateFormat),
        }
        console.log('handleSearch-Params', Params)
        // this.props.handleSearchFormComponents(Params, 'formComponentsValueToSettingState')
        dispatch({
          type: `${TableName}/WorkOrderInChosenTimeQuery`,
          payload: Params,
        })
      }
    });
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
            <Row>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`工单开始日期`}>
                  {getFieldDecorator(`startCreateTimeForm`, {
                    initialValue: '',
                  })(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss" />
                    )}
                </FormItem>
              </Col>
              <Col span={8} key={3} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`工单结束日期`}>
                  {getFieldDecorator(`endCreateTimeForm`, {
                    initialValue: '',
                  })(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row style={{ marginBottom: '20px' }}>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
              </Col>
            </Row>
            <Row gutter={40}>
              <Col span={8} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`工单`}>
                  {getFieldDecorator(`areaIdForm`)(
                    <Select>
                      <Option key={0} value='0'>未激活</Option>
                      <Option key={1} value='1'>激活</Option>
                      <Option key={2} value='-1'>已删除</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={40}>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`送货地`}>
                  {getFieldDecorator(`locationIdForm`)(
                    <Select>
                      <Option key={0} value='0'>未激活</Option>
                      <Option key={1} value='1'>激活</Option>
                      <Option key={2} value='-1'>已删除</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Form>
      </div>
      <div>
        <TableComponents
          tableName={TableName}
          data={list}
          tableLoading={tableLoading}
          pagination={pagination}
          columns={creatProductionInitialOrderBlankColums}
          TableWidth={1300}
          addModalValue={addModalValue()}
          editModalValue={editModalValue()}
          detailsModalValue={detailsModalValue()}
          handleAdd={handleAdd}
          tableModels={TableModelsData}
          PreviewSubTableList={PreviewSubTableList}
        />
      </div>

      <Button type="primary" style={{ marginRight: '5px' }} onClick={() => previewClick('detailsModalVisible')} ><Icon type="database" />创建初始配货单</Button>
    </div>
  )
}


export default connect(({ creatProductionInitialOrderBlank }) => ({ creatProductionInitialOrderBlank }))(Form.create()(CreatProductionInitialOrderBlankComponent))


// <Select>
// {InitData.map(function (item, index) {
//   return <Option key={index} value={item.key}>{item.label}</Option>
// })}
// </Select>

// {areaIdFormData.map(function (item, index) {
//   return <Option key={index} value={item.key}>{item.label}</Option>
// })}
