import React from 'react'
import { Form, Input, Row, Col, Radio, Select, Cascader, Button, Icon } from 'antd'
import { connect } from 'dva'
import { FormComponents, TableComponents } from '../../components'
import globalConfig from 'utils/config'
import { customerTableColumns } from '../../mock/tableColums'
import city from '../../utils/city'
import './index.less'



const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
//每个table可能不同的变量字段(1)
const TableName = 'customerTable'
const TableColumns = customerTableColumns
const AddFormLayout = [
  'AddCustomerCode',
  'AddName',
  'AddDUNS',
  'AddCountry',
  'AddProvince',
  'AddAddress',
  'AddPostCode',
  'AddFax',
  'AddContactPerson',
  'AddEmail',
  'AddTelphone',
  'AddMobilePhone',
  'AddState']
const EditFormLayout = [
  'EditId',
  'EditCustomerCode',
  'EditName',
  'EditDUNS',
  'EditCountry',
  'EditProvince',
  'EditAddress',
  'EditPostCode',
  'EditFax',
  'EditContactPerson',
  'EditEmail',
  'EditTelphone',
  'EditMobilePhone',
  'EditState']
const SearchFormLayout = ['FormCustomerCode', 'FormCustomerName']

const CustomerTableComponents = ({
  customerTable,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = customerTable
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { clearBool, list, pagination, tableLoading,
    addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible,
    EditData, DetailsData, FromParams
    } = TableModelsData

  console.log('CustomerTableComponents-customerTable ', TableModelsData)

  if (clearBool) {
    () => clearFunc()
  }
  /**
   * crud modal
   */
  // 定义表单域 =>发出Action  每个table可能不同的变量字段(3)
  const handleAdd = (modalType) => {
    if (modalType === 'create') {
      validateFields(AddFormLayout, (err, payload) => {
        const createParam = {
          CustomerCode: payload.AddCustomerCode,
          Name: payload.AddName,
          DUNS: payload.AddDUNS,
          Country: payload.AddCountry,
          Province: payload.AddProvince.join(','),
          Address: payload.AddAddress,
          PostCode: payload.AddPostCode,
          Fax: payload.AddFax,
          ContactPerson: payload.AddContactPerson,
          Email: payload.AddEmail,
          Telphone: payload.AddTelphone,
          MobilePhone: payload.AddMobilePhone,
          State: parseInt(payload.AddState)
        }
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
        const editParam = {
          Id: payload.EditId,
          CustomerCode: payload.EditCustomerCode,
          Name: payload.EditName,
          DUNS: payload.EditDUNS,
          Country: payload.EditCountry,
          Province: payload.EditProvince.join(','),
          Address: payload.EditAddress,
          PostCode: payload.EditPostCode,
          Fax: payload.EditFax,
          ContactPerson: payload.EditContactPerson,
          Email: payload.EditEmail,
          Telphone: payload.EditTelphone,
          MobilePhone: payload.EditMobilePhone,
          State: parseInt(payload.EditState)
        }
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

  // const handleChange = (key, values) => {
  //   console.log('handleChange', key, values)
  //   // let fields = getFieldsValue()
  //   // fields[key] = values
  //   // fields = handleFields(fields)
  //   // onFilterChange(fields)
  // }

  const addModalValue = () => {

    return (
      <div>
        <Form >
          <FormItem
            {...formItemLayout}
            label="客户编号"
            hasFeedback
          >
            {getFieldDecorator('AddCustomerCode', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入客户编号',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="名称"
            hasFeedback
          >
            {getFieldDecorator('AddName', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入名称',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="邓氏码"
            hasFeedback
          >
            {getFieldDecorator('AddDUNS', {
              initialValue: '',
              rules: [
                {
                  max: 9, message: '邓氏码最大不能超过9位',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="国家"
          >
            {getFieldDecorator('AddCountry', {
              initialValue: '中国',
            })(<Input disabled />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="省市"
          >
            <div>
              {getFieldDecorator('AddProvince', {
                initialValue: [],
                rules: [
                  {
                    required: true, message: '请输入省市',
                  },
                ],
              })(
                <Cascader
                  size="large"
                  style={{ width: '100%' }}
                  options={city}
                  placeholder="请选择省市"
                // onChange={handleChange.bind(null, 'AddProvince')}
                />)}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="详细地址"
            hasFeedback
          >
            {getFieldDecorator('AddAddress', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="邮编"
            hasFeedback
          >
            {getFieldDecorator('AddPostCode', {
              initialValue: '',
              rules: [
                {
                  max: 10, message: '邮编最大不能超过10位',
                },
              ],
            })(<Input

            />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="传真"
            hasFeedback
          >
            {getFieldDecorator('AddFax', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="联系人"
            hasFeedback
          >
            {getFieldDecorator('AddContactPerson', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="邮件"
            hasFeedback
          >
            {getFieldDecorator('AddEmail', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="电话"
            hasFeedback
          >
            {getFieldDecorator('AddTelphone', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="手机"
            hasFeedback
          >
            {getFieldDecorator('AddMobilePhone', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="状态"
          >
            <div>
              {getFieldDecorator('AddState', {
                initialValue: '',
                rules: [
                  {
                    required: true, message: '请选择状态',
                  },
                ],
              })(
                <Select>
                  <Option key={0} value='0'>未激活</Option>
                  <Option key={1} value='1'>激活</Option>
                  <Option key={2} value='-1'>已删除</Option>
                </Select>
                )}
            </div>
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
            label="ID"
            hasFeedback
          >
            {getFieldDecorator('EditId', {
              initialValue: EditData.Id,
            })(<Input disabled />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="客户编号"
            hasFeedback
          >
            {getFieldDecorator('EditCustomerCode', {
              initialValue: EditData.CustomerCode,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="名称"
            hasFeedback
          >
            {getFieldDecorator('EditName', {
              initialValue: EditData.Name,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="邓氏码"
            hasFeedback
          >
            {getFieldDecorator('EditDUNS', {
              initialValue: EditData.DUNS,
              rules: [
                {
                  max: 9, message: '邓氏码最大不能超过9位',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="国家"
          >
            {getFieldDecorator('EditCountry', {
              initialValue: EditData.Country,
            })(<Input disabled />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="省市"
          >
            <div>
              {getFieldDecorator('EditProvince', {
                initialValue: EditData.Province.split(','),
              })(
                <Cascader
                  size="large"
                  style={{ width: '100%' }}
                  options={city}
                  placeholder="请选择省市"
                // onChange={handleChange.bind(null, 'EditProvince')}
                />)}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="详细地址"
            hasFeedback
          >
            {getFieldDecorator('EditAddress', {
              initialValue: EditData.Address,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="邮编"
            hasFeedback
          >
            {getFieldDecorator('EditPostCode', {
              initialValue: EditData.PostCode,
              rules: [
                {
                  max: 10, message: '邮编最大不能超过10位',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="传真"
            hasFeedback
          >
            {getFieldDecorator('EditFax', {
              initialValue: EditData.Fax,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="联系人"
            hasFeedback
          >
            {getFieldDecorator('EditContactPerson', {
              initialValue: EditData.ContactPerson,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="邮件"
            hasFeedback
          >
            {getFieldDecorator('EditEmail', {
              initialValue: EditData.Email,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="电话"
            hasFeedback
          >
            {getFieldDecorator('EditTelphone', {
              initialValue: EditData.Telphone,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="手机"
            hasFeedback
          >
            {getFieldDecorator('EditMobilePhone', {
              initialValue: EditData.MobilePhone,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="状态"
          >
            <div>
              {getFieldDecorator('EditState', {
                initialValue: EditData.State.toString(),
                rules: [
                  {
                    required: true, message: '请选择状态',
                  },
                ],
              })(
                <Select>
                  <Option key={0} value='0'>未激活</Option>
                  <Option key={1} value='1'>激活</Option>
                  <Option key={2} value='-1'>已删除</Option>
                </Select>
                )}
            </div>
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
          <Input disabled value={DetailsData.Id} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="客户编号"
        >
          <Input disabled value={DetailsData.CustomerCode} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="名称"
        >
          <Input disabled value={DetailsData.Name} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邓氏码"
        >
          <Input disabled value={DetailsData.DUNS} />
        </FormItem> <FormItem
          {...formItemLayout}
          label="国家"
        >
          <Input disabled value={DetailsData.Country} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="省市"
        >
          <Input disabled value={DetailsData.Province} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="详细地址"
        >
          <Input disabled value={DetailsData.Address} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮编"
        >
          <Input disabled value={DetailsData.PostCode} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="传真"
        >
          <Input disabled value={DetailsData.Fax} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="联系人"
        >
          <Input disabled value={DetailsData.ContactPerson} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮件"
        >
          <Input disabled value={DetailsData.Email} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="电话"
        >
          <Input disabled value={DetailsData.Telphone} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机"
        >
          <Input disabled value={DetailsData.MobilePhone} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="状态"
        >
          <Input disabled value={DetailsData.State} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="创建时间"
        >
          <Input disabled value={DetailsData.CreationDateTime} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="创建人"
        >
          <Input disabled value={DetailsData.Creator} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="最后编辑时间"
        >
          <Input disabled value={DetailsData.EditDateTime} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="最后编辑人"
        >
          <Input disabled value={DetailsData.Editor} />
        </FormItem>
      </div>
    )
  }
  const handleSearch = (e) => {
    e.preventDefault();

    validateFields(SearchFormLayout, (err, payload) => {
      if (!err) {
        const Params = {
          CustomerCode: payload.FormCustomerCode,
          CustomerName: payload.FormCustomerName
        }
        SearchTableList(Params, 1, pagination.PageSize)
      }
    });
  }
  const PaginationComponentsChanger = (PageIndex, PageSize) => {
    const Params = {
      CustomerCode: FromParams.CustomerCode,
      CustomerName: FromParams.CustomerName,
    }
    SearchTableList(Params, PageIndex, PageSize)
    // dispatch({
    //   type: `${TableName}/query`,
    //   payload: {
    //     CustomerCode: FromParams.CustomerCode,
    //     CustomerName: FromParams.CustomerName,
    //     PageIndex: PageIndex,
    //     PageSize: PageSize
    //   }
    // })
  }
  const SearchTableList = (payload, PageIndex, PageSize) => {
    dispatch({
      type: `${TableName}/query`,
      payload: {
        ...payload,
        PageIndex: PageIndex,
        PageSize: PageSize
      },
    })
  }
  const clearFunc = () => {
    resetFields(SearchFormLayout, (err, payload) => { })
  }
  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
      <div style={{ marginBottom: '20px', borderColor: 'red', borderWidth: '1px' }}>
        <Form
          className="ant-advanced-search-form"
          onSubmit={handleSearch}
        >
          <Form>
            <Row gutter={40}>
              <Col span={8} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`客户编号`}>
                  {getFieldDecorator(`FormCustomerCode`)(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`客户名称`}>
                  {getFieldDecorator(`FormCustomerName`)(
                    <Input />
                  )}
                </FormItem>
              </Col>

            </Row>
          </Form>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
              <Button style={{ marginLeft: '7px' }} onClick={clearFunc}><Icon type="delete" />清空</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div>
        <TableComponents
          tableName={TableName}
          data={list}
          tableLoading={tableLoading}
          pagination={pagination}
          columns={TableColumns}
          TableWidth={2000}
          addModalValue={addModalValue()}
          editModalValue={editModalValue()}
          detailsModalValue={detailsModalValue()}
          handleAdd={handleAdd}
          tableModels={TableModelsData}
          PaginationComponentsChanger={PaginationComponentsChanger}
        />
      </div>
    </div>
  )
}


export default connect(({ customerTable }) => ({ customerTable }))(Form.create()(CustomerTableComponents))



// {getFieldDecorator('AddCountry', {
//   initialValue: [],
//   rules: [
//     {
//       required: true, message: '请选择状态',
//     },
//   ],
// })(
//   <Cascader options={options} onChange={onChange} placeholder="Please select" />
//   )}
