import React, { Component } from 'react';
import {
  Icon, Row,
  Col,
  Button,
  // message,
  Upload,
  // notification
} from 'antd';
import FormComponent from './formComponent';


export default class TableInnerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <div className="ant-advanced-search-form">
          <FormComponent />

          <Row>
            <Col span={12} offset={12} style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={this.handleSubmit}><Icon type="search" />查询</Button>
              <Button onClick={this.handleReset}><Icon type="cross" />清除条件</Button>
              <Button onClick={this.handleExport}><Icon type="export" />导出</Button>
              <Upload ><Button><Icon type="upload" />导入</Button></Upload>

            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
