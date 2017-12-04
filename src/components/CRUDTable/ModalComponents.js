import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import './index.less'

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
}) => {
  const handleOk = (modalType) => {
    handleAdd(modalType)
  }

  return (
    <div>
      <Modal
        title="新建"
        visible={addModalVisible}
        onOk={() => handleOk('create')}
        onCancel={() => handleModalClose('addModalVisible')}
      >
        {addModalValue}
      </Modal>
      <Modal
        title="修改"
        visible={editModalVisible}
        onOk={() => handleOk('edit')}
        onCancel={() => handleModalClose('editModalVisible')}
      >
        {editModalValue}
      </Modal>
      <Modal
        title="详细"
        visible={detailsModalVisible}
        onOk={() => handleModalClose('detailsModalVisible')}
        onCancel={() => handleModalClose('detailsModalVisible')}
      >
        {detailsModalValue}
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
