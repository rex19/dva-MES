import React from 'react'
import { Form, Input, Row, Col, Radio, Select, Button, Icon, Table } from 'antd'
import { connect } from 'dva'
// import { FormComponents, TableComponents } from '../../../components'
import globalConfig from 'utils/config'
import TableComponents from '../components/ProgramToolSettingTableComponent'
import './index.less'
// import NestedTable from './subpage/NestedTable'
import RowEditableAddTable from './subpage/rowEditableforAddModals'
import RowEditableEditTable from './subpage/rowEditableforEditModals'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
//每个table可能不同的变量字段(1)
const TableName = 'programToolSetting'
const AddFormLayout = [
  'AddRecipeName',
  'AddStationId',
  'AddProductTypeId',
  'AddVersion',
  'AddState',
  'AddLayer'
]
const EditFormLayout = [
  'EditId',
  'EditRecipeName',
  'EditStationId',
  'EditProductTypeId',
  'EditVersion',
  'EditLayer',
  'EditState'
]
const SearchFormLayout = ['FormProgramNumber', 'FormStation', 'FormProductType']
window.BOMTempRender = false

let SpecificationData = ''
let LifeRuleData = ''

const ProgramToolSettingComponents = ({
  programToolSetting,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = programToolSetting
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, EditData, DetailsData,
    TotalMultiselectData, AllocatedMultiselectData,
    ProductType, Station,
    DetailsDataToolingItem, ToolTypeSelectData,
    AddProgramItemList,
    EditProgramItemList,
    ToolSlotViewModel,
    ItemCount } = TableModelsData

  console.log('TableComponents-programToolSetting ', TableModelsData)


  const Colums = [{
    title: '程序名',
    dataIndex: 'ProgramNumber',
  }, {
    title: '版本号',
    dataIndex: 'Version',
  }, {
    title: '面',
    dataIndex: 'Layer',
  }, {
    title: '状态',
    dataIndex: 'State',
  }, {
    title: '工站号',
    dataIndex: 'Station',
  }, {
    title: '产品类型',
    dataIndex: 'ProductType',
  }, {
    title: '注册结束时间',
    dataIndex: 'CreateDateTime',
  }]

  const columns = [{
    title: '项名',
    dataIndex: 'ParameterName',
    key: 'ParameterName',
  }, {
    title: '值',
    dataIndex: 'MatchString',
    key: 'MatchString',
  }, {
    title: '创建人',
    dataIndex: 'Creator',
    key: 'Creator',
  }, {
    title: '创建日期',
    dataIndex: 'CreateDateTime',
    key: 'CreateDateTime',
  }, {
    title: '编辑人',
    dataIndex: 'Editor',
    key: 'Editor',
  }, {
    title: '编辑日期',
    dataIndex: 'EditDateTime',
    key: 'EditDateTime',
  }];



  /**
   * crud modal
   */
  // 定义表单域 =>发出Action  每个table可能不同的变量字段(3)
  const handleAdd = (modalType) => {
    if (modalType === 'create') {
      validateFields(AddFormLayout, (err, payload) => {
        const createParam = {
          // ToolingCode: payload.AddToolingCode,
          // ToolingTypeId: payload.AddToolingTypeId,
          // CreatorId: 10,

          RecipeName: payload.AddRecipeName,
          StationId: parseInt(payload.AddStationId),
          ProductTypeId: parseInt(payload.AddProductTypeId),
          Version: payload.AddVersion,
          Layer: parseInt(payload.AddLayer),
          State: parseInt(payload.AddState),
          CreatorId: 5,
          ProgramItemList: AddProgramItemList
        }
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
        const editParam = {
          Id: payload.EditId,
          RecipeName: payload.EditRecipeName,
          StationId: parseInt(payload.EditStationId),
          ProductTypeId: parseInt(payload.EditProductTypeId),
          Version: payload.EditVersion,
          Layer: parseInt(payload.EditLayer),
          State: parseInt(payload.EditState),
          EditorId: 5,
          ProgramItemList: EditProgramItemList
        }
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

  const handleSearch = (e) => {
    e.preventDefault();

    validateFields(SearchFormLayout, (err, payload) => {
      if (!err) {
        const Params = {
          Tdto: {
            ProgramNumber: payload.FormProgramNumber,
            Station: parseInt(payload.FormStation),
            ProductType: parseInt(payload.FormProductType)
          }
        }
        console.log('handleSearch-Params', Params)
        SearchTableList(Params, pagination.PageIndex, pagination.PageSize)
      }
    });
  }
  const PaginationComponentsChanger = (PageIndex, PageSize) => {
    validateFields(SearchFormLayout, (err, payload) => {

      if (!err) {
        const Params = {
          Tdto: {
            ProgramNumber: payload.FormProgramNumber,
            Station: parseInt(payload.FormStation),
            ProductType: parseInt(payload.FormProductType)
          }
        }
        SearchTableList(Params, PageIndex, PageSize)
      }
    })
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
  const ToolTypeSelectDataChange = (key) => {

    ToolTypeSelectData.map(function (item, index) {
      if (key === item.key) {
        SpecificationData = item.Specification
        LifeRuleData = item.LifeRule
      }
    })
    console.log('ToolTypeSelectDataChange--', key, SpecificationData, LifeRuleData)
  }

  //每个table可能不同的变量字段(4)
  const formComponentsValue = () => {
    return (
      <Form>
        <Row gutter={40}>
          <Col span={8} key={1} style={{ display: 'block' }}>
            <FormItem {...formItemLayout} label={`刀具编号`}>
              {getFieldDecorator(`ToolingCode`)(
                <Input placeholder="placeholder" />
              )}
            </FormItem>
          </Col>
          <Col span={8} key={2} style={{ display: 'block' }}>
            <FormItem {...formItemLayout} label={`刀具类型`}>
              {getFieldDecorator(`ToolingTypeId`)(
                <Select>
                  <Option key={0} value='0'>未激活</Option>
                  <Option key={1} value='1'>激活</Option>
                  <Option key={2} value='-1'>已删除</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={8} key={3} style={{ display: 'block' }}>
            <FormItem {...formItemLayout} label={`刀具状态`}>
              {getFieldDecorator(`State`)(
                <Select>
                  <Option key={0} value='0'>未激活</Option>
                  <Option key={1} value='1'>激活</Option>
                  <Option key={2} value='-1'>已删除</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
  //把添加删除Modal的子table数据存到store  然后一起分发到请求
  const onEditableCellChange = (dataSource, type) => {
    dispatch({
      type: `${TableName}/editableDataChanger`,
      payload: {
        editableDataSource: dataSource,
        type: type
      },
    })
  }
  const addModalValue = () => {
    return (
      <div>
        <Form >
          <FormItem
            {...formItemLayout}
            label="程序名"
            hasFeedback
          >
            {getFieldDecorator('AddRecipeName', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入程序名',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="工站"
          >
            <div>
              {getFieldDecorator('AddStationId', {
                initialValue: '',
                rules: [
                  {
                    required: true, message: '请选择工站',
                  },
                ],
              })(
                <Select>
                  {Station.map(function (item, index) {
                    return <Option key={index} value={item.key}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="产品种类"
          >
            <div>
              {getFieldDecorator('AddProductTypeId', {
                initialValue: '',
                rules: [
                  {
                    required: true, message: '请选择产品种类',
                  },
                ],
              })(
                <Select>
                  {ProductType.map(function (item, index) {
                    return <Option key={index} value={item.key}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="版本"
            hasFeedback
          >
            {getFieldDecorator('AddVersion', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入版本',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="面"
          >
            <div>
              {getFieldDecorator('AddLayer', {
                initialValue: '',
                rules: [
                  {
                    required: true, message: '请选择面',
                  },
                ],
              })(
                <Select>
                  <Option key={0} value='0'>所有</Option>
                  <Option key={1} value='1'>正面</Option>
                  <Option key={2} value='-1'>反面</Option>
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
                  <Option key={1} value='-1'>已删除</Option>
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="明细"
          >
            <RowEditableAddTable
              onEditableCellChange={onEditableCellChange}
            />

          </FormItem>
        </Form>
      </div>
    )
  }

  // <Table columns={columns} dataSource={DetailsDataToolingItem} />

  //   <NestedTable
  //   TableData={TableData}
  //   SubTableData={SubTableData}
  // />
  const editModalValue = () => {
    return (
      <div>
        <Form >
          <FormItem
            {...formItemLayout}
            label="ID"
            disabled
            hasFeedback
          >
            {getFieldDecorator('EditId', {
              initialValue: EditData.Id,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="程序名"
            hasFeedback
          >
            {getFieldDecorator('EditRecipeName', {
              initialValue: EditData.RecipeName,
              rules: [
                {
                  required: true, message: '请输入程序名',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="工站"
          >
            <div>
              {getFieldDecorator('EditStationId', {
                initialValue: EditData.StationId,
                rules: [
                  {
                    required: true, message: '请选择工站',
                  },
                ],
              })(
                <Select>
                  {Station.map(function (item, index) {
                    return <Option key={index} value={item.key} >{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="产品种类"
          >
            <div>
              {getFieldDecorator('EditProductTypeId', {
                initialValue: EditData.ProductTypeId,
                rules: [
                  {
                    required: true, message: '请选择产品种类',
                  },
                ],
              })(
                <Select>
                  {ProductType.map(function (item, index) {
                    return <Option key={index} value={item.key}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="版本"
            hasFeedback
          >
            {getFieldDecorator('EditVersion', {
              initialValue: EditData.Version,
              rules: [
                {
                  required: true, message: '请输入版本',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="面"
          >
            <div>
              {getFieldDecorator('EditLayer', {
                initialValue: EditData.Layer,
                rules: [
                  {
                    required: true, message: '请选择面',
                  },
                ],
              })(
                <Select>
                  <Option key={0} value='0'>所有</Option>
                  <Option key={1} value='1'>正面</Option>
                  <Option key={2} value='-1'>反面</Option>
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
                  <Option key={1} value='-1'>已删除</Option>
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="明细"
          >
            <RowEditableEditTable
              onEditableCellChange={onEditableCellChange}
              EditDataSource={ToolSlotViewModel}
              // StationGroup={StationGroup}
              // MaterialList={MaterialList}
              ItemCount={ItemCount}

            />
          </FormItem>

        </Form>
      </div>
    )
  }

  //   <FormItem
  //   {...formItemLayout}
  //   label="明细"
  // >
  // <RowEditableEditTable
  // onEditableCellChange={onEditableCellChange}
  // // EditDataSource={BomItemDto}
  // // StationGroup={StationGroup}
  // // MaterialList={MaterialList}

  // />
  // </FormItem>
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
          label="程序名"
        >
          <Input disabled value={DetailsData.ProgramName} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="工站"
        >
          <Input disabled value={DetailsData.Station} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="产品种类"
        >
          <Input disabled value={DetailsData.ProductType} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="版本"
        >
          <Input disabled value={DetailsData.Version} />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="面"
        >
          <Input disabled value={DetailsData.Layer} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="状态"
        >
          <Input disabled value={DetailsData.State} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="明细"
        >
          <Table columns={columns} dataSource={DetailsDataToolingItem} />
        </FormItem>

      </div>
    )
  }

  const clearFunc = () => {
    resetFields(SearchFormLayout, (err, payload) => { })
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
                <FormItem {...formItemLayout} label={`程序号`}>
                  {getFieldDecorator(`FormProgramNumber`)(
                    <Input placeholder="placeholder" />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`工站`}>
                  {getFieldDecorator(`FormStation`)(
                    <Select>
                      {Station.map(function (item, index) {
                        return <Option key={index} value={item.key} allowClear={true}>{item.label}</Option>
                      })}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={3} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`产品种类`}>
                  {getFieldDecorator(`FormProductType`)(
                    <Select>
                      {ProductType.map(function (item, index) {
                        return <Option key={index} value={item.key}>{item.label}</Option>
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
              <Button style={{ marginLeft: '7px' }} onClick={clearFunc}><Icon type="delete" />清空</Button>
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
          columns={Colums}
          TableWidth={1300}
          ModalWidth={1300}
          addModalValue={addModalValue()}
          editModalValue={editModalValue()}
          detailsModalValue={detailsModalValue()}
          handleAdd={handleAdd}
          tableModels={TableModelsData}
          PaginationComponentsChanger={PaginationComponentsChanger}
        />
      </div>
    </div>
  )
}


export default connect(({ programToolSetting }) => ({ programToolSetting }))(Form.create()(ProgramToolSettingComponents))


// {InitData.map(function (item, index) {
//   return <Option key={index} value={item.key}>{item.label}</Option>
// })}


// {ToolTypeSelectData.map(function (item, index) {
//   return <Option key={index} value={item.key}>{item.label}</Option>
// })}





