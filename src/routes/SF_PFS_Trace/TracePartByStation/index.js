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
const TableName = 'tracePartByStation'

const TracePartByStationComponents = ({
  tracePartByStation,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = tracePartByStation
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, EditData, DetailsData, StationIdSelectData } = TableModelsData

  console.log('TableComponents-tracePartByStation ', TableModelsData)


  const TracePartByStationColums = [{
    title: '工件序列号',
    dataIndex: 'PartSerialNumber',
  }, {
    title: '工站号',
    dataIndex: 'StationCode',
  }, {
    title: '工单号',
    dataIndex: 'WorkOrderNumber',
  }, {
    title: '物料号',
    dataIndex: 'PartPartNumber',
  }, {
    title: '测试时间',
    dataIndex: 'ProductionFinishedDateTime',
  }, {
    title: '上传时间',
    dataIndex: 'UploadDateTime',
  }, {
    title: '结果',
    dataIndex: 'PartState',
  }]
  // , {
  //   title: '操作员工号',
  //   dataIndex: 'OperatorCode',
  // }, {
  //   title: '操作员姓名',
  //   dataIndex: 'OperatorName',
  // }, {
  //   title: '成品箱号',
  //   dataIndex: 'FinishBoxNumber',
  // }

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
          IsOnlyShowFinalResult: values.IsOnlyShowFinalResultFieldDecorator,
          PageIndex: 1,
          PageSize: 10
        }
        console.log('handleSearch-Params', Params)
        // this.props.handleSearchFormComponents(Params, 'formComponentsValueToSettingState')
        dispatch({
          type: `${TableName}/GetTracePartByStationQuery`,
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
                <FormItem {...formItemLayout} label={`工站选择`}>
                  {getFieldDecorator(`StationIdDecorator`, {
                    initialValue: '请选择',
                  })(
                    <Select
                      style={{ width: 200 }}
                      onChange={SelectChange}
                    >
                      {StationIdSelectData.map(function (item, index) {
                        return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                      })}
                    </Select>
                    )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={40}>
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
            <Row gutter={40}>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`只显示结果`}>
                  {getFieldDecorator(`IsOnlyShowFinalResultFieldDecorator`, {
                    initialValue: false,
                  })(
                    <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} onChange={CheckedOnChange} />
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
          columns={TracePartByStationColums}
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


export default connect(({ tracePartByStation }) => ({ tracePartByStation }))(Form.create()(TracePartByStationComponents))



// {this.props.GetStationInformationInitData.map(function (item, index) {
//   return <Option key={index} value={item.key.toString()}>{item.label}</Option>
// })}

// <FormComponents
// formComponentsValue={formComponentsValue()}
// />

// import React from 'react'
// import { Row, Col, Tabs } from 'antd'



// const TracePartByStation = () => (
//   <Row>
//     <h1 style={{ textAlign: 'center' }}>TracePartByStation</h1>
//     <div>
//     </div>
//   </Row>)

// export default TracePartByStation




