import React, { Component } from 'react';
import { BackTop } from 'antd';
import globalConfig from '../../utils/config';
import './footer.less';

export default class Footer extends Component {
  render() {
    const text = globalConfig.footer || 'footer没了!';
    return (

      <div >
        <BackTop target={() => document.getElementById('main-content-div')} />
        <div className="ant-layout-footer" dangerouslySetInnerHTML={{ __html: text }} />
      </div>
    );
  }
}
