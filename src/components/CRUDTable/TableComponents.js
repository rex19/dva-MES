import React from 'react'
import { Row, Col, Button, Icon, Table, Pagination, Popconfirm } from 'antd'
import { connect } from 'dva'
import { ModalComponents } from './ModalComponents'
import './index.less'

let column = []

const TableComponents = ({
  tableName,
  tableModels,
  dispatch,
  columns,
  data,
  addModalValue,
  editModalValue,
  detailsModalValue,
  handleAdd,
}) => {
  let { addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible } = tableModels
  const ActionColumn = [{
    title: 'Action',
    key: (new Date()).valueOf(),
    fixed: 'right',
    width: 140,
    render: (text, record) => (
      <span>
        <a onClick={() => handleModalShow('editModalVisible', record)}>编辑</a>
        <span className="ant-divider" />
        <Popconfirm title="确定删除吗?" onConfirm={() => deleteHandler(record)}>
          <a >删除</a>
        </Popconfirm>
        <span className="ant-divider" />
        <a onClick={() => handleModalShow('detailsModalVisible', record)} className="ant-dropdown-link">
          详情 <Icon type="down" />
        </a>
      </span>
    ),
  }]
  const columnFunc = (column, columns, ActionColumn) => {
    //父组件传来的表头
    column = []
    let TotalColumn = column.concat(columns, ActionColumn)
    return TotalColumn
  }
  const handleModalShow = (modalVisible, record = {}) => {
    console.log('handleModalShow', record)
    dispatch({
      type: `${tableName}/showModalAndAjax`,
      payload: {
        modalType: modalVisible,
        record: record
      },
    })
    // dispatch({
    //   type: `${tableName}/showModal`,
    //   payload: {
    //     modalType: modalVisible,
    //     record: record
    //   },
    // })
  }
  const handleModalClose = (modalVisible) => {
    dispatch({
      type: `${tableName}/hideModal`,
      payload: modalVisible
    })
  }
  const onChange = () => {

  }
  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
  }
  const deleteHandler = (id) => {
    console.log('deleteHandler', id)
    dispatch({
      type: `${tableName}/delete`,
      payload: id,
    });
  }

  return (
    <div>
      <Row>
        <Col span={24} style={{ textAlign: 'left', marginBottom: '5px' }}>
          <Button type="primary" onClick={() => handleModalShow('addModalVisible')}><Icon type="plus-circle-o" /> 新增</Button>
        </Col>
      </Row>
      <Row>
        <Table
          columns={columnFunc(column, columns, ActionColumn)}
          dataSource={data}
          scroll={{ x: 1300 }}
          pagination={false}
          onChange={onChange}
        />
      </Row>
      <Row >
        <Col span={24} style={{ textAlign: 'center', marginTop: '10px' }}>
          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            defaultCurrent={1}
            total={1}
          />
        </Col>
      </Row>
      <ModalComponents
        addModalVisible={addModalVisible}
        editModalVisible={editModalVisible}
        detailsModalVisible={detailsModalVisible}
        deleteModalVisible={deleteModalVisible}
        handleModalClose={handleModalClose}
        addModalValue={addModalValue}
        editModalValue={editModalValue}
        detailsModalValue={detailsModalValue}
        handleAdd={handleAdd}
      />
    </div>
  )
}
export default connect(({ dispatch }) => ({ dispatch }))(TableComponents)
