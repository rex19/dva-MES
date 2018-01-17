/**
 * Created by suncg on 2017/6/27.
 */
import React, { Component, PropTypes } from 'react';
import { Form, Cascader } from 'antd'

const FormItem = Form.Item

class FormCascader extends Component {

  render() {
    const {field, getFieldDecorator, formItemLayout} = this.props
    const {title, options = [], defaultValue, key, placeholder = '请选择'} = field

    return (
      <FormItem label={title} {...formItemLayout}>
        {
          getFieldDecorator(key, {
            initialValue: defaultValue,
          })(
            <Cascader options={options} placeholder={placeholder}/>
          )
        }
      </FormItem>
    );
  }
}

FormCascader.propTypes = {
  field: PropTypes.object,
  getFieldDecorator: PropTypes.func,
};
FormCascader.defaultProps = {};

export default FormCascader;
