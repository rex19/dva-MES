import React from 'react'
import { Form, Input, Button, Icon, Row, Col, Radio, Select } from 'antd'
import { connect } from 'dva'
import { FormComponents, TableComponents } from '../../components'
import globalConfig from 'utils/config'
import { regionTableColumns } from '../../mock/tableColums'
import './index.less'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
//每个table可能不同的变量字段(1)
const TableName = 'regionTable'
const TableColumns = regionTableColumns
const AddFormLayout = ['AddAreaNumber', 'AddAreType', 'AddName', 'AddFactoryId', 'AddDescription', 'AddState']
const EditFormLayout = ['EditId', 'EditFactoryId', 'EditAreaNumber', 'EditAreType', 'EditName', 'EditDescription', 'EditState']
const SearchFormLayout = ['FormAreaNumber', 'FormAreaName', 'FormLocationName', 'FormFactoryId']

const RegionTableComponents = ({
  regionTable,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = regionTable
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { FromParams, list, pagination, tableLoading,
    addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible,
    EditData, DetailsData, FactoryList, AreaTypeList } = TableModelsData

  console.log('RegionTableComponents-regionTable ', TableModelsData)

  /**
   * crud modal
   */
  // 定义表单域 =>发出Action  每个table可能不同的变量字段(3)
  const handleAdd = (modalType) => {
    if (modalType === 'create') {
      validateFields(AddFormLayout, (err, payload) => {
        const createParam = { AreaNumber: payload.AddAreaNumber, AreaType: parseInt(payload.AddAreType), Name: payload.AddName, FactoryId: parseInt(payload.AddFactoryId), Description: payload.AddDescription, State: parseInt(payload.AddState) }
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
        const editParam = { Id: payload.EditId, AreaNumber: payload.EditAreaNumber, AreaType: parseInt(payload.EditAreType), Name: payload.EditName, FactoryId: parseInt(payload.EditFactoryId), Description: payload.EditDescription, State: parseInt(payload.EditState) }
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
            label="区域编号"
            hasFeedback
          >
            {getFieldDecorator('AddAreaNumber', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="区域类型"
            hasFeedback
          >
            {getFieldDecorator('AddAreType', {
              initialValue: '',
            })(<Select>
              {AreaTypeList.map(function (item, index) {
                return <Option key={index} value={item.key.toString()}>{item.label}</Option>
              })}
            </Select>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="名称"
            hasFeedback
          >
            {getFieldDecorator('AddName', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="描述"
            hasFeedback
          >
            {getFieldDecorator('AddDescription', {
              initialValue: '',
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
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="区域编号"
            hasFeedback
          >
            {getFieldDecorator('EditAreaNumber', {
              initialValue: EditData.AreaNumber,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="区域类型"
            hasFeedback
          >
            {getFieldDecorator('EditAreType', {
              initialValue: EditData.AreaType,
            })(<Select>
              {AreaTypeList.map(function (item, index) {
                return <Option key={index} value={item.key.toString()}>{item.label}</Option>
              })}
            </Select>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="工厂"
          >
            <div>
              {getFieldDecorator('EditFactoryId', {
                initialValue: EditData.FactoryId.toString(),
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
            label="名称"
            hasFeedback
          >
            {getFieldDecorator('EditName', {
              initialValue: EditData.Name,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="描述"
            hasFeedback
          >
            {getFieldDecorator('EditDescription', {
              initialValue: EditData.Description,
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
          label="区域编号"
        >
          <Input disabled value={DetailsData.AreaNumber} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="区域类型"
        >
          <Input disabled value={DetailsData.AreaType} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="名称"
        >
          <Input disabled value={DetailsData.Name} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="描述"
        >
          <Input disabled value={DetailsData.Description} />
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
          AreaNumber: payload.FormAreaNumber,
          AreaName: payload.FormAreaName,
          LocationName: payload.FormLocationName,
          FactoryId: parseInt(payload.FormFactoryId)
        }
        SearchTableList(Params, 1, pagination.PageSize)
      }
    });
  }
  const PaginationComponentsChanger = (PageIndex, PageSize) => {
    const Params = {
      AreaNumber: FromParams.AreaNumber,
      AreaName: FromParams.AreaName,
      LocationName: FromParams.LocationName,
      FactoryId: FromParams.FactoryId
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
                <FormItem {...formItemLayout} label={`区域编号`}>
                  {getFieldDecorator(`FormAreaNumber`)(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`区域名称`}>
                  {getFieldDecorator(`FormAreaName`)(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={3} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`库位名称`}>
                  {getFieldDecorator(`FormLocationName`)(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={40}>
              <Col span={8} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`工厂名称`}>
                  {getFieldDecorator(`FormFactoryId`)(
                    <Select>
                      {FactoryList.map(function (item, index) {
                        return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                      })}
                    </Select>
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


export default connect(({ regionTable }) => ({ regionTable }))(Form.create()(RegionTableComponents))


