import React from 'react'
import { Form, Input, Button, Icon, Row, Col, Radio, Select } from 'antd'
import { connect } from 'dva'
import { TableComponents } from '../../components'
import globalConfig from 'utils/config'
import { stationGroupTableColumns } from '../../mock/tableColums'
import './index.less'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
//每个table可能不同的变量字段(1)
const TableName = 'stationGroupTable'
const TableColumns = stationGroupTableColumns
const AddFormLayout = ['AddGroupNumber', 'AddDescription', 'AddFactoryId', 'AddState', 'AddStationIdArray']
const EditFormLayout = ['EditId', 'EditGroupNumber', 'EditDescription', 'EditFactoryId', 'EditState', 'EditStationIdArray']
const SearchFormLayout = ['FormGroupNumber', 'FormDescription']

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
  const { FromParams, list, pagination, tableLoading,
    addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible,
    EditData, DetailsData, TotalStation, SelectedStation, FactoryList } = TableModelsData

  console.log('TableComponents-stationGroupTable ', TableModelsData)
  validateFields(SearchFormLayout, (err, payload) => {
    // const createParam = { GroupNumber: payload.AddGroupNumber, Description: payload.AddDescription, FactoryId: parseInt(payload.AddFactoryId), State: parseInt(payload.AddState), StationIdArray: payload.AddStationIdArray.map(item => parseInt(item.key)) }
    console.log('validateFields--++_', payload)
  })
  /**
   * crud modal
   */
  // 定义表单域 =>发出Action  每个table可能不同的变量字段(3)
  const handleAdd = (modalType) => {
    if (modalType === 'create') {
      validateFields(AddFormLayout, (err, payload) => {
        const createParam = { GroupNumber: payload.AddGroupNumber, Description: payload.AddDescription, FactoryId: parseInt(payload.AddFactoryId), State: parseInt(payload.AddState), StationIdArray: payload.AddStationIdArray.map(item => parseInt(item.key)) }
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
        const editParam = { Id: payload.EditId, GroupNumber: payload.EditGroupNumber, Description: payload.EditDescription, FactoryId: parseInt(payload.EditFactoryId), State: parseInt(payload.EditState), StationIdArray: payload.EditStationIdArray.map(item => parseInt(item.key)) }
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
            label="可选工站"
          >
            <div>
              {getFieldDecorator('AddStationIdArray', {
                initialValue: [],
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
            label="工厂"
          >
            <div>
              {getFieldDecorator('EditFactoryId', {
                initialValue: EditData.FactoryId,
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
          label="工厂"
        >
          <Input disabled value={DetailsData.Factory} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="已选工站"
        >
          <Input disabled value={DetailsData.SelectedStation} />
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
  const handleSearch = (e) => {
    e.preventDefault()
    validateFields(SearchFormLayout, (err, payload) => {
      if (!err) {
        const Params = {
          GroupNumber: payload.FormGroupNumber,
          Description: payload.FormDescription
        }
        SearchTableList(Params, 1, pagination.PageSize)
      }
    });
  }
  const PaginationComponentsChanger = (PageIndex, PageSize) => {
    const Params = {
      GroupNumber: FromParams.GroupNumber,
      Description: FromParams.Description,
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
                <FormItem {...formItemLayout} label={`工站组编号`}>
                  {getFieldDecorator(`FormGroupNumber`)(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`工站组描述`}>
                  {getFieldDecorator(`FormDescription`)(
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
          expandedRowRenderNAME='已选工站'
          expandedRowRenderKEY='SelectedStation'
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
          PaginationComponentsChanger={PaginationComponentsChanger}
          handleResetFields={handleResetFields}
        />
      </div>
    </div>
  )
}


export default connect(({ stationGroupTable }) => ({ stationGroupTable }))(Form.create()(StationGroupTableComponents))


// <Form
// className="ant-advanced-search-form"
// onSubmit={handleSearch}
// >
// <Form>
//   <Row gutter={40}>
//     <Col span={8} key={1} style={{ display: 'block' }}>
//       <FormItem {...formItemLayout} label={`工站组编号`}>
//         {getFieldDecorator(`FormGroupNumber`)(
//           <Input />
//         )}
//       </FormItem>
//     </Col>
//     <Col span={8} key={2} style={{ display: 'block' }}>
//       <FormItem {...formItemLayout} label={`工站组描述`}>
//         {getFieldDecorator(`FormDescription`)(
//           <Input />
//         )}
//       </FormItem>
//     </Col>
//   </Row>
// </Form>
// <Row>
//   <Col span={24} style={{ textAlign: 'right' }}>
//     <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
//     <Button style={{ marginLeft: '7px' }} onClick={handleResetFields('SearchFormLayout')}><Icon type="delete" />清空</Button>
//   </Col>
// </Row>
// </Form>
