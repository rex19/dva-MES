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
  dataIndex: 'id',
}, {
  title: '工站编号',
  dataIndex: 'stationNo',
}, {
  title: '名称',
  dataIndex: 'name',
}, {
  title: '类型',
  dataIndex: 'type',
}, {
  title: '状态',
  dataIndex: 'status',
}, {
  title: '工厂',
  dataIndex: 'plant',
}, {
  title: '创建时间',
  dataIndex: 'createTimeAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后修改时间',
  dataIndex: 'lastModifyAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '修改人',
  dataIndex: 'Modifier',
}]
const stationGroupTableColumns = [{
  title: 'ID',
  dataIndex: 'id',
}, {
  title: '工站组编号',
  dataIndex: 'stationGroupNo',
}, {
  title: '名称',
  dataIndex: 'name',
}, {
  title: '状态',
  dataIndex: 'status',
}, {
  title: '工厂',
  dataIndex: 'plant',
}, {
  title: '创建时间',
  dataIndex: 'createTimeAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后修改时间',
  dataIndex: 'lastModifyAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '修改人',
  dataIndex: 'Modifier',
}]

const staffTableColumns = [{
  title: 'ID',
  dataIndex: 'Id',
}, {
  title: '账号',
  dataIndex: 'Account',
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
  dataIndex: 'UserState',
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
  dataIndex: 'id',
}, {
  title: '线体编号',
  dataIndex: 'lineNo',
}, {
  title: '名称',
  dataIndex: 'name',
}, {
  title: '状态',
  dataIndex: 'status',
}, {
  title: '工厂',
  dataIndex: 'plant',
}, {
  title: '创建时间',
  dataIndex: 'createTimeAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后修改时间',
  dataIndex: 'lastModifyAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '修改人',
  dataIndex: 'Modifier',
}]


