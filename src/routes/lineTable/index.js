import React from 'react'
import { Form, Input, Row, Col, Radio, Select } from 'antd'
import { connect } from 'dva'
import { FormComponents, TableComponents } from '../../components'
import './index.less'
import { lineTableColumns } from '../../mock/tableColums'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
const TableName = 'lineTable'
const TableColumns = lineTableColumns

const LineTableComponents = ({
  lineTable,
  dispatch,
  loading,
  location,
  form
}) => {
  const TableModelsData = lineTable
  const { getFieldDecorator, validateFields, getFieldsValue } = form
  const { list, pagination, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, ModalValueRecord, TotalMultiselectData, AllocatedMultiselectData, platfrom, EditData, DetailsData } = TableModelsData
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  }


  console.log('lineTableComponents-roleTable ', TableModelsData)

  /**
   * crud modal
   */
  // 定义表单域 =>发出Action
  const addValidateFieldsParam = ['AddRoleName', 'AddPlatformID', 'AddState', 'AddUser']
  const editValidateFieldsParam = ['EditRoleName', 'EditPlatformID', 'EditState', 'EditUser']
  const handleAdd = (modalType) => {
    if (modalType === 'create') {
      let ValidateFieldsParam = addValidateFieldsParam
      validateFields(ValidateFieldsParam, (err, payload) => {
        const createParam = { RoleName: payload.AddRoleName, PlatformID: parseInt(payload.AddPlatformID), State: parseInt(payload.AddState), User: payload.AddUser.map(item => parseInt(item.key)) }
        if (!err) {
          dispatch({
            type: `${TableName}/${modalType}`,
            payload: createParam,
          })
        }
      })
    } else if (modalType === 'edit') {
      let ValidateFieldsParam = editValidateFieldsParam
      validateFields(ValidateFieldsParam, (err, payload) => {
        const editParam = { RoleName: payload.EditRoleName, PlatformID: parseInt(payload.EditPlatformID), State: parseInt(payload.EditState), User: payload.EditUser.map(item => parseInt(item.key)) }
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
            label="角色"
            hasFeedback
          >
            {getFieldDecorator('AddRoleName', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入角色',
                },
              ],
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
            label="角色"
            hasFeedback
          >
            {getFieldDecorator('EditRoleName', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入角色',
                },
              ],
            })(<Input />)}
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
          <Input disabled value={DetailsData.PlatfromName} />
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
          pagination={pagination}
          columns={TableColumns}
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


export default connect(({ lineTable, loading }) => ({ lineTable, loading }))(Form.create()(LineTableComponents))


