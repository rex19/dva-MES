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
  TableWidth,
  ModalWidth,
  data,
  pagination,
  addModalValue,
  editModalValue,
  detailsModalValue,
  tableLoading,
  addModalLineNames,
  addModalShiftNames,
  VMPartInformation,
  VMProcessInformation,
  CycleTimeInTheory,
  OEEInTheory,

  EditAllLineNames,
  EditAllShiftNames,
  EditAllWorkOrderStates,
  EditData,
  DetailsData
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
  //打开模态框
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
    });
  }
  const SearchGetPartInformationListForCreateWorkOrder = (params) => {
    dispatch({
      type: `${tableName}/showModalAndAjax`,
      payload: {
        modalType: 'SearchGetPartInformationListForCreateWorkOrder',
        params: params
      },
    });
  }
  const SearchGetProcessListForCreateWorkOrder = (params) => {
    dispatch({
      type: `${tableName}/showModalAndAjax`,
      payload: {
        modalType: 'SearchGetProcessListForCreateWorkOrder',
        params: params
      },
    });
  }
  const SearchGetBaseLineInformation = (params) => {
    dispatch({
      type: `${tableName}/showModalAndAjax`,
      payload: {
        modalType: 'SearchGetBaseLineInformation',
        params: params
      },
    });
  }
  const handleAdd = (Params, modalType) => {
    console.log('handleAdd', Params, modalType)
    if (modalType === 'create') {
      dispatch({
        type: `${tableName}/${modalType}`,
        payload: Params,
      })
    } else if (modalType === 'edit') {
      dispatch({
        type: `${tableName}/${modalType}`,
        payload: Params,
      })
    }
    // dispatch({
    //   type: `${tableName}/showModalAndAjax`,
    //   payload: {
    //     modalType: 'SearchGetBaseLineInformation',
    //     params: params
    //   },
    // });
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
            // current={pagination.current}
            onChange={onPaginationChange}//页码改变的回调，参数是改变后的页码及每页条数
            // showSizeChanger={this.props.showSizeChanger}//是否可以改变 pageSize
            onShowSizeChange={onShowSizeChange}//pageSize 变化的回调
            defaultCurrent={1}//默认的当前页数
            total={pagination.total}//数据总数
            showTotal={(total, range) => `每页${pagination.PageSize}条,共${total}条`}
          // current={this.props.currentPage}  //当前页数
          />
        </Col>
      </Row>
      <ModalComponents
        addModalLineNames={addModalLineNames}
        addModalShiftNames={addModalShiftNames}
        VMPartInformation={VMPartInformation}
        VMProcessInformation={VMProcessInformation}
        CycleTimeInTheory={CycleTimeInTheory}
        OEEInTheory={OEEInTheory}
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
        SearchGetPartInformationListForCreateWorkOrder={SearchGetPartInformationListForCreateWorkOrder}
        SearchGetProcessListForCreateWorkOrder={SearchGetProcessListForCreateWorkOrder}
        SearchGetBaseLineInformation={SearchGetBaseLineInformation}

        EditAllLineNames={EditAllLineNames}
        EditAllShiftNames={EditAllShiftNames}
        EditAllWorkOrderStates={EditAllWorkOrderStates}
        EditData={EditData}
        DetailsData={DetailsData}
      />
    </div>
  )
}
export default connect(({ dispatch }) => ({ dispatch }))(TableComponents)
