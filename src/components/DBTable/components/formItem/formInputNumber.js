/**
 * Created by suncg on 2017/6/27.
 */
import React, { Component, PropTypes } from 'react';
import { Form, Select, Radio, Checkbox, InputNumber } from 'antd'

const FormItem = Form.Item

class FormInputNumber extends Component {

  render() {
    const {field, getFieldDecorator, formItemLayout} = this.props
    const {title, defaultValue, key, max, min, placeholder, step = 1} = field

    return (
      <FormItem label={title} {...formItemLayout}>
        {
          getFieldDecorator(key, {
            initialValue: defaultValue,
          })(
            <InputNumber max={max} min={min} placeholder={placeholder} step={step}/>
          )
        }
      </FormItem>
    );
  }
}

FormInputNumber.propTypes = {
  field: PropTypes.object,
  getFieldDecorator: PropTypes.func,
};
FormInputNumber.defaultProps = {};

export default FormInputNumber;
