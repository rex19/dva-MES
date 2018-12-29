import React from 'react'
import { Form, Input, Button, Icon, Row, Col, Radio, Select, Tree } from 'antd'
import { connect } from 'dva'
import { FormComponents, TableComponents } from '../../components'
import PermissionManagement from './subComponent/permissionManagement.js'
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
const AddFormLayout = [
  'AddRoleName', 'AddPlatformID', 'AddState', 'AddUser'
]
const EditFormLayout = [
  'EditId', 'EditRoleName', 'EditPlatformID', 'EditState', 'EditUser'
]




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

  const { FromParams, list, pagination, tableLoading,
    addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible,
    EditData, DetailsData, TotalMultiselectData, AllocatedMultiselectData, platform,
    PermissionList, EditPermissionList, DetailsPermissionList } = TableModelsData

  console.log('RoleTableComponents-roleTable ', TableModelsData)

  /**
   * crud modal
   */
  // 定义表单域 =>发出Action  每个table可能不同的变量字段(3)
  const handleAdd = (modalType) => {
    if (modalType === 'create') {
      validateFields(AddFormLayout, (err, payload) => {
        const createParam = { RoleName: payload.AddRoleName, PlatformId: parseInt(payload.AddPlatformID), State: parseInt(payload.AddState), User: payload.AddUser.map(item => parseInt(item.key)), Menu: PermissionList }
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
          handleResetFields={handleResetFields}
        />
      </div>
    </div>
  )
}


export default connect(({ roleTable }) => ({ roleTable }))(Form.create()(RoleTableComponents))




// class PermissionManagement extends React.Component {
//   state = {
//     expandedKeys: ['0-0-0', '0-0-1'],
//     autoExpandParent: true,
//     checkedKeys: this.props.PermissionList,
//     // checkedKeys: this.props.type === 'Edit' ? this.props.EditPermissionList : ['81'],//Details
//     selectedKeys: [],
//     // checkedKeys: this.props.type === 'Add' ? [] : (this.props.type === 'Edit' ? this.props.EditPermissionList : this.props.DetailsPermissionList),
//     disableCheckbox: this.props.type === 'Details' ? true : false
//   }
//   onExpand = (expandedKeys) => {
//     this.setState({
//       expandedKeys,
//       autoExpandParent: false,
//     });
//   }

//   componentWillReceiveProps = (nextProps) => {
//     if (this.props.type === 'Details' && nextProps.PermissionList != undefined) {
//       this.setState({
//         checkedKeys: nextProps.PermissionList
//       })
//     }
//   }
//   onCheck = (checkedKeys) => {
//     if (this.props.type === 'Details') return;
//     this.setState({ checkedKeys });
//     this.props.PermissionListChanger(checkedKeys, 'PermissionListChanger', this.props.type)
//   }
//   onSelect = (selectedKeys, info) => {
//     this.setState({ selectedKeys });
//   }
//   renderTreeNodes = (data) => {
//     return data.map((item) => {
//       if (item.children) {
//         return (
//           <TreeNode disableCheckbox={this.state.disableCheckbox} title={item.title} key={item.key} dataRef={item}>
//             {this.renderTreeNodes(item.children)}
//           </TreeNode>
//         )
//       }
//       return <TreeNode {...item} />;
//     })
//   }
//   render() {
//     // console.log('PermissionManagement-Tree', this.state.checkedKeys, this.props.PermissionList)
//     console.log('PermissionManagement-Tree', this.state, this.props)
//     return (
//       <div>
//         <Tree
//           showLine
//           checkable
//           onExpand={this.onExpand}
//           expandedKeys={this.state.expandedKeys}
//           autoExpandParent={this.state.autoExpandParent}
//           onCheck={this.onCheck}
//           checkedKeys={this.state.checkedKeys}
//           onSelect={this.onSelect}
//           selectedKeys={this.state.selectedKeys}
//         >
//           {this.renderTreeNodes(treeData)}
//         </Tree>
//       </div>
//     )
//   }
// }
// export default connect(({ roleTable }) => ({ roleTable }))(PermissionManagement)
