

import React from 'react'
import { Form, Input, Row, Col, Radio, Select, Button, Icon, Badge } from 'antd'
import { connect } from 'dva'
import FormComponents from '../components/workOrderActivationFormComponent'
import TableComponents from '../components/workOrderSettingTableComponent'
import globalConfig from 'utils/config'
import './index.less'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
//每个table可能不同的变量字段(1)
const TableName = 'workOrderSetting'
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
  'WorkOrderNumberDecorator',
  'StationIdDecorator',
]

const workOrderSettingColums = [{
  title: '状态',
  dataIndex: 'StateName',
  render: (text, record) => <span><Badge status='success' />{record.StateName}</span>
}, {
  title: '工站编号',
  dataIndex: 'StationNr',
}, {
  title: '物料号',
  dataIndex: 'MaterialNumber',
}, {
  title: '物料描述',
  dataIndex: 'MaterialDescription',
}, {
  title: '位置',
  dataIndex: 'Designator',
},
//  {
//   title: '料道位置',
//   dataIndex: 'FeederLocation',
// },
{
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
const WorkOrderSettingComponent = ({
  workOrderSetting,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = workOrderSetting
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, TableComponentsValueToWorkOrderSettingState, GetStationInformationInitData,
    pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, EditData, DetailsData, AreaList,
    StationInformationData, StationId,
    WorkOrderNumber } = TableModelsData

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

  const handleSubmit = (e) => {
    e.preventDefault();
    validateFields(handleSubmitLayout, (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const Params = {
          // lineName: values.lineNameDecorator
          WorkOrderNumber: values.WorkOrderNumberDecorator,
          StationNumber: values.StationIdDecorator
        }
        handleSearchFormComponents(Params, 'GetSetupActivationInfor')
      }
    });
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
              <Col span={8} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`工单号`}>

                  {getFieldDecorator('WorkOrderNumberDecorator', {
                    initialValue: WorkOrderNumber,
                    rules: [
                      {
                        required: true, message: '请输入工单编号',
                      },
                    ],
                  })(<Input />)}
                </FormItem>
              </Col>
              <Col span={8} key={3} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`站位`}>
                  {getFieldDecorator('StationIdDecorator', {
                    initialValue: StationId.toString(),
                    rules: [
                      {
                        required: true, message: '清选择站位号',
                      },
                    ],
                  })(<Select
                    style={{ width: 200 }}
                  // onChange={this.handleChange}
                  >
                    {StationInformationData.map(function (item, index) {
                      return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                    })}
                  </Select>)}

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
      <div>
        <TableComponents
          tableName={TableName}
          data={list}
          tableLoading={tableLoading}
          pagination={pagination}
          columns={workOrderSettingColums}
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


export default connect(({ workOrderSetting }) => ({ workOrderSetting }))(Form.create()(WorkOrderSettingComponent))


// <FormComponents
// GetStationInformationInitData={GetStationInformationInitData}
// handleSearchFormComponents={handleSearchFormComponents}
// formComponentsValue={formComponentsValue()}
// />

// <Col span={8} key={3} style={{ display: 'block' }}>
// <FormItem {...formItemLayout} label={`站位`}>
//   {getFieldDecorator(`StationNumberDecorator`)(
//     <Select
//       style={{ width: 200 }}
//       onChange={this.handleChange}
//     >
//       {this.props.GetStationInformationInitData.map(function (item, index) {
//         return <Option key={index} value={item.key.toString()}>{item.label}</Option>
//       })}
//     </Select>
//   )}
// </FormItem>
// </Col>






