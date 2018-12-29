import React from 'react'
import { Form, Input, Button, Icon, Row, Col, Radio, Select, DatePicker, InputNumber } from 'antd'
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
const AddFormLayout = [
  "AddMaterialNumber",
  "AddVersion",
  "AddDescription",
  "AddSpecification",
  "AddCustomerMaterialNumber",
  "AddSupplierMaterialNumber",
  "AddMaterialGroupType",
  "AddIsProduct",
  "AddIsMultiPanel",
  "AddRequireBackflush",
  "AddNumberOfPanels",
  "AddUnit",
  "AddSetupFlag",
  "AddProcurementType",
  "AddMinimumPackageQuantity",
  "AddExpirationTime",
  "AddSafetyStock",
  "AddDefaultStorageLocationId",
  "AddContainerSize",
  "AddMSL",
  "AddState",
  "AddDefaultStationGroupId",
  "AddCompanyId",
  "AddFactoryId",
  "AddValidBegin",
  "AddValidEnd",
]
const EditFormLayout = [
  "EditId",
  "EditMaterialNumber",
  "EditVersion",
  "EditDescription",
  "EditSpecification",
  "EditCustomerMaterialNumber",
  "EditSupplierMaterialNumber",
  "EditMaterialGroupType",
  "EditIsProduct",
  "EditIsMultiPanel",
  "EditRequireBackflush",
  "EditNumberOfPanels",
  "EditUnit",
  "EditSetupFlag",
  "EditProcurementType",
  "EditMinimumPackageQuantity",
  "EditExpirationTime",
  "EditSafetyStock",
  "EditDefaultStorageLocationId",
  "EditContainerSize",
  "EditMSL",
  "EditState",
  "EditDefaultStationGroupId",
  "EditCompanyId",
  "EditFactoryId",
  "EditValidBegin",
  "EditValidEnd",
]

