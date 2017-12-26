import React from 'react'
import { Form, Input, Row, Col, Radio, Select, DatePicker } from 'antd'
import { connect } from 'dva'
import { FormComponents, TableComponents, DetailsTableComponent } from '../../components'
import globalConfig from 'utils/config'
import { bomTableColumns, bomDetailsFullViewColumns, bomDetailsAggregateViewColumns } from '../../mock/tableColums'
import EditableforEditModals from './subpage/editableforEditModals'
import EditableforAddModals from './subpage/editableforAddModals'
import RowEditableAddTable from './subpage/rowEditableforAddModals'
import RowEditableEditTable from './subpage/rowEditableforEditModals'
import './index.less'

const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
//每个table可能不同的变量字段(1)
const TableName = 'bomTable'
const TableColumns = bomTableColumns
const AddFormLayout = ['AddMaterialId', 'AddVersion', 'AddValidBegin', 'AddValidEnd']
const EditFormLayout = ['EditId', 'EditMaterialId', 'EditVersion', 'EditValidBegin', 'EditValidEnd']

const BOMTableComponents = ({
  bomTable,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = bomTable
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible, EditData, DetailsData, MaterialList, MaterialItemList, StationGroup, BomItemDto, Version, AddBomItemDtoDataSource, EditBomItemDtoDataSource } = TableModelsData

  console.log('BOMTableComponents-bomTable ', TableModelsData)
  /**
   * crud modal
   */
  // 定义表单域 =>发出Action  每个table可能不同的变量字段(3)
  const handleAdd = (modalType) => {
    if (modalType === 'create') {
      validateFields(AddFormLayout, (err, payload) => {
        const createParam = { MaterialId: payload.AddMaterialId, Version: payload.AddVersion, ValidBegin: payload.AddValidBegin, ValidEnd: payload.AddValidEnd, BomItemList: AddBomItemDtoDataSource }
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
        const editParam = { Id: payload.EditId, MaterialId: payload.EditMaterialId, Version: payload.EditVersion, ValidBegin: payload.EditValidBegin, ValidEnd: payload.EditValidEnd, BomItemList: EditBomItemDtoDataSource }
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
  //把添加删除Modal的子table数据存到store  然后一起分发到请求
  const onEditableCellChange = (dataSource, type) => {
    dispatch({
      type: `${TableName}/editableDataChanger`,
      payload: {
        BomItemDtoDataSource: dataSource,
        type: type
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
          <Col span={8} key={2} style={{ display: 'block' }}>
            <FormItem {...formItemLayout} label={`测试2`}>
              {getFieldDecorator(`field2`)(
                <Input placeholder="placeholder" />
              )}
            </FormItem>
          </Col>
          <Col span={8} key={3} style={{ display: 'block' }}>
            <FormItem {...formItemLayout} label={`测试3`}>
              {getFieldDecorator(`field3`)(
                <Input placeholder="placeholder" />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    )
  }
  //改变版本
  const MaterialIdOnChange = (value) => {
    const valueInt = parseInt(value)
    const temp = MaterialItemList.find((item, index) => {
      if (eval(item.MaterialNumber)[0].key === valueInt) {
        return item
      }
    })
    dispatch({
      type: `${TableName}/ChangeVersion`,
      payload: {
        Version: temp.Version,
      },
    })
  }

  const addModalValue = () => {

    return (
      <div>
        <Form >
          <FormItem
            {...formItemLayout}
            label="料号"
          >
            {getFieldDecorator('AddMaterialId', {
              initialValue: '',
            })(<Select onChange={MaterialIdOnChange}>
              {MaterialList.map(function (item, index) {
                return <Option key={index} value={item.key.toString()}>{item.label}</Option>
              })}
            </Select>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="名称"
          >
            <div>
              {getFieldDecorator('AddVersion', {
                initialValue: Version,
              })(<Input />)}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="生效时间"
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 15 },
            }}
          >
            {getFieldDecorator('AddValidBegin', {
              initialValue: '',
              rules: [
                {
                  type: 'object', required: true, message: '请输入生效时间',
                },
              ],
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="失效时间"
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 15 },
            }}
          >
            {getFieldDecorator('AddValidEnd', {
              initialValue: '',
              rules: [
                {
                  type: 'object', required: true, message: '请输入失效时间',
                },
              ],
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="全视图"
          >
            <RowEditableAddTable
              onEditableCellChange={onEditableCellChange}
              StationGroup={StationGroup}
              MaterialList={MaterialList}
              MaterialItemList={MaterialItemList}
            />
          </FormItem>
        </Form>
      </div>
    )
  }
  const editModalValue = () => {
    return (
      <div>
        <Form >
          <FormItem
            {...formItemLayout}
            label="Id"
            hasFeedback
          >
            {getFieldDecorator('EditId', {
              initialValue: EditData.Id,
              rules: [
                {
                  required: true, message: '请输入Id',
                },
              ],
            })(<Input disabled />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="料号"
          >
            {getFieldDecorator('EditMaterialId', {
              initialValue: '',
            })(<Select onChange={MaterialIdOnChange}>
              {MaterialList.map(function (item, index) {
                return <Option key={index} value={item.key.toString()}>{item.label}</Option>
              })}
            </Select>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="名称"
          >
            <div>
              {getFieldDecorator('EditVersion', {
                initialValue: '',
              })(<Input />)}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="生效时间"
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 15 },
            }}
          >
            {getFieldDecorator('EditValidBegin', {
              initialValue: '',
              rules: [
                {
                  type: 'object', required: true, message: '请输入生效时间',
                },
              ],
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="失效时间"
            wrapperCol={{
              xs: { span: 24 },
              sm: { span: 15 },
            }}
          >
            {getFieldDecorator('EditValidEnd', {
              initialValue: '',
              rules: [
                {
                  type: 'object', required: true, message: '请输入失效时间',
                },
              ],
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="全视图"
          >
            <RowEditableEditTable
              onEditableCellChange={onEditableCellChange}
              EditDataSource={BomItemDto}
              StationGroup={StationGroup}
              MaterialList={MaterialList}
              MaterialItemList={MaterialItemList}
            />
          </FormItem>
        </Form>
      </div>
    )
  }
  const detailsModalValue = () => {
    return (
      <div>
        <FormItem
          {...formItemLayout}
          label="ID"
        >
          <Input disabled value={DetailsData.BomHead.Id} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="料号"
        >
          <Input disabled value={DetailsData.BomHead.MaterieNumber} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="版本号"
        >
          <Input disabled value={DetailsData.BomHead.Version} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="名称"
        >
          <Input disabled value={DetailsData.BomHead.Name} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="生效日期"
        >
          <Input disabled value={DetailsData.BomHead.ValidBegin} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="失效日期"
        >
          <Input disabled value={DetailsData.BomHead.ValidEnd} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="创建时间"
        >
          <Input disabled value={DetailsData.BomHead.CreationDateTime} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="创建人"
        >
          <Input disabled value={DetailsData.BomHead.Creator} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="最后编辑时间"
        >
          <Input disabled value={DetailsData.BomHead.EditDateTime} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="最后编辑人"
        >
          <Input disabled value={DetailsData.BomHead.Editor} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="全视图"
        >
          <DetailsTableComponent Columns={bomDetailsFullViewColumns} Data={DetailsData.BomItemList} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="合计视图"
        >
          <DetailsTableComponent Columns={bomDetailsAggregateViewColumns} Data={DetailsData.BomItemStatistics} />
        </FormItem>
      </div>
    )
  }
  return (
    <div className='containerDiv' style={{ background: 'white', padding: '20px', margin: '10px', boxShadow: '0px -3px 7px' }}>
      <div className='formComponentsDiv' style={{ marginBottom: '20px', borderColor: 'red', borderWidth: '1px' }}>
        <FormComponents
          formComponentsValue={formComponentsValue()}
        />
      </div>
      <div>
        <TableComponents
          tableName={TableName}
          data={list}
          tableLoading={tableLoading}
          pagination={pagination}
          columns={TableColumns}
          TableWidth={1300}
          ModalWidth={1300}
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


export default connect(({ bomTable }) => ({ bomTable }))(Form.create()(BOMTableComponents))



