import React from 'react'
import { Form, Input, Row, Col, Radio, Select, Button, Icon } from 'antd'
import { connect } from 'dva'
// import { FormComponents, TableComponents } from '../../../components'
import globalConfig from 'utils/config'
import TableComponents from '../components/ToolingInfoTableComponent'
import './index.less'

const { Option } = Select
const RadioGroup = Radio.Group
const { TextArea } = Input;
const FormItem = Form.Item
//每个table可能不同的变量字段(1)
const TableName = 'toolingInfo'
const AddFormLayout = [
  'AddToolingCode',
  'AddToolingTypeId'
]
const EditFormLayout = [
  'EditId',
  'EditToolingCode',
  'EditToolingTypeId',
  'EditSpecification',
  'EditLifeRule'
]
const SearchFormLayout = ['FormToolingCode', 'FormToolingTypeId', 'FormState']


let SpecificationData = ''
let LifeRuleData = ''

const ToolingInfoComponents = ({
  toolingInfo,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = toolingInfo
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list,
    pagination,
    tableLoading,
    addModalVisible,
    editModalVisible,
    detailsModalVisible,
    deleteModalVisible,
    EditData,
    DetailsData,
    TotalMultiselectData,
    AllocatedMultiselectData,
    InitData,
    ToolTypeSelectData } = TableModelsData

  console.log('TableComponents-toolingInfo ', TableModelsData)


  const Colums = [{
    title: '刀具号',
    dataIndex: 'ToolingCode',
  }, {
    title: '刀具状态',
    dataIndex: 'ToolingState',
  }, {
    title: '刀具类型',
    dataIndex: 'ToolingTypeName',
  }, {
    title: '类型描述',
    dataIndex: 'ToolingTypeSpecification',
  }, {
    title: '寿命规则号',
    dataIndex: 'LifeRuleCode',
  }, {
    title: '当前刀具寿命',
    dataIndex: 'CurrentLife',
  }, {
    title: '寿命警告阀值',
    dataIndex: 'WarningLifeThreshold',
  }, {
    title: '寿命限定阀值',
    dataIndex: 'ExpirationLifeThreshold',
  }, {
    title: '寿命状态',
    dataIndex: 'LifeState',
  }, {
    title: '当前位置',
    AssigneeCode: 'CurrentLocation',
  }, {
    title: '注册时间',
    dataIndex: 'CreateDateTime',
  }]

  /**
   * crud modal
   */
  // 定义表单域 =>发出Action  每个table可能不同的变量字段(3)
  const handleAdd = (modalType) => {
    if (modalType === 'create') {
      validateFields(AddFormLayout, (err, payload) => {
        const createParam = {
          ToolingCode: payload.AddToolingCode,
          ToolingTypeId: payload.AddToolingTypeId,
          CreatorId: 5,
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
          ToolingCode: payload.EditToolingCode,
          ToolingTypeId: payload.EditToolingTypeId,
          EditorId: 5
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


  const ToolTypeSelectDataChange = (key) => {

    ToolTypeSelectData.map(function (item, index) {
      if (key === item.key) {
        SpecificationData = item.Specification
        LifeRuleData = item.LifeRule
      }
    })
  }
  const handleSearch = (e) => {
    e.preventDefault();

    validateFields(SearchFormLayout, (err, payload) => {
      if (!err) {
        const Params = {
          ToolingCode: payload.FormToolingCode,
          ToolingTypeId: parseInt(payload.FormToolingTypeId)

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
          ToolingCode: payload.FormToolingCode,
          ToolingTypeId: parseInt(payload.FormToolingTypeId)

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
  //每个table可能不同的变量字段(4)
  const formComponentsValue = () => {
    return (
      <Form>
        <Row gutter={40}>
          <Col span={8} key={1} style={{ display: 'block' }}>
            <FormItem {...formItemLayout} label={`刀具编号`}>
              {getFieldDecorator(`FormToolingCode`)(
                <Input placeholder="placeholder" />
              )}
            </FormItem>
          </Col>
          <Col span={8} key={2} style={{ display: 'block' }}>
            <FormItem {...formItemLayout} label={`刀具类型`}>
              {getFieldDecorator(`FormToolingTypeId`)(
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
              {getFieldDecorator(`FormState`)(
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
  const addModalValue = () => {
    return (
      <div>
        <Form >
          <FormItem
            {...formItemLayout}
            label="刀具号"
            hasFeedback
          >
            {getFieldDecorator('AddToolingCode', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入刀具号',
                },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="类别"
          >
            <div>
              {getFieldDecorator('AddToolingTypeId', {
                initialValue: '',
                rules: [
                  {
                    required: true, message: '请选择类别',
                  },
                ],
              })(
                <Select onChange={ToolTypeSelectDataChange}>
                  {ToolTypeSelectData.map(function (item, index) {
                    return <Option key={index} value={item.key}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="类别描述"
            hasFeedback
          >
            {getFieldDecorator('AddSpecification', {
              initialValue: SpecificationData,
              rules: [
                {
                  required: true, message: '请输入类别描述',
                },
              ],
            })(<Input disabled />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="分配寿命规则"
            hasFeedback
          >
            {getFieldDecorator('AddLifeRule', {
              initialValue: LifeRuleData,
              rules: [
                {
                  required: true, message: '请输入类别描述',
                },
              ],
            })(<TextArea disabled autosize rows={5} />)}
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
            disabled
            hasFeedback
          >
            {getFieldDecorator('EditId', {
              initialValue: EditData.Id,
              rules: [
                {
                  required: true, message: '请输入刀具号',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="刀具号"
            hasFeedback
          >
            {getFieldDecorator('EditToolingCode', {
              initialValue: EditData.ToolingCode,
              rules: [
                {
                  required: true, message: '请输入刀具号',
                },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="类别"
          >
            <div>
              {getFieldDecorator('EditToolingTypeId', {
                initialValue: EditData.ToolingTypeId,
                rules: [
                  {
                    required: true, message: '请选择类别',
                  },
                ],
              })(
                <Select onChange={ToolTypeSelectDataChange}>
                  {ToolTypeSelectData.map(function (item, index) {
                    return <Option key={index} value={item.key}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="类别描述"
            hasFeedback
          >
            {getFieldDecorator('EditSpecification', {
              initialValue: SpecificationData,
              rules: [
                {
                  required: true, message: '请输入类别描述',
                },
              ],
            })(<Input disabled />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="分配寿命规则"
            hasFeedback
          >
            {getFieldDecorator('EditLifeRule', {
              initialValue: LifeRuleData,
              rules: [
                {
                  required: true, message: '请输入类别描述',
                },
              ],
            })(<TextArea disabled autosize rows={4} />)}
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
          label="线体编号"
        >
          <Input disabled value={DetailsData.CellNumber} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="名称"
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
                <FormItem {...formItemLayout} label={`刀具编号`}>
                  {getFieldDecorator(`FormToolingCode`)(
                    <Input placeholder="placeholder" />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`刀具类型`}>
                  {getFieldDecorator(`FormToolingTypeId`)(
                    <Select>
                      {InitData.map(function (item, index) {
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


export default connect(({ toolingInfo }) => ({ toolingInfo }))(Form.create()(ToolingInfoComponents))