const SearchFormLayout = ['FormMaterialNumber', 'FormDescription']

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
  const { FromParams, list, pagination, tableLoading, addModalVisible, editModalVisible, detailsModalVisible, deleteModalVisible,
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
      validateFields(AddFormLayout, (err, payload) => {
        const createParam = {
          MaterialNumber: payload.AddMaterialNumber,
          Version: parseInt(payload.AddVersion),
          Description: payload.AddDescription,
          Specification: payload.AddSpecification,
          CustomerMaterialNumber: payload.AddCustomerMaterialNumber,
          SupplierMaterialNumber: payload.AddSupplierMaterialNumber,
          MaterialGroupType: parseInt(payload.AddMaterialGroupType),
          IsProduct: payload.AddIsProduct,
          IsMultiPanel: payload.AddIsMultiPanel,
          RequireBackflush: payload.AddRequireBackflush,
          NumberOfPanels: parseInt(payload.AddNumberOfPanels),
          Unit: parseInt(payload.AddUnit),
          SetupFlag: payload.AddSetupFlag,
          ProcurementType: parseInt(payload.AddProcurementType),
          MinimumPackageQuantity: payload.AddMinimumPackageQuantity,
          ExpirationTime: payload.AddExpirationTime,
          SafetyStock: payload.AddSafetyStock,
          DefaultStorageLocationId: parseInt(payload.AddDefaultStorageLocationId),
          ContainerSize: parseInt(payload.AddContainerSize),
          MSL: parseInt(payload.AddMSL),
          State: parseInt(payload.AddState),
          DefaultStationGroupId: payload.AddDefaultStationGroupId,
          CompanyId: payload.AddCompanyId,
          FactoryId: payload.AddFactoryId,
          ValidBegin: payload.AddValidBegin,
          ValidEnd: payload.AddValidEnd
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
          MaterialNumber: payload.EditMaterialNumber,
          Version: parseInt(payload.EditVersion),
          Description: payload.EditDescription,
          Specification: payload.EditSpecification,
          CustomerMaterialNumber: payload.EditCustomerMaterialNumber,
          SupplierMaterialNumber: payload.EditSupplierMaterialNumber,
          MaterialGroupType: parseInt(payload.EditMaterialGroupType),
          IsProduct: payload.EditIsProduct,
          IsMultiPanel: payload.EditIsMultiPanel,
          RequireBackflush: payload.EditRequireBackflush,
          NumberOfPanels: parseInt(payload.EditNumberOfPanels),
          Unit: parseInt(payload.EditUnit),
          SetupFlag: payload.EditSetupFlag,
          ProcurementType: parseInt(payload.EditProcurementType),
          MinimumPackageQuantity: payload.EditMinimumPackageQuantity,
          ExpirationTime: payload.EditExpirationTime,
          SafetyStock: payload.EditSafetyStock,
          DefaultStorageLocationId: parseInt(payload.EditDefaultStorageLocationId),
          ContainerSize: parseInt(payload.EditContainerSize),
          MSL: parseInt(payload.EditMSL),
          State: parseInt(payload.EditState),
          DefaultStationGroupId: payload.EditDefaultStationGroupId,
          CompanyId: payload.EditCompanyId,
          FactoryId: payload.EditFactoryId,
          ValidBegin: payload.EditValidBegin,
          ValidEnd: payload.EditValidEnd
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
                initialValue: '',
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
              initialValue: '',
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
              initialValue: '',
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
              initialValue: '',
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
                initialValue: '',
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
              initialValue: '',
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
                initialValue: '',
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
            })(<InputNumber min={0} />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="过期周期(天)"
          >
            {getFieldDecorator('AddExpirationTime', {
              initialValue: '',
            })(<InputNumber min={0} />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="安全库存"
          >
            {getFieldDecorator('AddSafetyStock', {
              initialValue: '',
            })(<InputNumber min={0} />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="默认库位编号"
          >
            {getFieldDecorator('AddDefaultStorageLocationId', {
              initialValue: '',
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
                initialValue: '',
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
              {getFieldDecorator('AddState', {
                initialValue: '',
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
            {getFieldDecorator('AddDefaultStationGroupId', {
              initialValue: '',
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
              {getFieldDecorator('AddCompanyId', {
                initialValue: '',
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
              {getFieldDecorator('AddFactoryId', {
                initialValue: '',
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
              initialValue: '',
            })(
              <DatePicker format={dateFormat} />
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="失效日期"
          >
            {getFieldDecorator('AddValidEnd', {
              initialValue: '',
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
            {getFieldDecorator('EditMaterialNumber', {
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
            {getFieldDecorator('EditVersion', {
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
            {getFieldDecorator('EditDescription', {
              initialValue: EditData.Description,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="规格"
          >
            {getFieldDecorator('EditSpecification', {
              initialValue: EditData.Specification,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="客户侧料号"
          >
            {getFieldDecorator('EditCustomerMaterialNumber', {
              initialValue: EditData.CustomerMaterialNumber,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="供应商侧料号"
          >
            {getFieldDecorator('EditSupplierMaterialNumber', {
              initialValue: EditData.SupplierMaterialNumber,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="物料类型"
          >
            <div>
              {getFieldDecorator('EditMaterialGroupType', {
                initialValue: EditData.MaterialGroupTypeId.toString(),
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
            {getFieldDecorator('EditIsProduct', {
              initialValue: EditData.IsProduct,
            })(
              <Select>
                <Option key={0} value={true}>是</Option>
                <Option key={1} value={false}>否</Option>
              </Select>
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否是连扳"
          >
            {getFieldDecorator('EditIsMultiPanel', {
              initialValue: EditData.IsMultiPanel,
            })(
              <Select>
                <Option key={0} value={true}>是</Option>
                <Option key={1} value={false}>否</Option>
              </Select>
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否反冲"
          >
            {getFieldDecorator('EditRequireBackflush', {
              initialValue: EditData.RequireBackflush,
            })(
              <Select>
                <Option key={0} value={true}>是</Option>
                <Option key={1} value={false}>否</Option>
              </Select>
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="连扳数"
          >
            {getFieldDecorator('EditNumberOfPanels', {
              initialValue: EditData.NumberOfPanels,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="单位"
          >
            <div>
              {getFieldDecorator('EditUnit', {
                initialValue: EditData.UnitId.toString(),
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
            {getFieldDecorator('EditSetupFlag', {
              initialValue: EditData.SetupFlag,
            })(
              <Select>
                <Option key={0} value={true}>是</Option>
                <Option key={1} value={false}>否</Option>
              </Select>
              )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="采购类型"
          >
            <div>
              {getFieldDecorator('EditProcurementType', {
                initialValue: EditData.ProcurementTypeId.toString(),
                // initialValue: '1'
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
            {getFieldDecorator('EditMinimumPackageQuantity', {
              initialValue: EditData.MinimumPackageQuantity
            })(<InputNumber min={0} />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="过期周期(天)"
          >
            {getFieldDecorator('EditExpirationTime', {
              initialValue: EditData.ExpirationTime
            })(<InputNumber min={0} />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="安全库存"
          >
            {getFieldDecorator('EditSafetyStock', {
              initialValue: EditData.ExpirationTime
            })(<InputNumber min={0} />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="默认库位编号"
          >
            {getFieldDecorator('EditDefaultStorageLocationId', {
              initialValue: EditData.DefaultStorageLocationId,
              // initialValue: '7'
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
            {getFieldDecorator('EditContainerSize', {
              initialValue: EditData.ContainerSize,
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="湿敏等级MSL"
          >
            <div>
              {getFieldDecorator('EditMSL', {
                initialValue: EditData.MSLId.toString()
                // initialValue: '4',
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
              {getFieldDecorator('EditState', {
                initialValue: EditData.State.toString(),
                // initialValue: '1',
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
            {getFieldDecorator('EditDefaultStationGroupId', {
              initialValue: EditData.DefaultStationGroupId != null ? EditData.DefaultStationGroupId.toString() : '',
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
              {getFieldDecorator('EditCompanyId', {
                initialValue: EditData.CompanyId.toString()
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
              {getFieldDecorator('EditFactoryId', {
                initialValue: EditData.FactoryId
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
            {getFieldDecorator('EditValidBegin', {
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
            {getFieldDecorator('EditValidEnd', {
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
        <Form >
          <FormItem
            {...formItemLayout}
            label="料号"
          >
            <Input disabled value={DetailsData.MaterialNumber} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="版本"
          >
            <Input disabled value={DetailsData.Version} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="描述"
          >
            <Input disabled value={DetailsData.Description} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="规格"
          >
            <Input disabled value={DetailsData.Specification} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="客户侧料号"
          >
            <Input disabled value={DetailsData.CustomerMaterialNumber} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="供应商侧料号"
          >
            <Input disabled value={DetailsData.SupplierMaterialNumber} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="物料类型"
          >
            <Input disabled value={DetailsData.MaterialGroupType} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否是半成品"
          >
            <Input disabled value={DetailsData.IsProduct} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否是连扳"
          >
            <Input disabled value={DetailsData.IsMultiPanel} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否反冲"
          >
            <Input disabled value={DetailsData.RequireBackflush} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="连扳数"
          >
            <Input disabled value={DetailsData.NumberOfPanels} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="单位"
          >
            <Input disabled value={DetailsData.Unit} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="是否上料"
          >
            <Input disabled value={DetailsData.SetupFlag} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="采购类型"
          >
            <Input disabled value={DetailsData.ProcurementType} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="最小包装数"
          >
            <Input disabled value={DetailsData.MinimumPackageQuantity} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="过期周期(天)"
          >
            <Input disabled value={DetailsData.ExpirationTime} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="安全库存"
          >
            <Input disabled value={DetailsData.SafetyStock} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="默认库位编号"
          >
            <Input disabled value={DetailsData.DefaultStorageLocation} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="容器大小"
          >
            <Input disabled value={DetailsData.ContainerSize} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="湿敏等级MSL"
          >
            <Input disabled value={DetailsData.MSL} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="状态"
          >
            <Input disabled value={DetailsData.StateValue} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="默认工站组"
          >
            <Input disabled value={DetailsData.DefaultStationGroup} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="公司"
          >
            <Input disabled value={DetailsData.CompanyNumber} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="工厂"
          >
            <Input disabled value={DetailsData.FactoryNumber} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="生效日期"
          >
            <Input disabled value={DetailsData.ValidBegin} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="失效日期"
          >
            <Input disabled value={DetailsData.ValidEnd} />
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
        </Form>
      </div>
    )
  }

  const handleSearch = (e) => {
    e.preventDefault()
    validateFields(SearchFormLayout, (err, payload) => {
      if (!err) {
        const Params = {
          MaterialNumber: payload.FormMaterialNumber,
          Description: payload.FormDescription
        }
        SearchTableList(Params, 1, pagination.PageSize)
      }
    });
  }
  const PaginationComponentsChanger = (PageIndex, PageSize) => {
    const Params = {
      MaterialNumber: FromParams.MaterialNumber,
      Description: FromParams.Description,
    }
    SearchTableList(Params, PageIndex, PageSize)
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
  const handleResetFields = (type) => {
    if (type === 'SearchFormLayout') {
      resetFields(SearchFormLayout)
    } else if (type === 'AddFormLayout') {
      resetFields(AddFormLayout)
    }
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
                <FormItem {...formItemLayout} label={`物料编号`}>
                  {getFieldDecorator(`FormMaterialNumber`)(
                    <Input />
                  )}
                </FormItem>
              </Col>
              <Col span={8} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`物料描述`}>
                  {getFieldDecorator(`FormDescription`)(
                    <Input />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit"><Icon type="search" />查询</Button>
              <Button style={{ marginLeft: '7px' }} onClick={() => handleResetFields('SearchFormLayout')}><Icon type="delete" />清空</Button>
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
          TableWidth={3500}
          addModalValue={addModalValue()}
          editModalValue={editModalValue()}
          detailsModalValue={detailsModalValue()}
          handleAdd={handleAdd}
          tableModels={TableModelsData}
          PaginationComponentsChanger={PaginationComponentsChanger}
          handleResetFields={handleResetFields}
        />
      </div>
    </div>
  )
}


export default connect(({ materielTable }) => ({ materielTable }))(Form.create()(MaterielTableComponents))
