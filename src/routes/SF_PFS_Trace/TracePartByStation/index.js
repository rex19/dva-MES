import React from 'react'
import { Form, Input, Row, Col, Radio, Select } from 'antd'
import { connect } from 'dva'
// import { FormComponents, TableComponents } from '../../../components'
import FormComponents from '../Components/TracePartByStationFromComponents'
import TableComponents from '../Components/TracePartByStationTableComponents'
import globalConfig from 'utils/config'
import { stationTableColumns } from '../../../mock/tableColums'
// import './index.less'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
//每个table可能不同的变量字段(1)
const TableName = 'tracePartByStation'
const TableColumns = stationTableColumns
const AddFormLayout = ['AddStationNumber', 'AddName', 'AddStationType', 'AddState']
const EditFormLayout = ['EditId', 'EditStationNumber', 'EditName', 'EditStationType', 'EditState', 'EditStationGroup']

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
  const { list, pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, EditData, DetailsData, TotalStationGroup, SelectedStationGroup } = TableModelsData

  console.log('TableComponents-tracePartByStation ', TableModelsData)


  const wmsContainerInfoColums = [{
    title: '工件序列号',
    dataIndex: 'Id',
  }, {
    title: '工站号',
    dataIndex: 'MaterialNumber',
  }, {
    title: '工单号',
    dataIndex: 'ContainerNumber',
  }, {
    title: '物料号',
    dataIndex: 'StateName',
  }, {
    title: '测试时间',
    dataIndex: 'UnitName',
  }, {
    title: '上传时间',
    dataIndex: 'TotalQuantity',
  }, {
    title: '结果',
    dataIndex: 'Quantity',
  }, {
    title: '操作员工号',
    dataIndex: 'CurrentLocationNumber',
  }, {
    title: '操作员姓名',
    dataIndex: 'SupplierName',
  }, {
    title: '成品箱号',
    dataIndex: 'BatchNumber',
  }]

  const dataTest = []
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

  /**
   * modal 开关
   */
  const handleAddModalOpen = (modalVisible) => {
    dispatch({
      type: `${TableName}/showModal`,
      payload: {
        modalType: modalVisible,
      },
    })
  }
  //每个table可能不同的变量字段(4)
  const formComponentsValue = () => {
    return (
      <Form>
        <Row gutter={40}>
          <Col span={8} key={1} style={{ display: 'block' }}>
            <FormItem {...formItemLayout} label={`测试1`}>
              {getFieldDecorator(`field1`)(
                <Input placeholder="placeholder" />
              )}
            </FormItem>
          </Col>

        </Row>
      </Form>
    )
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

  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
      <div style={{ marginBottom: '20px', borderColor: 'red', borderWidth: '1px' }}>
        <FormComponents
          formComponentsValue={formComponentsValue()}
        />
      </div>
      <div>
        <TableComponents
          tableName={TableName}
          // data={list}
          data={dataTest}
          tableLoading={tableLoading}
          pagination={pagination}
          columns={TableColumns}
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







// import React from 'react'
// import { Row, Col, Tabs } from 'antd'



// const TracePartByStation = () => (
//   <Row>
//     <h1 style={{ textAlign: 'center' }}>TracePartByStation</h1>
//     <div>
//     </div>
//   </Row>)

// export default TracePartByStation




