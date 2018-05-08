import React from 'react'
import { Form, Input, Row, Col, Radio, Select, Button, Card, Icon, Avatar } from 'antd'
import { connect } from 'dva'
// import { FormComponents, TableComponents } from '../../../components'
import globalConfig from 'utils/config'
import TableComponents from '../components/CurrentToolingConditionTableComponent'
import './index.less'

const { Meta } = Card;
const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
//每个table可能不同的变量字段(1)
const TableName = 'currentToolingCondition'
const AddFormLayout = ['AddToolingCode', 'AddCurrentToolingConditionId']
const EditFormLayout = ['EditId', 'EditToolingCode', 'EditCurrentToolingConditionId']
const SearchFormLayout = ['FormToolingCode', 'FormCurrentToolingConditionId', 'FormState']


let SpecificationData = ''
let LifeRuleData = ''

const CurrentToolingConditionComponents = ({
  currentToolingCondition,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = currentToolingCondition
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, EditData, DetailsData,
    TotalMultiselectData, AllocatedMultiselectData,
    InitData,
    ToolTypeSelectData, LifeRuleListData } = TableModelsData

  console.log('TableComponents-currentToolingCondition ', TableModelsData)


  const Colums = [{
    title: '刀穴号',
    dataIndex: 'KnifeSlot',
  }, {
    title: '所需刀具类型',
    dataIndex: 'NeedToolType',
  }, {
    title: '当前刀具类型',
    dataIndex: 'CurrentToolType',
  }, {
    title: '是否匹配',
    dataIndex: 'IsMatch',
  }, {
    title: '当前刀具号',
    dataIndex: 'CurrentToolNumber',
  }, {
    title: '当前刀具寿命',
    dataIndex: 'CurrentLifeConsumedValue',
  }, {
    title: '刀具寿命预警值',
    dataIndex: 'WarningLifeThreshold',
  }, {
    title: '刀具寿命阀值',
    dataIndex: 'ExpirationLifeThreshold',
  }, {
    title: '刀具状态',
    dataIndex: 'LifeState',
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
          CurrentToolingConditionId: payload.AddCurrentToolingConditionId,
          CreatorId: 10,
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
          CurrentToolingConditionId: payload.EditCurrentToolingConditionId,
          EditorId: 10,
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
          // ToolingCode: payload.FormToolingCode,
          // CurrentToolingConditionId: payload.FormCurrentToolingConditionId,
          // State: payload.FormState,
          PageIndex: 1,
          PageSize: 2,
          Tdto: null
        }
        console.log('handleSearch-Params', Params)
        // this.props.handleSearchFormComponents(Params, 'formComponentsValueToSettingState')
        dispatch({
          type: `${TableName}/query`,
          payload: Params,
        })
      }
    });
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
              {getFieldDecorator(`CurrentToolingConditionId`)(
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
  const addModalValue = () => {
    return (
      <div>
        <Form >
          <FormItem
            {...formItemLayout}
            label="刀具类型"
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
            label="描述"
            hasFeedback
          >
            {getFieldDecorator('AddSpecification', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入类别描述',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="寿命规则"
          >
            <div>
              {getFieldDecorator('AddChoiceRuleCode', {
                initialValue: [],
                rules: [
                  {
                    required: true, message: '请输入寿命规则',
                  },
                ],
              })(
                <Select
                  mode="multiple"
                  labelInValue
                  style={{ width: '100%' }}
                  placeholder="请选择"
                >

                  {ToolTypeSelectData.map(function (item, index) {
                    return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="状态"
            hasFeedback
          >
            {getFieldDecorator('AddSpecification', {
              initialValue: '1',
              rules: [
                {
                  required: true, message: '请输入状态',
                },
              ],
            })(<Select>
              <Option key={0} value='0'>未激活</Option>
              <Option key={1} value='1'>激活</Option>
              <Option key={2} value='-1'>已删除</Option>
            </Select>)}
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
                  required: true, message: '请输入ID',
                },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="刀具类型"
            hasFeedback
          >
            {getFieldDecorator('EditToolingCode', {
              initialValue: EditData.CurrentToolingCondition,
              rules: [
                {
                  required: true, message: '请输入刀具类型',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="描述"
            hasFeedback
          >
            {getFieldDecorator('EditToolingCode', {
              initialValue: EditData.Specification,
              rules: [
                {
                  required: true, message: '请输入描述',
                },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="寿命规则"
          >
            <div>
              {getFieldDecorator('EditChoiceRuleCode', {
                initialValue: [],
                rules: [
                  {
                    required: true, message: '请输入寿命规则',
                  },
                ],
              })(
                <Select
                  mode="multiple"
                  labelInValue
                  style={{ width: '100%' }}
                  placeholder="请选择"
                >
                  {LifeRuleListData.map(function (item, index) {
                    return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="状态"
            hasFeedback
          >
            {getFieldDecorator('EditSpecification', {
              initialValue: EditData.State.toString(),
              rules: [
                {
                  required: true, message: '请输入状态',
                },
              ],
            })(<Select>
              <Option key={0} value='0'>未激活</Option>
              <Option key={1} value='1'>激活</Option>
              <Option key={2} value='-1'>已删除</Option>
            </Select>)}
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
      </div>
    )
  }

  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
      <div style={{ marginBottom: '20px', borderColor: 'red', borderWidth: '1px' }}>

        <Row>
          <Col span={10} style={{ textAlign: 'right' }}>
            <Card title="Station" bordered={false}>
              <img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
            </Card>
          </Col>

          <Col span={14} style={{ textAlign: 'right' }}>
            <Form >
              <FormItem
                {...formItemLayout}
                label="工站号"
              >
                <Input />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="设备编号"
              >
                <Input />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="IP"
              >
                <Input />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="名称"
              >
                <Input />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="当前程序"
              >
                <Input />
              </FormItem>
            </Form>
          </Col>
        </Row>


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
        />
      </div>
    </div>
  )
}


export default connect(({ currentToolingCondition }) => ({ currentToolingCondition }))(Form.create()(CurrentToolingConditionComponents))
// LifeRuleListData








// <Card
// // hoverable
// style={{ width: 240 }}
// src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
// >
// <Meta
//   title="Europe Street beat"
//   description="www.instagram.com"
// />
// </Card>



// <div style={{ width: '40%' }}>

// </div>
// <div style={{ width: '50%' }}>
//  <Form >
//    <FormItem
//      {...formItemLayout}
//      label="ID"
//      disabled
//      hasFeedback
//    >
//      {getFieldDecorator('EditId', {
//        initialValue: '',
//        rules: [
//          {
//            required: true, message: '请输入ID',
//          },
//        ],
//      })(<Input />)}
//    </FormItem>

//    <FormItem
//      {...formItemLayout}
//      label="刀具类型"
//      hasFeedback
//    >
//      {getFieldDecorator('EditToolingCode', {
//        initialValue: '',
//        rules: [
//          {
//            required: true, message: '请输入刀具类型',
//          },
//        ],
//      })(<Input />)}
//    </FormItem>
//  </Form>
// </div>
