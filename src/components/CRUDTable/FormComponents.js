import React from 'react'
import { Form, Row, Col, Input, Button, Icon, Table } from 'antd';
import './index.less'

const FormItem = Form.Item

class Forms extends React.Component {
  state = {
    expand: false,
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      // console.log('Received values of form: ', values);
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  // To generate mock Form.Item
  // getFields() {
  //   const count = this.state.expand ? 10 : 6;
  //   const { getFieldDecorator } = this.props.form;
  //   const formItemLayout = {
  //     labelCol: { span: 5 },
  //     wrapperCol: { span: 19 },
  //   };
  //   const children = [];
  //   for (let i = 0; i < 10; i++) {
  //     children.push(
  //       <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
  //         <FormItem {...formItemLayout} label={`Field ${i}`}>
  //           {getFieldDecorator(`field-${i}`)(
  //             <Input placeholder="placeholder" />
  //           )}
  //         </FormItem>
  //       </Col>
  //     )
  //   }
  //   return children
  // }
  onChange = (pagination, filters, sorter) => {
    // console.log('params', pagination, filters, sorter)
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    // console.log('render-stationTable-fromComp', this.props.form)
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    return (
      <div className="components-form-demo-advanced-search" >
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          {this.props.formComponentsValue}
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                <Icon type="cross" />清除
            </Button>
              <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
              </a>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}

const FormComponents = Form.create()(Forms)
export default FormComponents

// <Row gutter={40}>{this.getFields()}</Row>
