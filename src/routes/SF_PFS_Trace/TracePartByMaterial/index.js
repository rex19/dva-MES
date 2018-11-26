

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
const TableName = 'tracePartByMaterial'
const Decorator = 'Decorator'

const TracePartByMaterialComponents = ({
  tracePartByMaterial,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = tracePartByMaterial
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible,
    deleteModalVisible, EditData, DetailsData, TableData2
  } = TableModelsData

  console.log('TableComponents-tracePartByMaterial ', TableModelsData)

  const getRequest = (id) => {
    console.log('getRequest ID', id)
    dispatch({
      type: `${TableName}/GetPartInformationListByContainerNumber`,
      payload: {
        ContainerNumber: id,
        PageIndex: 1,
        PageSize: 10
      },
    })
  }

  //通过物料追溯工件
  const TracePartByMaterialColums1 = [{
    title: '容器号',
    dataIndex: 'ContainerNumber',
    render: (text, record) => <a onClick={() => getRequest(record.ContainerNumber)}>{text}</a>,
  }, {
    title: '容器状态',
    dataIndex: 'ContainerState',
  }, {
    title: '物料号',
    dataIndex: 'MaterialPartNumber',
  }, {
    title: '供应商料号',
    dataIndex: 'SupplierMaterialPartNumber',
  }, {
    title: '供应商名',
    dataIndex: 'SupplierName',
  }, {
    title: '物料批次号',
    dataIndex: 'BatchNumber',
  }]

  // , {
  //   title: '货运单号',
  //   dataIndex: 'DeliveryNoteFormNumber',
  // }, {
  //   title: '收货单号',
  //   dataIndex: 'GoodReceivingFormNumber',
  // }, {
  //   title: '到货时间',
  //   AssigneeCode: 'ArrivalDateTime',
  // }, {
  //   title: '收货时间',
  //   dataIndex: 'ReceivingDateTime',
  // }, {
  //   title: '注册时间',
  //   dataIndex: 'RegisterDateTime',
  // }, {
  //   title: '注册员工号',
  //   dataIndex: 'RegisterOperatorCode',
  // }, {
  //   title: '注册员工姓名',
  //   AssigneeCode: 'RegisterOperatorName',
  // }

  const TracePartByMaterialColums2 = [{
    title: '序列号',
    dataIndex: 'PartSerialNumber',
  }, {
    title: '序列号状态',
    dataIndex: 'PartState',
  }, {
    title: '成品序列号',
    dataIndex: 'FinishGoodSerialNumber',
  }, {
    title: '料号',
    dataIndex: 'PartPartNumber',
  }, {
    title: '客户料号',
    dataIndex: 'CustomerPartNumber',
  }, {
    title: '描述',
    dataIndex: 'PartDescription',
  }]

  // , {
  //   title: '成品箱号',
  //   dataIndex: 'FinishBoxNumber',
  // }, {
  //   title: '货运单号',
  //   dataIndex: 'DeliveryNoteFormNumber',
  // }, {
  //   title: '发货时间',
  //   dataIndex: 'DeliveryDateTime',
  // }, {
  //   title: '操作员工号',
  //   AssigneeCode: 'OperatorCode',
  // }, {
  //   title: '操作员姓名',
  //   dataIndex: 'OperatorName',
  // }, {
  //   title: '发货员工号',
  //   dataIndex: 'DeliveryOperatorCode',
  // }, {
  //   title: '发货员工姓名',
  //   dataIndex: 'DeliveryOperatorName',
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
          ContainerNumber: values.ContainerNumberDecorator,
          MaterialPartNumber: values.MaterialPartNumberDecorator,
          SupplierCode: values.SupplierCodeDecorator,
          BatchNumber: values.BatchNumberDecorator,
          DeliveryNoteFormCode: values.DeliveryNoteFormCodeDecorator,
          ReceivingFormCode: values.ReceivingFormCodeDecorator,
          SupplierMaterialPartNumber: values.SupplierMaterialPartNumberDecorator,
          PageIndex: 1,
          PageSize: 10
        }
        console.log('-Params', Params)
        dispatch({
          type: `${TableName}/GetMaterialContainerByCondition`,
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
            <Col span={8} key={1} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`物料容器号`}>
                {getFieldDecorator(`ContainerNumber${Decorator}`, {
                  initialValue: '',
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8} key={2} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`物料料号`}>
                {getFieldDecorator(`MaterialPartNumber${Decorator}`, {
                  initialValue: '',
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8} key={3} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`供应商编号`}>
                {getFieldDecorator(`SupplierCode${Decorator}`, {
                  initialValue: '',
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={40}>
            <Col span={8} key={1} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`物料批次号`}>
                {getFieldDecorator(`BatchNumber${Decorator}`, {
                  initialValue: '',
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8} key={2} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`货运单号`}>
                {getFieldDecorator(`DeliveryNoteFormCode${Decorator}`, {
                  initialValue: '',
                })(<Input />)}
              </FormItem>
            </Col>
            <Col span={8} key={3} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`收货单号`}>
                {getFieldDecorator(`ReceivingFormCode${Decorator}`, {
                  initialValue: '',
                })(<Input />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={40}>
            <Col span={8} key={1} style={{ display: 'block' }}>
              <FormItem {...formItemLayout} label={`供应商料号`}>
                {getFieldDecorator(`SupplierMaterialPartNumber${Decorator}`, {
                  initialValue: '',
                })(<Input />)}
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
          columns={TracePartByMaterialColums1}
          TableWidth={1300}
          addModalValue={addModalValue()}
          editModalValue={editModalValue()}
          detailsModalValue={detailsModalValue()}
          handleAdd={handleAdd}
          tableModels={TableModelsData}
        />
      </div>
      <div style={{ marginTop: '15px' }}>
        <TableComponents
          tableName={TableName}
          data={TableData2}
          // data={dataTest}
          tableLoading={tableLoading}
          pagination={pagination}
          columns={TracePartByMaterialColums2}
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


export default connect(({ tracePartByMaterial }) => ({ tracePartByMaterial }))(Form.create()(TracePartByMaterialComponents))





