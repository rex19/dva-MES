var express = require('express');
var router = express.Router();
var globalConfig = require('../utils/config.js');
var axios = require('axios')
var qs = require('qs')
const querystring = require('querystring')

router.get('/', function (req, res, next) {
  res.send('sfpfsfis');
});


//工单查询初始化数据
// http://192.168.1.252/SFPFSFIS/api/WorkOrder/GetTListByCondition
router.get('/WorkOrder/GetWorkOrderListInitial', function (req, res, next) {
  console.log('http://192.168.1.252/SFPFSFIS/api/WorkOrder/GetWorkOrderListInitial', globalConfig.WorkOrderGetTByConditionUrl)
  var options = {
    method: 'GET',
    url: globalConfig.GetWorkOrderListInitialUrl,
  }

  axios(options)
    .then((response) => {
      return response.data
    }).then((responseData) => {
      res.json(responseData)
    }).catch((error) => {
      console.log(error)
    })
});
//工单list
// http://192.168.1.252/SFPFSFIS/api/WorkOrder/GetTListByCondition
router.post('/WorkOrder/GetTListByCondition', function (req, res, next) {
  console.log('http://192.168.1.252/SFPFSFIS/api/WorkOrder/GetWorkOrderListByCondition', globalConfig.WorkOrderGetTByConditionUrl)
  var options = {
    method: 'POST',
    url: globalConfig.WorkOrderGetTByConditionUrl,
    headers:
    {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: querystring.stringify({
      "PageSize": 10,
      "PageNumber": 1,
      "WorkOrderNumber": "123",
      "PlannedStartDateTime": "2018-10-10 08:08:00",
      "PlannedEndDateTime": "2018-10-10 08:08:00",
      "ShiftName": "123",
      "LineName": "123",
      "WorkOrderState": 1
    })
  }

  axios(options)
    .then((response) => {
      return response.data
    }).then((responseData) => {
      res.json(responseData)
    }).catch((error) => {
      console.log(error)
    })
});



//创建工单界面  获取初始化数据
// http://192.168.1.252/SFPFSFIS/api/WorkOrder/GetLineListAndShiftListForCreateWorkOrder
router.get('/WorkOrder/GetLineListAndShiftListForCreateWorkOrder', function (req, res, next) {
  console.log('http://192.168.1.252/SFPFSFIS/api/WorkOrder/GetLineListAndShiftListForCreateWorkOrder', globalConfig.GetLineListAndShiftListForCreateWorkOrderUrl)
  var options = {
    method: 'GET',
    url: globalConfig.GetLineListAndShiftListForCreateWorkOrderUrl,
  }
  axios(options)
    .then((response) => {
      return response.data
    }).then((responseData) => {
      res.json(responseData)
    }).catch((error) => {
      console.log(error)
    })
});
//创建工单界面  通过输入物料号和版本号查询获取部件列表
// http://192.168.1.252/SFPFSFIS/api/WorkOrder/GetPartInformationListForCreateWorkOrder
router.post('/WorkOrder/GetPartInformationListForCreateWorkOrder', function (req, res, next) {
  console.log('http://192.168.1.252/SFPFSFIS/api/WorkOrder/GetPartInformationListForCreateWorkOrder', globalConfig.GetPartInformationListForCreateWorkOrderUrl)
  var options = {
    method: 'POST',
    url: globalConfig.GetPartInformationListForCreateWorkOrderUrl,
    headers:
    {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: querystring.stringify({
      "MaterialNumber": "sample string 1",
      "Version": 2
    })
  }
  axios(options)
    .then((response) => {
      return response.data
    }).then((responseData) => {
      res.json(responseData)
    }).catch((error) => {
      console.log(error)
    })
});
//创建工单页面-通过部件Id找到工艺列表
// http://192.168.1.252/SFPFSFIS/api/WorkOrder/GetProcessListForCreateWorkOrder?workOrderId=1
router.post('/WorkOrder/GetProcessListForCreateWorkOrder', function (req, res, next) {
  console.log('http://192.168.1.252/SFPFSFIS/api/WorkOrder/GetProcessListForCreateWorkOrder', globalConfig.GetProcessListForCreateWorkOrderUrl)
  var options = {
    method: 'POST',
    url: globalConfig.GetProcessListForCreateWorkOrderUrl,
    headers:
    {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: querystring.stringify({
      "MaterialNumber": "sample string 1",
      "Version": 2
    })
  }
  axios(options)
    .then((response) => {
      return response.data
    }).then((responseData) => {
      res.json(responseData)
    }).catch((error) => {
      console.log(error)
    })
});

//创建工单页面-创建工单
// http://192.168.1.252/SFPFSFIS/api/WorkOrder/CreateWorkOrder
router.post('/WorkOrder/CreateWorkOrder', function (req, res, next) {
  console.log('http://192.168.1.252/SFPFSFIS/api/WorkOrder/CreateWorkOrder', globalConfig.CreateWorkOrderUrl)
  var options = {
    method: 'POST',
    url: globalConfig.CreateWorkOrderUrl,
    headers:
    {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: querystring.stringify({
      "PartId": 1,
      "ProcessId": 2,
      "WorkOrderNumber": "sample string 3",
      "Quantity": 4.0,
      "LineName": "sample string 5",
      "ShiftName": "sample string 6",
      "CycleTimeInTheory": 7.0,
      "OEEInTheory": 8.0,
      "PlanStartDateTime": "2018-02-28T15:53:26.8912429+08:00",
      "PlanEndDateTime": "2018-02-28T15:53:26.8912429+08:00",
      "Comment": "sample string 11",
      "CreatorId": 12
    })
  }
  axios(options)
    .then((response) => {
      return response.data
    }).then((responseData) => {
      res.json(responseData)
    }).catch((error) => {
      console.log(error)
    })
});

//创建工单页面-根据线体名和产品获取基准节拍和OEE
router.post('/WorkOrder/GetBaseLineInformation', function (req, res, next) {
  console.log('http://192.168.1.252/SFPFSFIS/api/WorkOrder/GetBaseLineInformation', globalConfig.GetBaseLineInformationUrl)
  var options = {
    method: 'POST',
    url: globalConfig.GetBaseLineInformationUrl,
    headers:
    {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: querystring.stringify({
      "PartNumber": "sample string 1",
      "LineName": "sample string 2"
    })
  }
  axios(options)
    .then((response) => {
      return response.data
    }).then((responseData) => {
      res.json(responseData)
    }).catch((error) => {
      console.log(error)
    })
});


//修改工单页面-获取单个工单信息用于修改页面显示
router.post('/WorkOrder/GetWorkOrderInformationForEdit', function (req, res, next) {
  console.log('http://192.168.1.252/SFPFSFIS/api/WorkOrder/GetWorkOrderInformationForEdit?input=1', globalConfig.GetWorkOrderInformationForEditUrl)
  var options = {
    method: 'POST',
    url: globalConfig.GetWorkOrderInformationForEditUrl,
    headers:
    {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: {}
  }
  axios(options)
    .then((response) => {
      return response.data
    }).then((responseData) => {
      res.json(responseData)
    }).catch((error) => {
      console.log(error)
    })
});
//修改工单页面-修改工单
router.post('/WorkOrder/EditWorkOrder', function (req, res, next) {
  console.log('http://192.168.1.252/SFPFSFIS/api/WorkOrder/EditWorkOrder', globalConfig.EditWorkOrderUrl)
  var options = {
    method: 'POST',
    url: globalConfig.EditWorkOrderUrl,
    headers:
    {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: querystring.stringify({
      "PartId": 1,
      "PartNumber": "sample string 2",
      "Version": 3,
      "WorkOrderNumber": "sample string 4",
      "WorkOrderState": 5,
      "Quantity": 6.0,
      "LineName": "sample string 7",
      "ShiftName": "sample string 8",
      "PlanStartDateTime": "2018-03-01T19:32:24.7171409+08:00",
      "PlanEndDateTime": "2018-03-01T19:32:24.7171409+08:00",
      "Comment": "sample string 11",
      "CreatorId": 12
    })
  }
  axios(options)
    .then((response) => {
      return response.data
    }).then((responseData) => {
      res.json(responseData)
    }).catch((error) => {
      console.log(error)
    })
});


//激活工单页面-获取生产线列表
router.get('/workOrderActivation/GetAllLineNamesForActiveWorkOrderCombox', function (req, res, next) {
  console.log('http://192.168.1.252/SFPFSFIS/api/WorkOrder/GetAllLineNamesForActiveWorkOrderCombox', globalConfig.GetAllLineNamesForActiveWorkOrderComboxUrl)
  var options = {
    method: 'GET',
    url: globalConfig.GetAllLineNamesForActiveWorkOrderComboxUrl,
  }
  axios(options)
    .then((response) => {
      return response.data
    }).then((responseData) => {
      res.json(responseData)
    }).catch((error) => {
      console.log(error)
    })
});
//激活工单页面-刷新获取当前激活工站的状态
router.get('/workOrderActivation/GetActivedWorkOrderListOfLine', function (req, res, next) {
  console.log('http://192.168.1.252/SFPFSFIS/api/WorkOrder/GetActivedWorkOrderListOfLine?lineName=1', globalConfig.GetActivedWorkOrderListOfLineUrl)
  var options = {
    method: 'GET',
    url: globalConfig.GetActivedWorkOrderListOfLineUrl,
  }
  axios(options)
    .then((response) => {
      return response.data
    }).then((responseData) => {
      res.json(responseData)
    }).catch((error) => {
      console.log(error)
    })
});
//激活工单页面-获取可选工单列表
router.get('/workOrderActivation/GetWorkOrderListForActive', function (req, res, next) {
  console.log('http://192.168.1.252/SFPFSFIS/api/WorkOrder/GetWorkOrderListForActive?lineName=1', globalConfig.GetWorkOrderListForActiveUrl)
  var options = {
    method: 'GET',
    url: globalConfig.GetWorkOrderListForActiveUrl,
  }
  axios(options)
    .then((response) => {
      return response.data
    }).then((responseData) => {
      res.json(responseData)
    }).catch((error) => {
      console.log(error)
    })
});
//激活工单页面-激活工单
router.post('/workOrderActivation/ActiveWorkOrderToLine', function (req, res, next) {
  console.log('http://192.168.1.252/SFPFSFIS/api/WorkOrder/ActiveWorkOrderToLine', globalConfig.ActiveWorkOrderToLineUrl)
  var options = {
    method: 'POST',
    url: globalConfig.ActiveWorkOrderToLineUrl,
    headers:
    {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: querystring.stringify({
      "WorkOrderId": 1,
      "WorkOrderNumber": "sample string 2",
      "LineName": "sample string 3"
    })
  }
  axios(options)
    .then((response) => {
      return response.data
    }).then((responseData) => {
      res.json(responseData)
    }).catch((error) => {
      console.log(error)
    })
});
//设置情况页面-获取工位列表给Combox
router.get('/workOrder/GetStationInformationForSetupInformation', function (req, res, next) {
  console.log('http://192.168.1.252/SFPFSFIS/api/WorkOrder/GetStationInformationForSetupInformation', globalConfig.GetStationInformationForSetupInformationUrl)
  var options = {
    method: 'GET',
    url: globalConfig.GetStationInformationForSetupInformationUrl,
  }
  axios(options)
    .then((response) => {
      return response.data
    }).then((responseData) => {
      res.json(responseData)
    }).catch((error) => {
      console.log(error)
    })
});
//设置情况页面-更具工单号和站位号获取物料设置列表
router.post('/workOrder/GetSetupActivationInformationByWorkOrderAndStationNumber', function (req, res, next) {
  console.log('http://192.168.1.252/SFPFSFIS/api/WorkOrder/GetSetupActivationInformationByWorkOrderAndStationNumber', globalConfig.GetSetupActivationInformationByWorkOrderAndStationNumberUrl)
  var options = {
    method: 'POST',
    url: globalConfig.GetSetupActivationInformationByWorkOrderAndStationNumberUrl,
    headers:
    {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: querystring.stringify({
      "WorkOrderNumber": "sample string 1",
      "StationNumber": "sample string 2"
    })
  }
  axios(options)
    .then((response) => {
      return response.data
    }).then((responseData) => {
      res.json(responseData)
    }).catch((error) => {
      console.log(error)
    })
});

//生产效率页面-更具工单号获取此工单生产效率
router.get('/workOrder/GetWorkOrderPerformanceData', function (req, res, next) {
  console.log('http://192.168.1.252/SFPFSFIS/api/WorkOrder/GetWorkOrderPerformanceData?workOrderNumber=1', globalConfig.GetWorkOrderPerformanceDataUrl)
  var options = {
    method: 'GET',
    url: globalConfig.GetWorkOrderPerformanceDataUrl,
  }
  axios(options)
    .then((response) => {
      return response.data
    }).then((responseData) => {
      res.json(responseData)
    }).catch((error) => {
      console.log(error)
    })
});





//工单激活  ???
//http://192.168.1.252/SFPFSFIS/api/WorkOrder/GetSetupActivationInformationByWorkOrderAndStationNumber
// router.post('/workOrderActivation/GetSetupActivationInformationByWorkOrderAndStationNumber', function (req, res, next) {
//   console.log('http://192.168.1.252/SFPFSFIS/api/WorkOrder/GetSetupActivationInformationByWorkOrderAndStationNumber', globalConfig.GetSetupActivationInformationByWorkOrderAndStationNumber)
//   var options = {
//     method: 'POST',
//     url: globalConfig.GetSetupActivationInformationByWorkOrderAndStationNumber,
//     headers:
//     {
//       'content-type': 'application/x-www-form-urlencoded'
//     },
//     data: querystring.stringify({
//       "WorkOrderNumber": "sample string 1",
//       "StationNumber": "sample string 2"
//     })
//   }
//   axios(options)
//     .then((response) => {
//       return response.data
//     }).then((responseData) => {
//       res.json(responseData)
//     }).catch((error) => {
//       console.log(error)
//     })
// });

module.exports = router;
