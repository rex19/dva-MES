import React from 'react'
import { Form, Input, Button, Icon, Row, Col, Radio, Select, DatePicker } from 'antd'
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

window.ProcessTempRender = false
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
const formItemLayout = globalConfig.table.formItemLayout
//每个table可能不同的变量字段(1)
const TableName = 'processTable'
const TableColumns = processTableColumns
const AddFormLayout = ['AddProcessNumber', 'AddMaterialNumber', 'AddFactoryId', 'AddState', 'AddValidBegin', 'AddValidEnd']
const EditFormLayout = ['EditId', 'EditProcessNumber', 'EditMaterialNumber', 'EditFactoryId', 'EditState', 'EditValidBegin', 'EditValidEnd']
const SearchFormLayout = ['FormMaterialNumber', 'FormFactoryName']
const GetNameFormLayout = ['AddMaterialNumber']

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
  const { FromParams, list, pagination, tableLoading,
    addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible,
    EditData, DetailsData,
    AddProcessStepDataSource, EditProcessStepDataSource,
    Name_Version, FactoryList, StationGroup, ProcessStepListCount, ProcessStepList } = TableModelsData

  console.log('ProcessTableComponents-processTable ', TableModelsData)

  /**
   * crud modal
   */
  // 定义表单域 =>发出Action  每个table可能不同的变量字段(3)
  const handleAdd = (modalType) => {
    if (modalType === 'create') {
      validateFields(AddFormLayout, (err, payload) => {
        const createParam = { ProcessNumber: payload.AddProcessNumber, MaterialNumber: payload.AddMaterialNumber, FactoryId: parseInt(payload.AddFactoryId), State: parseInt(payload.AddState), ValidBegin: payload.AddValidBegin, ValidEnd: payload.AddValidEnd, ProcessStepList: AddProcessStepDataSource }
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
        const editParam = { Id: payload.EditId, ProcessNumber: payload.EditProcessNumber, MaterialNumber: payload.EditMaterialNumber, FactoryId: parseInt(payload.EditFactoryId), State: parseInt(payload.EditState), ValidBegin: payload.EditValidBegin, ValidEnd: payload.EditValidEnd, ProcessStepList: EditProcessStepDataSource.length > 0 ? EditProcessStepDataSource : ProcessStepList }
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
  const getName_Version = (e) => {
    e.preventDefault();
    validateFields(GetNameFormLayout, (err, payload) => {
      if (!err) {
        const Params = {
          MaterialNumber: payload.AddMaterialNumber
        }
        dispatch({
          type: `${TableName}/showModalAndAjax`,
          payload: {
            Params: Params,
            modalType: 'getName_Version'
          },
        })
      } else {
        console.log('validateFields-err', err)
      }
    })
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
            label="物料号"
          >
            {getFieldDecorator(`AddMaterialNumber`, {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入料号',
                },
              ],
            })(
              <Input />
              )}
            <Button onClick={getName_Version} style={{ marginTop: '2px' }}>搜索</Button>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="名称/版本号"
          >
            <Input value={Name_Version} disabled />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="工厂"
          >
            <div>
              {getFieldDecorator('AddFactoryId', {
                initialValue: ''
              })(
                <Select>
                  {FactoryList.map(function (item, index) {
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

          <RowEditableAddTable
            StationGroup={StationGroup}
            onEditableCellChange={onEditableCellChange}
          />
        </Form>
      </div>
    )
  }
  //   <FormItem
  //   // {...formItemLayout}
  //   labelCol={{
  //     xs: { span: 4 },
  //     sm: { span: 5 }
  //   }}
  //   wrapperCol={{
  //     xs: { span: 24 },
  //     sm: { span: 15 },
  //   }}
  //   label="工艺步骤"
  // >
  //   <RowEditableAddTable
  //     StationGroup={StationGroup}
  //     onEditableCellChange={onEditableCellChange}
  //   />
  // </FormItem>


  //   <FormItem
  //   {...formItemLayout}
  //   label="成品/半成品料号"
  // >
  //   <div>
  //     {getFieldDecorator('EditMaterialId', {
  //       initialValue: EditData.Process.MaterialNumber,
  //     })(
  //       <Select>
  //         {MaterialNumber.map(function (item, index) {
  //           return <Option key={index} value={item.key.toString()}>{item.label}</Option>
  //         })}
  //       </Select>
  //       )}
  //   </div>
  // </FormItem>
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
            label="工艺编号"
          >
            {getFieldDecorator('EditProcessNumber', {
              initialValue: EditData.ProcessNumber,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="料号/名称/版本号"
          >
            {getFieldDecorator('EditMaterialNumber', {
              initialValue: EditData.MaterialNumber,
              rules: [
                {
                  required: true, message: '请输入料号',
                },
              ],
            })(<Input disabled />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="工厂"
          >
            <div>
              {getFieldDecorator('EditFactoryId', {
                initialValue: EditData.Factory,
              })(
                <Select>
                  {FactoryList.map(function (item, index) {
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
                initialValue: EditData.State,
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
              initialValue: moment(EditData.ValidBegin, dateFormat),
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
              initialValue: moment(EditData.ValidEnd, dateFormat),
              rules: [
                {
                  type: 'object', required: true, message: '请输入失效时间',
                },
              ],
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
          </FormItem>
          <RowEditableEditTable
            StationGroup={StationGroup}
            onEditableCellChange={onEditableCellChange}
            EditDataSource={ProcessStepList}
            ProcessId={EditData.Id}
            ProcessStepListCount={ProcessStepListCount}
          />
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


  const handleSearch = (e) => {
    e.preventDefault()
    validateFields(SearchFormLayout, (err, payload) => {
      if (!err) {
        const Params = {
          MaterialNumber: payload.FormMaterialNumber,
          FactoryName: payload.FormFactoryName
        }
        SearchTableList(Params, 1, pagination.PageSize)
      }
    });
  }
  const PaginationComponentsChanger = (PageIndex, PageSize) => {
    const Params = {
      MaterialNumber: FromParams.MaterialNumber,
      FactoryName: FromParams.FactoryName,
    }
    SearchTableList(Params, PageIndex, PageSize)
  }
  const SearchTableList = (payload, PageIndex, PageSize) => {
    dispatch({
      type: `${TableName}/query`,
      payload: {
        ...payload,
        PageIndex: PageIndex,
        PageSize: PageSize
      },
    })
  }
  const handleResetFields = (type) => {
    if (type === 'SearchFormLayout') {
      resetFields(SearchFormLayout)
    } else if (type === 'AddFormLayout') {
      resetFields(AddFormLayout)
    }
  }
  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
      <div style={{ marginBottom: '20px', borderColor: 'red', borderWidth: '1px' }}>
        <Form
          className="ant-advanced-search-form"
          onSubmit={handleSearch}
        >
          <Form>
            <Row gutter={40}>
              <Col span={8} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`物料编号`}>
                  {getFieldDecorator(`FormMaterialNumber`)(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`工厂名称`}>
                  {getFieldDecorator(`FormFactoryName`)(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
              <Button style={{ marginLeft: '7px' }} onClick={() => handleResetFields('SearchFormLayout')}><Icon type="delete" />清空</Button>
            </Col>
          </Row>
        </Form>
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
          PaginationComponentsChanger={PaginationComponentsChanger}
          handleResetFields={handleResetFields}
        />
      </div>
    </div>
  )
}


export default connect(({ processTable }) => ({ processTable }))(Form.create()(ProcessTableComponents))


