
import React from 'react'
import { Form, Input, Icon, Row, Col, Button, Modal, Radio } from 'antd'
import { FormComponents, TableComponents } from '../../components'
// import { NumberCard, Quote, Sales, Weather, RecentSales, Comments, Completed, Browser, Cpu, User } from './components'
import './index.less'

const FormItem = Form.Item



const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="Title">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(
              <Input />
              )}
          </FormItem>
          <FormItem label="Description">
            {getFieldDecorator('description')(<Input type="textarea" />)}
          </FormItem>
          <FormItem className="collection-create-form_last-form-item">
            {getFieldDecorator('modifier', {
              initialValue: 'public',
            })(
              <Radio.Group>
                <Radio value="public">Public</Radio>
                <Radio value="private">Private</Radio>
              </Radio.Group>
              )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

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
class StationGroupTableComponents extends React.Component {
  state = {
    addInputValue: '',
    visible: false,
  };

  handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
    });
  }
  //
  showModal = () => {
    this.setState({ visible: true });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  }
  saveFormRef = (form) => {
    this.form = form;
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
          <Button type="primary" onClick={this.showModal}>New Collection</Button>
          <CollectionCreateForm
            ref={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </div>
      </div>
    )
  }
}


const StationGropuTable = Form.create()(StationGroupTableComponents)
export default StationGropuTable
