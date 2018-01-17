
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app/index';
import './utils/index.js';  // 引入各种prototype辅助方法
// import Login from './containers/login/index';
import TableComponents from './containers/tableComponents/index';
import Test from './containers/test/index';
import Welcome from './containers/welcome/index';
import NotFoundPage from './containers/notFoundPage/index';

// 将DBTable组件做成动态路由, 减小bundle size
// 注意不要再import DBTable了, 不然就没意义了
// 一些比较大/不常用的组件, 都可以考虑做成动态路由
// const DBTableContainer = (location, cb) => {
//   require.ensure([], require => {
//     cb(null, require('./components/DBTable').default)
//   }, 'DBTable');
// };

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Welcome} />
    <Route path="welcome" component={Welcome} />

    <Route path="tableComponents" component={TableComponents} />
    <Route path="test" component={Test} />
    <Route path="*" component={NotFoundPage} />

  </Route>
)

// <Route path="index">
// <Route path="option1" tableName="test" getComponent={DBTableContainer} />
// <Route path="option2" tableName="testSms" getComponent={DBTableContainer} />
// <Route path="option3" tableName="testAction" getComponent={DBTableContainer} />
// </Route>
