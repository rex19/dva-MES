import React from 'react'
import moment from 'moment';
import { Form, Row, Col, Input, Button, Icon, Table, Select, DatePicker, Checkbox } from 'antd';
import './index.less'

const FormItem = Form.Item
const { Option } = Select
const { RangePicker } = DatePicker;

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['已计划', '开始生产', '已完成', '已关闭'];


class Forms extends React.Component {
  state = {
    expand: false,
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const Params = {
          LineName: 9,
          WorkOrderState: values.WorkOrderStateFieldDecorator,
          PlannedStartDateTime: moment(values.PlannedStartDateTimeFieldDecorator[0]).format(),
          PlannedEndDateTime: moment(values.PlannedStartDateTimeFieldDecorator[1]).format(),
          // PlannedStartDateTime: moment(values.PlannedStartDateTimeFieldDecorator).format(),
        }
        console.log('Received values of form: ', Params);
        this.props.handleSearchFormComponents(Params, 'formComponentsValueToOptionalWorkOrder')
      }
    });
  }

  handleReset = () => {
    this.props.form.resetFields();
  }

  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  }

  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  checkedOnChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
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
    console.log('Forms+++render', this.props)
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
          <Row gutter={40}>
            <Col span={8} key={3} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`工单状态`}>
                {getFieldDecorator(`WorkOrderStateFieldDecorator`, {
                  initialValue: [],
                })(
                  <CheckboxGroup options={plainOptions} onChange={this.checkedOnChange} />
                  )}
              </FormItem>
            </Col>
            <Col span={8} key={2} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`时间选择`}>
                {getFieldDecorator(`PlannedStartDateTimeFieldDecorator`, {
                  initialValue: '',
                })(
                  <RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={['计划开始', '计划结束']}
                  />
                  )}
              </FormItem>
            </Col>
          </Row>
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

const FormComponentsValueToOptionalWorkOrder = Form.create()(Forms)
export default FormComponentsValueToOptionalWorkOrder

// <Row gutter={40}>{this.getFields()}</Row>

// {this.props.formComponentsValue}
