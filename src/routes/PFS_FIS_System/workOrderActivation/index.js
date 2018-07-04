import React from 'react'
import { Form, Input, Row, Col, Radio, DatePicker, Select, Checkbox, Button, Icon } from 'antd'
import { connect } from 'dva'
import FormComponentsValueToActivatedWorkOrder from '../components/formComponentsValueToActivatedWorkOrder'
import FormComponentsValueToOptionalWorkOrder from '../components/formComponentsValueToOptionalWorkOrder'
import TableComponents from '../components/workOrderActivationTableComponent'
import TableComponent2 from '../components/workOrderActivationTableComponent2'
import globalConfig from 'utils/config'
const { RangePicker } = DatePicker;
const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group;
function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}
const plainOptions = ['已计划', '开始生产', '已完成', '已关闭'];
//每个table可能不同的变量字段(1)
const TableName = 'workOrderActivation'
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

const handleSubmitLayout = [
  'lineNameDecorator']

//已激活工单
//可选工单
const ActivatedWorkOrderColums = [{
  title: '工单号',
  dataIndex: 'WorkOrderNumber',
}, {
  title: '站位号',
  dataIndex: 'StationNumber',
}, {
  title: '站位描述',
  dataIndex: 'StationName',
}, {
  title: '料号',
  dataIndex: 'PartNumber',
}, {
  title: '物料描述',
  dataIndex: 'PartDescription',
}, {
  title: '面',
  dataIndex: 'LayerName',
}, {
  title: '激活时间',
  dataIndex: 'SetupActivationDateTime',
}, {
  title: '设置状态',
  dataIndex: 'SetupStateName',
}, {
  title: '查看设置情况',
  dataIndex: 'Operation',
}]
const OptionalWorkOrderColums = [{
  title: '工单号',
  dataIndex: 'WorkOrderNumber',
}, {
  title: '料号',
  dataIndex: 'PartNumber',
}, {
  title: '产品描述',
  dataIndex: 'PartDescription',
}, {
  title: '计划数量',
  dataIndex: 'PlannedQuantity',
}, {
  title: '已完成数量',
  dataIndex: 'FinishedQuantity',
}, {
  title: '工单备注',
  dataIndex: 'Comment',
}, {
  title: '工单状态',
  dataIndex: 'WorkOrderStateName',
}, {
  title: '厂区',
  dataIndex: 'ShiftName',
}, {
  title: '线体',
  dataIndex: 'LineName',
}, {
  title: '计划生产时间',
  dataIndex: 'PlanStartDateTime',
}, {
  title: '实际生产时间',
  dataIndex: 'ActualStartDateTime',
}, {
  title: '计划完成时间',
  dataIndex: 'PlanEndDateTime',
}, {
  title: '实际完成时间',
  dataIndex: 'ActualEndDateTime',
}]

