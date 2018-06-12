import React from 'react'
import { Form, Input, Row, Col, Radio, DatePicker, Select, Checkbox, Button, Icon } from 'antd'
import { connect } from 'dva'
import moment from 'moment';
import FormComponents from '../components/FormComponents'
import TableComponents from '../components/TableComponents'
import globalConfig from 'utils/config'
import './index.less'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const CheckboxGroup = Checkbox.Group;
//每个table可能不同的变量字段(1)
const TableName = 'workOrderTableList'
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
const SearchValidateFieldsLayout = [
  'WorkOrderNumberFieldDecorator',
  'PlannedStartDateTimeFieldDecorator',
  'PlannedEndDateTimeFieldDecorator',
  'ShiftNameFieldDecorator',
  'LineNameFieldDecorator',
  'WorkOrderStateFieldDecorator']


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
}]
// , {
//   title: '操作',
//   key: (new Date()).valueOf(),
//   fixed: 'right',
//   width: 100,
//   render: (text, record) => (
//     <span>
//       <a onClick={() => handleClickEdit(record.Id)} className="ant-dropdown-link">
//         修改
//       </a>
//     </span>
//   ),
// }

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

const plainOptions = ['已计划', '开始生产', '已完成', '已关闭'];

const WorkOrderListComponent = ({
  workOrderTableList,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = workOrderTableList
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, LineNames, ShiftNames, addModalLineNames, addModalShiftNames, VMPartInformation, VMProcessInformation, CycleTimeInTheory, OEEInTheory,
    EditAllLineNames, EditAllShiftNames, EditAllWorkOrderStates,
    pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, EditData, DetailsData, AreaList } = TableModelsData

  console.log('WorkOrderListComponent-WorkOrderList ', TableModelsData)
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
  const handleSearch = (e) => {
    e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   console.log('Received values of form: ', values);
    // });
    // console.log('validateFields-handleSearch', globalConfig.table.paginationConfig)
    validateFields(SearchValidateFieldsLayout, (err, payload) => {

      if (!err) {
        const Params = {
          WorkOrderNumber: payload.WorkOrderNumberFieldDecorator,
          PlannedStartDateTime: moment(payload.PlannedStartDateTimeFieldDecorator).format(),
          PlannedEndDateTime: moment(payload.PlannedEndDateTimeFieldDecorator).format(),
          ShiftName: payload.ShiftNameFieldDecorator,
          LineName: payload.LineNameFieldDecorator,
          // WorkOrderState: 8
          WorkOrderState: payload.WorkOrderStateFieldDecorator,
          // PageIndex: pagination.PageIndex,
          // PageSize: pagination.PageSize
        }
        console.log('Received values of form: ', Params);
        SearchTableList(Params, pagination.PageIndex, pagination.PageSize)
        console.log(payload.PlannedStartDateTimeFieldDecorator.toString())

      }
    })
  }


  const SearchTableList = (payload, PageIndex, PageSize) => {
    dispatch({
      type: `${TableName}/query`,
      payload: {
        ...payload,
        PageIndex: PageIndex,
        PageSize: PageSize
      },
    })
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
        addModalValue
      </div>
    )
  }
  const editModalValue = () => {
    return (
      <div>
        editModalValue
      </div>
    )
  }
  const detailsModalValue = () => {
    return (
      <div>
        detailsModalValue
      </div>
    )
  }


  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  const PaginationComponentsChanger = (PageIndex, PageSize) => {
    validateFields(SearchValidateFieldsLayout, (err, payload) => {

      if (!err) {
        const Params = {
          WorkOrderNumber: payload.WorkOrderNumberFieldDecorator,
          PlannedStartDateTime: moment(payload.PlannedStartDateTimeFieldDecorator).format(),
          PlannedEndDateTime: moment(payload.PlannedEndDateTimeFieldDecorator).format(),
          ShiftName: payload.ShiftNameFieldDecorator,
          LineName: payload.LineNameFieldDecorator,
          WorkOrderState: payload.WorkOrderStateFieldDecorator,
        }
        console.log('PaginationComponentsChanger', Params);
        SearchTableList(Params, PageIndex, PageSize)

      }
    })
  }

  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
      <div style={{ marginBottom: '20px', borderColor: 'red', borderWidth: '1px' }}>
        <div className="components-form-demo-advanced-search" >
          <Form
            className="ant-advanced-search-form"
            onSubmit={handleSearch}
          >
            <Row gutter={40}>
              <Col span={8} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`工单号`}>
                  {getFieldDecorator(`WorkOrderNumberFieldDecorator`, {
                    initialValue: '',
                  })(
                    <Input />
                    )}
                </FormItem>
              </Col>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`计划开始`}>
                  {getFieldDecorator(`PlannedStartDateTimeFieldDecorator`, {
                    initialValue: '',
                  })(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss" />
                    )}
                </FormItem>
              </Col>
              <Col span={8} key={3} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`计划结束`}>
                  {getFieldDecorator(`PlannedEndDateTimeFieldDecorator`, {
                    initialValue: '',
                  })(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss" />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={40}>
              <Col span={8} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`班别`}>
                  {getFieldDecorator(`ShiftNameFieldDecorator`, {
                    initialValue: '',
                  })(
                    <Select
                      style={{ width: 200 }}
                      onChange={handleChange}
                    >
                      {ShiftNames.map(function (item, index) {
                        return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                      })}
                    </Select>
                    )}
                </FormItem>
              </Col>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`线体`}>
                  {getFieldDecorator(`LineNameFieldDecorator`, {
                    initialValue: '',
                  })(
                    <Select
                      style={{ width: 200 }}
                      onChange={handleChange}
                    >
                      {LineNames.map(function (item, index) {
                        return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                      })}
                    </Select>
                    )}
                </FormItem>
              </Col>
              <Col span={8} key={3} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`工单状态`}>
                  {getFieldDecorator(`WorkOrderStateFieldDecorator`, {
                    initialValue: [],
                  })(
                    <CheckboxGroup options={plainOptions} onChange={onChange} />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit" ><Icon type="search" />查询</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <div>
        <TableComponents
          addModalLineNames={addModalLineNames}
          addModalShiftNames={addModalShiftNames}
          VMPartInformation={VMPartInformation}
          VMProcessInformation={VMProcessInformation}
          CycleTimeInTheory={CycleTimeInTheory}
          OEEInTheory={OEEInTheory}
          tableName={TableName}
          data={list}
          tableLoading={tableLoading}
          pagination={pagination}
          PaginationComponentsChanger={PaginationComponentsChanger}
          columns={workOrderListColums}
          TableWidth={1800}
          addModalValue={addModalValue()}
          editModalValue={editModalValue()}
          detailsModalValue={detailsModalValue()}
          handleAdd={handleAdd}
          tableModels={TableModelsData}

          EditAllLineNames={EditAllLineNames}
          EditAllShiftNames={EditAllShiftNames}
          EditAllWorkOrderStates={EditAllWorkOrderStates}
          EditData={EditData}
          DetailsData={DetailsData}
        />
      </div>
    </div>
  )
}


export default connect(({ workOrderTableList }) => ({ workOrderTableList }))(Form.create()(WorkOrderListComponent))



// <FormComponents
// LineNames={LineNames}
// ShiftNames={ShiftNames}
// SearchTableList={SearchTableList}
// pagination={pagination}
// // formComponentsValue={formComponentsValue()}
// />
