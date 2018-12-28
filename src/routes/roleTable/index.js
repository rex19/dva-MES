import React from 'react'
import { Form, Input, Button, Icon, Row, Col, Radio, Select, Tree } from 'antd'
import { connect } from 'dva'
import { FormComponents, TableComponents } from '../../components'
import globalConfig from 'utils/config'
import { roleTableColumns } from '../../mock/tableColums'
// import PermissionManagement from '../permissionManagement'
import './index.less'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
const { TextArea } = Input
//每个table可能不同的变量字段(1)
const TableName = 'roleTable'
const TableColumns = roleTableColumns
const SearchFormLayout = []


const TreeNode = Tree.TreeNode;

// const EditPermissionList = ["81", "82", "83", "84", "85", "86", "87", "88", "89", "810", "811", "812", "8", "21", "23", "24", "25", "26", "27", "28", "29", "2", "31", "321", "322", "323", "324", "325", "326", "32", "33", "34", "35", "361", "362", "363", "36", "37", "38", "39", "3", "41", "42", "43", "4", "51", "52", "53", "54", "55", "5"]
// const DetailsPermissionList = ["81", "82", "83", "84", "85", "86", "87", "88", "89", "810"]


const treeData = [{
  title: 'SFMES',
  key: '1',
  children: [{
    title: '主数据管理',
    key: '8',
    children: [
      { title: '工作站', key: '81' },
      { title: '工作站组', key: '82' },
      { title: '线体', key: '83' },
      { title: '人员', key: '84' },
      { title: '角色', key: '85' },
      { title: '物料', key: '86' },
      { title: '工艺', key: '87' },
      { title: '区域', key: '88' },
      { title: '库位', key: '89' },
      { title: '客户信息', key: '810' },
      { title: '供应商信息', key: '811' },
      { title: 'BOM', key: '812' }
    ],
  }, {
    title: 'WMS系统',
    key: '2',
    children: [
      { title: '原材料收货单', key: '21' },
      { title: '容器信息查询', key: '23' },
      { title: '成品箱信息查询', key: '24' },
      { title: '销售出库单', key: '25' },
      { title: '生产物料领用单', key: '26' },
      { title: '生产物料退料记录', key: '27' },
      { title: '成品入库单', key: '28' },
      { title: '盘点单', key: '29' }
    ],
  }, {
    title: '追溯系统',
    key: '3',
    children: [
      { title: '通过工站追溯工件', key: '31' },
      {
        title: '通过工件追溯',
        key: '32',
        children: [
          { title: '工件过站记录', key: '321' },
          { title: '工件失效记录', key: '322' },
          { title: '工件维修记录', key: '323' },
          { title: '工件装配记录', key: '324' },
          { title: '工件属性记录', key: '325' },
          { title: '工件用料记录', key: '326' }
        ],
      },
      { title: '通过物料追溯工件', key: '33' },
      { title: '通过箱号追溯', key: '34' },
      { title: '通过工单追溯', key: '35' },
      {
        title: '通过属性追溯',
        key: '36',
        children: [
          { title: '工件属性', key: '361' },
          { title: '工单属性', key: '362' },
          { title: '容器属性', key: '363' }
        ],
      },
      { title: '通过发货单追溯', key: '37' },
      { title: '工站异常查询', key: '38' },
      { title: '上料记录查询', key: '39' },
    ],
  }, {
    title: 'FIS系统',
    key: '4',
    children: [
      { title: '工单列表', key: '41' },
      { title: '工单激活', key: '42' },
      { title: '工单设置', key: '43' },
    ],
  }, {
    title: '刀具系统',
    key: '5',
    children: [
      { title: '刀具信息', key: '51' },
      { title: '刀具类型列表', key: '52' },
      { title: '刀具寿命规则', key: '53' },
      { title: '程序用刀设定', key: '54' },
      { title: '当前设备情况', key: '55' }
    ],
  }, {
    title: 'Ecall系统',
    key: '6',
    children: [
      { title: '电子叫料看板', key: '61' },
      { title: '创建生产初始配货单', key: '62' },
      { title: '创建配货单', key: '63' },
      { title: '配货单列表', key: '64' },
    ],
  }, {
    title: '报表系统',
    key: '7',
    children: [
      { title: 'lineCharts', key: '71' },
      { title: 'barCharts', key: '72' },
      { title: 'areaCharts', key: '73' },
      { title: 'permission', key: '74' },
    ],
  },],
}]

