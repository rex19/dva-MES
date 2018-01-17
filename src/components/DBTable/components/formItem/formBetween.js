/**
 * Created by suncg on 2017/6/27.
 */
import React, {Component, PropTypes} from 'react';
import {Form, InputNumber, DatePicker} from 'antd'

const FormItem = Form.Item

class FormBetween extends Component {

  render() {
    const {field, getFieldDecorator, formItemLayout} = this.props
    const {
      key, title, defaultValueBegin, defaultValueEnd, placeholderBegin, placeholderEnd,
      mode, step = 1
    } = field

    let components = []

    switch (mode) {
      case 'number': {
        let firstComponent = <InputNumber placeholder={placeholderBegin} step={step}/>
        let secondComponent = <InputNumber placeholder={placeholderEnd} step={step}/>
        components.push(firstComponent, secondComponent)
        break;
      }
      case 'datetime': {
        let firstComponent = <DatePicker format="YYYY-MM-DD HH:mm:ss" placeholder={placeholderBegin}/>
        let secondComponent = <DatePicker format="YYYY-MM-DD HH:mm:ss" placeholder={placeholderEnd}/>
        components.push(firstComponent, secondComponent)
        break
      }
      default:
        break
    }

    return (
      <FormItem label={title} {...formItemLayout}>
        {
          components[0]
        }
         ~ &nbsp;
        {
          components[1]
        }
      </FormItem>
    );
  }
}

FormBetween.propTypes = {
  field: PropTypes.object,
  getFieldDecorator: PropTypes.func,
};
FormBetween.defaultProps = {};

export default FormBetween;
