var express = require('express');
var router = express.Router();
var axios = require('axios')
var qs = require('qs')

router.get('/', function (req, res, next) {
  console.log('/ get/')
  res.send('SFMESWMS');
});

router.post('/api/MaterialReceiving/GetTByCondition', function (req, res, next) {
  console.log('/api/MaterialReceiving/GetTByCondition', req.body)
  res.send({
    "Status": 200,
    "Data": {
      "RowCount": 5,
      "Tdto": [
        {
          "Id": 5,
          "FormNumber": "FORM_MR000001",
          "PurchaseOrderNumber": "MO000001",
          "State": 2,
          "StateName": "已入库",
          "CreationDateTime": "2017-12-18T17:10:00",
          "CreatorUserName": "test1129"
        },
        {
          "Id": 6,
          "FormNumber": "FORM_MR000002",
          "PurchaseOrderNumber": "MO000002",
          "State": 1,
          "StateName": "已打印",
          "CreationDateTime": "2017-12-18T17:10:00",
          "CreatorUserName": "test1129"
        },
        {
          "Id": 7,
          "FormNumber": "FORM_MR000003",
          "PurchaseOrderNumber": "MO000003",
          "State": 1,
          "StateName": "已打印",
          "CreationDateTime": "2017-12-18T17:10:00",
          "CreatorUserName": "test1129"
        },
        {
          "Id": 8,
          "FormNumber": "FORM_MR000004",
          "PurchaseOrderNumber": "MO000004",
          "State": 0,
          "StateName": "未注册",
          "CreationDateTime": "2017-12-18T17:10:00",
          "CreatorUserName": "test1129"
        },
        {
          "Id": 9,
          "FormNumber": "FORM_MR000005",
          "PurchaseOrderNumber": "MO000005",
          "State": 0,
          "StateName": "未注册",
          "CreationDateTime": "2017-12-18T17:10:00",
          "CreatorUserName": "test1129"
        }
      ]
    },
    "ErrorMessage": null
  });
});


module.exports = router;