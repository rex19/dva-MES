import React from 'react'
import { Form, Input, Row, Col, Radio, Select, DatePicker, Button, Icon } from 'antd'
import { connect } from 'dva'
import { WMSTableComponents } from '../../../components'
import globalConfig from 'utils/config'

import moment from 'moment';
import './index.less'

const data = []
//每个table可能不同的变量字段(1)
const TableName = 'checkList'
// const TableColumns = wmsPutStorageOfFinishedProductColums
const { Option } = Select
const dateFormat = 'YYYY-MM-DD';
const FormItem = Form.Item

const SearchFormLayout = ['areaIdForm', 'formCodeForm', 'SearchDate_FromForm', 'SearchDate_ToForm']

const CheckListTableComponents = ({
  checkList,
  dispatch,
  location,
  form
}) => {
  const TableModelsData = checkList
  const {
    PutStorageOfFinishedProductList,
    PutStorageOfFinishedProduct_ProjectInfoList,
    PutStorageOfFinishedProduct_OutputMaterialBoxInfoList,

    checkListTableList,
    CheckList_ClassificationInfoList,
    CheckList_ScanRecordList,
    AreaIdArray,
    pagination,
  } = TableModelsData

  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  console.log('CheckListTableComponents', TableModelsData)

  //查看
  const handleClickSearch = (Id) => {
    dispatch({
      type: `${TableName}/WMS_GetMaterialCheckBillGroupByFormId`,
      payload: {
        Id: Id,
      },
    })
  }
  //固化报告
  const handleCuringReport = (Id) => {
    dispatch({
      type: `${TableName}/WMS_SetMateriallCheckBillFormEnd`,
      payload: {
        MaterialCheckBillFormId: Id,
        UserId: 10
      },
    })
  }
  //生成文件
  const handleGenerateFile = (Id) => {
    dispatch({
      type: `${TableName}/WMS_SaveFileMaterialCheckBillGroupByFormId`,
      payload: {
        MaterialCheckBillFormId: Id,
      },
    })
  }

  //获取第三表数据
  const getScannedQuantityRequest = (MaterialId, MaterialCheckBillFormId) => {
    dispatch({
      type: `${TableName}/WMS_GetMaterialCheckInformationByMaterialIdForList`,
      payload: {
        MaterialId: MaterialId,
        MaterialCheckBillFormId: MaterialCheckBillFormId
      }
    })
  }
  //调整
  const handleAdjustment = (MaterialId, MaterialCheckBillFormId) => {
    dispatch({
      type: `${TableName}/WMS_DoMateriallCheckBillContainerAdjust`,
      payload: {
        MaterialId: MaterialId,
        MaterialCheckBillFormId: MaterialCheckBillFormId,
        UserId: 10
      }
    })
  }




  const wmsCheckListColums = [{
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
    title: '操作',
    key: (new Date()).valueOf(),
    fixed: 'right',
    width: 140,
    render: (text, record) => (
      <span>
        <a onClick={() => handleClickSearch(record.Id)} className="ant-dropdown-link">
          查看
      </a>
        <span className="ant-divider" />
        <a onClick={() => handleCuringReport(record.Id)} className="ant-dropdown-link">
          固化报告
        </a>
        <span className="ant-divider" />
        <a onClick={() => handleGenerateFile(record.Id)} className="ant-dropdown-link">
          生成文件
        </a>
      </span>

    ),
  }]

  const wmsCheckList_ClassificationInfoColums = [{
    title: '物料代码',
    dataIndex: 'MaterialNumber',
    render: (text, record) => <a onClick={() => getScannedQuantityRequest(record.MaterialId, record.MaterialCheckBillFormId)}>{text}</a>,
  }, {
    title: '盘点总数',
    dataIndex: 'ScanQuantity',
  }, {
    title: '系统中总数',
    dataIndex: 'SystemQuantity',
  }, {
    title: '差异数',
    dataIndex: 'DifferenceQuantity',
  }, {
    title: '操作',
    key: (new Date()).valueOf(),
    fixed: 'right',
    width: 140,
    render: (text, record) => (
      <span>
        <a onClick={() => handleAdjustment(record.MaterialId, record.MaterialCheckBillFormId)} className="ant-dropdown-link">
          调整
      </a>
      </span>

    ),
  }]
  const wmsCheckList_ScanRecordColums = [{
    title: '料盘UID',
    dataIndex: 'ContainerNumber',
  }, {
    title: '料号',
    dataIndex: 'MaterialNumber',
  }, {
    title: '数量',
    dataIndex: 'ScanQuantity',
  }, {
    title: '扫描时间',
    dataIndex: 'CheckDateTime',
  }, {
    title: '扫描人',
    dataIndex: 'StocktakerUserName',
  }]

  const handleSearch = (e) => {
    e.preventDefault();
    validateFields(SearchFormLayout, (err, payload) => {
      if (!err) {
        const Params = {
          AreaId: payload.areaIdForm,
          FormCode: payload.formCodeForm,
          SearchDate_From: moment(payload.SearchDate_FromForm).format(dateFormat),
          SearchDate_To: moment(payload.SearchDate_ToForm).format(dateFormat),
        }
        console.log('handleSearch-Params', Params)
        // this.props.handleSearchFormComponents(Params, 'formComponentsValueToSettingState')
        // dispatch({
        //   type: `${TableName}/query`,
        //   payload: Params,
        // })
        SearchTableList(Params, pagination.PageIndex, pagination.PageSize)
      }
    });
  }
  const SearchTableList = (payload, PageIndex, PageSize) => {
    dispatch({
      type: `${TableName}/query`,
      payload: {
        ...payload,
        PageIndex: PageIndex,
        PageSize: PageSize
      },
    })
  }

  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
      <div style={{ marginBottom: '20px', borderColor: 'red', borderWidth: '1px' }}>
        <Form
          className="ant-advanced-search-form"
          onSubmit={handleSearch}
        >
          <Form>
            <Row gutter={40}>
              <Col span={8} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`区域`}>
                  {getFieldDecorator(`areaIdForm`)(
                    <Select>
                      {AreaIdArray.map(function (item, index) {
                        return <Option key={index} value={item.key}>{item.label}</Option>
                      })}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`盘点单号`}>
                  {getFieldDecorator(`formCodeForm`)(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`开始时间`}>
                  {getFieldDecorator(`SearchDate_FromForm`, {
                    initialValue: '',
                  })(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss" />
                    )}
                </FormItem>
              </Col>
              <Col span={8} key={3} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`结束时间`}>
                  {getFieldDecorator(`SearchDate_ToForm`, {
                    initialValue: '',
                  })(
                    <DatePicker
                      showTime
                      format="YYYY-MM-DD HH:mm:ss" />
                    )}
                </FormItem>
              </Col>

            </Row>
          </Form>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <h2 style={{ margin: '20px' }}>盘点单</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={checkListTableList}
          columns={wmsCheckListColums}
          TableWidth={800}
        />
      </div>
      <div style={{ margin: '20px' }}></div>
      <h2 style={{ margin: '20px' }}>盘点结果分析汇总</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={CheckList_ClassificationInfoList}
          columns={wmsCheckList_ClassificationInfoColums}
          TableWidth={800}
          TableHight={240}
        />
      </div>
      <div style={{ margin: '20px' }}></div>
      <h2 style={{ margin: '20px' }}>扫描记录</h2>
      <div>
        <WMSTableComponents
          tableName={TableName}
          data={CheckList_ScanRecordList}
          columns={wmsCheckList_ScanRecordColums}
          TableWidth={800}
        />
      </div>
    </div>
  )
}


