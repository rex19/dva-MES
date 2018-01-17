/**
 * Created by suncg on 2017/6/27.
 */
import React, { Component, PropTypes } from 'react';
import {
  Form,
  Row,
  Col,
  Icon,
  Button,
  Upload,
  message,
  notification,
} from 'antd';
import globalConfig from '../../../utils/config';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

class QueryForm extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  /**
   * 将schema解析为对应的antd组件
   * @param schema
   */
  parse(schema) {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    }
    const formItemCols = []
    schema.forEach((field, index) => {
      let formItemCol

      switch (field.showType) {
        case 'input':
        case 'cascader':
        case 'between':
        case 'datePicker':
        case 'inputNumber':
        case 'select':
        case 'radio':
        case 'checkbox': {
          let fieldShowType = capitalizeFirstLetter(field.showType)
          let FormItemComponent = require(`./formItem/form${fieldShowType}`).default
          formItemCol = (
            <Col span={8} key={field.key}>
              <FormItemComponent field={field}
                getFieldDecorator={getFieldDecorator}
                formItemLayout={formItemLayout} />
            </Col>

          )
          break
        }

        default:
          break
      }
      if (formItemCol) {
        formItemCols.push(formItemCol)
      }
    })
    return formItemCols
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);

        // console.log(this.props.form.getFieldsValue())
        // this.props.handleSubmit()
      }
    });
  }

  /**
   * 清空表单的值
   *
   * @param e
   */
  handleReset = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
  }

  /**
   * 导出
   * @param e
   */
  handleExport = (e) => {

  }

  /**
   * 导入
   * @param info
   */
  handleImport = (info) => {
    let status = info.file.status
    let hide = message.loading('正在导入...')
    if (status === 'error') {
      hide()
      notification.error({
        message: '导入失败',
        description: '文件上传失败, 请联系管理员',
        duration: 0,
      });
    } else if (status === 'done') {
      hide()
      if (info.file.response.success) {
        notification.success({
          message: '导入成功',
          description: info.file.response.data,
          duration: 0,
        });
      } else {
        notification.error({
          message: '导入失败',
          description: `请联系管理员, 错误信息: ${info.file.response.message}`,
          duration: 0,
        });
      }
    }
  }

  render() {
    let formItemCols = this.parse(this.props.schema)
    let formItemRow = <Row gutter={40}>{formItemCols}</Row>
    let { tableConfig, tableName } = this.props
    // 上传相关配置
    const uploadProps = {
      name: 'file',
      action: `${globalConfig.getAPIPath()}/${tableName}/import`,
      showUploadList: false,
      onChange: this.handleImport,
    };

    return (
      <Form layout='horizontal' onSubmit={this.handleSubmit}>
        {formItemRow}
        <Row>
          <Col span={12} offset={12} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
            <Button onClick={this.handleReset}><Icon type="cross" />清除条件</Button>
            {
              tableConfig.showExport &&
              <Button onClick={this.handleExport}><Icon type="export" />导出</Button>
            }
            {
              tableConfig.showImport &&
              <Upload {...uploadProps}><Button><Icon type="upload" />导入</Button></Upload>
            }
          </Col>
        </Row>

      </Form>
    );
  }
}

QueryForm.propTypes = {
  tableName: PropTypes.string,
  tableConfig: PropTypes.object,
  schema: PropTypes.array,
  form: PropTypes.object,
};
QueryForm.defaultProps = {};

export default Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      username: {
        ...props.username,
        value: props.username.value.toUpperCase(),
      },
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})(QueryForm);
