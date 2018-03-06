import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Input, Row, Col, Button, Select, DatePicker, Table } from 'antd'
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
  ModalWidth
}) => {
  const handleOk = (modalType) => {
    handleAdd(modalType)
  }


  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }
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
            <Row >
              <DatePicker
                placeholder="计划开始"
                showTime format="YYYY-MM-DD HH:mm:ss" />
            </Row>
            <Row >
              <DatePicker
                placeholder="计划结束"
                showTime format="YYYY-MM-DD HH:mm:ss" />
            </Row>
            <Row>
              <TextArea rows={4} />
            </Row>
          </InputGroup>

        </div>
      </Modal>
      <Modal
        title="详细"
        visible={detailsModalVisible}
        width={ModalWidth || 920}
        onOk={() => handleModalClose('detailsModalVisible')}
        onCancel={() => handleModalClose('detailsModalVisible')}
      >
        <div style={{ marginBottom: 16 }}>

          <InputGroup size="large" style={{ marginBottom: 10 }}>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="工单号" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="工单信息" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="工单状态" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="成品/半成品料号" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="产品描述" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="工艺号" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="数量" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="总线体" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="版别" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="计划开始" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="计划结束" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="实际开始" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="实际结束" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="工单备注" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="理论节拍时间" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="实际平均节拍" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="目标稼动率" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="稼动率" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="FPY" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Input addonBefore="良率" defaultValue="0571" />
            </Row>
            <Row style={{ marginBottom: 10 }}>
              <Table columns={ProcessColumns} dataSource={ProcessData} />
            </Row>
          </InputGroup>

        </div>
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


const ProcessColumns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}];

const ProcessData = [{
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
}];
