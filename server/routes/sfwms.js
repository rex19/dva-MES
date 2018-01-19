var express = require('express');
var router = express.Router();
var globalConfig = require('../utils/config.js');
var axios = require('axios')
var qs = require('qs')
const querystring = require('querystring')

router.get('/', function (req, res, next) {
  res.send('sfwms1');
});


const requestAjax = (url, params) => {
  if (params == null) {
    console.log('request  if (params == null) {')
    var options = {
      method: 'GET',
      url: url,
    }
    axios(options)
      .then((response) => {
        return response.data
      }).then((responseData) => {
        // res.json(responseData)
        return responseData
      }).catch((error) => {
        console.log(error)
      })
  } else {
    console.log('request  if (params != null) {')
    var options = {
      method: 'POST',
      url: url,
      headers:
      {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: querystring.stringify(params)
    }
    axios(options)
      .then((response) => {
        return response.data
      }).then((responseData) => {
        // res.json(responseData)
        return responseData
      }).catch((error) => {
        console.log(error)
      })
  }
}


//容器
//http://192.168.1.252/sfmeswms/Api/Container/GetTByCondition
router.post('/Container/GetTByCondition', function (req, res, next) {
  console.log('/Container/GetTByCondition', globalConfig.ContainerGetTByConditionUrl)
  var options = {
    method: 'POST',
    url: globalConfig.ContainerGetTByConditionUrl,
    headers:
    {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: querystring.stringify({
      PageIndex: 1,
      PageSize: 10,
      TDto: null
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


//http://192.168.1.252/sfmeswms/api/MovementRecord/GetMovementRecordByContainer/?containerId=14
router.get('/Container/GetMovementRecordByContainer', function (req, res, next) {

  var options = {
    method: 'GET',

    url: `${globalConfig.ContainerGetMovementRecordByContainerUrl}${req.query.containerId}`,
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






//成品箱
//http://192.168.1.252/sfmeswms/Api/Container/GetTByCondition  同容器第一个api
router.post('/PackingFlag/GetTByCondition', function (req, res, next) {
  console.log('/PackingFlag/GetTByCondition', req.body)
  var options = {
    method: 'POST',
    url: globalConfig.ContainerGetTByConditionUrl,
    headers:
    {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: querystring.stringify({
      PageIndex: 1,
      PageSize: 10,
      TDto: null,
      PackingFlag: 1
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
//http://192.168.1.252/sfmeswms/api/MovementRecord/GetMovementRecordByContainer/
router.get('/PackingFlag/GetMovementRecordByContainer', function (req, res, next) {
  console.log('/PackingFlag/GetMovementRecordByContainer', req.query)

  var options = {
    method: 'GET',
    url: `${globalConfig.GetPackingMovementRecordByContainerUrl}${req.query.containerId}`,
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

//http://192.168.1.252/sfmeswms/api/PackingInformation/GetPackingInformatioByContainer/?containerId=10106
router.get('/PackingFlag/GetPackingInformatioByContainer', function (req, res, next) {
  console.log('/PackingFlag/GetPackingInformatioByContainer', req.query)
  var options = {
    method: 'GET',
    url: `${globalConfig.GetPackingInformatioByContainerUrl}${req.query.containerId}`,
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


//销售出库单
//http://192.168.1.252/sfmeswms/Api/ProductDeliveryRequest/GetTByCondition
router.post('/ProductDeliveryRequest/GetTByCondition', function (req, res, next) {
  console.log('/ProductDeliveryRequest/GetTByCondition', req.body)
  var options = {
    method: 'POST',
    url: globalConfig.ProductDeliveryRequestGetTByConditionUrl,
    headers:
    {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: querystring.stringify({
      PageIndex: 1,
      PageSize: 10,
      TDto: null,
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


//http://192.168.1.252/api/ProductDeliveryRequest/GetProductDeliveryRequestFormItemByFormIdForList?productDeliveryRequestFormId=1
router.get('/ProductDeliveryRequest/GetProductDeliveryRequestFormItemByFormIdForListUrl', function (req, res, next) {
  console.log('/ProductDeliveryRequest/GetProductDeliveryRequestFormItemByFormIdForListUrl', req.query)
  var options = {
    method: 'GET',
    url: `${globalConfig.GetProductDeliveryRequestFormItemByFormIdForListUrl}${req.query.productDeliveryRequestFormId}`,
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

//http://192.168.1.252/api/MovementRecord/GetMovementRecordProductDeliveryRequestByWMSFormId/?WMSFormId=16&formItemNumber=1
router.get('/ProductDeliveryRequest/GetMovementRecordProductDeliveryRequestByWMSFormIdUrl', function (req, res, next) {
  console.log('/ProductDeliveryRequest/GetMovementRecordProductDeliveryRequestByWMSFormIdUrl', req.query)
  var options = {
    method: 'GET',
    url: `${globalConfig.GetMovementRecordProductDeliveryRequestByWMSFormIdUrl}${req.query.WMSFormId}&formItemNumber=${req.query.formItemNumber}`,
    // url: `http://192.168.1.252/sfmeswms/api/MovementRecord/GetMovementRecordProductDeliveryRequestByWMSFormId/?WMSFormId=16&formItemNumber=1`,
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

//原材料收货单  --url问题
//http://192.168.1.252/sfmeswms/Api/MaterialReceiving/GetTByCondition
router.post('/MaterialReceiving/GetTByCondition', function (req, res, next) {
  console.log('/MaterialReceiving/GetTByCondition', req.body)
  var options = {
    method: 'POST',
    url: globalConfig.MaterialReceivingGetTByConditionUrl,
    // url: 'http://192.168.1.252/sfmeswms/Api/MaterialReceiving/GetTByCondition',
    headers:
    {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: querystring.stringify({
      PageIndex: 1,
      PageSize: 10,
      TDto: null,
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

//http://192.168.1.252/sfmeswms/api/MaterialReceiving/GetMaterialReceivingFormItemByFormIdForList?materialReceivingFormId=8
router.get('/MaterialReceiving/GetMaterialReceivingFormItemByFormIdForList', function (req, res, next) {
  console.log('/MaterialReceiving/GetMaterialReceivingFormItemByFormIdForList', req.query)
  var options = {
    method: 'GET',
    // url: 'http://192.168.1.252/sfmeswms/api/MaterialReceiving/GetMaterialReceivingFormItemByFormIdForList?materialReceivingFormId=8'
    url: `${globalConfig.GetMaterialReceivingFormItemByFormIdForListUrl}${req.query.materialReceivingFormId}`,
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


//http://192.168.1.252/sfmeswms/api/MaterialReceiving/GetContainerGenerateRecordByFormItemNumberForList?materialReceivingFormId=8&materialReceivingFormItemNumber=3
router.get('/MaterialReceiving/GetContainerGenerateRecordByFormItemNumberForList', function (req, res, next) {
  console.log('/MaterialReceiving/GetContainerGenerateRecordByFormItemNumberForList', req.query)
  var options = {
    method: 'GET',
    // url: 'http://192.168.1.252/sfmeswms/api/MaterialReceiving/GetContainerGenerateRecordByFormItemNumberForList?materialReceivingFormId=8&materialReceivingFormItemNumber=3',
    url: `${globalConfig.GetContainerGenerateRecordByFormItemNumberForListUrl}${req.query.materialReceivingFormId}&materialReceivingFormItemNumber=${req.query.materialReceivingFormItemNumber}`,
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



//生产物料领用单 
//http://192.168.1.252/sfmeswms/Api/MaterialPicking/GetTByCondition
router.post('/ProductionMaterialCollarOrder/GetTByCondition', function (req, res, next) {
  console.log('/productionMaterialCollarOrder/GetTByCondition', req.body)
  var options = {
    method: 'POST',
    url: globalConfig.MaterialPickingGetTByConditionUrl,
    // url: 'http://192.168.1.252/sfmeswms/Api/MaterialPicking/GetTByCondition',
    headers:
    {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: querystring.stringify({
      PageIndex: 1,
      PageSize: 10,
      TDto: null,
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


//http://192.168.1.252/sfmeswms/api/MaterialPicking/GetMaterialPickingFormItemByFormIdForList?materialPickingFormId=2
router.get('/ProductionMaterialCollarOrder/GetMaterialPickingFormItemByFormIdForList', function (req, res, next) {
  console.log('/productionMaterialCollarOrder/GetMaterialPickingFormItemByFormIdForList')
  var options = {
    method: 'GET',
    url: `${globalConfig.GetMaterialPickingFormItemByFormIdForListUrl}${req.query.materialPickingFormId}`,
    // url: `http://192.168.1.252/sfmeswms/api/MaterialPicking/GetMaterialPickingFormItemByFormIdForList?materialPickingFormId=2`,
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
//http://192.168.1.252/api/MovementRecord/GetMovementRecordProductDeliveryRequestByWMSFormId/?WMSFormId=16&formItemNumber=1
router.get('/ProductionMaterialCollarOrder/GetMovementRecordMaterialPickingByWMSFormId', function (req, res, next) {
  console.log('/productionMaterialCollarOrder/GetMovementRecordMaterialPickingByWMSFormId', req.query)
  var options = {
    method: 'GET',
    url: `${globalConfig.GetMovementRecordMaterialPickingByWMSFormIdUrl}${req.query.WMSFormId}&formItemNumber=${req.query.formItemNumber}`,
    // url: `http://192.168.1.252/sfmeswms/api/MovementRecord/GetMovementRecordMaterialPickingByWMSFormId/?WMSFormId=10&formItemNumber=1`,
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

//生产物料退料记录
//http://192.168.1.252/sfmeswms/Api/ManufacturingMaterialReturn/GetTByCondition
router.post('/ManufacturingMaterialReturn/GetTByCondition', function (req, res, next) {
  console.log('/ManufacturingMaterialReturn/GetTByCondition', req.body)

  var options = {
    method: 'POST',
    url: globalConfig.ManufacturingMaterialReturnGetTByConditionUrl,
    // url: 'http://192.168.1.252/sfmeswms/Api/ManufacturingMaterialReturn/GetTByCondition',
    headers:
    {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: querystring.stringify({
      PageIndex: 1,
      PageSize: 10,
      TDto: null,
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


//成品入库单
//http://192.168.1.252/sfmeswms/Api/ProductInStocking/GetTByCondition
router.post('/ProductInStocking/GetTByCondition', function (req, res, next) {
  console.log('/putStorageOfFinishedProduct/GetTByCondition', req.body)
  var options = {
    method: 'POST',
    url: globalConfig.ProductInStockingGetTByConditionUrl,
    // url: 'http://192.168.1.252/sfmeswms/Api/ProductInStocking/GetTByCondition',
    headers:
    {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: querystring.stringify({
      PageIndex: 1,
      PageSize: 10,
      TDto: null,
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


//http://192.168.1.252/sfmeswms/api/ProductInStocking/GetProductInStockingFormItemByFormIdForList?productInStockingFormId=1
router.get('/ProductInStocking/GetProductInStockingFormItemByFormIdForList', function (req, res, next) {
  console.log('/putStorageOfFinishedProduct/GetProductInStockingFormItemByFormIdForList2', `${globalConfig.GetProductInStockingFormItemByFormIdForListUrl}${req.query.productInStockingFormId}`, )
  var options = {
    method: 'GET',
    url: `${globalConfig.GetProductInStockingFormItemByFormIdForListUrl}${req.query.productInStockingFormId}`,
    // url: `http://192.168.1.252/sfmeswms/api/ProductInStocking/GetProductInStockingFormItemByFormIdForList?productInStockingFormId=1`,
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

//http://192.168.1.252/sfmeswms/api/MovementRecord/GetMovementRecordProductInStockingByWMSFormId/?WMSFormId=1&formItemNumber=1
router.get('/ProductInStocking/GetMovementRecordProductInStockingByWMSFormId', function (req, res, next) {
  console.log('/putStorageOfFinishedProduct/GetMovementRecordProductInStockingByWMSFormId', `${globalConfig.GetMovementRecordProductInStockingByWMSFormIdUrl}${req.query.WMSFormId}&formItemNumber=${req.query.formItemNumber}`)
  var options = {
    method: 'GET',
    url: `${globalConfig.GetMovementRecordProductInStockingByWMSFormIdUrl}${req.query.WMSFormId}&formItemNumber=${req.query.formItemNumber}`,
    // url: `http://192.168.1.252/sfmeswms/api/MovementRecord/GetMovementRecordProductInStockingByWMSFormId/?WMSFormId=1&formItemNumber=1`,
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



module.exports = router;
