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
      models: () => [import('./models/PFS_FIS_System/workOrderSetting')],
      component: () => import('./routes/PFS_FIS_System/workOrderSetting/'),
    }, {  //SF_PFS_Trace
      path: '/SF_PFS_Trace/TracePartByStation',
      models: () => [import('./models/SF_PFS_Trace/TracePartByStation')],
      component: () => import('./routes/SF_PFS_Trace/TracePartByStation/'),
    }, {
      path: '/SF_PFS_Trace/PartProcessRecord', //工件过站记录
      models: () => [import('./models/SF_PFS_Trace/PartProcessRecord')],
      component: () => import('./routes/SF_PFS_Trace/PartProcessRecord/'),
    }, {
      path: '/SF_PFS_Trace/PartFailureRecord',
      models: () => [import('./models/SF_PFS_Trace/PartFailureRecord')],
      component: () => import('./routes/SF_PFS_Trace/PartFailureRecord/'),
    }, {
      path: '/SF_PFS_Trace/PartRepairRecord',
      models: () => [import('./models/SF_PFS_Trace/PartRepairRecord')],
      component: () => import('./routes/SF_PFS_Trace/PartRepairRecord/'),
    }, {
      path: '/SF_PFS_Trace/PartMergeRecord',
      models: () => [import('./models/SF_PFS_Trace/PartMergeRecord')],
      component: () => import('./routes/SF_PFS_Trace/PartMergeRecord/'),
    }, {
      path: '/SF_PFS_Trace/PartAttributeRecord',
      models: () => [import('./models/SF_PFS_Trace/PartAttributeRecord')],
      component: () => import('./routes/SF_PFS_Trace/PartAttributeRecord/'),
    }, {
      path: '/SF_PFS_Trace/PartMaterialRecord',
      models: () => [import('./models/SF_PFS_Trace/PartMaterialRecord')],
      component: () => import('./routes/SF_PFS_Trace/PartMaterialRecord/'),
    }, {
      path: '/SF_PFS_Trace/TracePartByMaterial',
      models: () => [import('./models/SF_PFS_Trace/TracePartByMaterial')],
      component: () => import('./routes/SF_PFS_Trace/TracePartByMaterial/'),
    }, {
      path: '/SF_PFS_Trace/TracePartByFinishGoodBoxNumber',
      models: () => [import('./models/SF_PFS_Trace/TracePartByFinishGoodBoxNumber')],
      component: () => import('./routes/SF_PFS_Trace/TracePartByFinishGoodBoxNumber/'),
    }, {
      path: '/SF_PFS_Trace/TracePartByWorkOrder',
      models: () => [import('./models/SF_PFS_Trace/TracePartByWorkOrder')],
      component: () => import('./routes/SF_PFS_Trace/TracePartByWorkOrder/'),
    }, { //通过属性追溯
      path: '/SF_PFS_Trace/TraceabilityByPartAttribute',
      models: () => [import('./models/SF_PFS_Trace/TraceabilityByPartAttribute')],
      component: () => import('./routes/SF_PFS_Trace/TraceabilityByPartAttribute/'),
    }, {
      path: '/SF_PFS_Trace/TraceabilityByWorkOrderAttribute',
      models: () => [import('./models/SF_PFS_Trace/TraceabilityByWorkOrderAttribute')],
      component: () => import('./routes/SF_PFS_Trace/TraceabilityByWorkOrderAttribute/'),
    }, {
      path: '/SF_PFS_Trace/TraceabilityByContainerAttribute',
      models: () => [import('./models/SF_PFS_Trace/TraceabilityByContainerAttribute')],
      component: () => import('./routes/SF_PFS_Trace/TraceabilityByContainerAttribute/'),
    }, {
      path: '/SF_PFS_Trace/TraceBoxByDeliveryNote',
      models: () => [import('./models/SF_PFS_Trace/TraceBoxByDeliveryNote')],
      component: () => import('./routes/SF_PFS_Trace/TraceBoxByDeliveryNote/'),
    }, {
      path: '/SF_PFS_Trace/TraceMachineAbnormalRecord',
      models: () => [import('./models/SF_PFS_Trace/TraceMachineAbnormalRecord')],
      component: () => import('./routes/SF_PFS_Trace/TraceMachineAbnormalRecord/'),
    }, {
      path: '/SF_PFS_Trace/TraceMaterialSetupRecord',
      models: () => [import('./models/SF_PFS_Trace/TraceMaterialSetupRecord')],
      component: () => import('./routes/SF_PFS_Trace/TraceMaterialSetupRecord/'),
    }, {
      //
      path: '/SF_ToolingManagement/ToolingInfo',
      models: () => [import('./models/SF_ToolingManagement/ToolingInfo')],
      component: () => import('./routes/SF_ToolingManagement/ToolingInfo/'),
    }, {
      path: '/SF_ToolingManagement/ToolingType',
      models: () => [import('./models/SF_ToolingManagement/ToolingType')],
      component: () => import('./routes/SF_ToolingManagement/ToolingType/'),
    }, {
      path: '/SF_ToolingManagement/ToolingLifeRule',
      models: () => [import('./models/SF_ToolingManagement/ToolingLifeRule')],
      component: () => import('./routes/SF_ToolingManagement/ToolingLifeRule/'),
    }, {
      path: '/SF_ToolingManagement/ProgramToolSetting',
      models: () => [import('./models/SF_ToolingManagement/ProgramToolSetting')],
      component: () => import('./routes/SF_ToolingManagement/ProgramToolSetting/'),
    }, {
      path: '/SF_ToolingManagement/CurrentToolingCondition',
      models: () => [import('./models/SF_ToolingManagement/CurrentToolingCondition')],
      component: () => import('./routes/SF_ToolingManagement/CurrentToolingCondition/'),
    }
    //ecall
    , {
      path: '/Ecall/ElectronicCallBoard',
      models: () => [import('./models/Ecall/ElectronicCallBoard')],
      component: () => import('./routes/Ecall/ElectronicCallBoard/'),
    }, {
      path: '/Ecall/CreatProductionInitialOrderBlank',
      models: () => [import('./models/Ecall/CreatProductionInitialOrderBlank')],
      component: () => import('./routes/Ecall/CreatProductionInitialOrderBlank/'),
    }, {
      path: '/Ecall/CreatOrderBlank',
      models: () => [import('./models/Ecall/CreatOrderBlank')],
      component: () => import('./routes/Ecall/CreatOrderBlank/'),
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
