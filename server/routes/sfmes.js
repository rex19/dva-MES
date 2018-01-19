var express = require('express');
var router = express.Router();
var axios = require('axios')
var qs = require('qs')

let token = ''

router.get('/', function (req, res, next) {
  console.log('/ get/')
  res.send('SF-MES');
});


router.post('/token', function (req, res, next) {
  axios({
    method: 'post',
    // url: 'http://dsm.smart-flow.cn:7002/sfmes/token',
    url: 'http://localhost:3009/sfmes/mockToken',
    // data: qs.stringify({
    //   grant_type: "password",
    //   UserName: "123",
    //   password: "1"
    // }),
    data: {
      grant_type: "password",
      UserName: "123",
      password: "1"
    },
    timeout: 30000,
    headers: {
      "Content-Type": "application/json"
    },
  }).then(function (response) {
    return response.data;
  }).then(function (responseData) {
    console.log(responseData);
    token = `Bearer ${responseData.access_token}`
    res.send(responseData);
  }).catch(function (error) {
    res.send('error', error);
  });

});


router.post('/product', function (req, res, next) {
  console.log('token=', token)
  axios({
    method: 'post',
    // url: 'http://192.168.1.252/sfmes/api/products/GetTByCondition',
    url: 'http://localhost:3009/sfmes/api/products/GetTByCondition',
    data: {
      "PageIndex": 1,
      "PageSize": 10,
      "TDto": null
    },
    timeout: 30000,
    headers: {
      "Authorization": token,
      "Content-Type": "application/json"
    },
  }).then(function (response) {
    return response.data;
  }).then(function (responseData) {
    console.log(responseData);
    res.send(responseData);
  }).catch(function (error) {
    res.send('error', error);
  });
});


//模拟后端
router.post('/mockToken', function (req, res, next) {
  console.log('/ mockToken')
  res.send({
    "access_token": "zk112cr8Yl9EnF9HgsuO0ieo7Ngnu2u4PFRsJBjDIMfQtfG8qNv9wdXXmFJ5lR7Z6vhPlo-zhnT8f8aPyAMjCsclnKtY-x6wQUud15C9CVq2T1c8krRROZBSiitac5WYu_-dAeG523SoggH4DS3oOi3kIg4VbOf0p7IK988Y4TSzEtq9IiSkH286CAAtsSrK7bBUCxl92kX9V_0uwk3xpE6kZH2Rb0E2NwXdyzc5cnk",
    "token_type": "bearer",
    "expires_in": 86399
  });
});

router.post('/api/products/GetTByCondition', function (req, res, next) {
  console.log('token=', token)
  res.send({
    "success": true,
    "Status": 200,
    "Data": {
      "RowCount": 1,
      "Tdto": [
        {
          "Id": 1,
          "CellNumber": "sample string 2",
          "Description": "sample string 3",
          "State": 4,
          "Creator": 5,
          "CreationDateTime": "2017-12-12T16:07:43.0335875+08:00",
          "EditDateTime": "2017-12-12T16:07:43.0335875+08:00",
          "EditorId": 8
        },
        {
          "Id": 1,
          "CellNumber": "sample string 2",
          "Description": "sample string 3",
          "State": 4,
          "Creator": 5,
          "CreationDateTime": "2017-12-12T16:07:43.0335875+08:00",
          "EditDateTime": "2017-12-12T16:07:43.0335875+08:00",
          "EditorId": 8
        }
      ]
    },
    "ErrorMessage": null
  })
});


module.exports = router;