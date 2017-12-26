import React from 'react'
import { Form, Input, Row, Col, Radio, Select, DatePicker } from 'antd'
import { connect } from 'dva'
import { FormComponents, TableComponents, DetailsTableComponent } from '../../components'
import moment from 'moment';
import globalConfig from 'utils/config'
import { processTableColumns, processDetailsColumns } from '../../mock/tableColums'
import EditableforEditModals from './subpage/editableforEditModals'
import EditableforAddModals from './subpage/editableforAddModals'
import RowEditableAddTable from './subpage/rowEditableforAddModals'
import RowEditableEditTable from './subpage/rowEditableforEditModals'


import './index.less'
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
const formItemLayout = globalConfig.table.formItemLayout
//每个table可能不同的变量字段(1)
const TableName = 'processTable'
const TableColumns = processTableColumns
const AddFormLayout = ['AddProcessNumber', 'AddMaterialId', 'AddState', 'AddValidBegin', 'AddValidEnd']
const EditFormLayout = ['EditId', 'EditProcessNumber', 'EditMaterialId', 'EditState', 'EditValidBegin', 'EditValidEnd']


const ProcessTableComponents = ({
  processTable,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = processTable
  const { getFieldDecorator, validateFields, resetFields } = form
  // const formItemLayout = globalConfig.table.formItemLayout
  const { list, pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, EditData, DetailsData, MaterialNumber, StationGroup, AddProcessStepDataSource, EditProcessStepDataSource } = TableModelsData

  console.log('ProcessTableComponents-processTable ', TableModelsData)
  /**
   * crud modal
   */
  // 定义表单域 =>发出Action  每个table可能不同的变量字段(3)
  const handleAdd = (modalType) => {
    if (modalType === 'create') {
      validateFields(AddFormLayout, (err, payload) => {
        const createParam = { ProcessNumber: payload.AddProcessNumber, MaterialId: parseInt(payload.AddMaterialId), State: parseInt(payload.AddState), ValidBegin: payload.AddValidBegin, ValidEnd: payload.AddValidEnd, ProcessStep: AddProcessStepDataSource }
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
        const editParam = { Id: payload.EditId, ProcessNumber: payload.EditProcessNumber, MaterialId: payload.EditMaterialId, State: payload.EditState, ValidBegin: payload.EditValidBegin, ValidEnd: payload.EditValidEnd, ProcessStep: EditProcessStepDataSource }
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
  const onEditableCellChange = (dataSource, type) => {
    console.log('onEditableCellChange-processIndex', dataSource, type)
    dispatch({
      type: `${TableName}/editableDataChanger`,
      payload: {
        ProcessStepDataSource: dataSource,
        type: type
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
            label="工艺编号"
          >
            {getFieldDecorator('AddProcessNumber', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="成品/半成品料号"
          >
            <div>
              {getFieldDecorator('AddMaterialId', {
                initialValue: '',
              })(
                <Select>
                  {MaterialNumber.map(function (item, index) {
                    return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                  })}
                </Select>
                )}
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
            // {...formItemLayout}
            labelCol={{
              xs: { span: 4 },
              sm: { span: 5 }
            }}
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 15 },
            }}
            label="工艺步骤"
          >
            <RowEditableAddTable
              StationGroup={StationGroup}
              onEditableCellChange={onEditableCellChange}
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
              initialValue: EditData.Process.Id,
              rules: [
                {
                  required: true, message: '请输入Id',
                },
              ],
            })(<Input disabled />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="工艺编号"
          >
            {getFieldDecorator('EditProcessNumber', {
              initialValue: EditData.Process.ProcessNumber,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="成品/半成品料号"
          >
            <div>
              {getFieldDecorator('EditMaterialId', {
                initialValue: EditData.Process.MaterialNumber,
              })(
                <Select>
                  {MaterialNumber.map(function (item, index) {
                    return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="状态"
          >
            <div>
              {getFieldDecorator('EditState', {
                initialValue: EditData.Process.State,
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
            label="生效时间"
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 15 },
            }}
          >
            {getFieldDecorator('EditValidBegin', {
              initialValue: moment(EditData.Process.ValidBegin, dateFormat),
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
            {getFieldDecorator('EditValidEnd', {
              initialValue: moment(EditData.Process.ValidEnd, dateFormat),
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
            // {...formItemLayout}
            labelCol={{
              xs: { span: 4 },
              sm: { span: 5 }
            }}
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 15 },
            }}
            label="工艺步骤"
          >
            <RowEditableEditTable
              StationGroup={StationGroup}
              onEditableCellChange={onEditableCellChange}
              EditDataSource={EditData.ProcessStep}
            />
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
          <Input disabled value={DetailsData.Process.Id} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="工艺编号"
        >
          <Input disabled value={DetailsData.Process.ProcessNumber} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="成品/半成品料号"
        >
          <Input disabled value={DetailsData.Process.MaterialNumber} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="版本"
        >
          <Input disabled value={DetailsData.Process.State} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="状态"
        >
          <Input disabled value={DetailsData.Process.State} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="生效时间"
        >
          <Input disabled value={DetailsData.Process.ValidBegin} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="失效时间"
        >
          <Input disabled value={DetailsData.Process.ValidEnd} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="创建时间"
        >
          <Input disabled value={DetailsData.Process.CreationDateTime} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="创建人"
        >
          <Input disabled value={DetailsData.Process.CreationDateTime} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="最后编辑时间"
        >
          <Input disabled value={DetailsData.Process.EditDateTime} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="最后编辑人"
        >
          <Input disabled value={DetailsData.Process.Editor} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="工艺步骤"
        >
          <DetailsTableComponent Columns={processDetailsColumns} Data={DetailsData.ProcessStep} />
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


export default connect(({ processTable }) => ({ processTable }))(Form.create()(ProcessTableComponents))


