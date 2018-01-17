/**
 * Created by suncg on 2017/6/27.
 */
import React, { Component, PropTypes } from 'react';
import { Form, Select, Radio, Checkbox } from 'antd'

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

class FormCheckbox extends Component {

  render() {
    const { field, getFieldDecorator, formItemLayout } = this.props
    const { title, options, defaultValue, key } = field
    const CheckboxGroupOptions = options.map((option) => {
      return {
        label: option.value,
        value: option.key,
      }
    })

    return (
      <FormItem label={title} {...formItemLayout}>
        {
          getFieldDecorator(key, {
            initialValue: defaultValue,
          })(
            <CheckboxGroup options={CheckboxGroupOptions}/>
          )
        }
      </FormItem>
    );
  }
}

FormCheckbox.propTypes = {
  field: PropTypes.object,
  getFieldDecorator: PropTypes.func,
};
FormCheckbox.defaultProps = {};

export default FormCheckbox;
