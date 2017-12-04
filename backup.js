
import React from 'react'
import { Form, Input, Row, Col, Radio, Transfer, Select } from 'antd'

import { connect } from 'dva'
import { FormComponents, TableComponents } from '../../components'
import './index.less'
import { staffTableColumns } from '../../mock/tableColums'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
class StaffTableComponents extends React.Component {

  state = {
    addInputValue: '',
    value: 1,
    mockData: [],
    targetKeys: [],
  }
  /**
   * mockData  targetkeys  多选穿梭框
   */

  /**
   * 这里是多选框用到的state fanction
   */
  componentDidMount() {
    this.getMock()
  }
  getMock = () => {
    const targetKeys = []
    const mockData = []
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      }
      if (data.chosen) {
        targetKeys.push(data.key)
      }
      mockData.push(data)
    }
    this.setState({ mockData, targetKeys })
  }
  filterOption = (inputValue, option) => {
    return option.description.indexOf(inputValue) > -1
  }
  handleChange = (targetKeys) => {
    this.setState({ targetKeys })
  }
  /**
   * onChange  单选变更Function
   */
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
    })
  }
  /**
   * crud modal
   */
  handleAdd = () => {
    const { validateFields, getFieldsValue } = this.props.form
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ---', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    }
    const formComponentsValue = () => {
      return (
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
      )
    }
    const addModalValue = () => {
      return (
        <div>
          <Form layout="horizontal">
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="账号"
              hasFeedback
            >
              {getFieldDecorator('UserName', {
                initialValue: 'UserName',
                rules: [
                  {
                    required: true, message: 'Please input the title of collection!',
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="模块"
              hasFeedback
            >
              {getFieldDecorator('PlatformID', {
                initialValue: 'PlatformID',
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="邮箱"
              hasFeedback
            >
              {getFieldDecorator('EmailAddress', {
                initialValue: 'EmailAddress',
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="电话"
              hasFeedback
            >
              {getFieldDecorator('Phone', {
                initialValue: 'Phone',
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="状态"
            >
              {getFieldDecorator('UserState')(
                <RadioGroup>
                  <Radio value={1}>正常</Radio>
                  <Radio value={2}>失效</Radio>
                </RadioGroup>
              )}

            </FormItem>
            <FormItem
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 15 }}
              label="分配人员角色"
            >
              {getFieldDecorator('UserRole')(
                <Transfer
                  titles={['未分配', '已分配']}
                  dataSource={this.state.mockData}
                  showSearch
                  filterOption={this.filterOption}
                  targetKeys={this.state.targetKeys}
                  onChange={this.handleChange}
                  render={item => item.title}
                  listStyle={{
                    width: 120,
                    height: 200,
                  }}
                />
              )}
            </FormItem>
          </Form>
        </div>
      )
    }
    const editModalValue = () => {
      return (
        <div>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="ID"
          >
            <Input placeholder="请输入" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="账号"
          >
            <Input placeholder="请输入" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="模块"
          >
            {getFieldDecorator('status', {
              initialValue: '0',
            })(
              <Select placeholder="请选择" style={{ width: '60%' }}>
                <Option value="0">嘉定工厂</Option>
                <Option value="1">奉贤工厂</Option>
              </Select>
              )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="电话"
          >
            <Input placeholder="请输入" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            // {...formItemLayout}
            label="状态"
          // help="客户、邀评人默认被分享"
          >
            <div>
              {getFieldDecorator('state', {
                initialValue: '1',
              })(
                <Radio.Group>
                  <Radio value="1">正常</Radio>
                  <Radio value="2">失效</Radio>
                </Radio.Group>
                )}
            </div>
          </FormItem>
          <Transfer
            titles={['未分配工作组', '已分配工作组']}
            dataSource={this.state.mockData}
            showSearch
            filterOption={this.filterOption}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange}
            render={item => item.title}
            listStyle={{
              width: 200,
              height: 200,
            }}
          />
        </div>
      )
    }
    const detailsModalValue = () => {
      return (
        <div>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="ID"
          >
            <Input disabled value="1" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="账号"
          >
            <Input disabled value="00101001" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="模块"
          >
            <Input disabled value="激光打标机" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="邮箱"
          >
            <Input disabled value="制造工站" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="电话"
          >
            <Input disabled value="正常" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="状态"
          >
            <Input disabled value="嘉定工厂" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="最近登录时间"
          >
            <Input disabled value="Admin" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="创建时间"
          >
            <Input disabled value="2017-10-01 12:00:00" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="创建人"
          >
            <Input disabled value="Admin" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="最后编辑时间"
          >
            <Input disabled value="2017-10-01 12:00:00" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="最后编辑人"
          >
            <Input disabled value="Admin" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="所属人员角色"
          >
            <Input disabled value="管理员组 ,用户组" onChange={this.handleAddInput} />
          </FormItem>
        </div>
      )
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
            data={this.props.staffTable.list}
            columns={staffTableColumns}
            addModalValue={addModalValue()}
            editModalValue={editModalValue()}
            detailsModalValue={detailsModalValue()}
            handleAdd={this.handleAdd}
          />
        </div>
      </div>
    )
  }
}

export default connect(({ staffTable, dispatch }) => ({ staffTable, dispatch }))(Form.create()(StaffTableComponents))



//modalComponents
import React from 'react'
import { Radio, Input, Modal, Form, Select } from 'antd'
import './index.less'

const FormItem = Form.Item
const { Option } = Select
class Modals extends React.Component {
  state = {
    addInputValue: '',
  };

  handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
    });
  }

  handleAdd = () => {
    // console.log('handleAdd1', data, a)
    this.props.handleAdd()
  }


  render() {
    const { getFieldDecorator } = this.props.form

    return (

      <div>
        <Modal
          title="新建"
          visible={this.props.addModalVisible}
          onOk={this.handleAdd}
          onCancel={this.props.handleAddModalClose}
        >
          {this.props.addModalValue}
        </Modal>
        <Modal
          title="修改"
          visible={this.props.editModalVisiable}
          onOk={this.handleAdd}
          onCancel={this.props.handleEditModalClose}
        >
          {this.props.editModalValue}
        </Modal>
        <Modal
          title="详细"
          visible={this.props.detailsModalVisiable}
          onOk={this.handleAdd}
          onCancel={this.props.handleDetailsModalClose}
        >
          {this.props.detailsModalValue}
        </Modal>
        <Modal
          title="删除提示"
          visible={this.props.deleteModalVisiable}
          onOk={this.handleAdd}
          onCancel={this.props.handleDeleteModalClose}
        >
          <p>确认删除吗？？</p>
        </Modal>
      </div>

    )
  }
}

export const ModalComponents = Form.create()(Modals)



//TableComponents
import React from 'react'
import { Row, Col, Button, Icon, Table } from 'antd'
import { connect } from 'dva'
import { ModalComponents } from './ModalComponents'
import './index.less'

let column = []
class TableComponents extends React.Component {

  state = {
    addModalVisiable: false,
    editModalVisiable: false,
    detailsModalVisiable: false,
  }
  onChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter)
  }


  handleModalShow = (modalVisible) => {
    console.log('handleModalShow', modalVisible)
    dispatch({
      type: 'staffTable/showModal',
      payload: {
        modalType: modalVisible,
        // currentItem: item,
      },
    })
  }

  handleAddModalOpen = ({ modalVisible }) => {
    console.log('handleAddModalOpen', modalVisible)
    // this.setState({ addModalVisible: true })
    // this.props.handleAddModalOpen(modalVisible)
  }
  handleEditModalOpen = () => {
    // this.props.handleAddModalOpen('create')
    this.setState({ editModalVisiable: true })
  }
  handleDetailsModalOpen = () => {
    this.setState({ detailsModalVisiable: true })
  }
  handleDeleteModalOpen = () => {
    this.setState({ deleteModalVisiable: true })
  }
  handleAddModalClose = () => {
    this.setState({ addModalVisiable: false })
  }
  handleEditModalClose = () => {
    this.setState({ editModalVisiable: false })
  }
  handleDetailsModalClose = () => {
    this.setState({ detailsModalVisiable: false })
  }
  handleDeleteModalClose = () => {
    this.setState({ deleteModalVisiable: false })
  }

  render() {
    //父组件传来的表头
    column.pop()
    column = this.props.columns
    column.push({
      title: 'Action',
      key: (new Date()).valueOf(),
      fixed: 'right',
      width: 140,
      render: (text, record) => (
        <span>
          <a onClick={() => this.props.handleAddModalOpen('editModalVisible')}>编辑</a>
          <span className="ant-divider" />
          <a onClick={() => this.props.handleAddModalOpen('deleteModalVisible')}>删除</a>
          <span className="ant-divider" />
          <a onClick={() => this.props.handleAddModalOpen('detailsModalVisiable')} className="ant-dropdown-link">
            详情 <Icon type="down" />
          </a>
        </span>
      ),
    })
    return (

      <div>
        <Row>
          <Col span={24} style={{ textAlign: 'left', marginBottom: '5px' }}>
            <Button type="primary" onClick={() => this.handleModalShow('addModalVisible')}>新增</Button>
          </Col>
        </Row>
        <Table columns={column} dataSource={this.props.data} scroll={{ x: 1300 }} onChange={this.onChange} />
        <ModalComponents
          addModalVisible={this.props.addModalVisible}
          editModalVisible={this.props.editModalVisible}
          handleAddModalClose={this.handleAddModalClose}

          handleEditModalClose={this.handleEditModalClose}
          detailsModalVisiable={this.state.detailsModalVisiable}
          handleDetailsModalClose={this.handleDetailsModalClose}
          deleteModalVisiable={this.state.deleteModalVisiable}
          handleDeleteModalClose={this.handleDeleteModalClose}
          addModalValue={this.props.addModalValue}
          editModalValue={this.props.editModalValue}
          detailsModalValue={this.props.detailsModalValue}
          handleAdd={this.props.handleAdd}
        />
      </div>

    )
  }
}

export default TableComponents
// export default connect()(TableComponents);



//11-22
import React from 'react'
import { Form, Input, Row, Col, Radio, Transfer, Select } from 'antd'
import moment from 'moment'
import { connect } from 'dva'
import { FormComponents, TableComponents } from '../../components'
import './index.less'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
const data = [{
  key: '1',
  id: 1,
  stationNo: '1',
  name: 'c001',
  type: '1',
  status: '1',
  plant: '1chang',
  updatedAt: '2017-10-11',
  lastModifyAt: '2017-10-11',
  Modifier: 'rex',
}, {
  key: '2',
  id: 2,
  stationNo: '1',
  name: 'c001',
  type: '1',
  status: '1',
  plant: '1chang',
  updatedAt: '2017-10-11',
  lastModifyAt: '2017-10-11',
  Modifier: 'rex',
}, {
  key: '3',
  id: 3,
  stationNo: '1',
  name: 'c001',
  type: '1',
  status: '1',
  plant: '1chang',
  updatedAt: '2017-10-11',
  lastModifyAt: '2017-10-11',
  Modifier: 'rex',
}]
class StationTableComponents extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     addInputValue: '',
  //     value: 1,
  //     mockData: [],
  //     targetKeys: [],
  //   }
  // }
  state = {
    addInputValue: '',
    value: 1,
    mockData: [],
    targetKeys: [],
  }
  /**
   * mockData  targetkeys  多选穿梭框
   */

  /**
   * 这里是多选框用到的state fanction
   */
  componentDidMount() {
    this.getMock()
    console.log('StationTableComponents-componentDidMount', this.props, this.props.stationTable)
  }
  getMock = () => {
    const targetKeys = []
    const mockData = []
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      }
      if (data.chosen) {
        targetKeys.push(data.key)
      }
      mockData.push(data)
    }
    this.setState({ mockData, targetKeys })
  }
  filterOption = (inputValue, option) => {
    return option.description.indexOf(inputValue) > -1
  }
  handleChange = (targetKeys) => {
    this.setState({ targetKeys })
  }
  /**
   * onChange  单选变更Function
   */
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
    })
  }

  render() {
    console.log('render-stationTable', this.props.form)
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    }
    const formComponentsValue = () => {
      return (
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
      )
    }
    const columns = [{
      title: 'ID',
      dataIndex: 'id',
      sorter: (a, b) => a.name.length - b.name.length,
    }, {
      title: '工站编号',
      dataIndex: 'stationNo',
    }, {
      title: '名称',
      dataIndex: 'name',
    }, {
      title: '类型',
      dataIndex: 'type',
    }, {
      title: '状态',
      dataIndex: 'status',
    }, {
      title: '工厂',
      dataIndex: 'plant',
    }, {
      title: '创建时间',
      dataIndex: 'updatedAt',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    }, {
      title: '最后修改时间',
      dataIndex: 'lastModifyAt',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    }, {
      title: '修改人',
      dataIndex: 'Modifier',
    }]
    const addModalValue = () => {
      return (
        <div>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="工站编号"
          >
            <Input placeholder="请输入" onChange={this.handleAddInput} value={this.state.addInputValue} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="名称"
          >
            <Input placeholder="请输入" onChange={this.handleAddInput} value={this.state.addInputValue} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="工站类型"
          >
            <Input placeholder="请输入" onChange={this.handleAddInput} value={this.state.addInputValue} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="工厂"
          >
            <Input placeholder="请输入" onChange={this.handleAddInput} value={this.state.addInputValue} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="状态"
          >
            <RadioGroup
              onChange={this.onChange}
              value={this.state.value}>
              <Radio value={1}>正常</Radio>
              <Radio value={2}>失效</Radio>
            </RadioGroup>
          </FormItem>
        </div>
      )
    }
    const editModalValue = () => {
      return (
        <div>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="工站ID"
          >
            <Input placeholder="请输入" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="工站编号"
          >
            <Input placeholder="请输入" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="名称"
          >
            <Input placeholder="请输入" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="工站类型"
          >
            {getFieldDecorator('status', {
              initialValue: '0',
            })(
              <Select placeholder="请选择" style={{ width: '60%' }}>
                <Option value="0">制造工站</Option>
                <Option value="1">测试工站</Option>
                <Option value="1">维修工站</Option>
              </Select>
              )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="工厂"
          >
            {getFieldDecorator('status', {
              initialValue: '0',
            })(
              <Select placeholder="请选择" style={{ width: '60%' }}>
                <Option value="0">嘉定工厂</Option>
                <Option value="1">奉贤工厂</Option>
              </Select>
              )}
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            // {...formItemLayout}
            label="状态"
          // help="客户、邀评人默认被分享"
          >
            <div>
              {getFieldDecorator('state', {
                initialValue: '1',
              })(
                <Radio.Group>
                  <Radio value="1">正常</Radio>
                  <Radio value="2">失效</Radio>
                </Radio.Group>
                )}
            </div>
          </FormItem>
          <Transfer
            titles={['未分配工作组', '已分配工作组']}
            dataSource={this.state.mockData}
            showSearch
            filterOption={this.filterOption}
            targetKeys={this.state.targetKeys}
            onChange={this.handleChange}
            render={item => item.title}
            listStyle={{
              width: 200,
              height: 200,
            }}
          />
        </div>
      )
    }
    const detailsModalValue = () => {
      return (
        <div>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="工站ID"
          >
            <Input disabled value="1" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="工站编号"
          >
            <Input disabled value="00101001" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="名称"
          >
            <Input disabled value="激光打标机" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="工站类型"
          >
            <Input disabled value="制造工站" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="状态"
          >
            <Input disabled value="正常" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="工厂"
          >
            <Input disabled value="嘉定工厂" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="创建人"
          >
            <Input disabled value="Admin" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="创建时间"
          >
            <Input disabled value="2017-10-01 12:00:00" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="最后编辑人"
          >
            <Input disabled value="Admin" onChange={this.handleAddInput} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="最后编辑时间"
          >
            <Input disabled value="2017-10-01 12:00:00" onChange={this.handleAddInput} />
          </FormItem>
        </div>
      )
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
            data={data}
            columns={columns}
            addModalValue={addModalValue()}
            editModalValue={editModalValue()}
            detailsModalValue={detailsModalValue()}
          />
        </div>
      </div>
    )
  }
}

export default connect(({ stationTable }) => ({ stationTable }))(Form.create()(StationTableComponents))
// const StationTable = Form.create()(StationTableComponents)
// export default StationTable
