import React from 'react'
import { Form, Input, Row, Col, Radio, Select } from 'antd'
import { connect } from 'dva'
import { FormComponents, TableComponents } from '../../components'
import globalConfig from 'utils/config'
import { staffTableColumns } from '../../mock/tableColums'
import './index.less'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
const { TextArea } = Input;
//每个table可能不同的变量字段(1)
const TableName = 'staffTable'
const TableColumns = staffTableColumns
const AddFormLayout = ['AddUserName', 'AddAccount', 'AddPassword', 'AddEmailAddress', 'AddPhone', 'AddState', 'AddPlatformID', 'AddState', 'AddRole']
const EditFormLayout = ['EditId', 'EditUserName', 'EditAccount', 'EditPassword', 'EditEmailAddress', 'EditPhone', 'EditState', 'EditPlatformID', 'EditState', 'EditRole']

const StaffTableComponents = ({
  staffTable,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = staffTable
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, EditData, DetailsData, TotalMultiselectData, AllocatedMultiselectData, platform } = TableModelsData

  console.log('TableComponents-staffTable ', TableModelsData)
  /**
   * crud modal
   */
  // 定义表单域 =>发出Action  每个table可能不同的变量字段(3)
  const handleAdd = (modalType) => {
    if (modalType === 'create') {
      validateFields(AddFormLayout, (err, payload) => {
        const createParam = { UserName: payload.AddUserName, Account: payload.AddAccount, Password: payload.AddPassword, EmailAddress: payload.AddEmailAddress, Phone: payload.AddPhone, State: parseInt(payload.AddState), PlatformId: parseInt(payload.AddPlatformID), Role: payload.AddRole.map(item => parseInt(item.key)) }
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
        const editParam = { Id: payload.EditId, UserName: payload.EditUserName, Account: payload.EditAccount, Password: payload.EditPassword, EmailAddress: payload.EditEmailAddress, Phone: payload.EditPhone, State: parseInt(payload.EditState), PlatformId: parseInt(payload.EditPlatformID), Role: payload.EditRole.map(item => parseInt(item.key)) }
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
            label="账号"
            hasFeedback
          >
            {getFieldDecorator('AddAccount', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入账号',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="员工姓名"
            hasFeedback
          >
            {getFieldDecorator('AddUserName', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入员工姓名',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密码"
            hasFeedback
          >
            {getFieldDecorator('AddPassword', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入密码',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="模块"
            hasFeedback
          >
            {getFieldDecorator('AddPlatformID', {
              initialValue: '1',
            })(
              <Select>
                {platform.map(function (item, index) {
                  return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                })}
              </Select>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="邮箱"
            hasFeedback
          >
            {getFieldDecorator('AddEmailAddress', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="电话"
            hasFeedback
          >
            {getFieldDecorator('AddPhone', {
              initialValue: '',
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
          <FormItem
            {...formItemLayout}
            label="已分配人员角色"
          >
            <div>
              {getFieldDecorator('AddRole', {
                initialValue: [],
              })(
                <Select
                  mode="multiple"
                  labelInValue
                  style={{ width: '100%' }}
                  placeholder="请选择"
                >
                  {TotalMultiselectData.map(function (item, index) {
                    return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                  })}
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
            hasFeedback
          >
            {getFieldDecorator('EditId', {
              initialValue: EditData.Id,
            })(<Input disabled />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="账号"
            hasFeedback
          >
            {getFieldDecorator('EditAccount', {
              initialValue: EditData.Account,
              rules: [
                {
                  required: true, message: '请输入账号',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="员工姓名"
            hasFeedback
          >
            {getFieldDecorator('EditUserName', {
              initialValue: EditData.UserName,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密码"
            hasFeedback
          >
            {getFieldDecorator('EditPassword', {
              initialValue: EditData.Password,
              rules: [
                {
                  required: true, message: '请输入密码',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="模块"
            hasFeedback
          >
            {getFieldDecorator('EditPlatformID', {
              initialValue: EditData.PlatformId.toString(),
            })(
              <Select>
                {platform.map(function (item, index) {
                  return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                })}
              </Select>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="邮箱"
            hasFeedback
          >
            {getFieldDecorator('EditEmailAddress', {
              initialValue: EditData.EmailAddress,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="电话"
            hasFeedback
          >
            {getFieldDecorator('EditPhone', {
              initialValue: EditData.Phone,
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
            label="已分配人员角色"
          >
            <div>
              {getFieldDecorator('EditRole', {
                initialValue: AllocatedMultiselectData,
              })(
                <Select
                  mode="multiple"
                  labelInValue
                  style={{ width: '100%' }}
                  placeholder="请选择"
                >
                  {TotalMultiselectData.map(function (item, index) {
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
          label="账号"
        >
          <Input disabled value={DetailsData.Account} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="员工姓名"
        >
          <Input disabled value={DetailsData.UserName} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮箱"
        >
          <Input disabled value={DetailsData.EmailAddress} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="电话"
        >
          <Input disabled value={DetailsData.Phone} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="模块"
        >
          <Input disabled value={DetailsData.PlatformName} />
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
        <FormItem
          {...formItemLayout}
          label="拥有此角色人员"
        >
          <TextArea rows={4} disabled value={DetailsData.Role} />
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
        />
      </div>
    </div>
  )
}


export default connect(({ staffTable }) => ({ staffTable }))(Form.create()(StaffTableComponents))
