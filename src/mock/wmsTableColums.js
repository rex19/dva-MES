//wms
const wmsRawMaterialReceiptsColums = [{
  title: 'Id',
  dataIndex: 'Id',
}, {
  title: '单据号',
  dataIndex: 'FormNumber',
}, {
  title: '状态',
  dataIndex: 'StateName',
}, {
  title: '创建时间',
  dataIndex: 'CreationDateTime',
}, {
  title: '创建人',
  dataIndex: 'CreatorUserName',
}, {
  title: '采购单号',
  dataIndex: 'PurchaseOrderNumber',
}, {
  title: '操作',
  key: (new Date()).valueOf(),
  fixed: 'right',
  width: 140,
  render: (text, record) => (
    <span>
      <a onClick={() => console.log('chakan')} className="ant-dropdown-link">
        查看
      </a>
    </span>
  ),
}]
const wmsRawMaterialReceipts_DetailsColums = [{
  title: '项目号',
  dataIndex: 'ItemNumber',
}, {
  title: '状态',
  dataIndex: 'StateName',
}, {
  title: '料号',
  dataIndex: 'MaterialNumber',
}, {
  title: '供应商',
  dataIndex: 'SupplierName',
}, {
  title: '批次号',
  dataIndex: 'BatchNumber',
}, {
  title: '单位',
  dataIndex: 'UnitName',
}, {
  title: '需要数量',
  dataIndex: 'Quantity',
}, {
  title: '实际收货数量',
  dataIndex: 'ReceivingQuantity',
  // import {Link} from 'react-router';
  // render: (text, record) => <Link to={`/index/option1?name=${record.id}`}>{'跳转其他组件'}</Link>,
}, {
  title: '收获库位',
  dataIndex: 'ReceivingLocationNumber',
}, {
  title: '收货人',
  dataIndex: 'ReceiverUserName',
}, {
  title: '制造时间',
  dataIndex: 'ManufacturingDateTime',
}, {
  title: '过期时间',
  dataIndex: 'ExpireDateTime',
}]

const wmsRawMaterialReceipts_Details_InfoColums = [{
  title: 'Id',
  dataIndex: 'Id',
}, {
  title: '容器UID',
  dataIndex: 'ContainerNumber',
}, {
  title: '状态',
  dataIndex: 'StateName',
}, {
  title: '料号',
  dataIndex: 'MaterialNumber',
}, {
  title: '容量',
  dataIndex: 'TotalQuantity',
}, {
  title: '现量',
  dataIndex: 'Quantity',
}, {
  title: '目前库存',
  dataIndex: 'CurrentLocationNumber',
}]


const wmsWorkOrderColums = [{
  title: 'Id',
  dataIndex: 'Id',
}, {
  title: '工单号',
  dataIndex: 'Version',
}, {
  title: '状态',
  dataIndex: 'MaterialName',
}, {
  title: '料号',
  dataIndex: 'StationGroup',
}, {
  title: '单位',
  dataIndex: 'Layer',
}, {
  title: '计划量',
  dataIndex: 'Quantity',
}, {
  title: '已完成量',
  dataIndex: 'Version',
}, {
  title: '计划开始时间',
  dataIndex: 'MaterialName',
}, {
  title: '计划完成时间',
  dataIndex: 'StationGroup',
}, {
  title: '实际开始时间',
  dataIndex: 'Layer',
}, {
  title: '实际完成时间',
  dataIndex: 'Quantity',
}, {
  title: '生产线',
  dataIndex: 'MaterialName',
}, {
  title: '生产线库位',
  dataIndex: 'StationGroup',
}, {
  title: '创建时间',
  dataIndex: 'Layer',
}, {
  title: '创建人',
  dataIndex: 'Quantity',
}]
const wmsWorkOrder_DetailsColums = [{
  title: 'Id',
  dataIndex: 'Id',
}, {
  title: '工单号',
  dataIndex: 'Version',
}, {
  title: '状态',
  dataIndex: 'MaterialName',
}, {
  title: '料号',
  dataIndex: 'StationGroup',
}, {
  title: '单位',
  dataIndex: 'Layer',
}, {
  title: '反冲数量',
  dataIndex: 'Quantity',
}, {
  title: '反冲时间',
  dataIndex: 'Version',
}, {
  title: '区域',
  dataIndex: 'MaterialName',
}, {
  title: '生产线',
  dataIndex: 'StationGroup',
}]


export {
  //WMS系统
  wmsRawMaterialReceiptsColums,
  wmsRawMaterialReceipts_DetailsColums,
  wmsRawMaterialReceipts_Details_InfoColums,

  wmsWorkOrderColums,
  wmsWorkOrder_DetailsColums,
}


