import React from 'react'
import { Form, Input, Row, Col, Radio, Select, Button, DatePicker, Switch, Icon } from 'antd'
import { connect } from 'dva'
import moment from 'moment';
import FormComponents from '../Components/TracePartByStationFromComponents'
import TableComponents from '../Components/TracePartByStationTableComponents'
// import TableComponents from '../Components/TraceMachineAbnormalRecordTableComponents'
import globalConfig from 'utils/config'
// import './index.less'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
const { RangePicker } = DatePicker;

//每个table可能不同的变量字段(1)
const TableName = 'traceMachineAbnormalRecord'

const TraceMachineAbnormalRecordComponents = ({
  traceMachineAbnormalRecord,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = traceMachineAbnormalRecord
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, EditData, DetailsData, SelectInitData } = TableModelsData

  console.log('TableComponents-traceMachineAbnormalRecord ', TableModelsData)
  //工站异常查询
  const Colums = [{
    title: '工站编号',
    dataIndex: 'StationNumber',
  }, {
    title: '工站描述',
    dataIndex: 'StationName',
  }, {
    title: '发生问题前一个产品序列号',
    dataIndex: 'SerialNumberOfIssueHappened',
  }, {
    title: '问题解决后一个产品序列号',
    dataIndex: 'SerialNumberOfIssueFixed',
  }, {
    title: '异常代码',
    dataIndex: 'ErrorCode',
  }, {
    title: '异常描述',
    dataIndex: 'ErrorDescription',
  }, {
    title: '发生时间',
    dataIndex: 'IssueHappenedDateTime',
  }, {
    title: '结束时间',
    dataIndex: 'IssueFixedDateTIme',
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
          StationId: values.StationIdDecorator,
          StartDateTime: moment(values.StartDateTimeFieldDecorator[0]).format(),
          EndDateTime: moment(values.StartDateTimeFieldDecorator[1]).format(),
          PageIndex: 5,
          PageSize: 6
        }
        console.log('handleSearch-Params', Params)
        // this.props.handleSearchFormComponents(Params, 'formComponentsValueToSettingState')
        dispatch({
          type: `${TableName}/GetMachineAbnormalRecord`,
          payload: Params,
        })
      }
    });

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
              <Col span={8} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`工站选择`}>
                  {getFieldDecorator(`StationIdDecorator`, {
                    initialValue: '请选择',
                  })(
                    <Select
                      style={{ width: 200 }}
                    >
                      {SelectInitData.map(function (item, index) {
                        return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                      })}
                    </Select>
                    )}
                </FormItem>
              </Col>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`时间选择`}>
                  {getFieldDecorator(`StartDateTimeFieldDecorator`, {
                    initialValue: '',
                  })(
                    <RangePicker
                      showTime={{ format: 'HH:mm' }}
                      format="YYYY-MM-DD HH:mm"
                      placeholder={['计划开始', '计划结束']}
                    />
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


export default connect(({ traceMachineAbnormalRecord }) => ({ traceMachineAbnormalRecord }))(Form.create()(TraceMachineAbnormalRecordComponents))






