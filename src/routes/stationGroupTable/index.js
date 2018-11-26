import React from 'react'
import { Form, Input, Row, Col, Radio, Select } from 'antd'
import { connect } from 'dva'
import { FormComponents, TableComponents } from '../../components'
import globalConfig from 'utils/config'
import { stationGroupTableColumns } from '../../mock/tableColums'
import './index.less'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
//每个table可能不同的变量字段(1)
const TableName = 'stationGroupTable'
const TableColumns = stationGroupTableColumns
const AddFormLayout = ['AddGroupNumber', 'AddDescription', 'AddState']
const EditFormLayout = ['EditId', 'EditGroupNumber', 'EditDescription', 'EditState', 'EditStationIdArray']

const StationGroupTableComponents = ({
  stationGroupTable,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = stationGroupTable
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, EditData, DetailsData, TotalStation, SelectedStation } = TableModelsData

  console.log('TableComponents-stationGroupTable ', TableModelsData)
  /**
   * crud modal
   */
  // 定义表单域 =>发出Action  每个table可能不同的变量字段(3)
  const handleAdd = (modalType) => {
    if (modalType === 'create') {
      validateFields(AddFormLayout, (err, payload) => {
        const createParam = { GroupNumber: payload.AddGroupNumber, Description: payload.AddDescription, State: parseInt(payload.AddState) }
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
        const editParam = { Id: payload.EditId, GroupNumber: payload.EditGroupNumber, Description: payload.EditDescription, State: parseInt(payload.EditState), StationIdArray: payload.EditStationIdArray.map(item => parseInt(item.key)) }
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
  //每个table可能不同的变量字段(4)
  const formComponentsValue = () => {
    return (
      <Form>
        <Row gutter={40}>
          <Col span={8} key={1} style={{ display: 'block' }}>
            <FormItem {...formItemLayout} label={`测试1`}>
              {getFieldDecorator(`field1`)(
                <Input placeholder="placeholder" />
              )}
            </FormItem>
          </Col>
          <Col span={8} key={2} style={{ display: 'block' }}>
            <FormItem {...formItemLayout} label={`测试2`}>
              {getFieldDecorator(`field2`)(
                <Input placeholder="placeholder" />
              )}
            </FormItem>
          </Col>
          <Col span={8} key={3} style={{ display: 'block' }}>
            <FormItem {...formItemLayout} label={`测试3`}>
              {getFieldDecorator(`field3`)(
                <Input placeholder="placeholder" />
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
            label="工站组编号"
            hasFeedback
          >
            {getFieldDecorator('AddGroupNumber', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入工站组编号',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="名称"
            hasFeedback
          >
            {getFieldDecorator('AddDescription', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入名称',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="状态"
          >
            <div>
              {getFieldDecorator('AddState', {
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
  const editModalValue = () => {
    console.log('editModalValue--', EditData, EditData.Id, EditData.GroupNumber)
    return (
      <div>
        <Form >
          <FormItem
            {...formItemLayout}
            label="Id"
            hasFeedback
          >
            {getFieldDecorator('EditId', {
              initialValue: EditData.Id,
            })(<Input disabled />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="工作站组编号"
            hasFeedback
          >
            {getFieldDecorator('EditGroupNumber', {
              initialValue: EditData.GroupNumber,
              rules: [
                {
                  required: true, message: '请输入工作站组编号',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="名称"
            hasFeedback
          >
            {getFieldDecorator('EditDescription', {
              initialValue: EditData.Description,
              rules: [
                {
                  required: true, message: '请输入名称',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="状态"
          >
            <div>
              {getFieldDecorator('EditState', {
                initialValue: EditData.State.toString(),
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
          <FormItem
            {...formItemLayout}
            label="可选工站"
          >
            <div>
              {getFieldDecorator('EditStationIdArray', {
                initialValue: SelectedStation,
              })(
                <Select
                  mode="multiple"
                  labelInValue
                  style={{ width: '100%' }}
                  placeholder="请选择"
                >
                  {TotalStation.map(function (item, index) {
                    return <Option key={index} value={item.key}>{item.label}</Option>
                  })}
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
          label="工作组编号"
        >
          <Input disabled value={DetailsData.GroupNumber} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="名称"
        >
          <Input disabled value={DetailsData.Description} />
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
          <Input disabled value={DetailsData.CreationDateTime} />
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
          formComponentsValue={formComponentsValue()}
        />
      </div>
      <div>
        <TableComponents
          tableName={TableName}
          data={list}
          tableLoading={tableLoading}
          pagination={pagination}
          columns={TableColumns}
          TableWidth={1300}
          addModalValue={addModalValue()}
          editModalValue={editModalValue()}
          detailsModalValue={detailsModalValue()}
          handleAdd={handleAdd}
          tableModels={TableModelsData}
          EditData={EditData}
        />
      </div>
    </div>
  )
}


export default connect(({ stationGroupTable }) => ({ stationGroupTable }))(Form.create()(StationGroupTableComponents))



//  class EditModalValue extends React.Component {


//     componentWillReceiveProps = (newProps, props) => {
//       console.log('Component WILL RECEIVE PROPS!11', newProps, props)

//     }

//     // handleOk = (modalType) => {
//     //   this.props.handleAdd(modalType)
//     // }
//     render() {
//       const {
//         EditData,
//         formItemLayout

//       } =this.props
//       return(
//         <div>
//         <Form >
//           <FormItem
//             {...formItemLayout}
//             label="Id"
//             hasFeedback
//           >
//             {getFieldDecorator('EditId', {
//               initialValue: EditData.Id,
//             })(<Input disabled />)}
//           </FormItem>
//           <FormItem
//             {...formItemLayout}
//             label="工作站组编号"
//             hasFeedback
//           >
//             {getFieldDecorator('EditGroupNumber', {
//               initialValue: EditData.GroupNumber,
//               rules: [
//                 {
//                   required: true, message: '请输入工作站组编号',
//                 },
//               ],
//             })(<Input />)}
//           </FormItem>
//           <FormItem
//             {...formItemLayout}
//             label="名称"
//             hasFeedback
//           >
//             {getFieldDecorator('EditDescription', {
//               initialValue: EditData.Description,
//               rules: [
//                 {
//                   required: true, message: '请输入名称',
//                 },
//               ],
//             })(<Input />)}
//           </FormItem>
//           <FormItem
//             {...formItemLayout}
//             label="状态"
//           >
//             <div>
//               {getFieldDecorator('EditState', {
//                 initialValue: EditData.State.toString(),
//                 rules: [
//                   {
//                     required: true, message: '请选择状态',
//                   },
//                 ],
//               })(
//                 <Select>
//                   <Option key={0} value='0'>未激活</Option>
//                   <Option key={1} value='1'>激活</Option>
//                   <Option key={2} value='-1'>已删除</Option>
//                 </Select>
//                 )}
//             </div>
//           </FormItem>
//           <FormItem
//             {...formItemLayout}
//             label="可选工站"
//           >
//             <div>
//               {getFieldDecorator('EditStationIdArray', {
//                 initialValue: SelectedStation,
//               })(
//                 <Select
//                   mode="multiple"
//                   labelInValue
//                   style={{ width: '100%' }}
//                   placeholder="请选择"
//                 >
//                   {TotalStation.map(function (item, index) {
//                     return <Option key={index} value={item.key}>{item.label}</Option>
//                   })}
//                 </Select>
//                 )}
//             </div>
//           </FormItem>
//         </Form>
//       </div>
//       )
//     }

//   }