const roleTableColumns = [{
  title: 'ID',
  dataIndex: 'Id',
}, {
  title: '角色',
  dataIndex: 'RoleName',
}, {
  title: '模块',
  dataIndex: 'PlatfromName',
}, {
  title: '状态',
  dataIndex: 'IsEnable',
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
const menuTableColumns = [{
  title: 'ID',
  dataIndex: 'id',
}, {
  title: '菜单名',
  dataIndex: 'userName',
}, {
  title: '父菜单名',
  dataIndex: 'platform',
}, {
  title: '状态',
  dataIndex: 'status',
}, {
  title: 'URL',
  dataIndex: 'plant',
}, {
  title: '创建时间',
  dataIndex: 'createTimeAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后修改时间',
  dataIndex: 'lastModifyAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后编辑人',
  dataIndex: 'Modifier',
}]
const materielTableColumns = [{
  title: 'ID',
  dataIndex: 'id',
}, {
  title: '料号',
  dataIndex: 'userName',
}, {
  title: '版本',
  dataIndex: 'platform',
}, {
  title: '描述',
  dataIndex: 'status',
}, {
  title: '规格',
  dataIndex: 'plant',
}, {
  title: '客户侧料号',
  dataIndex: 'userName',
}, {
  title: '供应商侧料号',
  dataIndex: 'platform',
}, {
  title: '物料类别',
  dataIndex: 'status',
}, {
  title: '是否是产品',
  dataIndex: 'plant',
}, {
  title: '是否连板',
  dataIndex: 'userName',
}, {
  title: '是否反冲',
  dataIndex: 'platform',
}, {
  title: '小板数量',
  dataIndex: 'status',
}, {
  title: '单位',
  dataIndex: 'plant',
}, {
  title: '是否安装检测',
  dataIndex: 'platform',
}, {
  title: '采购类型',
  dataIndex: 'status',
}, {
  title: '最小包装量',
  dataIndex: 'plant',
}, {
  title: '过期时间',
  dataIndex: 'status',
}, {
  title: '安全库存',
  dataIndex: 'plant',
}, {
  title: '默认存储库位号',
  dataIndex: 'platform',
}, {
  title: '包装大小(长*宽*高)',
  dataIndex: 'status',
}, {
  title: '湿敏等级MSL',
  dataIndex: 'plant',
}, {
  title: '状态',
  dataIndex: 'plant',
}, {
  title: '默认设备组',
  dataIndex: 'platform',
}, {
  title: '公司编号',
  dataIndex: 'status',
}, {
  title: '工厂编号',
  dataIndex: 'plant',
}, {
  title: '生效日期',
  dataIndex: 'platform',
}, {
  title: '失效日期',
  dataIndex: 'status',
}, {
  title: '创建人',
  dataIndex: 'plant',
}, {
  title: '创建时间',
  dataIndex: 'createTimeAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后修改时间',
  dataIndex: 'lastModifyAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后编辑人',
  dataIndex: 'Modifier',
}]

const processTableColumns = [{
  title: 'ID',
  dataIndex: 'id',
}, {
  title: '工艺编号',
  dataIndex: 'userName',
}, {
  title: '成品/半成品料号',
  dataIndex: 'platform',
}, {
  title: '版本',
  dataIndex: 'status',
}, {
  title: '状态',
  dataIndex: 'plant',
}, {
  title: '生效时间',
  dataIndex: 'createTimeAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '失效时间',
  dataIndex: 'lastModifyAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '创建时间',
  dataIndex: 'createTimeAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后修改时间',
  dataIndex: 'lastModifyAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后编辑人',
  dataIndex: 'Modifier',
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
  dataIndex: 'id',
}, {
  title: '区域编号',
  dataIndex: 'userName',
}, {
  title: '名称',
  dataIndex: 'platform',
}, {
  title: '描述',
  dataIndex: 'status',
}, {
  title: '工厂',
  dataIndex: 'plant',
}, {
  title: '状态',
  dataIndex: 'plant',
}, {
  title: '最后修改时间',
  dataIndex: 'lastModifyAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后编辑人',
  dataIndex: 'Modifier',
}]

const locationTableColumns = [{
  title: 'ID',
  dataIndex: 'id',
}, {
  title: '库位编号',
  dataIndex: 'userName',
}, {
  title: '名称',
  dataIndex: 'platform',
}, {
  title: '区域',
  dataIndex: 'status',
}, {
  title: '坐标X轴',
  dataIndex: 'plant',
}, {
  title: '坐标Y轴',
  dataIndex: 'plant',
}, {
  title: '坐标Z轴',
  dataIndex: 'plant',
}, {
  title: '最后修改时间',
  dataIndex: 'lastModifyAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后编辑人',
  dataIndex: 'Modifier',
}]
const bomTableColumns = [{
  title: 'ID',
  dataIndex: 'id',
}, {
  title: '料号',
  dataIndex: 'userName',
}, {
  title: '版本号',
  dataIndex: 'platform',
}, {
  title: '名称',
  dataIndex: 'status',
}, {
  title: '生效日期',
  dataIndex: 'lastModifyAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '失效日期',
  dataIndex: 'lastModifyAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后修改时间',
  dataIndex: 'lastModifyAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后编辑人',
  dataIndex: 'Modifier',
}]

const customerTableColumns = [{
  title: 'ID',
  dataIndex: 'id',
}, {
  title: '客户编号',
  dataIndex: 'userName',
}, {
  title: '名称',
  dataIndex: 'platform',
}, {
  title: '邓氏码',
  dataIndex: 'status',
}, {
  title: '国家',
  dataIndex: 'platform',
}, {
  title: '省市',
  dataIndex: 'status',
}, {
  title: '详细地址',
  dataIndex: 'platform',
}, {
  title: '邮编',
  dataIndex: 'status',
}, {
  title: '传真',
  dataIndex: 'platform',
}, {
  title: '联系人',
  dataIndex: 'status',
}, {
  title: '邮件',
  dataIndex: 'status',
}, {
  title: '电话',
  dataIndex: 'platform',
}, {
  title: '手机',
  dataIndex: 'status',
}, {
  title: '最后修改时间',
  dataIndex: 'lastModifyAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后编辑人',
  dataIndex: 'Modifier',
}]
const supplierTableColumns = [{
  title: 'ID',
  dataIndex: 'id',
}, {
  title: '供应商编号',
  dataIndex: 'userName',
}, {
  title: '名称',
  dataIndex: 'platform',
}, {
  title: '国家',
  dataIndex: 'platform',
}, {
  title: '省市',
  dataIndex: 'status',
}, {
  title: '详细地址',
  dataIndex: 'platform',
}, {
  title: '邮编',
  dataIndex: 'status',
}, {
  title: '传真',
  dataIndex: 'platform',
}, {
  title: '联系人',
  dataIndex: 'status',
}, {
  title: '邮件',
  dataIndex: 'status',
}, {
  title: '电话',
  dataIndex: 'platform',
}, {
  title: '手机',
  dataIndex: 'status',
}, {
  title: '最后修改时间',
  dataIndex: 'lastModifyAt',
  sorter: true,
  render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
}, {
  title: '最后编辑人',
  dataIndex: 'Modifier',
}]
export {
  stationTableColumns,
  stationGroupTableColumns,
  staffTableColumns,
  lineTableColumns,
  roleTableColumns,
  menuTableColumns,
  materielTableColumns,
  processTableColumns,
  failureTypeTableColumns,
  regionTableColumns,
  locationTableColumns,
  bomTableColumns,
  customerTableColumns,
  supplierTableColumns
}
