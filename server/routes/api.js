const qs = require('qs')
var express = require('express');
var router = express.Router();


// SF-MES
const EnumRoleType = {
  ADMIN: 'admin',
  DEFAULT: 'guest',
  DEVELOPER: 'developer',
}

const userPermission = {
  DEFAULT: {
    visit: ['1', '2', '21', '7', '5', '51', '52', '53', '8', '81', '82'],
    role: EnumRoleType.DEFAULT,
  },
  ADMIN: {
    role: EnumRoleType.ADMIN,
  },
  DEVELOPER: {
    role: EnumRoleType.DEVELOPER,
  },
}
const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    permissions: userPermission.ADMIN,
  }, {
    id: 1,
    username: 'guest',
    password: 'guest',
    permissions: userPermission.DEFAULT,
  }, {
    id: 2,
    username: '吴彦祖',
    password: '123456',
    permissions: userPermission.DEVELOPER,
  },
]

router.get('/v1/user', function (req, res, next) {
  const cookie = req.headers.cookie || ''
  const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' })
  const response = {}
  const user = {}
  if (!cookies.token) {
    res.status(200).send({ message: 'Not Login' })
    return
  }
  const token = JSON.parse(cookies.token)
  if (token) {
    response.success = token.deadline > new Date().getTime()
  }
  if (response.success) {
    const userItem = adminUsers.filter(_ => _.id === token.id)
    if (userItem.length > 0) {
      user.permissions = userItem[0].permissions
      user.username = userItem[0].username
      user.id = userItem[0].id
    }
  }
  response.user = user
  res.json(response)
});

router.post('/v1/user/login', function (req, res, next) {
  // res.header('Set-Cookie', 'token=%7B%22id%22%3A1%2C%22deadline%22%3A1510583603214%7D; Max-Age=900; Path=/; Expires=Sun, 12 Nov 2017 14:48:23 GMT; HttpOnly');
  // res.send({ "success": true, "message": "Ok", statusCode: 200, "other": "ok" });
  const { username, password } = req.body
  const user = adminUsers.filter(item => item.username === username)

  if (user.length > 0 && user[0].password === password) {
    const now = new Date()
    now.setDate(now.getDate() + 1)
    res.cookie('token', JSON.stringify({ id: user[0].id, deadline: now.getTime() }), {
      maxAge: 900000,
      httpOnly: true,
    })
    res.json({ success: true, message: 'Ok', Other: 'rex' })
  } else {
    res.status(400).end()
  }
});

router.get('/v1/user/logout', function (req, res, next) {
  res.clearCookie('token')
  res.status(200).end()
});

