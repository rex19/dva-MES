# sf-mes接口文档

## staff

  ### http://192.168.1.252/SFMES/api/Staff/GetAddInitialize
  ```json
  //Response
  {
    "TotalRole": "[{key:1,label:\"adm管理\"}]", //所有角色多选框
    "AllocatedRole": "[{key:1,label:\"adm管理\"}]",  //已选角色多选框
    "TotalPlatform": "[{key:1,label:\"adm管理\"}]", //所有可选模块下拉菜单
    "UserInitilizeDTO": {
      "Id": 1,
      "Account": "sample string 2",
      "UserName": "sample string 3",
      "Password": "sample string 4",
      "PlatformId": 5,  //已选可选模块下拉菜单
      "EmailAddress": "sample string 6",
      "Phone": "sample string 7",
      "CreationDateTime": "2017-12-19T16:51:22.4874749+08:00",
      "LastLoginTime": "2017-12-19T16:51:22.4874749+08:00",
      "State": 10
    }
  }
  ```
  ### http://192.168.1.252/SFMES/api/Staff/GetEditInitialize/3
  ```json
  //Request param
  

  
  
  //Response
  {
  "TotalRole": "[{key:1,label:\"adm管理\"}]", //所有角色多选框
  "AllocatedRole": "[{key:1,label:\"adm管理\"}]",  //已选角色多选框
  "TotalPlatform": "[{key:1,label:\"adm管理\"}]", //所有可选模块下拉菜单
  "UserInitilizeDTO": {
    "Id": 1,
    "Account": "sample string 2",
    "UserName": "sample string 3",
    "Password": "sample string 4",
    "PlatformId": 5,  //已选可选模块下拉菜单
    "EmailAddress": "sample string 6",
    "Phone": "sample string 7",
    "CreationDateTime": "2017-12-19T16:51:22.4874749+08:00",
    "LastLoginTime": "2017-12-19T16:51:22.4874749+08:00",
    "State": 10
  }
}
  ```
  ### http://192.168.1.252/SFMES/api/Staff/GetTById/3
  ```json
  //Request param
  
  //Response
  ```

## role

## station

## stationGroup

## cell

## process

## material

## area
