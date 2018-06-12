import React from 'react'
import moment from 'moment';
import { Form, Row, Col, Input, Button, Icon, Table, DatePicker, Select, Checkbox } from 'antd';
import './index.less'
import globalConfig from 'utils/config'

const { Option } = Select
const FormItem = Form.Item
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const CheckboxGroup = Checkbox.Group;

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

const plainOptions = ['已计划', '开始生产', '已完成', '已关闭'];
const SearchValidateFieldsLayout = [
  'WorkOrderNumberFieldDecorator',
  'PlannedStartDateTimeFieldDecorator',
  'PlannedEndDateTimeFieldDecorator',
  'ShiftNameFieldDecorator',
  'LineNameFieldDecorator',
  'WorkOrderStateFieldDecorator']

class Forms extends React.Component {
  state = {
    expand: false,
  };

  handleSearch = (e) => {
    e.preventDefault();
    // this.props.form.validateFields((err, values) => {
    //   console.log('Received values of form: ', values);
    // });
    console.log('validateFields-handleSearch', globalConfig.table.paginationConfig)
    this.props.form.validateFields(SearchValidateFieldsLayout, (err, payload) => {

      if (!err) {
        const Params = {
          WorkOrderNumber: payload.WorkOrderNumberFieldDecorator,
          PlannedStartDateTime: moment(payload.PlannedStartDateTimeFieldDecorator).format(),
          PlannedEndDateTime: moment(payload.PlannedEndDateTimeFieldDecorator).format(),
          ShiftName: payload.ShiftNameFieldDecorator,
          LineName: payload.LineNameFieldDecorator,
          // WorkOrderState: 8
          WorkOrderState: payload.WorkOrderStateFieldDecorator,
          PageIndex: this.props.pagination.PageIndex,
          PageSize: this.props.pagination.PageSize
        }
        console.log('Received values of form: ', Params);
        this.props.SearchTableList(Params)
        console.log(payload.PlannedStartDateTimeFieldDecorator.toString())

      }
    })
  }

  handleReset = () => {
    // this.props.form.resetFields();
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
  // onChange = (pagination, filters, sorter) => {
  //   // console.log('params', pagination, filters, sorter)
  // }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { LineNames, ShiftNames } = this.props;
    // console.log('render-stationTable-fromComp', this.props.form)
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    }
    return (
      <div className="components-form-demo-advanced-search" >
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Row gutter={40}>
            <Col span={8} key={1} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`工单号`}>
                {getFieldDecorator(`WorkOrderNumberFieldDecorator`, {
                  initialValue: '',
                })(
                  <Input />
                  )}
              </FormItem>
            </Col>
            <Col span={8} key={2} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`计划开始`}>
                {getFieldDecorator(`PlannedStartDateTimeFieldDecorator`, {
                  initialValue: '',
                })(
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss" />
                  )}
              </FormItem>
            </Col>
            <Col span={8} key={3} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`计划结束`}>
                {getFieldDecorator(`PlannedEndDateTimeFieldDecorator`, {
                  initialValue: '',
                })(
                  <DatePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss" />
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={40}>
            <Col span={8} key={1} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`班别`}>
                {getFieldDecorator(`ShiftNameFieldDecorator`, {
                  initialValue: '',
                })(
                  <Select
                    style={{ width: 200 }}
                    onChange={handleChange}
                  >
                    {ShiftNames.map(function (item, index) {
                      return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                    })}
                  </Select>
                  )}
              </FormItem>
            </Col>
            <Col span={8} key={2} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`线体`}>
                {getFieldDecorator(`LineNameFieldDecorator`, {
                  initialValue: '',
                })(
                  <Select
                    style={{ width: 200 }}
                    onChange={handleChange}
                  >
                    {LineNames.map(function (item, index) {
                      return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                    })}
                  </Select>
                  )}
              </FormItem>
            </Col>
            <Col span={8} key={3} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`工单状态`}>
                {getFieldDecorator(`WorkOrderStateFieldDecorator`, {
                  initialValue: [],
                })(
                  <CheckboxGroup options={plainOptions} onChange={onChange} />
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit" onClick={this.handleReset}><Icon type="search" />查询</Button>
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
