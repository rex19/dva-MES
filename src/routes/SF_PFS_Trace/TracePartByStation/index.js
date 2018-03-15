// import React from 'react'
// import { Form, Input, Row, Col, Radio, Select } from 'antd'
// import { connect } from 'dva'
// import FormComponents from '../components/workOrderActivationFormComponent'
// import TableComponents from '../components/workOrderActivationTableComponent'
// import globalConfig from 'utils/config'
// import './index.less'

// const { Option } = Select
// const RadioGroup = Radio.Group
// const FormItem = Form.Item
// //每个table可能不同的变量字段(1)
// const TableName = 'workOrderActivation'
// const AddFormLayout = [
//   'AddLocationNumber',
//   'AddDescription',
//   'AddAreaId',
//   'AddX',
//   'AddY',
//   'AddZ',
//   'AddState']
// const EditFormLayout = [
//   'EditId',
//   'EditLocationNumber',
//   'EditDescription',
//   'EditAreaId',
//   'EditX',
//   'EditY',
//   'EditZ',
//   'EditState']


// const workOrderActivationColums = [{
//   title: '状态',
//   dataIndex: 'State',
// }, {
//   title: '工站编号',
//   dataIndex: 'StationNr',
// }, {
//   title: '物料号',
//   dataIndex: 'Layer',
// }, {
//   title: '物料描述',
//   dataIndex: 'StationDescription',
// }, {
//   title: '产品位置',
//   dataIndex: 'MaterialNumber',
// }, {
//   title: '料道位置',
//   dataIndex: 'FeederLocation',
// }, {
//   title: '物料容器号',
//   dataIndex: 'MaterialContainerNumber',
// }, {
//   title: '供应商',
//   dataIndex: 'SupplierName',
// }, {
//   title: '供应商料号',
//   dataIndex: 'SupplierMaterialNumber',
// }, {
//   title: '批次号',
//   dataIndex: 'BatchNumber',
// }, {
//   title: '数量',
//   dataIndex: 'MaterialQuantity',
// }, {
//   title: '上料时间',
//   dataIndex: 'ScannedDateTime',
// }, {
//   title: '上料员工号',
//   dataIndex: 'OperatorNumber',
// }, {
//   title: '上料员姓名',
//   dataIndex: 'OperatorName',
// }]

// const TracePartByStationComponents = ({
//   workOrderActivation,
//   dispatch,
//   location,
//   form
// }) => {
//   //每个table可能不同的变量字段(2)
//   const TableModelsData = workOrderActivation
//   const { getFieldDecorator, validateFields, resetFields } = form
//   const formItemLayout = globalConfig.table.formItemLayout
//   const { list, TableComponentsValueToWorkOrderSettingState, GetStationInformationInitData,
//     pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, EditData, DetailsData, AreaList } = TableModelsData

//   console.log('WorkOrderListComponent-WorkOrderList ', TableModelsData)
//   /**
//    * crud modal
//    */
//   // 定义表单域 =>发出Action  每个table可能不同的变量字段(3)
//   const handleAdd = (modalType) => {
//     if (modalType === 'create') {
//       validateFields(AddFormLayout, (err, payload) => {
//         const createParam = { LocationNumber: payload.AddLocationNumber, Description: payload.AddDescription, AreaId: parseInt(payload.AddAreaId), X: payload.AddX, Y: payload.AddY, Z: payload.AddZ, State: parseInt(payload.AddState) }
//         if (!err) {
//           dispatch({
//             type: `${TableName}/${modalType}`,
//             payload: createParam,
//           })
//           resetFields(AddFormLayout)
//         }
//       })
//     } else if (modalType === 'edit') {
//       validateFields(EditFormLayout, (err, payload) => {
//         const editParam = { Id: payload.EditId, LocationNumber: payload.EditLocationNumber, Description: payload.EditDescription, AreaId: parseInt(payload.EditAreaId), X: payload.EditX, Y: payload.EditY, Z: payload.EditZ, State: parseInt(payload.EditState) }
//         if (!err) {
//           dispatch({
//             type: `${TableName}/${modalType}`,
//             payload: editParam,
//           })
//         }
//       })
//     }
//   }

//   /**
//    * modal 开关
//    */
//   const handleAddModalOpen = (modalVisible) => {
//     dispatch({
//       type: `${TableName}/showModal`,
//       payload: {
//         modalType: modalVisible,
//       },
//     })
//   }

//   /**
//  * formComponent 触发查询
//  */
//   const handleSearchFormComponents = (Params, modalType) => {
//     console.log('handleSearchFormComponents', Params, modalType)
//     dispatch({
//       type: `${TableName}/handleSearchFormComponents`,
//       payload: {
//         modalType: modalType,
//         Params: Params
//       },
//     })
//   }
//   //每个table可能不同的变量字段(4)
//   const formComponentsValue = () => {
//     const handleChange = (value) => {
//       console.log(`selected ${value}`);
//     }
//     return (
//       <div>
//         formComponentsValue
//     </div>
//     )
//   }


//   return (
//     <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
//       <div style={{ marginBottom: '20px', borderColor: 'red', borderWidth: '1px' }}>
//         <FormComponents
//           GetStationInformationInitData={GetStationInformationInitData}
//           handleSearchFormComponents={handleSearchFormComponents}
//           formComponentsValue={formComponentsValue()}
//         />
//       </div>
//       <div>
//         <TableComponents
//           tableName={TableName}
//           data={TableComponentsValueToWorkOrderSettingState}
//           tableLoading={tableLoading}
//           pagination={pagination}
//           columns={workOrderActivationColums}
//           TableWidth={1800}
//           addModalValue={addModalValue()}
//           editModalValue={editModalValue()}
//           detailsModalValue={detailsModalValue()}
//           handleAdd={handleAdd}
//           tableModels={TableModelsData}
//         />
//       </div>
//     </div>
//   )
// }


// export default connect(({ workOrderActivation }) => ({ workOrderActivation }))(Form.create()(TracePartByStationComponents))









import React from 'react'
import { Row, Col, Tabs } from 'antd'



const TracePartByStation = () => (
  <Row>
    <h1 style={{ textAlign: 'center' }}>TracePartByStation</h1>
  </Row>)

export default TracePartByStation




