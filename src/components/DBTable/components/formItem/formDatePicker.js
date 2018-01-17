/**
 * Created by suncg on 2017/6/27.
 */
import React, { Component, PropTypes } from 'react';
import { Form, DatePicker } from 'antd'

const FormItem = Form.Item

class FormDatePicker extends Component {

  render() {
    const {field, getFieldDecorator, formItemLayout} = this.props
    const {title, defaultValue, key, showTime = true, format = 'YYYY-MM-DD HH:mm:ss', placeholder} = field

    return (
      <FormItem label={title} {...formItemLayout}>
        {
          getFieldDecorator(key, {
            initialValue: defaultValue,
          })(
            <DatePicker showTime={showTime} format={format} placeholder={placeholder}/>
          )
        }
      </FormItem>
    );
  }
}

FormDatePicker.propTypes = {
  field: PropTypes.object,
  getFieldDecorator: PropTypes.func,
};
FormDatePicker.defaultProps = {};

export default FormDatePicker;
