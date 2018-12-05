import moment from 'moment'
/**
 * stationTableColumns 工站表格表头
 * stationGroupTableColumns 工站组表格表头
 * lineTableColumns   线体表格表头
 * staffTableColumns   人员表格表头
 * roleTableColumns  角色表格表头
 * menuTableColumns  菜单表格表头
 * materielTableColumns  物料表格表头
 * processTableColumns 工艺表格表头
 * failureTypeTableColumns 失效类型表格表头
 * regionTableColumns   区域表格表头
 * locationTableColumns  库位表格表头
 * bomTableColumns  BOM表格表头
 * customerTableColumns 客户信息表格表头
 * supplierTableColumns  供应商信息表格表头
 */
const stationTableColumns = [{
  title: 'ID',
  dataIndex: 'Id',
}, {
  title: '工站编号',
  dataIndex: 'StationNumber',
}, {
  title: '名称',
  dataIndex: 'Name',
}, {
  title: '类型',
  dataIndex: 'StationType',
}, {
  title: '状态',
  dataIndex: 'State',
}, {
  title: '工厂',
  dataIndex: 'FactoryId',
}, {
  title: '创建时间',
  dataIndex: 'CreationDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '修改人',
  dataIndex: 'Creator',
}, {
  title: '最后修改时间',
  dataIndex: 'EditDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '修改人',
  dataIndex: 'Editor',
}]
const stationGroupTableColumns = [{
  title: 'ID',
  dataIndex: 'Id',
}, {
  title: '工站组编号',
  dataIndex: 'GroupNumber',
}, {
  title: '名称',
  dataIndex: 'Description',
}, {
  title: '状态',
  dataIndex: 'State',
}, {
  title: '工厂',
  dataIndex: 'Factory',
}, {
  title: '创建时间',
  dataIndex: 'CreateDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后修改时间',
  dataIndex: 'EditDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '修改人',
  dataIndex: 'Editor',
}]

