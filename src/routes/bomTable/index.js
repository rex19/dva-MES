import React from 'react'
import { Form, Input, Row, Col, Radio, Select, DatePicker } from 'antd'
import { connect } from 'dva'
import { FormComponents, TableComponents } from '../../components'
import globalConfig from 'utils/config'
import { bomTableColumns } from '../../mock/tableColums'
import EditableforEditModals from './subpage/editableforEditModals'
import EditableforAddModals from './subpage/editableforAddModals'
import './index.less'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
//每个table可能不同的变量字段(1)
const TableName = 'bomTable'
const TableColumns = bomTableColumns

const BOMTableComponents = ({
  bomTable,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = bomTable
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, EditData, DetailsData, MaterialList, MaterialItemList, StationGroup } = TableModelsData

  console.log('BOMTableComponents-bomTable ', TableModelsData)
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
            label="料号"
          >
            {getFieldDecorator('AddMaterialList', {
              initialValue: '',
            })(<Select>
              {MaterialList.map(function (item, index) {
                return <Option key={index} value={item.key.toString()}>{item.label}</Option>
              })}
            </Select>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="名称"
          >
            <div>
              {getFieldDecorator('AddX', {
                initialValue: '1',
              })(<Input />)}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="生效时间"
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 15 },
            }}
          >
            {getFieldDecorator('AddValidBegin', {
              initialValue: '',
              rules: [
                {
                  type: 'object', required: true, message: '请输入生效时间',
                },
              ],
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="失效时间"
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 15 },
            }}
          >
            {getFieldDecorator('AddValidEnd', {
              initialValue: '',
              rules: [
                {
                  type: 'object', required: true, message: '请输入失效时间',
                },
              ],
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="全视图"
          >
            <EditableforAddModals
              StationGroup={StationGroup}
              MaterialList={MaterialList}
              MaterialItemList={MaterialItemList}
            />
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
              initialValue: EditData.Id,
              rules: [
                {
                  required: true, message: '请输入Id',
                },
              ],
            })(<Input disabled />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="角色"
            hasFeedback
          >
            {getFieldDecorator('EditRoleName', {
              initialValue: EditData.RoleName,
              rules: [
                {
                  required: true, message: '请输入角色',
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
    <div className='container' >
      <div className='formComponentsDiv' >
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
          ModalWidth={1300}
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


export default connect(({ bomTable }) => ({ bomTable }))(Form.create()(BOMTableComponents))