router.get('/v1/menus', function (req, res, next) {
  console.log('menus', )
  res.send(
    [{
      "id": "1", "icon": "laptop", "name": "欢迎", "route": "/welcome"
    }, {
      "id": "8", "name": "主数据管理", "icon": "database"
    }, {
      "id": "81", "bpid": "8", "mpid": "8", "name": "工作站", "icon": "windows", "route": "/masterdata/stationTable"
    }, {
      "id": "82", "bpid": "8", "mpid": "8", "name": "工作站组", "icon": "apple", "route": "/masterdata/stationGroupTable"
    }, {
      "id": "83", "bpid": "8", "mpid": "8", "name": "线体", "icon": "github", "route": "/masterdata/lineTable"
    }, {
      "id": "84", "bpid": "8", "mpid": "8", "name": "人员", "icon": "user", "route": "/masterdata/staffTable"
    }, {
      "id": "85", "bpid": "8", "mpid": "8", "name": "角色", "icon": "role", "route": "/masterdata/roleTable"
    }, {
      "id": "5", "name": "报表", "icon": "code-o"
    }, {
      "id": "51", "bpid": "5", "mpid": "5", "name": "lineChart", "icon": "line-chart", "route": "/chart/lineChart"
    }, {
      "id": "52", "bpid": "5", "mpid": "5", "name": "barChart", "icon": "bar-chart", "route": "/chart/barChart"
    }, {
      "id": "53", "bpid": "5", "mpid": "5", "name": "areaChart", "icon": "area-chart", "route": "/chart/areaChart"
    }, {
      "id": "2", "bpid": "1", "name": "工作站", "icon": "user", "route": "/masterdata/stationTable"
    }, {
      "id": "7", "bpid": "1", "name": "权限管理", "icon": "shopping-cart", "route": "/permissionManagement"
    }, {
      "id": "21", "mpid": "-1", "bpid": "2", "name": "4welcome", "route": "/welcome"
    }, {
      "id": "3", "bpid": "1", "name": "5welcome", "icon": "api", "route": "/welcome"
    }, {
      "id": "4", "bpid": "1", "name": "6welcome", "icon": "camera-o"
    }, {
      "id": "41", "bpid": "4", "mpid": "4", "name": "7welcome", "icon": "heart-o", "route": "welcome"
    }, {
      "id": "42", "bpid": "4", "mpid": "4", "name": "8welcome", "icon": "database", "route": "/welcome"
    }, {
      "id": "43", "bpid": "4", "mpid": "4", "name": "9welcome", "icon": "bars", "route": "/welcome"
    }, {
      "id": "44", "bpid": "4", "mpid": "4", "name": "10welcome", "icon": "search", "route": "/welcome"
    }, {
      "id": "45", "bpid": "4", "mpid": "4", "name": "11welcome", "icon": "edit", "route": "/welcome"
    }, {
      "id": "46", "bpid": "4", "mpid": "4", "name": "12welcome", "icon": "credit-card", "route": "/welcome"
    }, {
      "id": "6", "bpid": "1", "name": "17welcome", "icon": "setting"
    }, {
      "id": "61", "bpid": "6", "mpid": "6", "name": "18welcome", "route": "/welcome"
    }, {
      "id": "62", "bpid": "6", "mpid": "6", "name": "19welcome", "route": "/welcome"
    }, {
      "id": "621", "bpid": "62", "mpid": "62", "name": "20welcome", "route": "/welcome"
    }, {
      "id": "622", "bpid": "62", "mpid": "62", "name": "21welcome", "route": "/welcome"
    }]);
});
router.post('/v1/stationTable', function (req, res, next) {
  console.log('stationTable', req.body)
  res.send({
    "success": true,
    "data": [{
      "id": 1,
      "stationNo": "string 2",
      "name": "string 3",
      "type": 1,
      "status": 1,
      "plant": "sample string 6",
      "createTimeAt": "2017-11-16T16:25:12.9941643+08:00",
      "lastModifyAt": "2017-11-16T16:25:12.9941643+08:00",
      "Modifier": "rex",
    },
    {
      "id": 1,
      "stationNo": "string 2",
      "name": "string 3",
      "type": 1,
      "status": 1,
      "plant": "sample string 6",
      "createTimeAt": "2017-11-16T16:25:12.9941643+08:00",
      "lastModifyAt": "2017-11-16T16:25:12.9941643+08:00",
      "Modifier": "rex",
    }]
  })
});

//staffTable
router.post('/v1/staffTable', function (req, res, next) {
  console.log('staffTable', req.body)
  res.send({
    "Status": 200,
    "Data": {
      "RowCount": 10,
      "Tdto": [{
        "Id": 10,
        "Account": "admin",
        "PlatformName": "adm管理",
        "EmailAddress": "admin@admin.com",
        "Phone": "15888888888",
        "CreateTime": "0001-01-01T00:00:00",
        "LastLoginTime": "0001-01-01T00:00:00",
        "UserState": "未激活",
        "RowCount": 0
      }]
    },
    "ErrorMessage": null
  })
});

