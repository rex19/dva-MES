/**
 * Created by suncg on 2017/6/27.
 */
import React, { Component, PropTypes } from 'react';
import { Form, DatePicker, Input } from 'antd'

const FormItem = Form.Item

class FormInput extends Component {

  render() {
    const {field, getFieldDecorator, formItemLayout} = this.props
    const {title, defaultValue, key, placeholder, addonBefore, addonAfter} = field

    return (
      <FormItem label={title} {...formItemLayout}>
        {
          getFieldDecorator(key, {
            initialValue: defaultValue,
          })(
            <Input placeholder={placeholder} addonBefore={addonBefore} addonAfter={addonAfter}/>
          )
        }
      </FormItem>
    );
  }
}

FormInput.propTypes = {
  field: PropTypes.object,
  getFieldDecorator: PropTypes.func,
};
FormInput.defaultProps = {};

export default FormInput;