const workOrderActivationColums = [{
  title: '状态',
  dataIndex: 'State',
}, {
  title: '工站编号',
  dataIndex: 'StationNr',
}, {
  title: '物料号',
  dataIndex: 'Layer',
}, {
  title: '物料描述',
  dataIndex: 'StationDescription',
}, {
  title: '产品位置',
  dataIndex: 'MaterialNumber',
}, {
  title: '料道位置',
  dataIndex: 'FeederLocation',
}, {
  title: '物料容器号',
  dataIndex: 'MaterialContainerNumber',
}, {
  title: '供应商',
  dataIndex: 'SupplierName',
}, {
  title: '供应商料号',
  dataIndex: 'SupplierMaterialNumber',
}, {
  title: '批次号',
  dataIndex: 'BatchNumber',
}, {
  title: '数量',
  dataIndex: 'MaterialQuantity',
}, {
  title: '上料时间',
  dataIndex: 'ScannedDateTime',
}, {
  title: '上料员工号',
  dataIndex: 'OperatorNumber',
}, {
  title: '上料员姓名',
  dataIndex: 'OperatorName',
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
const WorkOrderActivationComponent = ({
  workOrderActivation,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = workOrderActivation
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible,
    EditData, DetailsData, AreaList, GetAllLineNamesInitData, TableComponentsValueToActivatedWorkOrder, TableComponentsValueToOptionalWorkOrder,
    lineName, StationName, WorkOrderNumber } = TableModelsData

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
  const formComponentsValueToActivatedWorkOrder = () => {
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    }
    return (
      <Form>
        <Row gutter={40}>
          <Col span={8} key={2} style={{ display: 'block' }}>
            <FormItem {...formItemLayout} label={`生产线`}>
              {getFieldDecorator(`field2`)(
                <Select
                  style={{ width: 200 }}
                  onChange={handleChange}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
  const formComponentsValueToOptionalWorkOrder = () => {
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    }
    return (
      <Form>
        <Row gutter={40}>
          <Col span={8} key={3} style={{ display: 'block' }}>
            <FormItem {...formItemLayout} label={`工单状态`}>
              {getFieldDecorator(`WorkOrderStateFieldDecorator`, {
                initialValue: [],
              })(
                <CheckboxGroup options={plainOptions} onChange={onChange} />
                )}

            </FormItem>
          </Col>
          <Col span={8} key={2} style={{ display: 'block' }}>
            <FormItem {...formItemLayout} label={`时间选择`}>
              {getFieldDecorator(`PlannedStartDateTimeFieldDecorator`, {
                initialValue: '',
              })(
                <RangePicker
                  showTime={{ format: 'HH:mm' }}
                  format="YYYY-MM-DD HH:mm"
                  placeholder={['计划开始', '计划结束']}
                />
                )}
            </FormItem>
          </Col>

        </Row>
      </Form>
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
        <FormItem
          {...formItemLayout}
          label="库位编号"
        >
          <Input disabled value={DetailsData.LocationNumber} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="区域"
        >
          <Input disabled value={DetailsData.Area} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="X轴坐标"
        >
          <Input disabled value={DetailsData.X} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Y轴坐标"
        >
          <Input disabled value={DetailsData.Y} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Z轴坐标"
        >
          <Input disabled value={DetailsData.Z} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="状态"
        >
          <Input disabled value={DetailsData.State} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="创建时间"
        >
          <Input disabled value={DetailsData.CreateDateTime} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="创建人"
        >
          <Input disabled value={DetailsData.Creator} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="最后编辑时间"
        >
          <Input disabled value={DetailsData.EditDateTime} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="最后编辑人"
        >
          <Input disabled value={DetailsData.Editor} />
        </FormItem>
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields(handleSubmitLayout, (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const Params = {
          lineName: values.lineNameDecorator
        }
        handleSearchFormComponents(Params, 'formComponentsValueToActivatedWorkOrder')
      }
    });
  }
  const FormDataoOnChange = (key) => (value) => {
    console.log('FormDataoOnChange', key, value)
    // this.setState({ [key]: value });
    dispatch({
      type: `${TableName}/ChangerState`,
      payload: {
        modalType: key,
        [key]: value
      },
    })
  }
  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
      <div style={{ marginBottom: '20px', borderColor: 'red', borderWidth: '1px' }}>

        <div className="components-form-demo-advanced-search" >
          <Form
            className="ant-advanced-search-form"
            onSubmit={handleSubmit}
          >
            <Row gutter={40}>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`生产线`}>
                  {getFieldDecorator(`lineNameDecorator`)(
                    <Select
                      style={{ width: 200 }}
                      onChange={FormDataoOnChange('lineName')}
                    >
                      {GetAllLineNamesInitData.map(function (item, index) {
                        return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                      })}
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
      <h2 style={{ textAlign: 'left' }}>当前已激活工单</h2>
      <div>
        <TableComponents
          tableName={TableName}
          data={TableComponentsValueToActivatedWorkOrder}
          tableLoading={tableLoading}
          pagination={pagination}
          columns={ActivatedWorkOrderColums}
          TableWidth={1300}
          addModalValue={addModalValue()}
          editModalValue={editModalValue()}
          detailsModalValue={detailsModalValue()}
          handleAdd={handleAdd}
          tableModels={TableModelsData}
        />
      </div>
      <hr style={{ border: "3 double black", marginTop: '40px', marginBottom: '40px' }} width="80%" color='#e6e6e6' size='3' />
      <div style={{ marginTop: '20px', marginBottom: '20px', borderColor: 'red', borderWidth: '1px' }}>
        <FormComponentsValueToOptionalWorkOrder
          lineName={lineName}
          handleSearchFormComponents={handleSearchFormComponents}
        //formComponentsValue={formComponentsValueToOptionalWorkOrder()}
        />

      </div>
      <h2 style={{ textAlign: 'left' }}>可选工单</h2>
      <div>
        <TableComponent2
          tableName={TableName}
          data={TableComponentsValueToOptionalWorkOrder}
          tableLoading={tableLoading}
          pagination={pagination}
          columns={OptionalWorkOrderColums}
          TableWidth={1500}
          addModalValue={addModalValue()}
          editModalValue={editModalValue()}
          detailsModalValue={detailsModalValue()}
          handleAdd={handleAdd}
          tableModels={TableModelsData}
          lineName={lineName}
        />
      </div>

    </div>
  )
}


export default connect(({ workOrderActivation }) => ({ workOrderActivation }))(Form.create()(WorkOrderActivationComponent))


// <Col span={8} key={3} style={{ display: 'block' }}>
// <FormItem {...formItemLayout} label={`计划结束`}>
//   {getFieldDecorator(`PlannedEndDateTimeFieldDecorator`, {
//     initialValue: '',
//   })(
//     <DatePicker
//       showTime
//       format="YYYY-MM-DD HH:mm:ss" />
//     )}
// </FormItem>
// </Col>


// <FormComponentsValueToActivatedWorkOrder
// GetAllLineNamesInitData={GetAllLineNamesInitData}
// handleSearchFormComponents={handleSearchFormComponents}
// // formComponentsValue={formComponentsValueToActivatedWorkOrder()}
// />