router.post('/v1/staffTable/create', function (req, res, next) {
  console.log('staffTable/create', req.body)
  res.send({
    "success": true,
    "Status": 200,
    "Data": 1,
    "ErrorMessage": '删除成功'
  })
});
router.post('/v1/staffTable/edit', function (req, res, next) {
  console.log('staffTable/edit', req.body)
  res.send({
    "success": true,
    "Status": 400,
    "Data": -1,
    "ErrorMessage": '保存失败'
  })
});
router.post('/v1/staffTable/deleted', function (req, res, next) {
  console.log('staffTable/deleted', req.body)
  res.send({
    "success": true,
    "Status": 200,
    "Data": 1,
    "ErrorMessage": '删除成功'
  })
});
router.get('/v1/staffTable/getAddModalData', function (req, res, next) {
  console.log('staffTable/getAddModalData', req.body)
  res.send({
    "Status": 200,
    "Data": {
      "TotalRole": "[{key:2,label:\"testRole\"},{key:5,label:\"testRole2\"}]",
      "AllocatedRole": "sample string 2",
      "TotalPlatfrom": "[{key:1,label:\"adm管理\"}]",
      "UserInitilizeDTO": {
        "Id": 1,
        "Account": "sample string 2",
        "UserName": "sample string 3",
        "Password": "sample string 4",
        "PlatfromId": 5,
        "EmailAddress": "sample string 6",
        "Phone": "sample string 7",
        "CreationDateTime": "2017-12-11T18:35:21.2701142+08:00",
        "LastLoginTime": "2017-12-11T18:35:21.2701142+08:00",
        "State": 10
      }
    }
  })
});
router.get('/v1/staffTable/getEditModalData', function (req, res, next) {
  console.log('staffTable/getEditModalData', req.body)
  res.send({
    "Status": 200,
    "Data": {
      "TotalRole": "[{key:2,label:\"testRole\"},{key:5,label:\"testRole2\"}]",
      "AllcatedRole": "[{key:2,label:\"testRole\"},{key:5,label:\"testRole2\"}]",
      "TotalPlatfrom": "[{key:1,label:\"adm管理\"}]",
      "UserInitilizeDTO": {
        "Id": 1,
        "Account": "sample string 2",
        "UserName": "sample string 3",
        "Password": "sample string 4",
        "PlatfromId": 1,
        "EmailAddress": "sample string 6",
        "Phone": "sample string 7",
        "CreationDateTime": "2017-12-11T18:37:26.6857026+08:00",
        "LastLoginTime": "2017-12-11T18:37:26.6857026+08:00",
        "State": 10
      }
    },
    "ErrorMessage": null
  })
});
router.get('/v1/staffTable/getDetailsModalData', function (req, res, next) {
  console.log('staffTable/getDetailsModalData', req.body)
  res.send({
    "success": true,
    "Status": 200,
    "Data": {
      "Id": 1,
      "Account": "sample string 2",
      "UserName": "sample string 3",
      "PlatformName": "sample string 4",
      "EmailAddress": "sample string 5",
      "Phone": "sample string 6",
      "CreationDateTime": "2017-12-11T18:39:00.3933068+08:00",
      "Creator": "sample string 8",
      "Editor": "sample string 9",
      "LastLoginTime": "2017-12-11T18:39:00.3933068+08:00",
      "EditDateTime": "2017-12-11T18:39:00.3933068+08:00",
      "State": "sample string 12",
      "Role": "sample string 13"
    },
    "ErrorMessage": null
  })
});

