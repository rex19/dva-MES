

import React from 'react'
import { Form, Input, Row, Col, Radio, Select, Button, DatePicker, Switch, Icon } from 'antd'
import { connect } from 'dva'
import moment from 'moment';
// import { FormComponents, TableComponents } from '../../../components'
import FormComponents from '../Components/TracePartByStationFromComponents'
import TableComponents from '../Components/TracePartByStationTableComponents'
import globalConfig from 'utils/config'
// import './index.less'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
const { RangePicker } = DatePicker;
const { TextArea } = Input;


//每个table可能不同的变量字段(1)
const TableName = 'partMergeRecord'
const Decorator = 'Decorator'

const PartMergeRecordComponents = ({
  partMergeRecord,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = partMergeRecord
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible,
    deleteModalVisible, EditData, DetailsData,
    WorkOrderNumber,
    WorkOrderPlannedQuantity,
    PartPartNumber,
    PartState,
    PartDescription,
    PartDrawingNumber,
    CustomerPartNumber,

  } = TableModelsData

  console.log('TableComponents-partMergeRecord ', TableModelsData)


  const Colums = [{
    title: '装配编号',
    dataIndex: 'MergeRecordId',
  }, {
    title: '工件序列号',
    dataIndex: 'PartSerialNumber',
  }, {
    title: '位置',
    dataIndex: 'Position',
  }, {
    title: '被装配工件序列号',
    dataIndex: 'BeenMergedPartSerialNumber',
  }, {
    title: '装配工站好',
    dataIndex: 'StationNumber',
  }, {
    title: '工站名',
    dataIndex: 'StationName',
  }, {
    title: '工单号',
    dataIndex: 'WorkOrderNumber',
  }, {
    title: '产品料号',
    dataIndex: 'PartPartNumber',
  }, {
    title: '产品描述',
    dataIndex: 'PartDescription',
  }, {
    title: '被装配件工单',
    dataIndex: 'BeenMergedWorkOrderNumber',
  }, {
    title: '被装配件料号',
    dataIndex: 'BeenMergedPartPartNumber',
  }, {
    title: '被装配件描述',
    dataIndex: 'BeenMergedPartDescription',
  }, {
    title: '装配时间',
    dataIndex: 'MergeDateTime',
  }, {
    title: '结果',
    dataIndex: 'PartState',
  }, {
    title: '操作员工号',
    dataIndex: 'OperatorCode',
  }, {
    title: '操作员姓名',
    dataIndex: 'OperatorName',
  }]


  /**
   * crud modal
   */
  // 定义表单域 =>发出Action  每个table可能不同的变量字段(3)
  const handleAdd = (modalType) => {
    if (modalType === 'create') {
      validateFields(AddFormLayout, (err, payload) => {
        const createParam = { StationNumber: payload.AddStationNumber, Name: payload.AddName, State: parseInt(payload.AddState), StationType: parseInt(payload.AddStationType) }
        if (!err) {
          dispatch({
            type: `${TableName}/${modalType}`,
            payload: createParam,
          })
          resetFields(AddFormLayout)
        }
      })
    } else if (modalType === 'edit') {
      validateFields(EditFormLayout, (err, payload) => {
        const editParam = { Id: payload.EditId, StationNumber: payload.EditStationNumber, Name: payload.EditName, StationType: parseInt(payload.EditStationType), State: parseInt(payload.EditState), StationGroupIdArray: payload.EditStationGroup.map(item => parseInt(item.key)) }
        if (!err) {
          dispatch({
            type: `${TableName}/${modalType}`,
            payload: editParam,
          })
        }
      })
    }
  }



  const addModalValue = () => {
    return (
      <div>
        addModalValue
      </div>
    )
  }
  const editModalValue = () => {
    return (
      <div>
        editModalValue
      </div>
    )
  }
  const detailsModalValue = () => {
    return (
      <div>
        detailsModalValue
      </div>
    )
  }

  const handleSearch = (e) => {
    e.preventDefault();

    validateFields((err, values) => {
      if (!err) {
        const Params = {
          PartSerialNumber: values.PartSerialNumberDecorator,
        }
        console.log('-Params', Params)
        dispatch({
          type: `${TableName}/GetPartMergeRecordByPartSerialNumber`,
          payload: Params,
        })
      }
    });

  }


  const SelectChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
  }

  const CheckedOnChange = (checked) => {
    console.log(`switch to ${checked}`);
  }
  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
      <div style={{ marginBottom: '20px', borderColor: 'red', borderWidth: '1px' }}>

        <Form
          className="ant-advanced-search-form"
          onSubmit={handleSearch}
        >

          <Row gutter={40}>
            <Col span={8} key={3} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`工件序列号`}>
                {getFieldDecorator(`PartSerialNumber${Decorator}`, {
                  initialValue: '',
                })(
                  <Input />
                  )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
            </Col>
          </Row>
          <Row gutter={40} style={{ marginTop: '20px' }}>
            <Col span={8} key={1} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`工单号`}>
                {getFieldDecorator(`WorkOrderNumber${Decorator}`, {
                  initialValue: WorkOrderNumber,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8} key={2} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`工单数量`}>
                {getFieldDecorator(`WorkOrderPlannedQuantity${Decorator}`, {
                  initialValue: WorkOrderPlannedQuantity,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8} key={3} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`料号`}>
                {getFieldDecorator(`PartPartNumber${Decorator}`, {
                  initialValue: PartPartNumber,
                })(<Input />)}
              </FormItem>
            </Col>

          </Row>
          <Row gutter={40}>
            <Col span={8} key={1} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`状态`}>
                {getFieldDecorator(`PartState${Decorator}`, {
                  initialValue: PartState,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8} key={2} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`描述`}>
                {getFieldDecorator(`PartDescription${Decorator}`, {
                  initialValue: PartDescription,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8} key={3} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`图号`}>
                {getFieldDecorator(`PartDrawingNumber${Decorator}`, {
                  initialValue: PartDrawingNumber,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8} key={4} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`客户料号`}>
                {getFieldDecorator(`CustomerPartNumber${Decorator}`, {
                  initialValue: CustomerPartNumber,
                })(<Input />)}
              </FormItem>
            </Col>

          </Row>
        </Form>
      </div>
      <div>
        <TableComponents
          tableName={TableName}
          data={list}
          // data={dataTest}
          tableLoading={tableLoading}
          pagination={pagination}
          columns={Colums}
          TableWidth={1300}
          addModalValue={addModalValue()}
          editModalValue={editModalValue()}
          detailsModalValue={detailsModalValue()}
          handleAdd={handleAdd}
          tableModels={TableModelsData}
        />
      </div>

    </div>
  )
}


export default connect(({ partMergeRecord }) => ({ partMergeRecord }))(Form.create()(PartMergeRecordComponents))