const RoleTableComponents = ({
  roleTable,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = roleTable
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout

  const { clearBool, FromParams, list, pagination, tableLoading,
    addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible,
    EditData, DetailsData, TotalMultiselectData, AllocatedMultiselectData, platform,
    PermissionList, EditPermissionList, DetailsPermissionList } = TableModelsData

  console.log('RoleTableComponents-roleTable ', TableModelsData)
  if (clearBool) {
    () => clearFunc()
  }
  /**
   * crud modal
   */
  // 定义表单域 =>发出Action  每个table可能不同的变量字段(3)
  const handleAdd = (modalType) => {
    if (modalType === 'create') {
      validateFields(['AddRoleName', 'AddPlatformID', 'AddState', 'AddUser'], (err, payload) => {
        const createParam = { RoleName: payload.AddRoleName, PlatformId: parseInt(payload.AddPlatformID), State: parseInt(payload.AddState), User: payload.AddUser.map(item => parseInt(item.key)), Menu: PermissionList }
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
        const editParam = { Id: payload.EditId, RoleName: payload.EditRoleName, PlatformId: parseInt(payload.EditPlatformID), State: parseInt(payload.EditState), User: payload.EditUser.map(item => parseInt(item.key)), Menu: PermissionList }
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
  //把权限树的数据存到store  然后一起分发到请求
  const PermissionListChanger = (PermissionList, type) => {
    console.log('PermissionListChanger-fa组件', PermissionList)

    dispatch({
      type: `${TableName}/permissionListhandleChanger`,
      payload: {
        PermissionList: PermissionList,
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
            label="角色"
            hasFeedback
          >
            {getFieldDecorator('AddRoleName', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入角色',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="模块"
            hasFeedback
          >
            {getFieldDecorator('AddPlatformID', {
              initialValue: '1',
            })(
              <Select>
                {platform.map(function (item, index) {
                  return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                })}
              </Select>)}
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
            label="已分配人员"
          >
            <div>
              {getFieldDecorator('AddUser', {
                initialValue: [],
              })(
                <Select
                  mode="multiple"
                  labelInValue
                  style={{ width: '100%' }}
                  placeholder="请选择"
                >
                  {TotalMultiselectData.map(function (item, index) {
                    return <Option key={index} value={item.key}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>

          <Row gutter={16}>
            <Col className="gutter-row" span={2}>  </Col>
            <Col className="gutter-row" span={4}>
              <div >权限控制:</div>
            </Col>
            <Col className="gutter-row" span={5}>
              <PermissionManagement
                PermissionListChanger={PermissionListChanger}
                PermissionList={[]}
                type='Add'
              />
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
  // <PermissionManagement />
  //   <FormItem
  //   {...formItemLayout2}


  //   label="权限控制"
  // >
  //   <div style={{ marginRight: '5px' }}>
  //     {getFieldDecorator('AddPermissionManagement', {
  //       initialValue: [],
  //     })(
  //       <div style={{ width: '300px', height: '300px', background: 'white' }}>

  //       </div>
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
            label="模块"
            hasFeedback
          >
            {getFieldDecorator('EditPlatformID', {
              initialValue: EditData.PlatformId.toString(),
            })(
              <Select>
                {platform.map(function (item, index) {
                  return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                })}
              </Select>)}
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
            label="已分配人员"
          >
            <div>
              {getFieldDecorator('EditUser', {
                initialValue: AllocatedMultiselectData,
              })(
                <Select
                  mode="multiple"
                  labelInValue
                  style={{ width: '100%' }}
                  placeholder="请选择"
                >
                  {TotalMultiselectData.map(function (item, index) {
                    return <Option key={index} value={item.key}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <Row gutter={16}>
            <Col className="gutter-row" span={2}>  </Col>
            <Col className="gutter-row" span={4}>
              <div >权限控制:</div>
            </Col>
            <Col className="gutter-row" span={5}>
              <PermissionManagement
                PermissionListChanger={PermissionListChanger}
                PermissionList={EditPermissionList}
                type='Edit'
              />
            </Col>
          </Row>
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
          <TextArea rows={4} disabled value={DetailsData.User} />
        </FormItem>
        <Row gutter={16}>
          <Col className="gutter-row" span={2}>  </Col>
          <Col className="gutter-row" span={4}>
            <div >权限控制:</div>
          </Col>
          <Col className="gutter-row" span={5}>
            <PermissionManagement
              PermissionListChanger={PermissionListChanger}
              PermissionList={DetailsPermissionList}
              type='Details'
            />
          </Col>
        </Row>
      </div>
    )
  }
  const handleSearch = (e) => {
    e.preventDefault()
    validateFields(SearchFormLayout, (err, payload) => {
      if (!err) {
        const Params = {
        }
        SearchTableList(Params, 1, pagination.PageSize)
      }
    });
  }
  const PaginationComponentsChanger = (PageIndex, PageSize) => {
    const Params = {
    }
    SearchTableList(Params, PageIndex, PageSize)
  }
  const SearchTableList = (payload = {}, PageIndex, PageSize) => {
    dispatch({
      type: `${TableName}/query`,
      payload: {
        ...payload,
        PageIndex: PageIndex,
        PageSize: PageSize
      },
    })
  }
  const clearFunc = () => {
    resetFields(SearchFormLayout, (err, payload) => { })
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


export default connect(({ roleTable }) => ({ roleTable }))(Form.create()(RoleTableComponents))




export class PermissionManagement extends React.Component {
  state = {
    expandedKeys: ['0-0-0', '0-0-1'],
    autoExpandParent: true,
    checkedKeys: this.props.PermissionList,
    // checkedKeys: this.props.type === 'Edit' ? this.props.EditPermissionList : ['81'],//Details
    selectedKeys: [],
    // checkedKeys: this.props.type === 'Add' ? [] : (this.props.type === 'Edit' ? this.props.EditPermissionList : this.props.DetailsPermissionList),
    disableCheckbox: this.props.type === 'Details' ? true : false
  }
  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  onCheck = (checkedKeys) => {
    if (this.props.type === 'Details') return;
    this.setState({ checkedKeys });
    this.props.PermissionListChanger(checkedKeys, 'PermissionListChanger', this.props.type)
  }
  onSelect = (selectedKeys, info) => {
    this.setState({ selectedKeys });
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode disableCheckbox={this.state.disableCheckbox} title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode {...item} />;
    })
  }
  render() {
    return (
      <div>
        <Tree
          showLine
          checkable
          onExpand={this.onExpand}
          expandedKeys={this.state.expandedKeys}
          autoExpandParent={this.state.autoExpandParent}
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
          onSelect={this.onSelect}
          selectedKeys={this.state.selectedKeys}
        >
          {this.renderTreeNodes(treeData)}
        </Tree>
      </div>
    )
  }
}
