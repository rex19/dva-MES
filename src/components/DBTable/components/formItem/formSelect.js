/**
 * Created by suncg on 2017/6/27.
 */
import React, { Component, PropTypes } from 'react';
import { Form, Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class FormSelect extends Component {

  render() {
    const { field, getFieldDecorator, formItemLayout } = this.props
    const { title, options, defaultValue, key, placeholder = '请选择', mode } = field

    return (
      <FormItem label={title} {...formItemLayout}>
        {
          getFieldDecorator(key, {
            initialValue: defaultValue,
          })(
            <Select placeholder={placeholder} mode={mode}>
              {
                options.map((option) => {
                  return (
                    <Option key={option.key} value={option.key}>
                      {option.value}
                    </Option>
                  )
                })
              }
            </Select>
          )
        }
      </FormItem>
    );
  }
}

FormSelect.propTypes = {
  field: PropTypes.object,
  getFieldDecorator: PropTypes.func,
};
FormSelect.defaultProps = {};

export default FormSelect;
