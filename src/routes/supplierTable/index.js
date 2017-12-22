import React from 'react'
import { Form, Input, Row, Col, Radio, Select, Cascader } from 'antd'
import { connect } from 'dva'
import { FormComponents, TableComponents } from '../../components'
import globalConfig from 'utils/config'
import { supplierTableColumns } from '../../mock/tableColums'
import city from '../../utils/city'
import './index.less'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
//每个table可能不同的变量字段(1)
const TableName = 'supplierTable'
const TableColumns = supplierTableColumns

const SupplierTableComponents = ({
  supplierTable,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = supplierTable
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, EditData, DetailsData, TotalMultiselectData, AllocatedMultiselectData, platform } = TableModelsData

  console.log('SupplierTableComponents-supplierTable ', TableModelsData)
  /**
   * crud modal
   */
  // 定义表单域 =>发出Action  每个table可能不同的变量字段(3)
  const handleAdd = (modalType) => {
    if (modalType === 'create') {
      validateFields(['AddRoleName', 'AddPlatformID', 'AddState', 'AddUser'], (err, payload) => {
        const createParam = { RoleName: payload.AddRoleName, PlatformId: parseInt(payload.AddPlatformID), State: parseInt(payload.AddState), User: payload.AddUser.map(item => parseInt(item.key)) }
        if (!err) {
          dispatch({
            type: `${TableName}/${modalType}`,
            payload: createParam,
          })
          resetFields(['AddRoleName', 'AddPlatformID', 'AddState', 'AddUser'])
        }
      })
    } else if (modalType === 'edit') {
      validateFields(['EditId', 'EditRoleName', 'EditPlatformID', 'EditState', 'EditUser'], (err, payload) => {
        const editParam = { Id: payload.EditId, RoleName: payload.EditRoleName, PlatformID: parseInt(payload.EditPlatformID), State: parseInt(payload.EditState), User: payload.EditUser.map(item => parseInt(item.key)) }
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
  const handleChange = (key, values) => {
    console.log('handleChange', key, values)
    // let fields = getFieldsValue()
    // fields[key] = values
    // fields = handleFields(fields)
    // onFilterChange(fields)
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
            label="供应商编号"
            hasFeedback
          >
            {getFieldDecorator('AddCustomerCode', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="名称"
            hasFeedback
          >
            {getFieldDecorator('AddCustomerCode', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="国家"
          >
            {getFieldDecorator('AddCountry', {
              initialValue: '中国',
            })(<Input disabled />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="省市"
          >
            <div>
              {getFieldDecorator('AddProvince', { initialValue: [] })(
                <Cascader
                  size="large"
                  style={{ width: '100%' }}
                  options={city}
                  placeholder="请选择省市"
                  onChange={handleChange.bind(null, 'AddProvince')}
                />)}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="详细地址"
            hasFeedback
          >
            {getFieldDecorator('AddCustomerCode', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="传真"
            hasFeedback
          >
            {getFieldDecorator('AddCustomerCode', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="联系人"
            hasFeedback
          >
            {getFieldDecorator('AddCustomerCode', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="邮件"
            hasFeedback
          >
            {getFieldDecorator('AddCustomerCode', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="电话"
            hasFeedback
          >
            {getFieldDecorator('AddCustomerCode', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="手机"
            hasFeedback
          >
            {getFieldDecorator('AddCustomerCode', {
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
            label="Id"
            hasFeedback
          >
            {getFieldDecorator('EditId', {
              initialValue: '1',
            })(<Input disabled />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="供应商编号"
            hasFeedback
          >
            {getFieldDecorator('EditCustomerCode', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="名称"
            hasFeedback
          >
            {getFieldDecorator('EditCustomerCode', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="国家"
          >
            {getFieldDecorator('EditCountry', {
              initialValue: '中国',
            })(<Input disabled />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="省市"
          >
            <div>
              {getFieldDecorator('EditProvince', { initialValue: [] })(
                <Cascader
                  size="large"
                  style={{ width: '100%' }}
                  options={city}
                  placeholder="请选择省市"
                  onChange={handleChange.bind(null, 'EditProvince')}
                />)}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="详细地址"
            hasFeedback
          >
            {getFieldDecorator('EditCustomerCode', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="传真"
            hasFeedback
          >
            {getFieldDecorator('EditCustomerCode', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="联系人"
            hasFeedback
          >
            {getFieldDecorator('EditCustomerCode', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="邮件"
            hasFeedback
          >
            {getFieldDecorator('EditCustomerCode', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="电话"
            hasFeedback
          >
            {getFieldDecorator('EditCustomerCode', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="手机"
            hasFeedback
          >
            {getFieldDecorator('EditCustomerCode', {
              initialValue: '',
            })(<Input />)}
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
          label="角色"
        >
          <Input disabled value={DetailsData.RoleName} />
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
          <Input disabled value={DetailsData.User} />
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


export default connect(({ supplierTable }) => ({ supplierTable }))(Form.create()(SupplierTableComponents))


