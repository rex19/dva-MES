
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/app/index';
import './utils/index.js';  // 引入各种prototype辅助方法
// import Login from './containers/login/index';
import TableComponents from './containers/tableComponents/index';
import Test from './containers/test/index';
import Welcome from './containers/welcome/index';
import NotFoundPage from './containers/notFoundPage/index';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Welcome} />
    <Route path="welcome" component={Welcome} />

    <Route path="tableComponents" component={TableComponents} />
    <Route path="test" component={Test} />
    <Route path="*" component={NotFoundPage} />

  </Route>
)
