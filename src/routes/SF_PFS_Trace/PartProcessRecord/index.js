// import React from 'react'
// import { Row, Col, Tabs } from 'antd'



// const OverStationRecordOfPart = () => (
//   <Row>
//     <h1 style={{ textAlign: 'center' }}>OverStationRecordOfPart</h1>
//   </Row>)

// export default OverStationRecordOfPart




import React from 'react'
import { Form, Input, Row, Col, Radio, Select, Button, DatePicker, Switch, Icon } from 'antd'
import { connect } from 'dva'
import moment from 'moment';
// import { FormComponents, TableComponents } from '../../../components'
// import FormComponents from '../Components/TracePartByStationFromComponents'
import TableComponents from '../Components/TracePartByStationTableComponents'
import globalConfig from 'utils/config'
// import './index.less'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
const { RangePicker } = DatePicker;

//每个table可能不同的变量字段(1)
const TableName = 'partProcessRecord'

const PartProcessRecordComponents = ({
  partProcessRecord,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = partProcessRecord
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible,
    deleteModalVisible, EditData, DetailsData, SelectInitData,
    WorkOrderNumber,
    WorkOrderPlannedQuantity,
    PartPartNumber,
    PartState,
    PartDescription,
    PartDrawingNumber,
    CustomerPartNumber } = TableModelsData

  console.log('TableComponents-partProcessRecord ', TableModelsData)


  const Colums = [{
    title: '工件序列号',
    dataIndex: 'PartSerialNumber',
  }, {
    title: '位置',
    dataIndex: 'Position',
  }, {
    title: '工站号',
    dataIndex: 'StationNumber',
  }, {
    title: '工站名',
    dataIndex: 'StationName',
  }, {
    title: '维修站点',
    dataIndex: 'RepairStationNumber',
  }, {
    title: '工单号',
    dataIndex: 'WorkOrder',
  }, {
    title: '料号',
    dataIndex: 'PartPartNumber',
  }, {
    title: '完成时间',
    dataIndex: 'PartProcessCompleteDateTime',
  }, {
    title: '上传时间',
    dataIndex: 'UploadingDateTime',
  }, {
    title: '节拍',
    dataIndex: 'CycleTime',
  }, {
    title: '结果',
    dataIndex: 'PartState',
  }, {
    title: '操作员工号',
    dataIndex: 'OperatorNumber',
  }, {
    title: '操作员姓名',
    dataIndex: 'OperatorName',
  }, {
    title: '容器号',
    dataIndex: 'ContainerNumber',
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
          RecordType: values.RecordTypeDecorator,
        }
        dispatch({
          type: `${TableName}/GetPartProcessRecordByStation`,
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
          <Form>
            <Row gutter={40}>
              <Col span={8} key={3} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`工件序列号`}>
                  {getFieldDecorator(`PartSerialNumberDecorator`, {
                    initialValue: '',
                  })(
                    <Input />
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={40}>
              <Col span={8} key={3} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`显示记录`}>
                  {getFieldDecorator(`RecordTypeDecorator`, {
                    initialValue: '请选择',
                  })(
                    <Select
                      style={{ width: 200 }}
                      onChange={SelectChange}
                    >
                      {SelectInitData.map(function (item, index) {
                        return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                      })}
                    </Select>
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
      <div>
        <div style={{ marginBottom: '20px', border: '5px solid white', borderWidth: '0.5px' }}>
          <Row gutter={40}>
            <Col span={8} key={1} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`工单号`}>
                {getFieldDecorator(`test1`, {
                  initialValue: WorkOrderNumber,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8} key={2} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`工单数量`}>
                {getFieldDecorator(`test2`, {
                  initialValue: WorkOrderPlannedQuantity,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8} key={3} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`料号`}>
                {getFieldDecorator(`test3`, {
                  initialValue: PartPartNumber,
                })(<Input />)}
              </FormItem>
            </Col>

          </Row>
          <Row gutter={40}>
            <Col span={8} key={1} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`状态`}>
                {getFieldDecorator(`test3`, {
                  initialValue: PartState,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8} key={2} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`描述`}>
                {getFieldDecorator(`描述`, {
                  initialValue: PartDescription,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8} key={3} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`图号`}>
                {getFieldDecorator(`图号`, {
                  initialValue: PartDrawingNumber,
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8} key={4} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`客户料号`}>
                {getFieldDecorator(`客户料号`, {
                  initialValue: CustomerPartNumber,
                })(<Input />)}
              </FormItem>
            </Col>

          </Row>
        </div>
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


export default connect(({ partProcessRecord }) => ({ partProcessRecord }))(Form.create()(PartProcessRecordComponents))


