import React from 'react'
import { Form, Input, Icon, Row, Col } from 'antd'
import { FormComponents, TableComponents } from '../../components'
// import { NumberCard, Quote, Sales, Weather, RecentSales, Comments, Completed, Browser, Cpu, User } from './components'
import './index.less'

const FormItem = Form.Item
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park',
}]
class LineTableComponents extends React.Component {
  state = {
    addInputValue: '',
  };

  handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
    });
  }

  render() {
    // console.log('render-stationTable', this.props.form)
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
      title: 'Name',
      dataIndex: 'name',
      filters: [{
        text: 'Joe',
        value: 'Joe',
      }, {
        text: 'Jim',
        value: 'Jim',
      }, {
        text: 'Submenu',
        value: 'Submenu',
        children: [{
          text: 'Green',
          value: 'Green',
        }, {
          text: 'Black',
          value: 'Black',
        }],
      }],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
    }, {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
    }, {
      title: 'Address',
      dataIndex: 'address',
      filters: [{
        text: 'London',
        value: 'London',
      }, {
        text: 'New York',
        value: 'New York',
      }],
      filterMultiple: false,
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      sorter: (a, b) => a.address.length - b.address.length,
    }, {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 140,
      render: (text, record) => (
        <span>
          <a href="#">编辑</a>
          <span className="ant-divider" />
          <a href="#">删除</a>
          <span className="ant-divider" />
          <a href="#" className="ant-dropdown-link">
            详情 <Icon type="down" />
          </a>
        </span>
      ),
    }]
    const addModalValue = () => {
      return (
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="测试"
        >
          <Input placeholder="请输入" onChange={this.handleAddInput} value={this.state.addInputValue} />
        </FormItem>
      )
    }
    const editModalValue = () => {
      return (
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="测试"
        >
          <Input placeholder="请输入" onChange={this.handleAddInput} value={this.state.addInputValue} />
        </FormItem>
      )
    }
    const detailsModalValue = () => {
      return (
        <FormItem
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 15 }}
          label="测试"
        >
          <Input placeholder="请输入" onChange={this.handleAddInput} value={this.state.addInputValue} />
        </FormItem>
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


const LineTable = Form.create()(LineTableComponents)
export default LineTable
