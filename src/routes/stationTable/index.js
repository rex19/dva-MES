import React from 'react'
import { Form, Input, Button, Icon, Row, Col, Radio, Select, Badge } from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import { FormComponents, TableComponents } from '../../components'
import globalConfig from 'utils/config'
// import { stationTableColumns } from '../../mock/tableColums'
import './index.less'
const stationTableColumns = [{
  title: 'ID',
  dataIndex: 'Id',
}, {
  title: '工站编号',
  dataIndex: 'StationNumber',
}, {
  title: '名称',
  dataIndex: 'Name',
}, {
  title: '类型',
  dataIndex: 'StationType',
},
// {
//   title: '已分配工作站组',
//   dataIndex: 'SelectedStationGroup',
// },
{
  title: '状态',
  dataIndex: 'State',
  render: val => <span><Badge status={val === '激活' ? "success" : "error"} text={val} /></span>,
}, {
  title: '工厂',
  dataIndex: 'FactoryId',
}, {
  title: '创建时间',
  dataIndex: 'CreationDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '修改人',
  dataIndex: 'Creator',
}, {
  title: '最后修改时间',
  dataIndex: 'EditDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '修改人',
  dataIndex: 'Editor',
}]
const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
//每个table可能不同的变量字段(1)
const TableName = 'stationTable'
const TableColumns = stationTableColumns
const AddFormLayout = ['AddStationNumber', 'AddName', 'AddStationType', 'AddStationGroupIdArray', 'AddFactoryId', 'AddState']
const EditFormLayout = ['EditId', 'EditStationNumber', 'EditName', 'EditStationType', 'EditFactoryId', 'EditState', 'EditStationGroup']
const SearchFormLayout = ['FormStationNumber', 'FormStationName']


const StationTableComponents = ({
  stationTable,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = stationTable
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { clearType, FromParams, list, pagination, tableLoading,
    addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible,
    EditData, DetailsData, TotalStationGroup, SelectedStationGroup, StationType, FactoryList } = TableModelsData

  console.log('TableComponents-stationTable ', TableModelsData)


  /**
   * crud modal
   */
  // 定义表单域 =>发出Action  每个table可能不同的变量字段(3)
  const handleAdd = (modalType) => {
    if (modalType === 'create') {
      validateFields(AddFormLayout, (err, payload) => {
        const createParam = { StationNumber: payload.AddStationNumber, Name: payload.AddName, FactoryId: parseInt(payload.AddFactoryId), State: parseInt(payload.AddState), StationGroupIdArray: payload.AddStationGroupIdArray.map(item => parseInt(item.key)), StationType: parseInt(payload.AddStationType) }
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
        const editParam = { Id: payload.EditId, StationNumber: payload.EditStationNumber, Name: payload.EditName, StationType: parseInt(payload.EditStationType), FactoryId: parseInt(payload.EditFactoryId), State: parseInt(payload.EditState), StationGroupIdArray: payload.EditStationGroup.map(item => parseInt(item.key)) }
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
            label="工站编号"
            hasFeedback
          >
            {getFieldDecorator('AddStationNumber', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入工站编号',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="名称"
            hasFeedback
          >
            {getFieldDecorator('AddName', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入工站名称',
                },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="工站类型"
            hasFeedback
          >
            {getFieldDecorator('AddStationType', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入工站类型',
                },
              ],
            })(
              <Select>
                {StationType.map(function (item, index) {
                  return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                })}
              </Select>)}
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
            label="分配工作组"
          >
            <div>
              {getFieldDecorator('AddStationGroupIdArray', {
                initialValue: [],
              })(
                <Select
                  mode="multiple"
                  labelInValue
                  style={{ width: '100%' }}
                  placeholder="请选择"
                >
                  {TotalStationGroup.map(function (item, index) {
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
              rules: [
                {
                  required: true, message: '请输入Id',
                },
              ],
            })(<Input disabled />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="工作站名"
            hasFeedback
          >
            {getFieldDecorator('EditStationNumber', {
              initialValue: EditData.StationNumber,
              rules: [
                {
                  required: true, message: '请输入工作站',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="名称"
            hasFeedback
          >
            {getFieldDecorator('EditName', {
              initialValue: EditData.Name,
              rules: [
                {
                  required: true, message: '请输入名称',
                },
              ],
            })(<Input />)}
          </FormItem>


          <FormItem
            {...formItemLayout}
            label="工站类型"
            hasFeedback
          >
            {getFieldDecorator('EditStationType', {
              initialValue: EditData.StationType.toString(),
            })(
              <Select>
                {StationType.map(function (item, index) {
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
            label="已分配工作组"
          >
            <div>
              {getFieldDecorator('EditStationGroup', {
                initialValue: SelectedStationGroup,
              })(
                <Select
                  mode="multiple"
                  labelInValue
                  style={{ width: '100%' }}
                  placeholder="请选择"
                >
                  {TotalStationGroup.map(function (item, index) {
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
          label="工站编号"
        >
          <Input disabled value={DetailsData.StationNumber} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="名称"
        >
          <Input disabled value={DetailsData.Name} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="工站类型"
        >
          <Input disabled value={DetailsData.StationType} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="工厂"
        >
          <Input disabled value={DetailsData.Factory} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="已分配工作站组"
        >
          <Input disabled value={DetailsData.SelectedStationGroup} />
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
          StationNumber: payload.FormStationNumber,
          StationName: payload.FormStationName
        }
        SearchTableList(Params, 1, pagination.PageSize)
      }
    });
  }
  const PaginationComponentsChanger = (PageIndex, PageSize) => {
    const Params = {
      StationNumber: FromParams.StationNumber,
      StationName: FromParams.StationName,
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
                <FormItem {...formItemLayout} label={`工站编号`}>
                  {getFieldDecorator(`FormStationNumber`)(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`工站名称`}>
                  {getFieldDecorator(`FormStationName`)(
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
          expandedRowRenderNAME='已分配工站组'
          expandedRowRenderKEY='SelectedStationGroup'
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


export default connect(({ stationTable }) => ({ stationTable }))(Form.create()(StationTableComponents))

