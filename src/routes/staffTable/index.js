
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
  const { list, mockData, targetKeys, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, ModalValueRecord, role, platfrom } = staffTable
  const { UserID, UserName, PlatformID, EmailAddress, Phone, UserState, LastLoginTime, CreateTime, Createor, EditTime, Editor } = ModalValueRecord
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  }


  console.log('StaffTableComponents-staffTable role,platfrom ', role, platfrom, staffTable, UserID, UserName, PlatformID, EmailAddress, Phone, UserState, LastLoginTime, CreateTime, Createor, EditTime, Editor)
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
    'EditId', 'EditAccount', 'EditUserName', 'EditPassword', 'EditPlatformID', 'EditEmailAddress', 'EditPhone', 'EditUserState', 'EditRole'
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
        const editParam = { Account: payload.EditAccount, UserName: payload.EditUserName, Password: payload.EditPassword, EmailAddress: payload.EditEmailAddress, Phone: payload.EditPhone, PlatformID: payload.EditPlatformID, UserState: payload.EditUserState, Role: payload.EditRole }
        console.log('payloadeditParam', payload, editParam)
        if (!err) {
          console.log('validateFields', modalType, values)
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
          >
            {getFieldDecorator('EditId', {
              initialValue: UserID,
            })(<Input disabled />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="账号"
          >
            {getFieldDecorator('EditAccount', {
              initialValue: UserName,
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
              initialValue: UserName,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="密码"
          >
            {getFieldDecorator('EditPassword', {
              initialValue: UserName,
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
              initialValue: EmailAddress,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="电话"
          >
            {getFieldDecorator('EditPhone', {
              initialValue: Phone,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="模块"
          >
            {getFieldDecorator('EditPlatformId', {
              initialValue: '1',
            })(
              <Select>
                <Option value="1">Option 1</Option>
                <Option value="2">Option 2</Option>
                <Option value="3">Option 3</Option>
              </Select>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="状态"
          >
            <div>
              {getFieldDecorator('EditUserState', {
                initialValue: UserState,
                rules: [
                  {
                    required: true, message: '请选择状态',
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={1}>正常</Radio>
                  <Radio value={2}>失效</Radio>
                </Radio.Group>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="角色"
          >
            <div>
              {getFieldDecorator('EditRole', {
                initialValue: [{ key: "lucy", label: 'Lucy (101)' }, { key: "jack", label: 'Jack (100)' }],
              })(
                <Select
                  mode="multiple"
                  labelInValue
                  style={{ width: '100%' }}
                  placeholder="请选择"
                >
                  <Option value="jack">Jack (100)</Option>
                  <Option value="lucy">Lucy (101)</Option>
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
          <Input disabled value={UserID} />

        </FormItem>
        <FormItem
          {...formItemLayout}
          label="账号"
        >
          <Input disabled value={UserName} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="模块"
        >

          <Radio.Group value={PlatformID} disabled>
            <Radio value={1}>嘉定工厂</Radio>
            <Radio value={2}>奉贤工厂</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮箱"
        >
          <Input disabled value={EmailAddress} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="电话"
        >
          <Input disabled value={Phone} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="状态"
        >
          <Radio.Group value={UserState} disabled>
            <Radio value={1}>正常</Radio>
            <Radio value={2}>失效</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="最近登录时间"
        >
          <Input disabled value={LastLoginTime} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="创建时间"
        >
          <Input disabled value={CreateTime} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="创建人"
        >
          <Input disabled value={Createor} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="最后编辑时间"
        >
          <Input disabled value={EditTime} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="最后编辑人"
        >
          <Input disabled value={Editor} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="所属人员角色"
        >
          <Input disabled value="管理员组 ,用户组" />
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
  }
};

export default connect(({ staffTable, loading }) => ({ staffTable, loading }))(Form.create()(StaffTableComponents))