//roleTable
router.post('/v1/roleTable', function (req, res, next) {
  console.log('roleTable', req.body)
  res.send({
    "success": true,
    "Status": 200,
    "Data": {
      "RowCount": 1,
      "Roledto": [
        {
          "Id": 1,
          "RoleName": "sample string 2",
          "PlatfromId": 3,
          "PlatfromName": "sample string 4",
          "CreationDateTime": "2017-12-11T18:41:50.0111361+08:00",
          "CreatorId": 6,
          "State": "sample string 7",
          "EditorId": 8,
          "EditDateTime": "2017-12-11T18:41:50.0111361+08:00"
        },
        {
          "Id": 1,
          "RoleName": "sample string 2",
          "PlatfromId": 3,
          "PlatfromName": "sample string 4",
          "CreationDateTime": "2017-12-11T18:41:50.0111361+08:00",
          "CreatorId": 6,
          "State": "sample string 7",
          "EditorId": 8,
          "EditDateTime": "2017-12-11T18:41:50.0111361+08:00"
        }
      ]
    },
    "ErrorMessage": null
  })
});
router.post('/v1/roleTable/create', function (req, res, next) {
  console.log('roleTable/create', req.body)
  res.send({
    "success": true,
    "Status": 200,
    "Data": 1,
    "ErrorMessage": '添加成功'
  })
});
router.post('/v1/roleTable/edit', function (req, res, next) {
  console.log('roleTable/edit', req.body)
  res.send({
    "success": true,
    "Status": 400,
    "Data": -1,
    "ErrorMessage": '保存失败'
  })
});
router.post('/v1/roleTable/deleted', function (req, res, next) {
  console.log('roleTable/deleted', req.body)
  res.send({
    "success": true,
    "Status": 200,
    "Data": 1,
    "ErrorMessage": '删除成功'
  })
});
router.get('/v1/roleTable/getAddModalData', function (req, res, next) {
  console.log('roleTable/getAddModalData', req.body)
  // res.send({ "success": true, "Data": { role: [{ key: 2, label: "testRole" }, { key: 5, label: "testRole2" }], platfrom: [{ key: 1, label: "adm管理" }] } })
  res.send({
    "success": true,
    "Status": 200,
    "Data": {
      "TotalPlatfrom": "[{key:1,label:\"adm管理\"}]",
      "TotalUser": "[{key:10,label:\"admin\"},{key:14,label:\"test1\"},{key:16,label:\"test1129\"},{key:17,label:\"test1\"},{key:18,label:\"test1\"},{key:19,label:\"test1\"},{key:20,label:\"1\"},{key:21,label:\"1\"},{key:22,label:\"'1'\"},{key:23,label:\"'1'\"}]",
    }
  })
});
router.get('/v1/roleTable/getEditModalData', function (req, res, next) {
  console.log('roleTable/getEditModalData', req.body)
  res.send({
    "success": true,
    "Status": 200,
    "Data": {
      "TotalPlatfrom": "[{key:1,label:\"adm管理\"}]",
      "AllocatedUser": "[{key:1,label:\"adm管理\"}]",
      "TotalUser": "[{key:1,label:\"adm管理\"}]",
      "Role": {
        "Id": 1,
        "RoleName": "sample string 2",
        "PlatfromId": 1,
        "PlatfromName": "sample string 4",
        "CreationDateTime": "2017-12-11T18:44:12.9980518+08:00",
        "CreatorId": 6,
        "State": 1,
        "EditorId": 8,
        "EditDateTime": "2017-12-11T18:44:12.9980518+08:00"
      }
    },
    "ErrorMessage": null
  })
});
router.get('/v1/roleTable/getDetailsModalData', function (req, res, next) {
  console.log('roleTable/getDetailsModalData', req.body)
  res.send({
    "success": true,
    "Status": 200,
    "Data": {
      "Id": 1,
      "RoleName": "sample string 2",
      "State": "sample string 3",
      "PlatfromName": "sample string 4",
      "CreationDateTime": "2017-12-11T18:42:46.998051+08:00",
      "Creator": "sample string 6",
      "EditDateTime": "2017-12-11T18:42:46.998051+08:00",
      "Editor": "sample string 8",
      "User": "sample string 9"
    },
    "ErrorMessage": null
  })
});

