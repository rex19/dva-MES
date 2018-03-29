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
const TableName = 'traceabilityByContainerAttribute'

const TraceabilityByContainerAttributeComponents = ({
  traceabilityByContainerAttribute,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = traceabilityByContainerAttribute
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, EditData, DetailsData, SelectInitData } = TableModelsData

  console.log('TableComponents-traceabilityByContainerAttribute ', TableModelsData)



  const Colums = [{
    title: '属性类别',
    dataIndex: 'AttributeType',
  }, {
    title: '状态',
    dataIndex: 'ContainerState',
  }, {
    title: '属性编号',
    dataIndex: 'AttributeCode',
  }, {
    title: '属性值',
    dataIndex: 'AttributeValue',
  }, {
    title: '属性分配时间',
    dataIndex: 'AssignedDateTime',
  }, {
    title: '属性分配站位',
    dataIndex: 'AssignedStationNumber',
  }, {
    title: '容器号',
    dataIndex: 'ContainerNumber',
  }, {
    title: '料号',
    dataIndex: 'MaterialPartNumber',
  }, {
    title: '供应商料号',
    dataIndex: 'SupplierMaterialNumber',
  }, {
    title: '供应商代码',
    AssigneeCode: 'SupplierCode',
  }, {
    title: '供应商名',
    dataIndex: 'SupplierName',
  }, {
    title: '批次',
    dataIndex: 'BatchNumber',
  }, {
    title: '描述',
    AssigneeCode: 'Description',
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
          AttributeCode: values.AttributeCodeDecorator,
          AttributeValue: values.AttributeValueDecorator,
          PageIndex: 5,
          PageSize: 6
        }
        console.log('handleSearch-Params', Params)
        // this.props.handleSearchFormComponents(Params, 'formComponentsValueToSettingState')
        dispatch({
          type: `${TableName}/GetContainerInformationByAttributeQuery`,
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
                <FormItem {...formItemLayout} label={`属性编号`}>
                  {getFieldDecorator(`AttributeCodeDecorator`, {
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
            <Row gutter={40}>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`属性值`}>
                  {getFieldDecorator(`AttributeValueDecorator`, {
                    initialValue: '',
                  })(
                    <input />
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


export default connect(({ traceabilityByContainerAttribute }) => ({ traceabilityByContainerAttribute }))(Form.create()(TraceabilityByContainerAttributeComponents))


