import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/app'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: '/dashboard',
      models: () => [import('./models/dashboard')],
      component: () => import('./routes/dashboard/'),
    }, {
      path: '/welcome',
      // models: () => [import('./models/user')],
      component: () => import('./routes/welcome/'),
    }, {
      path: '/masterdata/stationTable',
      models: () => [import('./models/stationTable')],
      component: () => import('./routes/stationTable/'),
    }, {
      path: '/masterdata/stationGroupTable',
      models: () => [import('./models/stationGroupTable')],
      component: () => import('./routes/stationGroupTable/'),
    }, {
      path: '/masterdata/lineTable',
      models: () => [import('./models/lineTable')],
      component: () => import('./routes/lineTable/'),
    }, {
      path: '/masterdata/staffTable',
      models: () => [import('./models/staffTable')],
      component: () => import('./routes/staffTable/'),
    }, {
      path: '/masterdata/roleTable',
      models: () => [import('./models/roleTable')],
      component: () => import('./routes/roleTable/'),
    }, {
      path: '/masterdata/materielTable',
      models: () => [import('./models/materielTable')],
      component: () => import('./routes/materielTable/'),
    }, {
      path: '/masterdata/processTable',
      models: () => [import('./models/processTable')],
      component: () => import('./routes/processTable/'),
    }, {
      path: '/masterdata/regionTable',
      models: () => [import('./models/regionTable')],
      component: () => import('./routes/regionTable/'),
    }, {
      path: '/masterdata/supplierTable',
      models: () => [import('./models/supplierTable')],
      component: () => import('./routes/supplierTable/'),
    }, {
      path: '/masterdata/customerTable',
      models: () => [import('./models/customerTable')],
      component: () => import('./routes/customerTable/'),
    }, {
      path: '/masterdata/locationTable',
      models: () => [import('./models/locationTable')],
      component: () => import('./routes/locationTable/'),
    }, {
      path: '/masterdata/failureTypeTable',
      models: () => [import('./models/regionTable')],
      component: () => import('./routes/regionTable/'),
    }, {
      path: '/masterdata/bomTable',
      models: () => [import('./models/bomTable')],
      component: () => import('./routes/bomTable/'),
    }, {
      path: '/permissionManagement',
      // models: () => [import('./models/user')],
      component: () => import('./routes/permissionManagement/'),
    }, {
      path: '/user/:id',
      models: () => [import('./models/user/detail')],
      component: () => import('./routes/user/detail/'),
    }, {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./routes/login/'),
    }, {
      path: '/request',
      component: () => import('./routes/request/'),
    }, {
      path: '/UIElement/iconfont',
      component: () => import('./routes/UIElement/iconfont/'),
    }, {
      path: '/UIElement/search',
      component: () => import('./routes/UIElement/search/'),
    }, {
      path: '/UIElement/dropOption',
      component: () => import('./routes/UIElement/dropOption/'),
    }, {
      path: '/UIElement/layer',
      component: () => import('./routes/UIElement/layer/'),
    }, {
      path: '/UIElement/dataTable',
      component: () => import('./routes/UIElement/dataTable/'),
    }, {
      path: '/UIElement/editor',
      component: () => import('./routes/UIElement/editor/'),
    }, {
      path: '/chart/lineChart',
      component: () => import('./routes/chart/lineChart/'),
    }, {
      path: '/chart/barChart',
      component: () => import('./routes/chart/barChart/'),
    }, {
      path: '/chart/areaChart',
      component: () => import('./routes/chart/areaChart/'),
    }, {
      path: '/post',
      models: () => [import('./models/post')],
      component: () => import('./routes/post/'),
    }, {
      path: '/wmsSystem/rawMaterialReceipts',
      models: () => [import('./models/wmsSystem/rawMaterialReceipts')],
      component: () => import('./routes/wmsSystem/rawMaterialReceipts/'),
    }, {
      path: '/wmsSystem/workOrder',
      models: () => [import('./models/wmsSystem/workOrder')],
      component: () => import('./routes/wmsSystem/workOrder/'),
    }, {
      path: '/wmsSystem/containerInfo',
      models: () => [import('./models/wmsSystem/containerInfo')],
      component: () => import('./routes/wmsSystem/containerInfo/'),
    }, {
      path: '/wmsSystem/packingFlag',
      models: () => [import('./models/wmsSystem/packingFlag')],
      component: () => import('./routes/wmsSystem/packingFlag/'),
    }, {
      path: '/wmsSystem/productDeliveryRequest',
      models: () => [import('./models/wmsSystem/productDeliveryRequest')],
      component: () => import('./routes/wmsSystem/productDeliveryRequest/'),
    }, {
      path: '/wmsSystem/productionMaterialCollarOrder',
      models: () => [import('./models/wmsSystem/productionMaterialCollarOrder')],
      component: () => import('./routes/wmsSystem/productionMaterialCollarOrder/'),
    }, {
      path: '/wmsSystem/retreatingRecordsOfProductionMaterials',
      models: () => [import('./models/wmsSystem/retreatingRecordsOfProductionMaterials')],
      component: () => import('./routes/wmsSystem/retreatingRecordsOfProductionMaterials/'),
    }, {
      path: '/wmsSystem/putStorageOfFinishedProduct',
      models: () => [import('./models/wmsSystem/putStorageOfFinishedProduct')],
      component: () => import('./routes/wmsSystem/putStorageOfFinishedProduct/'),
    }, {
      path: '/PFS_FIS_System/workOrderList',
      models: () => [import('./models/PFS_FIS_System/workOrderList')],
      component: () => import('./routes/PFS_FIS_System/workOrderList/'),
    }, {
      path: '/PFS_FIS_System/workOrderTableList',
      models: () => [import('./models/PFS_FIS_System/workOrderTableList')],
      component: () => import('./routes/PFS_FIS_System/workOrderTableList/'),
    }, {
      path: '/PFS_FIS_System/workOrderActivation',
      models: () => [import('./models/PFS_FIS_System/workOrderActivation')],
      component: () => import('./routes/PFS_FIS_System/workOrderActivation/'),
    }, {
      path: '/PFS_FIS_System/workOrderSetting',
      models: () => [import('./models/PFS_FIS_System/workOrderActivation')],
      component: () => import('./routes/PFS_FIS_System/workOrderSetting/'),
    }
  ]

  return (
    <ConnectedRouter history={history}>
      <App>
        <Switch>
          <Route exact path="/" render={() => (<Redirect to="/welcome" />)} />
          {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
          <Route component={error} />
        </Switch>
      </App>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
