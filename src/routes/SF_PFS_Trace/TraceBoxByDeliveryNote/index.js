

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
const TableName = 'traceBoxByDeliveryNote'
const Decorator = 'Decorator'

const TraceBoxByDeliveryNoteComponents = ({
  traceBoxByDeliveryNote,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = traceBoxByDeliveryNote
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible,
    deleteModalVisible, EditData, DetailsData,
  } = TableModelsData

  console.log('TableComponents-traceBoxByDeliveryNote ', TableModelsData)

  //通过发货单追溯
  const Colums = [{
    title: '状态',
    dataIndex: 'BoxState',
  }, {
    title: '料号',
    dataIndex: 'PartPartNumber',
  }, {
    title: '客户料号',
    dataIndex: 'CustomerPartNumber',
  }, {
    title: '描述',
    dataIndex: 'Description',
  }, {
    title: '成品箱号',
    dataIndex: 'FinishGoodBoxNumber',
  }, {
    title: '货运单号',
    dataIndex: 'DeliveryNoteFormNumber',
  }, {
    title: '装箱时间',
    dataIndex: 'PackingDateTime',
  }, {
    title: '发货时间',
    dataIndex: 'DeliveryDateTime',
  }, {
    title: '操作员工号',
    dataIndex: 'OperatorCode',
  }, {
    title: '操作员姓名',
    AssigneeCode: 'OperatorName',
  }, {
    title: '发货员工号',
    dataIndex: 'DeliveryOperatorCode',
  }, {
    title: '发货员姓名',
    dataIndex: 'DeliveryOperatorName',
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
          DeliveryNote: values.DeliveryNoteDecorator,
        }
        console.log('-Params', Params)
        dispatch({
          type: `${TableName}/GetBoxInformationByDeliveryNote`,
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
              <FormItem {...formItemLayout} label={`成品箱号`}>
                {getFieldDecorator(`DeliveryNote${Decorator}`, {
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


export default connect(({ traceBoxByDeliveryNote }) => ({ traceBoxByDeliveryNote }))(Form.create()(TraceBoxByDeliveryNoteComponents))