const staffTableColumns = [{
  title: 'ID',
  dataIndex: 'Id',
}, {
  title: '账号',
  dataIndex: 'Account',
}, {
  title: '员工姓名',
  dataIndex: 'UserName',
}, {
  title: '模块',
  dataIndex: 'PlatformName',
}, {
  title: '邮箱',
  dataIndex: 'EmailAddress',
}, {
  title: '电话',
  dataIndex: 'Phone',
}, {
  title: '状态',
  dataIndex: 'State',
}, {
  title: '创建时间',
  dataIndex: 'CreateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后登录时间',
  dataIndex: 'LastLoginTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}]

const lineTableColumns = [{
  title: 'ID',
  dataIndex: 'Id',
}, {
  title: '线体编号',
  dataIndex: 'CellNumber',
}, {
  title: '名称',
  dataIndex: 'Description',
}, {
  title: '状态',
  dataIndex: 'State',
}, {
  title: '创建时间',
  dataIndex: 'CreationDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后修改时间',
  dataIndex: 'EditDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '修改人',
  dataIndex: 'EditorId',
}]


const roleTableColumns = [{
  title: 'ID',
  dataIndex: 'Id',
}, {
  title: '角色',
  dataIndex: 'RoleName',
}, {
  title: '模块',
  dataIndex: 'PlatformName',
}, {
  title: '状态',
  dataIndex: 'State',
}, {
  title: '创建时间',
  dataIndex: 'CreationDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后修改时间',
  dataIndex: 'EditDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后编辑人',
  dataIndex: 'Editor',
}]

const materielTableColumns = [{
  title: 'ID',
  dataIndex: 'Id',
}, {
  title: '料号',
  dataIndex: 'MaterialNumber',
}, {
  title: '版本',
  dataIndex: 'Version',
}, {
  title: '描述',
  dataIndex: 'Description',
}, {
  title: '规格',
  dataIndex: 'Specification',
}, {
  title: '客户侧料号',
  dataIndex: 'CustomerMaterialNumber',
}, {
  title: '供应商侧料号',
  dataIndex: 'SupplierMaterialNumber',
}, {
  title: '物料类别',
  dataIndex: 'MaterialGroupType',
}, {
  title: '是否是产品',
  dataIndex: 'IsProduct',
}, {
  title: '是否连板',
  dataIndex: 'IsMultiPanel',
}, {
  title: '是否反冲',
  dataIndex: 'RequireBackflush',
}, {
  title: '小板数量',
  dataIndex: 'NumberOfPanels',
}, {
  title: '单位',
  dataIndex: 'Unit',
}, {
  title: '是否安装检测',
  dataIndex: 'SetupFlag',
}, {
  title: '采购类型',
  dataIndex: 'ProcurementType',
}, {
  title: '最小包装量',
  dataIndex: 'MinimumPackageQuantity',
}, {
  title: '过期时间',
  dataIndex: 'ExpirationTime',
}, {
  title: '安全库存',
  dataIndex: 'SafetyStock',
}, {
  title: '默认存储库位号',
  dataIndex: 'DefaultStorageLocation',
}, {
  title: '包装大小(长*宽*高)',
  dataIndex: 'ContainerSize',
}, {
  title: '湿敏等级MSL',
  dataIndex: 'MSL',
}, {
  title: '状态',
  dataIndex: 'StateValue',
}, {
  title: '默认设备组',
  dataIndex: 'DefaultStationGroup',
}, {
  title: '公司编号',
  dataIndex: 'CompanyNumber',
}, {
  title: '工厂编号',
  dataIndex: 'FactoryNumber',
}, {
  title: '生效日期',
  dataIndex: 'ValidBegin',
}, {
  title: '失效日期',
  dataIndex: 'ValidEnd',
}, {
  title: '创建时间',
  dataIndex: 'CreationDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '创建人',
  dataIndex: 'Creator',
}, {
  title: '最后修改时间',
  dataIndex: 'EditDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后编辑人',
  dataIndex: 'Editor',
}]

const processTableColumns = [{
  title: 'ID',
  dataIndex: 'Id',
}, {
  title: '工艺编号',
  dataIndex: 'ProcessNumber',
}, {
  title: '成品/半成品料号',
  dataIndex: 'MaterialNumber',
}, {
  title: '工厂',
  dataIndex: 'Factory',
}, {
  title: '状态',
  dataIndex: 'State',
}, {
  title: '生效时间',
  dataIndex: 'ValidBegin',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '失效时间',
  dataIndex: 'ValidEnd',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '创建时间',
  dataIndex: 'CreationDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后修改时间',
  dataIndex: 'EditDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后编辑人',
  dataIndex: 'Editor',
}]

const failureTypeTableColumns = [{
  title: 'ID',
  dataIndex: 'id',
}, {
  title: '失效编号',
  dataIndex: 'userName',
}, {
  title: '名称',
  dataIndex: 'platform',
}, {
  title: '描述',
  dataIndex: 'status',
}, {
  title: '工站组',
  dataIndex: 'plant',
}, {
  title: '状态',
  dataIndex: 'plant',
}, {
  title: '创建时间',
  dataIndex: 'CreationDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '创建人',
  dataIndex: 'Creator',
}, {
  title: '最后修改时间',
  dataIndex: 'lastModifyAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后编辑人',
  dataIndex: 'Modifier',
}]

const regionTableColumns = [{
  title: 'ID',
  dataIndex: 'Id',
}, {
  title: '区域编号',
  dataIndex: 'AreaNumber',
}, {
  title: '名称',
  dataIndex: 'Name',
}, {
  title: '描述',
  dataIndex: 'Description',
}, {
  title: '工厂',
  dataIndex: 'Factory',
}, {
  title: '状态',
  dataIndex: 'State',
}, {
  title: '最后修改时间',
  dataIndex: 'EditDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后编辑人',
  dataIndex: 'Editor',
}]

const locationTableColumns = [{
  title: 'ID',
  dataIndex: 'Id',
}, {
  title: '库位编号',
  dataIndex: 'LocationNumber',
}, {
  title: '名称',
  dataIndex: 'Description',
}, {
  title: '区域',
  dataIndex: 'Area',
}, {
  title: '坐标X轴',
  dataIndex: 'X',
}, {
  title: '坐标Y轴',
  dataIndex: 'Y',
}, {
  title: '坐标Z轴',
  dataIndex: 'Z',
}, {
  title: '最后修改时间',
  dataIndex: 'EditDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后编辑人',
  dataIndex: 'Editor',
}]
const bomTableColumns = [{
  title: 'ID',
  dataIndex: 'Id',
}, {
  title: '料号',
  dataIndex: 'MaterialNumber',
}, {
  title: '版本号',
  dataIndex: 'Version',
}, {
  title: '名称',
  dataIndex: 'Name',
}, {
  title: '工厂',
  dataIndex: 'Factory',
}, {
  title: '生效日期',
  dataIndex: 'ValidBegin',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '失效日期',
  dataIndex: 'ValidEnd',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '创建时间',
  dataIndex: 'CreationDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '创建人',
  dataIndex: 'Creator',
}, {
  title: '最后修改时间',
  dataIndex: 'EditDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后编辑人',
  dataIndex: 'Editor',
}]

const customerTableColumns = [{
  title: 'ID',
  dataIndex: 'Id',
}, {
  title: '客户编号',
  dataIndex: 'CustomerCode',
}, {
  title: '名称',
  dataIndex: 'Name',
}, {
  title: '邓氏码',
  dataIndex: 'DUNS',
}, {
  title: '国家',
  dataIndex: 'Country',
}, {
  title: '省市',
  dataIndex: 'Province',
}, {
  title: '详细地址',
  dataIndex: 'Address',
}, {
  title: '邮编',
  dataIndex: 'PostCode',
}, {
  title: '传真',
  dataIndex: 'Fax',
}, {
  title: '联系人',
  dataIndex: 'ContactPerson',
}, {
  title: '邮件',
  dataIndex: 'Email',
}, {
  title: '电话',
  dataIndex: 'Telphone',
}, {
  title: '手机',
  dataIndex: 'MobilePhone',
}, {
  title: '最后修改时间',
  dataIndex: 'EditDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后编辑人',
  dataIndex: 'Editor',
}]
const supplierTableColumns = [{
  title: 'ID',
  dataIndex: 'Id',
}, {
  title: '供应商编号',
  dataIndex: 'SupplierCode',
}, {
  title: '名称',
  dataIndex: 'Name',
}, {
  title: '国家',
  dataIndex: 'Country',
}, {
  title: '省市',
  dataIndex: 'Province',
}, {
  title: '详细地址',
  dataIndex: 'Address',
}, {
  title: '邮编',
  dataIndex: 'PostCode',
}, {
  title: '传真',
  dataIndex: 'Fax',
}, {
  title: '联系人',
  dataIndex: 'ContactPerson',
}, {
  title: '邮件',
  dataIndex: 'Email',
}, {
  title: '电话',
  dataIndex: 'Telphone',
}, {
  title: '手机',
  dataIndex: 'MobilePhone',
}, {
  title: '最后修改时间',
  dataIndex: 'EditDateTime',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后编辑人',
  dataIndex: 'Editor',
}]

const processDetailsColumns = [{
  title: '序列号',
  dataIndex: 'Secquence',
}, {
  title: '描述',
  dataIndex: 'Description',
}, {
  title: '工站组',
  dataIndex: 'StationGroupName',
}, {
  title: '是否必做',
  dataIndex: 'IsMandatory',
}, {
  title: '是否需要上料检验',
  dataIndex: 'IsNeedSetupCheck',
}, {
  title: '最大测试次数',
  dataIndex: 'MaximumTestCount',
}, {
  title: '是否反冲',
  dataIndex: 'IsBackflush',
}, {
  title: '正反面',
  dataIndex: 'Side',
}, {
  title: '最后编辑时间',
  dataIndex: 'EditDateTime',
}, {
  title: '最后编辑人',
  dataIndex: 'Editor',
}];

const bomDetailsFullViewColumns = [{
  title: '子件料号',
  dataIndex: 'MaterialNumber',
}, {
  title: '版本号',
  dataIndex: 'Version',
}, {
  title: '名称',
  dataIndex: 'MaterialName',
}, {
  title: '设备组',
  dataIndex: 'StationGroup',
}, {
  title: '定位号',
  dataIndex: 'Designator',
}, {
  title: '正反面',
  dataIndex: 'Layer',
}, {
  title: '是否是产出品',
  dataIndex: 'IsAlternative',
}, {
  title: '用量',
  dataIndex: 'Quantity',
}, {
  title: '是否上料检测',
  dataIndex: 'IsNeedSetupCheck',
}]
const bomDetailsAggregateViewColumns = [{
  title: '子件料号',
  dataIndex: 'MaterialNumber',
}, {
  title: '版本号',
  dataIndex: 'Version',
}, {
  title: '名称',
  dataIndex: 'MaterialName',
}, {
  title: '设备组',
  dataIndex: 'StationGroup',
}, {
  title: '正反面',
  dataIndex: 'Layer',
}, {
  title: '用量',
  dataIndex: 'Quantity',
}]

export {
  stationTableColumns,
  stationGroupTableColumns,
  staffTableColumns,
  lineTableColumns,
  roleTableColumns,
  // menuTableColumns,
  materielTableColumns,
  processTableColumns,
  failureTypeTableColumns,
  regionTableColumns,
  locationTableColumns,
  bomTableColumns,
  customerTableColumns,
  supplierTableColumns,

  processDetailsColumns,
  bomDetailsFullViewColumns,
  bomDetailsAggregateViewColumns,

}



// const menuTableColumns = [{
//   title: 'ID',
//   dataIndex: 'id',
// }, {
//   title: '菜单名',
//   dataIndex: 'userName',
// }, {
//   title: '父菜单名',
//   dataIndex: 'platform',
// }, {
//   title: '状态',
//   dataIndex: 'status',
// }, {
//   title: 'URL',
//   dataIndex: 'plant',
// }, {
//   title: '创建时间',
//   dataIndex: 'createTimeAt',
//   sorter: true,
//   render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
// }, {
//   title: '最后修改时间',
//   dataIndex: 'lastModifyAt',
//   sorter: true,
//   render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
// }, {
//   title: '最后编辑人',
//   dataIndex: 'Modifier',
// }]
