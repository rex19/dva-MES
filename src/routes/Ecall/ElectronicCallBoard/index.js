import React from 'react'
import { Form, Input, Row, Col, Radio, Select, Button, Icon, DatePicker, Badge } from 'antd'
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
const TableName = 'electronicCallBoard'
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
const SearchFormLayout = ['areaIdForm', 'locationIdForm', 'requestStartTimeForm', 'requestEndTimeForm']


const electronicCallBoardColums = [{
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
const ElectronicCallBoardComponent = ({
  electronicCallBoard,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = electronicCallBoard
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
          // areaId: payload.areaIdForm,
          // locationId: payload.locationIdForm,
          areaId: 1,
          locationId: 8,
          requestStartTime: moment(payload.requestStartTimeForm).format(dateFormat),
          requestEndTime: moment(payload.requestEndTimeForm).format(dateFormat),
          pageIndex: 1,
          pageSize: 10
        }
        console.log('handleSearch-Params', Params)
        // this.props.handleSearchFormComponents(Params, 'formComponentsValueToSettingState')
        dispatch({
          type: `${TableName}/query`,
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
        <h1>电子叫料看板-Line1</h1>
      </div>
      <div>
        <Row style={{ marginBottom: '10px' }}>
          <Col span={24} style={{ textAlign: 'left' }}>
            <span><Badge status='error' />超时一小时</span>
          </Col>
        </Row>

        <TableComponents
          tableName={TableName}
          data={list}
          tableLoading={tableLoading}
          pagination={pagination}
          columns={electronicCallBoardColums}
          TableWidth={1300}
          addModalValue={addModalValue()}
          editModalValue={editModalValue()}
          detailsModalValue={detailsModalValue()}
          handleAdd={handleAdd}
          tableModels={TableModelsData}
          PreviewSubTableList={PreviewSubTableList}
        />
      </div>
    </div>
  )
}


export default connect(({ electronicCallBoard }) => ({ electronicCallBoard }))(Form.create()(ElectronicCallBoardComponent))


// <Select>
// {InitData.map(function (item, index) {
//   return <Option key={index} value={item.key}>{item.label}</Option>
// })}
// </Select>
