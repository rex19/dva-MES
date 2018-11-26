import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Input, Row, Col, Button, Select, DatePicker, Table, Badge } from 'antd'
import PrintProvider, { Print, NoPrint } from 'react-easy-print';
import './index.less'

const InputGroup = Input.Group;
const { TextArea } = Input
const { Option, OptGroup } = Select;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
export const ModalComponents = ({
  addModalVisible,
  handleModalClose,
  addModalValue,
  editModalVisible,
  editModalValue,
  detailsModalVisible,
  deleteModalVisible,
  detailsModalValue,
  handleAdd,
  ModalWidth,

  PreviewSubTableList,//配货单预览table
  handlePrintFunction
}) => {
  const SubCreatOrderBlankColums = [{
    title: '状态',
    render: (text, record) => <span><Badge status={record.stateColor} />{record.stateValue}</span>
  }, {
    title: 'Id',
    dataIndex: 'Id',
  }, {
    title: '请求时间',
    dataIndex: 'createDateTime',
  }, {
    title: '请求地点',
    dataIndex: 'locationNumber',
  }, {
    title: '找料区域',
    dataIndex: 'areaNumber',
  }, {
    title: '物料料号',
    dataIndex: 'MaterialNumber',
  }, {
    title: '请求数量',
    dataIndex: 'Quantity',
  }]

  const handleOk = (modalType) => {
    handleAdd(modalType)
  }


  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  const printFunction = () => {
    handlePrintFunction()
  }
  const columns = [{
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: 'Age',
    dataIndex: 'age',
  }, {
    title: 'Address',
    dataIndex: 'address',
  }];
  const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '5',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '6',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '7',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '8',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '9',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '10',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '11',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '12',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '13',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '14',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '15',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '16',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '17',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '18',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '19',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '20',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '21',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '22',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '23',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '24',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '25',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '26',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '27',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  }, {
    key: '28',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  }];
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div>
      <Modal
        title="新建"
        visible={addModalVisible}
        width={ModalWidth || 520}
        onOk={() => handleOk('create')}
        onCancel={() => handleModalClose('addModalVisible')}
      >
        <div style={{ marginBottom: 16 }}>
          <InputGroup size="large" style={{ marginBottom: 10 }}>
            <Col span={10}>
              <Input addonBefore="成品/半成品料号" defaultValue="0571" />
            </Col>
            <Col span={10}>
              <Input addonBefore="版本号" defaultValue="26888888" />
            </Col>
            <Col span={3}>
              <Button>搜索</Button>
            </Col>
          </InputGroup>
          <Select
            defaultValue="成品半成品列表"
            style={{ width: 200, marginBottom: 10 }}
            onChange={handleChange}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </Select>
          <br />
          <Select
            defaultValue="工艺列表"
            style={{ width: 200, marginBottom: 10 }}
            onChange={handleChange}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
          </Select>

          <InputGroup size="large" style={{ marginBottom: 10 }}>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="工单号" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="数量" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Select
                defaultValue="总线体"
                style={{ width: 200 }}
                onChange={handleChange}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
              </Select>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Select
                defaultValue="班别"
                style={{ width: 200 }}
                onChange={handleChange}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
              </Select>
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="节拍时间" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="目标稼动率" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <DatePicker
                placeholder="计划开始"
                showTime format="YYYY-MM-DD HH:mm:ss" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <DatePicker
                placeholder="计划结束"
                showTime format="YYYY-MM-DD HH:mm:ss" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <TextArea rows={4} />
            </Row>
          </InputGroup>

        </div>
      </Modal>




      <Modal
        title="修改"
        visible={editModalVisible}
        width={ModalWidth || 520}
        onOk={() => handleOk('edit')}
        onCancel={() => handleModalClose('editModalVisible')}
      >
        <div style={{ marginBottom: 16 }}>
          <InputGroup size="large" style={{ marginBottom: 10 }}>
            <Col span={10}>
              <Input addonBefore="成品/半成品料号" defaultValue="0571" />
            </Col>
            <Col span={10}>
              <Input addonBefore="版本号" defaultValue="26888888" />
            </Col>
            <Col span={3}>
              <Button>搜索</Button>
            </Col>
          </InputGroup>
        </div>
      </Modal>
      <Modal
        title="配货单预览"
        visible={detailsModalVisible}
        width={ModalWidth || 920}
        onOk={() => handleModalClose('detailsModalVisible')}
        onCancel={() => handleModalClose('detailsModalVisible')}
        footer={null}
      >
        <PrintProvider>
          <div style={{ marginBottom: 16 }} id="pageBreak">
            <Row style={{ marginBottom: 10 }}>
              <NoPrint>
                <Button id="print-mount" style={{ marginBottom: '10px' }} onClick={printFunction}>打印</Button>
              </NoPrint>
              <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />,

            </Row>
            <Row >
            </Row>
          </div>
        </PrintProvider>
      </Modal>
      <Modal
        title="删除提示"
        visible={deleteModalVisible}
        onOk={() => handleOk('delete')}
        onCancel={() => handleModalClose('deleteModalVisible')}
      >
        <p>确认删除吗？？</p>
      </Modal>
    </div>

  )
}
ModalComponents.propTypes = {
  addModalVisible: PropTypes.bool,
  handleModalClose: PropTypes.func,
  addModalValue: PropTypes.object,
  editModalVisible: PropTypes.bool,
  editModalValue: PropTypes.object,
  detailsModalVisiable: PropTypes.bool,
  detailsModalValue: PropTypes.object,
  deleteModalVisiable: PropTypes.bool,
  handleAdd: PropTypes.func,
}


const dataSource = [{
  "areaNumber": "301",
  "Quantity": 125,
  "MaterialNumber": "1.1.004",
  "id": 4,
  "locationNumber": "MA0000_LOC",
  "createDateTime": 1541865600000,
  "RequestItemDataArra": 0
}];



// <PrintTemplate>
// <div>
//   <Table pagination={false} dataSource={PreviewSubTableList} columns={SubCreatOrderBlankColums} />
// </div>
// </PrintTemplate>


// <Modal
// title="配货单预览"
// visible={detailsModalVisible}
// width={ModalWidth || 920}
// onOk={() => handleModalClose('detailsModalVisible')}
// onCancel={() => handleModalClose('detailsModalVisible')}
// footer={null}
// >
// <div style={{ marginBottom: 16 }}>

//   <InputGroup size="large" style={{ marginBottom: 10 }}>
//     <Row style={{ marginBottom: 10 }}>
//       <Button  style={{ marginBottom: '10px' }} onClick={printFunction}>打印</Button>
//       <Table pagination={false} dataSource={PreviewSubTableList} columns={SubCreatOrderBlankColums} />
//     </Row>
//   </InputGroup>
// </div>
// </Modal>


// <Table pagination={false} dataSource={PreviewSubTableList} columns={SubCreatOrderBlankColums} />
