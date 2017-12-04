
import React from 'react'
import { Form, Input, Row, Col, Radio, Select } from 'antd'
import { connect } from 'dva'
import { FormComponents, TableComponents } from '../../components'
import './index.less'
import { stationTableColumns } from '../../mock/tableColums'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item


const StationTableComponents = ({
  stationTable,
  dispatch,
  loading,
  location,
  form
}) => {
  const { getFieldDecorator, validateFields, getFieldsValue } = form
  const { list, mockData, targetKeys, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, ModalValueRecord } = stationTable
  const { id, stationNo } = ModalValueRecord
  const formItemLayout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 15 },
  }
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
  // const EditFields = ['EditId', 'EditUserName', 'EditPlatformID']
  const handleAdd = (modalType) => {
    validateFields((err, values) => {
      if (!err) {
        console.log('validateFields', modalType, values)
        dispatch({
          type: 'stationTable/' + modalType,
          payload: values,
        })
      }
    })
  }
  // Function([fieldNames: string[]], [options: object], callback: Function(errors, values))
  /**
   * modal 开关
   */
  const handleAddModalOpen = (modalVisible) => {
    dispatch({
      type: 'stationTable/showModal',
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
            {getFieldDecorator('AddUserName', {
              initialValue: 'stationNo',
              rules: [
                {
                  required: true, message: 'Please input the title of collection!',
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
              initialValue: 'PlatformID',
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="邮箱"
            hasFeedback
          >
            {getFieldDecorator('AddEmailAddress', {
              initialValue: 'EmailAddress',
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="电话"
            hasFeedback
          >
            {getFieldDecorator('AddPhone', {
              initialValue: 'Phone',
              rules: [
                {
                  required: true,
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="状态"
          >
            {getFieldDecorator('AddUserState', {
              initialValue: 1,
            })(
              <RadioGroup>
                <Radio value={1}>正常</Radio>
                <Radio value={2}>失效</Radio>
              </RadioGroup>
              )}

          </FormItem>

        </Form>
      </div>
    )
  }
  const editModalValue = () => {
    return (
      <div>
        <FormItem
          {...formItemLayout}
          label="ID"
          hasFeedback
        >
          {getFieldDecorator('EditId', {
            initialValue: id || 0,
            rules: [
              {
                required: true, message: '请输入账号',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="工作站"
        >
          {getFieldDecorator('EditUserName', {
            initialValue: stationNo || '0',
            rules: [
              {
                required: true, message: '请输入账号',
              },
            ],
          })(<Input />)}
        </FormItem>
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
          <Input disabled value={id} />

        </FormItem>
        <FormItem
          {...formItemLayout}
          label="工作站"
        >
          <Input disabled value={stationNo} />
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
          tableName='stationTable'
          data={list}
          columns={stationTableColumns}
          addModalValue={addModalValue()}
          editModalValue={editModalValue()}
          detailsModalValue={detailsModalValue()}
          handleAdd={handleAdd}
          tableModels={stationTable}
        />
      </div>
    </div>
  )
}

StationTableComponents.defaultProps = {
  ModalValueRecord: {
    id: 1,
    stationNo: '1',
    name: '1',
    type: '111',
    status: '112',
    plant: 1,
    createTimeAt: '123',
    lastModifyAt: '123',
    Modifier: '115',
  }
};

export default connect(({ stationTable, loading }) => ({ stationTable, loading }))(Form.create()(StationTableComponents))


