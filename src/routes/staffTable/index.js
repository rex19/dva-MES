
import React from 'react'
import { Form, Input, Row, Col, Radio, Select } from 'antd'
import { connect } from 'dva'
import { FormComponents, TableComponents } from '../../components'
import './index.less'
import { staffTableColumns } from '../../mock/tableColums'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item


const StaffTableComponents = ({
  staffTable,
  dispatch,
  loading,
  location,
  form
}) => {
  let roleArr = []
  const { getFieldDecorator, validateFields, getFieldsValue } = form
  const { list, mockData, targetKeys, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, ModalValueRecord, role, platfrom, EditData } = staffTable
  // const { UserID, UserName, PlatformID, EmailAddress, Phone, UserState, LastLoginTime, CreateTime, Createor, EditTime, Editor } = ModalValueRecord
  const { Id, Account, UserName, Password, PlatformName, EmailAddress, Phone, CreationDateTime, LastLoginTime, UserState } = EditData
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  }


  console.log('StaffTableComponents-staffTable role,platfrom ', EditData.PlatfromArray, role, platfrom, staffTable, eval(EditData.RoleArray))
  /**
 * onChange  单选变更Function
 */
  const onChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  const handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
    })
  }
  /**
 * crud modal
 */
  // 定义表单域 =>发出请求
  const addValidateFieldsParam = [
    'AddAccount', 'AddUserName', 'AddPassword', 'AddPlatformID', 'AddEmailAddress', 'AddPhone', 'AddUserState', 'AddRole'
  ]
  const editValidateFieldsParam = [
    'EditId', 'EditAccount', 'EditUserName', 'EditPassword', 'EditPlatformId', 'EditEmailAddress', 'EditPhone', 'EditUserState', 'EditRole'
  ]
  const handleAdd = (modalType) => {
    if (modalType === 'create') {
      let ValidateFieldsParam = addValidateFieldsParam
      validateFields(ValidateFieldsParam, (err, payload) => {
        const createParam = { Account: payload.AddAccount, UserName: payload.AddUserName, Password: payload.AddPassword, PlatformID: parseInt(payload.AddPlatformID), EmailAddress: payload.AddEmailAddress, Phone: payload.AddPhone, UserState: parseInt(payload.AddUserState), Role: payload.AddRole.map(item => parseInt(item.key)) }
        console.log('payloadcreateParam', payload, createParam)
        if (!err) {
          console.log('validateFields', modalType, createParam)
          dispatch({
            type: 'staffTable/' + modalType,
            payload: createParam,
          })
        }
      })
    } else if (modalType === 'edit') {
      let ValidateFieldsParam = editValidateFieldsParam
      validateFields(ValidateFieldsParam, (err, payload) => {
        const editParam = { Id: payload.EditId, Account: payload.EditAccount, UserName: payload.EditUserName, Password: payload.EditPassword, EmailAddress: payload.EditEmailAddress, Phone: payload.EditPhone, PlatformID: payload.EditPlatformId, UserState: parseInt(payload.EditUserState), Role: payload.EditRole.map(item => parseInt(item.key)) }
        console.log('payloadeditParam', payload, editParam, modalType)
        if (!err) {
          console.log('validateFields', modalType)
          dispatch({
            type: 'staffTable/' + modalType,
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
      type: 'staffTable/showModal',
      payload: {
        modalType: modalVisible,
      },
    })
  }
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
    console.log('addModalValue', platfrom, role)
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
                {platfrom.map(function (item, index) {
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
            {getFieldDecorator('AddUserState', {
              initialValue: 1,
              rules: [
                {
                  required: true, message: '请选择状态',
                },
              ],
            })(
              <RadioGroup>
                <Radio value={1}>正常</Radio>
                <Radio value={2}>失效</Radio>
              </RadioGroup>
              )}

          </FormItem>
          <FormItem
            {...formItemLayout}
            label="角色"
          >
            <div>
              {getFieldDecorator('AddRole', {
                initialValue: [],
                // initialValue: [{ key: 1, label: 'Lucy (101)' }],
              })(
                <Select
                  mode="multiple"
                  labelInValue
                  style={{ width: '100%' }}
                  placeholder="请选择"
                >
                  {role.map(function (item, index) {
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
            label="账号"
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
          >
            {getFieldDecorator('EditUserName', {
              initialValue: EditData.UserName,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密码"
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
            label="邮箱"
          >
            {getFieldDecorator('EditEmailAddress', {
              initialValue: EditData.EmailAddress,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="电话"
          >
            {getFieldDecorator('EditPhone', {
              initialValue: EditData.Phone,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="模块"
          >
            {getFieldDecorator('EditPlatformId', {
              initialValue: EditData.PlatfromArray === undefined ? '2' : eval(EditData.PlatfromArray)[0].key.toString(),
            })(

              <Select>
                {platfrom.map(function (item, index) {
                  return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                })}
              </Select>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="状态"
          >
            <div>
              {getFieldDecorator('EditUserState', {
                initialValue: EditData.UserState.toString(),
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
            label="角色"
          >
            <div>
              {getFieldDecorator('EditRole', {
                // initialValue: [{ key: '2', label: "testRole" }, { key: '5', label: "testRole2" }],
                initialValue: eval(EditData.RoleArray),
              })(
                <Select
                  mode="multiple"
                  labelInValue
                  style={{ width: '100%' }}
                  placeholder="请选择"
                >
                  {role.map(function (item, index) {
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
        <Form>
          <FormItem
            {...formItemLayout}
            label="ID"
          >
            <Input disabled value='1' />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="账号"
          >
            <Input disabled value='1' />
          </FormItem>
        </Form>
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
          tableName='staffTable'
          data={list}
          columns={staffTableColumns}
          addModalValue={addModalValue()}
          editModalValue={editModalValue()}
          detailsModalValue={detailsModalValue()}
          handleAdd={handleAdd}
          tableModels={staffTable}
        />
      </div>
    </div>
  )
}

StaffTableComponents.defaultProps = {
  ModalValueRecord: {
    UserID: 1,
    UserName: '1',
    PlatformID: 1,
    EmailAddress: '111',
    Phone: '112',
    UserState: 1,
    LastLoginTime: '123',
    CreateTime: '123',
    Createor: '115',
    EditTime: '114',
    Editor: 9,
  },
  EditData: {
    "Id": 0,
    "Account": "0",
    "UserName": "0",
    "Password": "0",
    "PlatformName": "[{key:1,label:\"adm管理\"}]",
    "EmailAddress": "0@admin.com",
    "Phone": "0",
    "CreationDateTime": "0",
    "LastLoginTime": "0",
    "UserState": 1
  },
};

export default connect(({ staffTable, loading }) => ({ staffTable, loading }))(Form.create()(StaffTableComponents))


