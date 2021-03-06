
import React, { PureComponent } from 'react';
import { Row, Col, Button, Icon, Table, Pagination, Popconfirm } from 'antd'
// import { connect } from 'dva'
// import { ModalComponents } from './ModalComponents'
// import './index.less'

// let column = []

// const TableComponents = ({
//   tableName,
//   tableModels,
//   dispatch,
//   columns,
//   TableWidth,
//   ModalWidth,
//   data,
//   pagination,
//   addModalValue,
//   editModalValue,
//   detailsModalValue,
//   handleAdd,
//   tableLoading
// }) => {
//   let { addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible } = tableModels
//   const ActionColumn = [{
//     title: '操作',
//     key: (new Date()).valueOf(),
//     fixed: 'right',
//     width: 140,
//     render: (text, record) => (
//       <span>
//         <a onClick={() => handleModalShow('editModalVisible', record)}>编辑</a>
//         <span className="ant-divider" />
//         <Popconfirm title="确定删除吗?" onConfirm={() => deleteHandler(record)}>
//           <a >删除</a>
//         </Popconfirm>
//         <span className="ant-divider" />
//         <a onClick={() => handleModalShow('detailsModalVisible', record)} className="ant-dropdown-link">
//           详情 <Icon type="down" />
//         </a>
//       </span>
//     ),
//   }]
//   const columnFunc = (column, columns, ActionColumn) => {
//     //父组件传来的表头
//     column = []
//     let TotalColumn = column.concat(columns, ActionColumn)
//     return TotalColumn
//   }
//   const handleModalShow = (modalVisible, record = {}) => {
//     dispatch({
//       type: `${tableName}/showModalAndAjax`,
//       payload: {
//         modalType: modalVisible,
//         record: record
//       },
//     })
//   }
//   const handleModalClose = (modalVisible) => {
//     dispatch({
//       type: `${tableName}/hideModal`,
//       payload: modalVisible
//     })
//   }
//   const onChange = () => {

//   }
//   const onShowSizeChange = (PageIndex = 1, pageSize = 20) => {
//     dispatch({
//       type: `${tableName}/query`,
//       payload: {
//         PageIndex: PageIndex,  //第几页
//         PageSize: pageSize,  //多少行
//         TDto: null,
//       }
//     })
//   }

//   const onPaginationChange = (PageIndex, pageSize) => {
//     dispatch({
//       type: `${tableName}/query`,
//       payload: {
//         PageIndex: PageIndex,  //第几页
//         PageSize: pageSize,  //多少行
//         TDto: null,
//       }
//     })
//   }
//   const deleteHandler = (id) => {
//     dispatch({
//       type: `${tableName}/delete`,
//       payload: id,
//     });
//   }

//   return (
//     <div>
//       <Row>
//         <Col span={24} style={{ textAlign: 'left', marginBottom: '5px' }}>
//           <Button type="primary" onClick={() => handleModalShow('addModalVisible')}><Icon type="plus-circle-o" /> 新增</Button>
//         </Col>
//       </Row>
//       <Row>
//         <Table
//           columns={columnFunc(column, columns, ActionColumn)}
//           dataSource={data}
//           scroll={{ x: TableWidth }}
//           pagination={false}
//           onChange={onChange}
//           loading={tableLoading}
//         />
//       </Row>
//       <Row >
//         <Col span={24} style={{ textAlign: 'center', marginTop: '10px' }}>
//           <Pagination
//             showQuickJumper//是否可以快速跳转至某页
//             // current={pagination.current}
//             onChange={onPaginationChange}//页码改变的回调，参数是改变后的页码及每页条数
//             // showSizeChanger={this.props.showSizeChanger}//是否可以改变 pageSize
//             onShowSizeChange={onShowSizeChange}//pageSize 变化的回调
//             defaultCurrent={1}//默认的当前页数
//             total={pagination.total}//数据总数
//             showTotal={(total, range) => `每页${pagination.PageSize}条,共${total}条`}
//           // current={this.props.currentPage}  //当前页数
//           />
//         </Col>
//       </Row>
//       <ModalComponents
//         ModalWidth={ModalWidth}
//         addModalVisible={addModalVisible}
//         editModalVisible={editModalVisible}
//         detailsModalVisible={detailsModalVisible}
//         deleteModalVisible={deleteModalVisible}
//         handleModalClose={handleModalClose}
//         addModalValue={addModalValue}
//         editModalValue={editModalValue}
//         detailsModalValue={detailsModalValue}
//         handleAdd={handleAdd}
//       />
//     </div>
//   )
// }
// export default connect(({ dispatch }) => ({ dispatch }))(TableComponents)



class WMSTableComponents extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tableLoading: false
    };
  }

  onChange = () => {

  }

  onPaginationChange = (PageIndex, pageSize) => {
    console.log('onPaginationChange', PageIndex, pageSize)
    this.props.PaginationComponentsChanger(PageIndex, pageSize)

  }


  onShowSizeChange = (PageIndex = 1, pageSize = 20) => {
    console.log('onShowSizeChange')
    // dispatch({
    //   type: `${tableName}/query`,
    //   payload: {
    //     PageIndex: PageIndex,  //第几页
    //     PageSize: pageSize,  //多少行
    //     TDto: null,
    //   }
    // })

  }


  render() {
    // console.log('onShowSizeChange')
    const { pagination, paginationDisplay } = this.props
    return (
      <div>
        <Row>
          <Table
            columns={this.props.columns}
            dataSource={this.props.data}
            scroll={{ x: this.props.TableWidth, y: this.props.TableHight }}
            pagination={false}
            onChange={this.onChange}
            loading={this.state.tableLoading}

          />
        </Row>
        {paginationDisplay === 'no' ? <Row></Row> :
          <Row >
            <Col span={24} style={{ textAlign: 'center', marginTop: '10px' }}>
              <Pagination
                showQuickJumper//是否可以快速跳转至某页
                // current={pagination.current}
                onChange={this.onPaginationChange}//页码改变的回调，参数是改变后的页码及每页条数
                // showSizeChanger={this.props.showSizeChanger}//是否可以改变 pageSize
                onShowSizeChange={this.onShowSizeChange}//pageSize 变化的回调
                defaultCurrent={1}//默认的当前页数
                total={pagination.total}//数据总数
                showTotal={(total, range) => `每页${pagination.PageSize}条,共${total}条`}
              // current={this.props.currentPage}  //当前页数
              />
            </Col>
          </Row>
        }

      </div>
    )
  }
}
export default WMSTableComponents
