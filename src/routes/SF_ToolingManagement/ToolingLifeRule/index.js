import React from 'react'
import { Form, Input, Row, Col, Radio, Select, Button, Icon } from 'antd'
import { connect } from 'dva'
// import { FormComponents, TableComponents } from '../../../components'
import globalConfig from 'utils/config'
import TableComponents from '../components/ToolingInfoTableComponent'
import './index.less'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
//每个table可能不同的变量字段(1)
const TableName = 'toolingLifeRule'
const AddFormLayout = ['AddToolingCode', 'AddToolingTypeId']
const EditFormLayout = ['EditId', 'EditToolingCode', 'EditToolingTypeId']
const SearchFormLayout = ['FormToolingCode', 'FormToolingTypeId', 'FormState']


let SpecificationData = ''
let LifeRuleData = ''

const ToolingLifeRuleComponents = ({
  toolingLifeRule,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = toolingLifeRule
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, EditData, DetailsData,
    TotalMultiselectData, AllocatedMultiselectData,
    InitData,
    ToolTypeSelectData, LifeRuleListData } = TableModelsData

  console.log('TableComponents-toolingLifeRule ', TableModelsData)


  // const Colums = [{
  //   title: '刀具类型',
  //   dataIndex: 'Name',
  // }, {
  //   title: '类型描述',
  //   dataIndex: 'Specification',
  // }, {
  //   title: '寿命规则号',
  //   dataIndex: 'RuleCode',
  // }, {
  //   title: '寿命警告阀值',
  //   dataIndex: 'WarningLifeThreshold',
  // }, {
  //   title: '寿命限定阀值',
  //   dataIndex: 'ExpirationLifeThreshold',
  // }, {
  //   title: '编辑时间',
  //   dataIndex: 'EditDateTime',
  // }]
  const Colums = [{
    title: '寿命规则号',
    dataIndex: 'RuleCode',
  }, {
    title: '名称',
    dataIndex: 'Name',
  }, {
    title: '描述',
    dataIndex: 'Description',
  }, {
    title: '单位',
    dataIndex: 'Unit',
  }, {
    title: '状态',
    dataIndex: 'State',
  }, {
    title: '寿命警告阀值',
    dataIndex: 'WarningLifeThreshold',
  }, {
    title: '寿命限定阀值',
    dataIndex: 'ExpirationLifeThreshold',
  }, {
    title: '编辑时间',
    dataIndex: 'EditDateTime',
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
          ToolingTypeId: payload.EditToolingTypeId,
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
          // ToolingTypeId: payload.FormToolingTypeId,
          // State: payload.FormState,
          PageIndex: 1,
          PageSize: 10,
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
  const addModalValue = () => {
    return (
      <div>
        <Form >
          <FormItem
            {...formItemLayout}
            label="规则号"
            hasFeedback
          >
            {getFieldDecorator('AddRuleCode', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入规则号',
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
                  required: true, message: '请输入名称',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="描述"
            hasFeedback
          >
            {getFieldDecorator('AddDescription', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入描述',
                },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="状态"
            hasFeedback
          >
            {getFieldDecorator('AddLifeCalculationTypeUnitId', {
              initialValue: '37',
              rules: [
                {
                  required: true, message: '请输入状态',
                },
              ],
            })(<Select>
              <Option key={0} value='37'>次</Option>
              <Option key={1} value='17'>米</Option>
            </Select>)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="预警值"
            hasFeedback
          >
            {getFieldDecorator('AddWarningLifeThreshold', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入预警值',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="限定值"
            hasFeedback
          >
            {getFieldDecorator('AddExpirationLifeThreshold', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入限定值',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="状态"
            hasFeedback
          >
            {getFieldDecorator('AddState', {
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
              initialValue: '1',
              // initialValue: EditData.Id,
              rules: [
                {
                  required: true, message: '请输入ID',
                },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="规则号"
            hasFeedback
          >
            {getFieldDecorator('EditRuleCode', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入规则号',
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
            label="描述"
            hasFeedback
          >
            {getFieldDecorator('EditDescription', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入描述',
                },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="状态"
            hasFeedback
          >
            {getFieldDecorator('EditLifeCalculationTypeUnitId', {
              initialValue: '37',
              rules: [
                {
                  required: true, message: '请输入状态',
                },
              ],
            })(<Select>
              <Option key={0} value='37'>次</Option>
              <Option key={1} value='17'>米</Option>
            </Select>)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="预警值"
            hasFeedback
          >
            {getFieldDecorator('EditWarningLifeThreshold', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入预警值',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="限定值"
            hasFeedback
          >
            {getFieldDecorator('EditExpirationLifeThreshold', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入限定值',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="状态"
            hasFeedback
          >
            {getFieldDecorator('EditState', {
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


export default connect(({ toolingLifeRule }) => ({ toolingLifeRule }))(Form.create()(ToolingLifeRuleComponents))
// LifeRuleListData