module.exports = router;


      // { "key": 6, "disabled": true, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "no": "TradeCode 6", "title": "一个任务名称 6", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 124, "status": 3, "updatedAt": "2017-07-03T16:00:00.000Z", "createdAt": "2017-07-03T16:00:00.000Z", "progress": 43 },
      // { "key": 7, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "no": "TradeCode 7", "title": "一个任务名称 7", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 815, "status": 1, "updatedAt": "2017-07-03T16:00:00.000Z", "createdAt": "2017-07-03T16:00:00.000Z", "progress": 89 },
      // { "key": 8, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "no": "TradeCode 8", "title": "一个任务名称 8", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 938, "status": 0, "updatedAt": "2017-07-04T16:00:00.000Z", "createdAt": "2017-07-04T16:00:00.000Z", "progress": 40 },
      // { "key": 9, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "no": "TradeCode 9", "title": "一个任务名称 9", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 450, "status": 3, "updatedAt": "2017-07-04T16:00:00.000Z", "createdAt": "2017-07-04T16:00:00.000Z", "progress": 69 },
      // { "key": 10, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "no": "TradeCode 10", "title": "一个任务名称 10", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 127, "status": 2, "updatedAt": "2017-07-05T16:00:00.000Z", "createdAt": "2017-07-05T16:00:00.000Z", "progress": 97 },
      // { "key": 11, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "no": "TradeCode 11", "title": "一个任务名称 11", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 413, "status": 2, "updatedAt": "2017-07-05T16:00:00.000Z", "createdAt": "2017-07-05T16:00:00.000Z", "progress": 92 },
      // { "key": 12, "disabled": true, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "no": "TradeCode 12", "title": "一个任务名称 12", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 591, "status": 1, "updatedAt": "2017-07-06T16:00:00.000Z", "createdAt": "2017-07-06T16:00:00.000Z", "progress": 24 },
      // { "key": 13, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "no": "TradeCode 13", "title": "一个任务名称 13", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 843, "status": 1, "updatedAt": "2017-07-06T16:00:00.000Z", "createdAt": "2017-07-06T16:00:00.000Z", "progress": 58 },
      // { "key": 14, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "no": "TradeCode 14", "title": "一个任务名称 14", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 413, "status": 0, "updatedAt": "2017-07-07T16:00:00.000Z", "createdAt": "2017-07-07T16:00:00.000Z", "progress": 48 },
      // { "key": 15, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "no": "TradeCode 15", "title": "一个任务名称 15", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 6, "status": 0, "updatedAt": "2017-07-07T16:00:00.000Z", "createdAt": "2017-07-07T16:00:00.000Z", "progress": 11 },
      // { "key": 16, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "no": "TradeCode 16", "title": "一个任务名称 16", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 575, "status": 3, "updatedAt": "2017-07-08T16:00:00.000Z", "createdAt": "2017-07-08T16:00:00.000Z", "progress": 81 },
      // { "key": 17, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "no": "TradeCode 17", "title": "一个任务名称 17", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 97, "status": 2, "updatedAt": "2017-07-08T16:00:00.000Z", "createdAt": "2017-07-08T16:00:00.000Z", "progress": 10 },
      // { "key": 18, "disabled": true, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "no": "TradeCode 18", "title": "一个任务名称 18", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 807, "status": 2, "updatedAt": "2017-07-10T00:00:00.000Z", "createdAt": "2017-07-10T00:00:00.000Z", "progress": 15 },
      // { "key": 19, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "no": "TradeCode 19", "title": "一个任务名称 19", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 940, "status": 0, "updatedAt": "2017-07-10T00:00:00.000Z", "createdAt": "2017-07-10T00:00:00.000Z", "progress": 99 },
      // { "key": 20, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "no": "TradeCode 20", "title": "一个任务名称 20", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 859, "status": 1, "updatedAt": "2017-07-11T00:00:00.000Z", "createdAt": "2017-07-11T00:00:00.000Z", "progress": 52 },
      // { "key": 21, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "no": "TradeCode 21", "title": "一个任务名称 21", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 409, "status": 2, "updatedAt": "2017-07-11T00:00:00.000Z", "createdAt": "2017-07-11T00:00:00.000Z", "progress": 28 },
      // { "key": 22, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "no": "TradeCode 22", "title": "一个任务名称 22", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 308, "status": 0, "updatedAt": "2017-07-12T00:00:00.000Z", "createdAt": "2017-07-12T00:00:00.000Z", "progress": 7 },
      // { "key": 23, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "no": "TradeCode 23", "title": "一个任务名称 23", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 274, "status": 3, "updatedAt": "2017-07-12T00:00:00.000Z", "createdAt": "2017-07-12T00:00:00.000Z", "progress": 80 },
      // { "key": 24, "disabled": true, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "no": "TradeCode 24", "title": "一个任务名称 24", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 513, "status": 0, "updatedAt": "2017-07-13T00:00:00.000Z", "createdAt": "2017-07-13T00:00:00.000Z", "progress": 85 },
      // { "key": 25, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "no": "TradeCode 25", "title": "一个任务名称 25", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 775, "status": 0, "updatedAt": "2017-07-13T00:00:00.000Z", "createdAt": "2017-07-13T00:00:00.000Z", "progress": 70 },
      // { "key": 26, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "no": "TradeCode 26", "title": "一个任务名称 26", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 942, "status": 1, "updatedAt": "2017-07-14T00:00:00.000Z", "createdAt": "2017-07-14T00:00:00.000Z", "progress": 59 },
      // { "key": 27, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "no": "TradeCode 27", "title": "一个任务名称 27", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 660, "status": 3, "updatedAt": "2017-07-14T00:00:00.000Z", "createdAt": "2017-07-14T00:00:00.000Z", "progress": 70 },
      // { "key": 28, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "no": "TradeCode 28", "title": "一个任务名称 28", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 442, "status": 2, "updatedAt": "2017-07-15T00:00:00.000Z", "createdAt": "2017-07-15T00:00:00.000Z", "progress": 31 },
      // { "key": 29, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "no": "TradeCode 29", "title": "一个任务名称 29", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 814, "status": 0, "updatedAt": "2017-07-15T00:00:00.000Z", "createdAt": "2017-07-15T00:00:00.000Z", "progress": 93 },
      // { "key": 30, "disabled": true, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "no": "TradeCode 30", "title": "一个任务名称 30", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 743, "status": 3, "updatedAt": "2017-07-16T00:00:00.000Z", "createdAt": "2017-07-16T00:00:00.000Z", "progress": 5 },
      // { "key": 31, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "no": "TradeCode 31", "title": "一个任务名称 31", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 706, "status": 0, "updatedAt": "2017-07-16T00:00:00.000Z", "createdAt": "2017-07-16T00:00:00.000Z", "progress": 38 },
      // { "key": 32, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "no": "TradeCode 32", "title": "一个任务名称 32", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 893, "status": 0, "updatedAt": "2017-07-17T00:00:00.000Z", "createdAt": "2017-07-17T00:00:00.000Z", "progress": 9 },
      // { "key": 33, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "no": "TradeCode 33", "title": "一个任务名称 33", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 965, "status": 0, "updatedAt": "2017-07-17T00:00:00.000Z", "createdAt": "2017-07-17T00:00:00.000Z", "progress": 40 },
      // { "key": 34, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "no": "TradeCode 34", "title": "一个任务名称 34", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 461, "status": 1, "updatedAt": "2017-07-18T00:00:00.000Z", "createdAt": "2017-07-18T00:00:00.000Z", "progress": 21 },
      // { "key": 35, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "no": "TradeCode 35", "title": "一个任务名称 35", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 308, "status": 2, "updatedAt": "2017-07-18T00:00:00.000Z", "createdAt": "2017-07-18T00:00:00.000Z", "progress": 92 },
      // { "key": 36, "disabled": true, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "no": "TradeCode 36", "title": "一个任务名称 36", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 399, "status": 0, "updatedAt": "2017-07-19T00:00:00.000Z", "createdAt": "2017-07-19T00:00:00.000Z", "progress": 29 },
      // { "key": 37, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "no": "TradeCode 37", "title": "一个任务名称 37", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 165, "status": 3, "updatedAt": "2017-07-19T00:00:00.000Z", "createdAt": "2017-07-19T00:00:00.000Z", "progress": 78 },
      // { "key": 38, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "no": "TradeCode 38", "title": "一个任务名称 38", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 278, "status": 0, "updatedAt": "2017-07-20T00:00:00.000Z", "createdAt": "2017-07-20T00:00:00.000Z", "progress": 62 },
      // { "key": 39, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "no": "TradeCode 39", "title": "一个任务名称 39", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 383, "status": 1, "updatedAt": "2017-07-20T00:00:00.000Z", "createdAt": "2017-07-20T00:00:00.000Z", "progress": 15 },
      // { "key": 40, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "no": "TradeCode 40", "title": "一个任务名称 40", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 684, "status": 3, "updatedAt": "2017-07-21T00:00:00.000Z", "createdAt": "2017-07-21T00:00:00.000Z", "progress": 5 },
      // { "key": 41, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "no": "TradeCode 41", "title": "一个任务名称 41", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 140, "status": 3, "updatedAt": "2017-07-21T00:00:00.000Z", "createdAt": "2017-07-21T00:00:00.000Z", "progress": 70 },
      // { "key": 42, "disabled": true, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "no": "TradeCode 42", "title": "一个任务名称 42", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 986, "status": 2, "updatedAt": "2017-07-22T00:00:00.000Z", "createdAt": "2017-07-22T00:00:00.000Z", "progress": 63 },
      // { "key": 43, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "no": "TradeCode 43", "title": "一个任务名称 43", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 235, "status": 3, "updatedAt": "2017-07-22T00:00:00.000Z", "createdAt": "2017-07-22T00:00:00.000Z", "progress": 62 },
      // { "key": 44, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png", "no": "TradeCode 44", "title": "一个任务名称 44", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 10, "status": 1, "updatedAt": "2017-07-23T00:00:00.000Z", "createdAt": "2017-07-23T00:00:00.000Z", "progress": 87 },
      // { "key": 45, "disabled": false, "href": "https://ant.design", "avatar": "https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png", "no": "TradeCode 45", "title": "一个任务名称 45", "owner": "曲丽丽", "description": "这是一段描述", "callNo": 139, "status": 1, "updatedAt": "2017-07-23T00:00:00.000Z", "createdAt": "2017-07-23T00:00:00.000Z", "progress": 8 }],


