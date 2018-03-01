import React from 'react'
import { Form, Input, Row, Col, Radio, DatePicker, Select, Checkbox } from 'antd'
import { connect } from 'dva'
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


  const SearchTableList = (payload) => {
    dispatch({
      type: `${TableName}/query`,
      payload: payload,
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
      <Form>
        <Row gutter={40}>
          <Col span={8} key={1} style={{ display: 'block' }}>
            <FormItem {...formItemLayout} label={`工单号`}>
              {getFieldDecorator(`field1`)(
                <Input placeholder="placeholder" />
              )}
            </FormItem>
          </Col>
          <Col span={8} key={2} style={{ display: 'block' }}>
            <FormItem {...formItemLayout} label={`计划开始`}>
              {getFieldDecorator(`field2`)(
                <DatePicker
                  placeholder="计划开始"
                  showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
            </FormItem>
          </Col>
          <Col span={8} key={3} style={{ display: 'block' }}>
            <FormItem {...formItemLayout} label={`计划结束`}>
              {getFieldDecorator(`field3`)(
                <DatePicker
                  placeholder="计划结束"
                  showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={40}>
          <Col span={8} key={1} style={{ display: 'block' }}>
            <FormItem {...formItemLayout} label={`班别`}>
              {getFieldDecorator(`field4`, {
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
              {getFieldDecorator(`field5`, {
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
              {getFieldDecorator(`field6`, {
                initialValue: '',
              })(
                <CheckboxGroup options={plainOptions} onChange={onChange} />
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
        <Form >
          <FormItem
            {...formItemLayout}
            label="库位编号"
          >
            {getFieldDecorator('AddLocationNumber', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="名称"
          >
            {getFieldDecorator('AddDescription', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="区域"
          >
            {getFieldDecorator('AddAreaId', {
              initialValue: '',
            })(
              <Select>
                {AreaList.map(function (item, index) {
                  return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                })}
              </Select>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="X轴坐标"
          >
            <div>
              {getFieldDecorator('AddX', {
                initialValue: '',
              })(<Input />)}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Y轴坐标"
          >
            <div>
              {getFieldDecorator('AddY', {
                initialValue: '',
              })(<Input />)}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Z轴坐标"
          >
            <div>
              {getFieldDecorator('AddZ', {
                initialValue: '',
              })(<Input />)}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="状态"
          >
            <div>
              {getFieldDecorator('AddState', {
                initialValue: '',
                rules: [
                  {
                    required: true, message: '请选择状态',
                  },
                ],
              })(
                <Select>
                  <Option key={0} value='0'>未激活</Option>
                  <Option key={1} value='1'>激活</Option>
                  <Option key={2} value='-1'>已删除</Option>
                </Select>
                )}
            </div>
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
          <FormItem
            {...formItemLayout}
            label="库位编号"
          >
            {getFieldDecorator('EditLocationNumber', {
              initialValue: EditData.LocationNumber,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="名称"
          >
            {getFieldDecorator('EditDescription', {
              initialValue: EditData.Description,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="区域"
          >
            {getFieldDecorator('EditAreaId', {
              // initialValue: EditData.LocationNumber,
              initialValue: '1',
            })(
              <Select>
                {AreaList.map(function (item, index) {
                  return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                })}
              </Select>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="X轴坐标"
          >
            <div>
              {getFieldDecorator('EditX', {
                initialValue: EditData.X,
              })(<Input />)}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Y轴坐标"
          >
            <div>
              {getFieldDecorator('EditY', {
                initialValue: EditData.Y,
              })(<Input />)}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Z轴坐标"
          >
            <div>
              {getFieldDecorator('EditZ', {
                initialValue: EditData.Z,
              })(<Input />)}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="状态"
          >
            <div>
              {getFieldDecorator('EditState', {
                initialValue: '1',
                rules: [
                  {
                    required: true, message: '请选择状态',
                  },
                ],
              })(
                <Select>
                  <Option key={0} value='0'>未激活</Option>
                  <Option key={1} value='1'>激活</Option>
                  <Option key={2} value='-1'>已删除</Option>
                </Select>
                )}
            </div>
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

  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
      <div style={{ marginBottom: '20px', borderColor: 'red', borderWidth: '1px' }}>
        <FormComponents
          LineNames={LineNames}
          ShiftNames={ShiftNames}
          SearchTableList={SearchTableList}
        // formComponentsValue={formComponentsValue()}
        />
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
          columns={workOrderListColums}
          TableWidth={1800}
          addModalValue={addModalValue()}
          editModalValue={editModalValue()}
          detailsModalValue={detailsModalValue()}
          handleAdd={handleAdd}
          tableModels={TableModelsData}
        />
      </div>
    </div>
  )
}


export default connect(({ workOrderTableList }) => ({ workOrderTableList }))(Form.create()(WorkOrderListComponent))


