import React from 'react'
import { Row, Col, Button, Icon, Table, Pagination, Popconfirm } from 'antd'
import { Link } from "react-router-dom"
import { connect } from 'dva'
import { ModalComponents } from './workOrderActivationModalComponent'
import './index.less'

let column = []

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
  tableLoading
}) => {
  let { addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible } = tableModels
  const ActionColumn = [{
    title: '操作',
    key: (new Date()).valueOf(),
    fixed: 'right',
    width: 140,
    render: (text, record) => <Link to={{ pathname: '/PFS_FIS_System/workOrderSetting', query: { WorkOrderNumber: record.WorkOrderNumber, StationId: record.StationId } }}  >{'查看'}</Link>
    // render: (text, record) => (
    //   <span>
    //     <a onClick={() => handleModalShow('editModalVisible', record)}>查看</a>
    //   </span>
    // ),
  }]//  render: (text, record) => <Link to={{ pathname: '/PFS_FIS_System/workOrderActivation', query: { WorkOrderNumber: record.WorkOrderNumber,StationName:record.StationName } }}  >{'查看'}</Link>
  const columnFunc = (column, columns, ActionColumn) => {
    //父组件传来的表头
    column = []
    let TotalColumn = column.concat(columns, ActionColumn)
    return TotalColumn
  }
  //打开模态框
  const handleModalShow = (modalVisible, record = {}) => {
    console.log('handleModalShow', modalVisible, tableName)
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
  const onShowSizeChange = (PageIndex = 1, pageSize = 20) => {
    dispatch({
      type: `${tableName}/query`,
      payload: {
        PageIndex: PageIndex,  //第几页
        PageSize: pageSize,  //多少行
        TDto: null,
      }
    })
  }

  const onPaginationChange = (PageIndex, pageSize) => {
    dispatch({
      type: `${tableName}/query`,
      payload: {
        PageIndex: PageIndex,  //第几页
        PageSize: pageSize,  //多少行
        TDto: null,
      }
    })
  }
  const deleteHandler = (id) => {
    dispatch({
      type: `${tableName}/delete`,
      payload: id,
    })
  }

  return (
    <div>
      <Row>
        <Table
          // columns={columns}
          columns={columnFunc(column, columns, ActionColumn)}
          dataSource={data}
          scroll={{ x: TableWidth }}
          pagination={false}
          onChange={onChange}
          loading={tableLoading}
        />
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
      />
    </div>
  )
}
export default connect(({ dispatch }) => ({ dispatch }))(TableComponents)


//   < Row >
//   <Col span={24} style={{ textAlign: 'center', marginTop: '10px' }}>
//     <Pagination
//       showQuickJumper//是否可以快速跳转至某页
//       // current={pagination.current}
//       onChange={onPaginationChange}//页码改变的回调，参数是改变后的页码及每页条数
//       // showSizeChanger={this.props.showSizeChanger}//是否可以改变 pageSize
//       onShowSizeChange={onShowSizeChange}//pageSize 变化的回调
//       defaultCurrent={1}//默认的当前页数
//       total={pagination.total}//数据总数
//       showTotal={(total, range) => `每页${pagination.PageSize}条,共${total}条`}
//     // current={this.props.currentPage}  //当前页数
//     />
//   </Col>
// </Row >
