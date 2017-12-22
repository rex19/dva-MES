import React from 'react'
import { Form, Input, Row, Col, Radio, Select, DatePicker } from 'antd'
import { connect } from 'dva'
import { FormComponents, TableComponents } from '../../components'
import globalConfig from 'utils/config'
import { materielTableColumns } from '../../mock/tableColums'
import moment from 'moment';
import './index.less'


const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const { Option } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
//每个table可能不同的变量字段(1)
const TableName = 'materielTable'
const TableColumns = materielTableColumns

const MaterielTableComponents = ({
  materielTable,
  dispatch,
  location,
  form
}) => {
  //每个table可能不同的变量字段(2)
  const TableModelsData = materielTable
  const { getFieldDecorator, validateFields, resetFields } = form
  const formItemLayout = globalConfig.table.formItemLayout
  const { list, pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible,
    EditData, DetailsData,
    MaterialType,
    Unit,
    ProcurementType,
    Location,
    MSL,
    StationGroup,
    Company,
    Factory } = TableModelsData

  console.log('MaterielTableComponents-materielTable ', TableModelsData)
  /**
   * crud modal
   */
  // 定义表单域 =>发出Action  每个table可能不同的变量字段(3)
  const handleAdd = (modalType) => {
    if (modalType === 'create') {
      validateFields(['AddRoleName', 'AddPlatformID', 'AddState', 'AddUser'], (err, payload) => {
        const createParam = { RoleName: payload.AddRoleName, PlatformId: parseInt(payload.AddPlatformID), State: parseInt(payload.AddState), User: payload.AddUser.map(item => parseInt(item.key)) }
        if (!err) {
          dispatch({
            type: `${TableName}/${modalType}`,
            payload: createParam,
          })
          resetFields(['AddRoleName', 'AddPlatformID', 'AddState', 'AddUser'])
        }
      })
    } else if (modalType === 'edit') {
      validateFields(['EditId', 'EditRoleName', 'EditPlatformID', 'EditState', 'EditUser'], (err, payload) => {
        const editParam = { Id: payload.EditId, RoleName: payload.EditRoleName, PlatformID: parseInt(payload.EditPlatformID), State: parseInt(payload.EditState), User: payload.EditUser.map(item => parseInt(item.key)) }
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
  const addModalValue = () => {
    return (
      <div>
        <Form >
          <FormItem
            {...formItemLayout}
            label="料号"
          >
            {getFieldDecorator('AddMaterialNumber', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入料号',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="版本"
          >
            {getFieldDecorator('AddVersion', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入版本',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="描述"
          >
            {getFieldDecorator('AddDescription', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入描述',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="规格"
          >
            {getFieldDecorator('AddSpecification', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '请输入规格',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="客户侧料号"
          >
            {getFieldDecorator('AddCustomerMaterialNumber', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="供应商侧料号"
          >
            {getFieldDecorator('AddSupplierMaterialNumber', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="物料类型"
          >
            <div>
              {getFieldDecorator('AddMaterialGroupType', {
                initialValue: '请选择',
              })(
                <Select>
                  {MaterialType.map(function (item, index) {
                    return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否是半成品"
          >
            {getFieldDecorator('AddIsProduct', {
              initialValue: '0',
            })(
              <Select>
                <Option key={0} value='0'>是</Option>
                <Option key={1} value='1'>否</Option>
              </Select>
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否是连扳"
          >
            {getFieldDecorator('AddIsMultiPanel', {
              initialValue: '0',
            })(
              <Select>
                <Option key={0} value='0'>是</Option>
                <Option key={1} value='1'>否</Option>
              </Select>
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否反冲"
          >
            {getFieldDecorator('AddRequireBackflush', {
              initialValue: '0',
            })(
              <Select>
                <Option key={0} value='0'>是</Option>
                <Option key={1} value='1'>否</Option>
              </Select>
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="连扳数"
          >
            {getFieldDecorator('AddNumberOfPanels', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="单位"
          >
            <div>
              {getFieldDecorator('AddUnit', {
                initialValue: '请选择',
              })(
                <Select>
                  {Unit.map(function (item, index) {
                    return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否上料"
          >
            {getFieldDecorator('AddSetupFlag', {
              initialValue: '0',
            })(
              <Select>
                <Option key={0} value='0'>是</Option>
                <Option key={1} value='1'>否</Option>
              </Select>
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="采购类型"
          >
            <div>
              {getFieldDecorator('AddProcurementType', {
                initialValue: '请选择',
              })(
                <Select>
                  {ProcurementType.map(function (item, index) {
                    return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="最小包装数"
          >
            {getFieldDecorator('AddMinimumPackageQuantity', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="过期周期(天)"
          >
            {getFieldDecorator('AddExpirationTime', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="安全库存"
          >
            {getFieldDecorator('AddSafetyStock', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="默认库位编号"
          >
            {getFieldDecorator('AddDefaultStorageLocation', {
              initialValue: '请选择',
            })(
              <Select>
                {Location.map(function (item, index) {
                  return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                })}
              </Select>
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="容器大小"
          >
            {getFieldDecorator('AddContainerSize', {
              initialValue: '',
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="湿敏等级MSL"
          >
            <div>
              {getFieldDecorator('AddMSL', {
                initialValue: '请选择',
              })(
                <Select>
                  {MSL.map(function (item, index) {
                    return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="状态"
          >
            <div>
              {getFieldDecorator('AddStateValue', {
                initialValue: '请选择',
              })(
                <Select>
                  <Option key={0} value='0'>未激活</Option>
                  <Option key={1} value='1'>激活</Option>
                  <Option key={2} value='-1'>已删除</Option>
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="默认工站组"
          >
            {getFieldDecorator('AddDefaultStationGroup', {
              initialValue: '请选择',
            })(
              <Select>
                {StationGroup.map(function (item, index) {
                  return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                })}
              </Select>
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="公司"
          >
            <div>
              {getFieldDecorator('AddCompanyNumber', {
                initialValue: '请选择',
              })(
                <Select>
                  {Company.map(function (item, index) {
                    return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="工厂"
          >
            <div>
              {getFieldDecorator('AddFactory', {
                initialValue: '请选择',
              })(
                <Select>
                  {Factory.map(function (item, index) {
                    return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="生效日期"
          >
            {getFieldDecorator('AddValidBegin', {
              initialValue: moment('2015/01/01', dateFormat),
            })(
              <DatePicker format={dateFormat} />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="失效日期"
          >
            {getFieldDecorator('ValidEnd', {
              initialValue: moment('2015/01/01', dateFormat),
            })(
              <DatePicker format={dateFormat} />
              )}
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
            {getFieldDecorator('AddMaterialNumber', {
              initialValue: EditData.MaterialNumber,
              rules: [
                {
                  required: true, message: '请输入料号',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="版本"
          >
            {getFieldDecorator('AddVersion', {
              initialValue: EditData.Version,
              rules: [
                {
                  required: true, message: '请输入版本',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="描述"
          >
            {getFieldDecorator('AddDescription', {
              initialValue: EditData.Description,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="规格"
          >
            {getFieldDecorator('AddSpecification', {
              initialValue: EditData.Specification,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="客户侧料号"
          >
            {getFieldDecorator('AddCustomerMaterialNumber', {
              initialValue: EditData.CustomerMaterialNumber,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="供应商侧料号"
          >
            {getFieldDecorator('AddSupplierMaterialNumber', {
              initialValue: EditData.SupplierMaterialNumber,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="物料类型"
          >
            <div>
              {getFieldDecorator('AddMaterialGroupType', {
                // initialValue: EditData.MaterialGroupType,
                initialValue: '1',
              })(
                <Select>
                  {MaterialType.map(function (item, index) {
                    return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否是半成品"
          >
            {getFieldDecorator('AddIsProduct', {
              initialValue: '1'
            })(
              <Select>
                <Option key={0} value='1'>是</Option>
                <Option key={1} value='0'>否</Option>
              </Select>
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否是连扳"
          >
            {getFieldDecorator('AddIsMultiPanel', {
              initialValue: '1',
            })(
              <Select>
                <Option key={0} value='1'>是</Option>
                <Option key={1} value='0'>否</Option>
              </Select>
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否反冲"
          >
            {getFieldDecorator('AddRequireBackflush', {
              initialValue: '1',
            })(
              <Select>
                <Option key={0} value='1'>是</Option>
                <Option key={1} value='0'>否</Option>
              </Select>
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="连扳数"
          >
            {getFieldDecorator('AddNumberOfPanels', {
              initialValue: EditData.NumberOfPanels,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="单位"
          >
            <div>
              {getFieldDecorator('AddUnit', {
                initialValue: EditData.Unit,
              })(
                <Select>
                  {Unit.map(function (item, index) {
                    return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否上料"
          >
            {getFieldDecorator('AddSetupFlag', {
              initialValue: EditData.SetupFlag,
            })(
              <Select>
                <Option key={0} value='1'>是</Option>
                <Option key={1} value='0'>否</Option>
              </Select>
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="采购类型"
          >
            <div>
              {getFieldDecorator('AddProcurementType', {
                // initialValue:  EditData.ProcurementType
                initialValue: '1'
              })(
                <Select>
                  {ProcurementType.map(function (item, index) {
                    return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="最小包装数"
          >
            {getFieldDecorator('AddMinimumPackageQuantity', {
              initialValue: EditData.MinimumPackageQuantity
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="过期周期(天)"
          >
            {getFieldDecorator('AddExpirationTime', {
              initialValue: EditData.ExpirationTime
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="安全库存"
          >
            {getFieldDecorator('AddSafetyStock', {
              initialValue: EditData.ExpirationTime
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="默认库位编号"
          >
            {getFieldDecorator('AddDefaultStorageLocation', {
              // initialValue: EditData.DefaultStorageLocation
              initialValue: '7'
            })(
              <Select>
                {Location.map(function (item, index) {
                  return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                })}
              </Select>
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="容器大小"
          >
            {getFieldDecorator('AddContainerSize', {
              initialValue: EditData.ContainerSize,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="湿敏等级MSL"
          >
            <div>
              {getFieldDecorator('AddMSL', {
                // initialValue: EditData.MSL,
                initialValue: '4',
              })(
                <Select>
                  {MSL.map(function (item, index) {
                    return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="状态"
          >
            <div>
              {getFieldDecorator('AddStateValue', {
                // initialValue: EditData.StateValue ,
                initialValue: '1',
              })(
                <Select>
                  <Option key={0} value='0'>未激活</Option>
                  <Option key={1} value='1'>激活</Option>
                  <Option key={2} value='-1'>已删除</Option>
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="默认工站组"
          >
            {getFieldDecorator('AddDefaultStationGroup', {
              // initialValue: EditData.DefaultStationGroup
              initialValue: '4'
            })(
              <Select>
                {StationGroup.map(function (item, index) {
                  return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                })}
              </Select>
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="公司"
          >
            <div>
              {getFieldDecorator('AddCompanyNumber', {
                // initialValue:  EditData.CompanyNumber
                initialValue: '1'
              })(
                <Select>
                  {Company.map(function (item, index) {
                    return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="工厂"
          >
            <div>
              {getFieldDecorator('AddFactory', {
                initialValue: '1',
              })(
                <Select>
                  {Factory.map(function (item, index) {
                    return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                  })}
                </Select>
                )}
            </div>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="生效时间"
          >
            {getFieldDecorator('AddValidBegin', {
              initialValue: moment(EditData.ValidBegin, dateFormat),
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
          >
            {getFieldDecorator('AddValidEnd', {
              initialValue: moment(EditData.ValidEnd, dateFormat),
              rules: [
                {
                  type: 'object', required: true, message: '请输入失效时间',
                },
              ],
            })(
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
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
          label="角色"
        >
          <Input disabled value={DetailsData.RoleName} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="模块"
        >
          <Input disabled value={DetailsData.PlatformName} />
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
        <FormItem
          {...formItemLayout}
          label="拥有此角色人员"
        >
          <Input disabled value={DetailsData.User} />
        </FormItem>
      </div>
    )
  }

  return (
    <div style={{ background: 'white', padding: '20px', margin: '10px' }}>
      <div style={{ marginBottom: '20px', borderColor: 'red', borderWidth: '1px' }}>
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
          TableWidth={2550}
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


export default connect(({ materielTable }) => ({ materielTable }))(Form.create()(MaterielTableComponents))


// <FormItem
// {...formItemLayout}
// label="生效日期"
// >
// {getFieldDecorator('AddValidBegin', {
//   initialValue: moment('2015/01/01', dateFormat),
// })(
//   <DatePicker format={dateFormat} />
//   )}
// </FormItem>
// <FormItem
// {...formItemLayout}
// label="失效日期"
// >
// {getFieldDecorator('ValidEnd', {
//   initialValue: moment('2015/01/01', dateFormat),
// })(
//   <DatePicker format={dateFormat} />
//   )}
// </FormItem>

// <FormItem
// {...formItemLayout}
// label="生效时间"
// wrapperCol={{
//   xs: { span: 24 },
//   sm: { span: 15 },
// }}
// >
// {getFieldDecorator('AddValidBegin', {
//   initialValue: moment("2017-12-14T15:08:00", dateFormat),
//   rules: [
//     {
//       type: 'object', required: true, message: '请输入生效时间',
//     },
//   ],
// })(
//   <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
//   )}
// </FormItem>