export default connect(({ checkList }) => ({ checkList }))(Form.create()(CheckListTableComponents))



// <Select>
// <Option key={0} value='0'>未激活</Option>
// <Option key={1} value='1'>激活</Option>
// <Option key={2} value='-1'>已删除</Option>
// </Select>


// const wmsPutStorageOfFinishedProductColums = [{
//   title: 'Id',
//   dataIndex: 'Id',
// }, {
//   title: '单据号',
//   dataIndex: 'FormNumber',
// }, {
//   title: '创建时间',
//   dataIndex: 'CreationDateTime',
// }, {
//   title: '创建人',
//   dataIndex: 'CreatorUserName',
// }, {
//   title: '操作',
//   key: (new Date()).valueOf(),
//   fixed: 'right',
//   width: 140,
//   render: (text, record) => (
//     <span>
//       <a onClick={() => handleClickSearch(record.Id)} className="ant-dropdown-link">
//         查看
//     </a>
//     </span>
//   ),
// }]

// const wmsPutStorageOfFinishedProduct_ProjectInfoColums = [{
//   title: '项目号',
//   dataIndex: 'ItemNumber',
// }, {
//   title: '工单号',
//   dataIndex: 'WorkOrderCode',
// }, {
//   title: '料号',
//   dataIndex: 'MaterialNumber',
// }, {
//   title: '单位',
//   dataIndex: 'UnitName',
// }, {
//   title: '需出库数量',
//   dataIndex: 'RequestQuantity',
// }, {
//   title: '实际出库数量',
//   dataIndex: 'ScannedQuantity',
//   render: (text, record) => <a onClick={() => getScannedQuantityRequest(record.WMSFormId, record.ItemNumber)}>{text}</a>,
// }, {
//   title: '目标库位',
//   dataIndex: 'TargetLocationNumber',
// }]
// const wmsPutStorageOfFinishedProduct_OutputMaterialBoxInfoColums = [{
//   title: 'Id',
//   dataIndex: 'Id',
// }, {
//   title: '容器UID',
//   dataIndex: 'ContainerNumber',
// }, {
//   title: '料号',
//   dataIndex: 'MaterialNumber',
// }, {
//   title: '入库数量',
//   dataIndex: 'TotalQuantity',
// }, {
//   title: '目前库位',
//   dataIndex: 'CurrentLocationNumber',
// }]
