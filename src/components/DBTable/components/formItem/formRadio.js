/**
 * Created by suncg on 2017/6/27.
 */
import React, { Component, PropTypes } from 'react';
import { Form, Select, Radio } from 'antd'

const FormItem = Form.Item
const RadioGroup = Radio.Group

class FormRadio extends Component {

  render() {
    const { field, getFieldDecorator, formItemLayout } = this.props
    const { title, options, defaultValue, key } = field

    return (
      <FormItem label={title} {...formItemLayout}>
        {
          getFieldDecorator(key, {
            initialValue: defaultValue,
          })(
            <RadioGroup>
              {
                options.map((option) => {
                  return (
                    <Radio key={option.key} value={option.key}>
                      {option.value}
                    </Radio>
                  )
                })
              }
            </RadioGroup>
          )
        }
      </FormItem>
    );
  }
}

FormRadio.propTypes = {
  field: PropTypes.object,
  getFieldDecorator: PropTypes.func,
};
FormRadio.defaultProps = {};

export default FormRadio;
