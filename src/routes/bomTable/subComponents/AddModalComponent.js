import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import './index.less'

// export const ModalComponents = ({
//   addModalVisible,
//   handleModalClose,
//   addModalValue,
//   editModalVisible,
//   editModalValue,
//   detailsModalVisible,
//   deleteModalVisible,
//   detailsModalValue,
//   handleAdd,
//   ModalWidth
// }) => {
//   const handleOk = (modalType) => {
//     handleAdd(modalType)
//   }
//   console.log('ModalComponents+++', editModalValue)
//   return (
//     <div>
//       <Modal
//         title="新建"
//         visible={addModalVisible}
//         width={ModalWidth || 520}
//         onOk={() => handleOk('create')}
//         onCancel={() => handleModalClose('addModalVisible')}
//       >
//         {addModalValue}
//       </Modal>
//       <Modal
//         title="修改"
//         visible={editModalVisible}
//         width={ModalWidth || 520}
//         onOk={() => handleOk('edit')}
//         onCancel={() => handleModalClose('editModalVisible')}
//       >
//         {editModalValue}
//       </Modal>
//       <Modal
//         title="详细"
//         visible={detailsModalVisible}
//         width={ModalWidth || 520}
//         onOk={() => handleModalClose('detailsModalVisible')}
//         onCancel={() => handleModalClose('detailsModalVisible')}
//       >
//         {detailsModalValue}
//       </Modal>
//       <Modal
//         title="删除提示"
//         visible={deleteModalVisible}
//         onOk={() => handleOk('delete')}
//         onCancel={() => handleModalClose('deleteModalVisible')}
//       >
//         <p>确认删除吗？？</p>
//       </Modal>
//     </div>

//   )
// }
// ModalComponents.propTypes = {
//   addModalVisible: PropTypes.bool,
//   handleModalClose: PropTypes.func,
//   addModalValue: PropTypes.object,
//   editModalVisible: PropTypes.bool,
//   editModalValue: PropTypes.object,
//   detailsModalVisiable: PropTypes.bool,
//   detailsModalValue: PropTypes.object,
//   deleteModalVisiable: PropTypes.bool,
//   handleAdd: PropTypes.func,
// }


export class ModalComponents extends React.Component {


  componentWillReceiveProps = (newProps, props) => {
    console.log('Component WILL RECEIVE PROPS!', newProps, props)

  }

  handleOk = (modalType) => {
    this.props.handleAdd(modalType)
  }
  render() {


    const { addModalVisible,
      handleModalClose,
      addModalValue,
      editModalVisible,
      editModalValue,
      detailsModalVisible,
      deleteModalVisible,
      detailsModalValue,
      handleAdd,
      ModalWidth,
      EditData } = this.props


    const handleOk = this.handleOk
    // const handleOk = this.handleOk
    console.log(
      'ModalComponents-render', EditData, editModalValue
    )


    return (
      <div>
        <Modal
          title="新建"
          visible={addModalVisible}
          width={ModalWidth || 520}
          onOk={() => handleOk('create')}
          onCancel={() => handleModalClose('addModalVisible')}
        >
          {addModalValue}
        </Modal>
        <Modal
          title="修改"
          visible={editModalVisible}
          width={ModalWidth || 520}
          onOk={() => handleOk('edit')}
          onCancel={() => handleModalClose('editModalVisible')}
        >


          {
            editModalVisible === false
              ?
              ''
              :
              editModalValue
          }
        </Modal>
        <Modal
          title="详细"
          visible={detailsModalVisible}
          width={ModalWidth || 520}
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
}
// {editModalValue}
