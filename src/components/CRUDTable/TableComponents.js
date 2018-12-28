import React from 'react'
import { Row, Col, Button, Icon, Table, Pagination, Popconfirm } from 'antd'
import { connect } from 'dva'
import { ModalComponents } from './ModalComponents'
import './index.less'

let column = []
let DeleteIdArray = []

const TableComponents = ({
  tableName,
  tableModels,
  dispatch,
  columns,
  TableWidth,
  ModalWidth,
  data,
  pagination,
  addModalValue,
  editModalValue,
  detailsModalValue,
  handleAdd,
  tableLoading,
  EditData,
  PaginationComponentsChanger
}) => {
  let { addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible } = tableModels
  const ActionColumn = [{
    title: '操作',
    key: (new Date()).valueOf(),
    fixed: 'right',
    width: 140,
    render: (text, record) => (
      <span>
        <a onClick={() => handleModalShow('editModalVisible', record)}>编辑</a>
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
    dispatch({
      type: `${tableName}/showModalAndAjax`,
      payload: {
        modalType: modalVisible,
        record: record
      },
    })
  }
  const handleModalClose = (modalVisible) => {
    dispatch({
      type: `${tableName}/hideModal`,
      payload: modalVisible
    })
  }
  const onChange = () => {

  }
  const onShowSizeChange = (PageIndex, PageSize) => {
    PaginationComponentsChanger(PageIndex, PageSize)
  }


  const deleteHandler = () => {
    console.log('deleteHandler', DeleteIdArray)
    dispatch({
      type: `${tableName}/delete`,
      payload: {
        List: DeleteIdArray
      }
    })
    DeleteIdArray = []
  }
  const onPaginationChange = (PageIndex, PageSize) => {
    PaginationComponentsChanger(PageIndex, PageSize)
  }

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      DeleteIdArray = selectedRows.map(index => {
        return index.Id
      })
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows, DeleteIdArray);
    }
  }
  return (

    <div>
      <Row>
        <Col span={24} style={{ textAlign: 'left', marginBottom: '5px' }}>
          <Button type="primary" onClick={() => handleModalShow('addModalVisible')}><Icon type="plus-circle-o" /> 新增</Button>
          <Popconfirm title="确定删除吗?" onConfirm={() => deleteHandler()}>
            <Button style={{ marginLeft: '5px' }} type="primary" ><Icon type="delete" /> 删除</Button>
          </Popconfirm>
        </Col>
      </Row>
      <Row>
        <Table
          bordered
          rowKey={record => record.Id}
          rowSelection={rowSelection}
          columns={columnFunc(column, columns, ActionColumn)}
          expandedRowRender={record => <p style={{ margin: 0 }}>描述:{record.Name}</p>}
          dataSource={data}
          scroll={{ x: TableWidth }}
          pagination={false}
          onChange={onChange}
          loading={tableLoading}
        />
      </Row>
      <Row >
        <Col span={24} style={{ textAlign: 'center', marginTop: '10px' }}>
          <Pagination
            showQuickJumper//是否可以快速跳转至某页
            showTotal
            current={pagination.PageIndex}
            onChange={onPaginationChange}//页码改变的回调，参数是改变后的页码及每页条数
            showSizeChanger={true}//是否可以改变 pageSize
            onShowSizeChange={onShowSizeChange}//pageSize 变化的回调
            defaultCurrent={1}//默认的当前页数
            defaultPageSize={10}//默认的每页条数
            pageSizeOptions={['10', '20', '30', '40']}
            total={pagination.total}//数据总数
            showTotal={(total, range) => `每页${pagination.PageSize}条,共${total}条`}
          />
        </Col>
      </Row>
      <ModalComponents
        ModalWidth={ModalWidth}
        addModalVisible={addModalVisible}
        editModalVisible={editModalVisible}
        detailsModalVisible={detailsModalVisible}
        deleteModalVisible={deleteModalVisible}
        handleModalClose={handleModalClose}
        addModalValue={addModalValue}
        editModalValue={editModalValue}
        detailsModalValue={detailsModalValue}
        handleAdd={handleAdd}
        EditData={EditData}
      />
    </div>
  )
}
export default connect(({ dispatch }) => ({ dispatch }))(TableComponents)


// <span className="ant-divider" />
// <Popconfirm title="确定删除吗?" onConfirm={() => deleteHandler(record)}>
//   <a >删除</a>
// </Popconfirm>
