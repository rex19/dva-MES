import React from 'react'
import PropTypes from 'prop-types'
import { Form, Modal, Input, Row, Col, Button, Select, DatePicker, Table } from 'antd'
import moment from 'moment';
import './index.less'

const InputGroup = Input.Group;
const { TextArea } = Input
const { Option, OptGroup } = Select;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const FormItem = Form.Item


const ProcessColumns = [{
  title: '工站号',
  dataIndex: 'StationNumber',
}, {
  title: '工站描述',
  dataIndex: 'StationDescription',
}, {
  title: '投入产品数',
  dataIndex: 'InputQuantity',
}, {
  title: '产出产品数',
  dataIndex: 'OutputQuantity',
}, {
  title: '总上传数',
  dataIndex: 'TotalUploadBookingQuantity',
}, {
  title: 'PASS数',
  dataIndex: 'TotalPassBookingQuantity',
}, {
  title: 'Fail数',
  dataIndex: 'TotalFailBookingQuantity',
}, {
  title: 'Scrap数',
  dataIndex: 'TotalScrapBookingQuantity',
}, {
  title: '良率',
  dataIndex: 'GoodRate',
}, {
  title: 'FPY',
  dataIndex: 'FPY',
}, {
  title: '平均节拍(秒)',
  dataIndex: 'AverageCycleTime',
}]

const GetPartInformationListForCreateWorkOrderLayout = [
  'MaterialNumberDecorator',
  'VersionDecorator'
]
const CreateWorkOrderLayout = [
  'PartIdDecorator',
  'ProcessIdDecorator',
  'WorkOrderNumberDecorator',
  'QuantityDecorator',
  'LineNameDecorator',
  'ShiftNameDecorator',
  'CycleTimeInTheoryDecorator',
  'OEEInTheoryDecorator',
  'PlanStartDateTimeDecorator',
  'PlanEndDateTimeDecorator',
  'CommentDecorator',
]
const EditWorkOrderLayout = [
  'PartIdEditDecorator',
  'PartNumberEditDecorator',
  'MaterialNumberEditDecorator',
  'VersionEditDecorator',
  'WorkOrderStateEditDecorator',
  'WorkOrderNumberEditDecorator',
  'QuantityEditDecorator',
  'LineNameEditDecorator',
  'ShiftNameEditDecorator',
  'PlanStartDateTimeEditDecorator',
  'PlanEndDateTimeEditDecorator',
  'CommentEditDecorator',
  'WorkOrderNumberEditDecorator'
]


export class Modals extends React.Component {
  state = {
    MaterialNumberValue: '',
    VersionValue: '',
  };
  // handleChangeValue = () => (value) => {
  //   console.log(`handleChangeValue========> ${value}`);
  //   // this.setState({ MaterialNumberValue: value })
  // }

  handleClickGetPartInformationListForCreateWorkOrder = () => {

    this.props.form.validateFields(GetPartInformationListForCreateWorkOrderLayout, (err, payload) => {
      if (!err) {
        const Params = {
          MaterialNumber: payload.MaterialNumberDecorator,
          Version: payload.VersionDecorator,
        }
        console.log('handleClickGetPartInformationListForCreateWorkOrder-', Params)
        this.props.SearchGetPartInformationListForCreateWorkOrder(Params)
      }
    })
  }

  handleVMPartInformationChange = (Params) => {//onChange={this.handleVMPartInformationChange}
    console.log('handleVMPartInformationChange', Params)
    this.props.SearchGetProcessListForCreateWorkOrder(Params)
  }
  handleAddModalLineNamesChange = (Params) => {
    console.log('handleAddModalLineNamesChange', Params)
    this.props.SearchGetBaseLineInformation(Params)
  }

  handleOk = (modalType) => {
    // this.props.handleAdd(modalType)
    if (modalType === 'create') {
      this.props.form.validateFields(CreateWorkOrderLayout, (err, payload) => {
        if (!err) {
          const Params = {
            BOMHeadId: payload.PartIdDecorator,
            ProcessId: payload.ProcessIdDecorator,
            WorkOrderNumber: payload.WorkOrderNumberDecorator,
            Quantity: payload.QuantityDecorator,
            CycleTimeInTheory: payload.CycleTimeInTheoryDecorator,
            OEEInTheory: payload.OEEInTheoryDecorator,
            PlanStartDateTime: moment(payload.PlanStartDateTimeDecorator).format(),
            PlanEndDateTime: moment(payload.PlanEndDateTimeDecorator).format(),
            Comment: payload.CommentDecorator,
            CreatorId: 10,
            LineId: payload.LineNameDecorator,
            ShiftId: payload.ShiftNameDecorator,
          }
          this.props.handleAdd(Params, modalType)
        }
      })
    } else if (modalType === 'edit') {
      this.props.form.validateFields(EditWorkOrderLayout, (err, payload) => {
        if (!err) {
          const Params = {
            // BOMHeadId: payload.PartIdEditDecorator,
            // PartNumber: payload.PartNumberEditDecorator,
            // Version: payload.VersionEditDecorator,
            // WorkOrderNumber: payload.WorkOrderNumberEditDecorator,
            // WorkOrderState: payload.WorkOrderStateEditDecorator,
            // Quantity: payload.QuantityEditDecorator,
            // PlanStartDateTime: moment(payload.PlanStartDateTimeEditDecorator).format(),
            // PlanEndDateTime: moment(payload.PlanEndDateTimeEditDecorator).format(),
            // Comment: payload.CommentEditDecorator,
            // CreatorId: 10,
            // LineId: payload.LineNameDecorator,
            // ShiftId: payload.ShiftNameDecorator,

            // Quantity: payload.QuantityEditDecorator,
            Quantity: payload.QuantityEditDecorator,
            LineId: payload.LineNameEditDecorator,
            ShiftId: payload.ShiftNameEditDecorator,
            PlannedStartDateTime: moment(payload.PlanStartDateTimeEditDecorator).format(),
            PlannedFinishDateTime: moment(payload.PlanEndDateTimeEditDecorator).format(),
            Comment: payload.CommentEditDecorator,
            State: payload.WorkOrderStateEditDecorator,
            EditorId: 10,
            WorkOrderNumber: payload.WorkOrderNumberEditDecorator,
          }
          // console.log('else if (modalType === edit', Params)
          this.props.handleAdd(Params, modalType)
        }
      })
    }
  }

  render() {
    console.log('ModalComponents-render', this.props)
    const { getFieldDecorator } = this.props.form;
    const {
      addModalVisible,
      handleModalClose,
      addModalValue,
      editModalVisible,
      editModalValue,
      detailsModalVisible,
      deleteModalVisible,
      detailsModalValue,
      // handleAdd,
      ModalWidth,
      addModalLineNames,
      addModalShiftNames,
      VMPartInformation,
      VMProcessInformation,
      CycleTimeInTheory,
      OEEInTheory } = this.props
    // const handleOk = (modalType) => {
    //   handleAdd(modalType)
    // }

    const handleChange = (value) => {
      console.log(`selected ${value}`);
    }

    const formItemLayout = {
      labelCol: { span: 9 },
      wrapperCol: { span: 10 },
    };
    // onChange = (key) => (value) => {

    // }
    return (
      <div>
        <Modal
          title="新建"
          visible={addModalVisible}
          width={ModalWidth || 820}
          onOk={() => this.handleOk('create')}
          onCancel={() => handleModalClose('addModalVisible')}
        >
          <Form
            className="ant-advanced-search-form"
          // onSubmit={this.handleSearch}
          >
            <Row gutter={30}>
              <Col span={10} key={1} style={{ display: 'block' }}>

                <FormItem {...formItemLayout} label={`成品/半成品料号`}>
                  {getFieldDecorator(`MaterialNumberDecorator`, {
                    initialValue: '',
                  })(
                    <Input />
                    )}
                </FormItem>
              </Col>
              <Col span={10} key={2} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`版本号`}>
                  {getFieldDecorator(`VersionDecorator`, {
                    initialValue: '',
                  })(<Input />)}
                </FormItem>
              </Col>
              <Col span={3}>
                <Button onClick={this.handleClickGetPartInformationListForCreateWorkOrder}>搜索</Button>
              </Col>
            </Row>
            <Row gutter={30}>
              <Col span={10} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`成品半成品列表`}>
                  {getFieldDecorator(`PartIdDecorator`, {
                    initialValue: '',
                  })(<Select >
                    {VMPartInformation.map(function (item, index) {
                      return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                    })}
                  </Select>)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={30}>
              <Col span={10} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`工艺列表`}>
                  {getFieldDecorator(`ProcessIdDecorator`, {
                    initialValue: '',
                  })(<Select >
                    {VMProcessInformation.map(function (item, index) {
                      return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                    })}
                  </Select>)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={30}>
              <Col span={10} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`工单号`}>
                  {getFieldDecorator(`WorkOrderNumberDecorator`, {
                    initialValue: '',
                  })(<Input />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={30}>
              <Col span={10} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`数量`}>
                  {getFieldDecorator(`QuantityDecorator`, {
                    initialValue: '',
                  })(<Input />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={30}>
              <Col span={10} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`总线体`}>
                  {getFieldDecorator(`LineNameDecorator`, {
                    initialValue: '',
                  })(<Select onChange={this.handleAddModalLineNamesChange}>
                    {addModalLineNames.map(function (item, index) {
                      return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                    })}
                  </Select>)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={30}>
              <Col span={10} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`班别`}>
                  {getFieldDecorator(`ShiftNameDecorator`, {
                    initialValue: '',
                  })(<Select >
                    {addModalShiftNames.map(function (item, index) {
                      return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                    })}
                  </Select>)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={30}>
              <Col span={10} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`节拍时间`}>
                  {getFieldDecorator(`CycleTimeInTheoryDecorator`, {
                    initialValue: CycleTimeInTheory,
                  })(<Input />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={30}>
              <Col span={10} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`目标稼动率`}>
                  {getFieldDecorator(`OEEInTheoryDecorator`, {
                    initialValue: OEEInTheory,
                  })(<Input />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={30}>
              <Col span={10} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`计划开始`}>
                  {getFieldDecorator(`PlanStartDateTimeDecorator`, {
                    initialValue: '',
                  })(<DatePicker
                    placeholder="计划开始"
                    showTime format="YYYY-MM-DD HH:mm:ss" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={30}>
              <Col span={10} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`计划结束`}>
                  {getFieldDecorator(`PlanEndDateTimeDecorator`, {
                    initialValue: '',
                  })(<DatePicker
                    placeholder="计划结束"
                    showTime format="YYYY-MM-DD HH:mm:ss" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={30}>
              <Col span={10} key={1} style={{ display: 'block' }}>
                <FormItem {...formItemLayout} label={`工单备注`}>
                  {getFieldDecorator(`CommentDecorator`, {
                    initialValue: '',
                  })(<TextArea rows={4} />)}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>




        <Modal
          title="修改"
          visible={editModalVisible}
          width={ModalWidth || 820}
          onOk={() => this.handleOk('edit')}
          onCancel={() => handleModalClose('editModalVisible')}
        >
          <div style={{ marginBottom: 16 }}>
            <Form
              className="ant-advanced-search-form"
            // onSubmit={this.handleSearch}
            >
              <Row gutter={30}>
                <Col span={10} key={1} style={{ display: 'block' }}>
                  <FormItem {...formItemLayout} label={`成品/半成品料号`}>
                    {getFieldDecorator(`PartNumberEditDecorator`, {
                      initialValue: this.props.EditData.PartNumber,
                    })(
                      <Input />
                      )}
                  </FormItem>
                </Col>
                <Col span={10} key={2} style={{ display: 'block' }}>
                  <FormItem {...formItemLayout} label={`版本号`}>
                    {getFieldDecorator(`VersionEditDecorator`, {
                      initialValue: this.props.EditData.Version,
                    })(<Input />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={10} key={1} style={{ display: 'block' }}>
                  <FormItem {...formItemLayout} label={`成品/半成品ID`}>
                    {getFieldDecorator(`PartIdEditDecorator`, {
                      initialValue: this.props.EditData.PartId,
                    })(<Input />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={10} key={1} style={{ display: 'block' }}>
                  <FormItem {...formItemLayout} label={`工单状态`}>
                    {getFieldDecorator(`WorkOrderStateEditDecorator`, {
                      initialValue: this.props.EditData.WorkOrderState,
                    })(<Select >
                      {this.props.EditAllWorkOrderStates.map(function (item, index) {
                        return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                      })}
                    </Select>)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={10} key={1} style={{ display: 'block' }}>
                  <FormItem {...formItemLayout} label={`工单号`}>
                    {getFieldDecorator(`WorkOrderNumberEditDecorator`, {
                      initialValue: this.props.EditData.WorkOrderNumber,
                    })(<Input />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={10} key={1} style={{ display: 'block' }}>
                  <FormItem {...formItemLayout} label={`数量`}>
                    {getFieldDecorator(`QuantityEditDecorator`, {
                      initialValue: this.props.EditData.Quantity,
                    })(<Input />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={10} key={1} style={{ display: 'block' }}>
                  <FormItem {...formItemLayout} label={`总线体`}>
                    {getFieldDecorator(`LineNameEditDecorator`, {
                      initialValue: this.props.EditData.LineCode,
                    })(<Select onChange={this.handleAddModalLineNamesChange}>
                      {this.props.EditAllLineNames.map(function (item, index) {
                        return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                      })}
                    </Select>)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={10} key={1} style={{ display: 'block' }}>
                  <FormItem {...formItemLayout} label={`班别`}>
                    {getFieldDecorator(`ShiftNameEditDecorator`, {
                      initialValue: this.props.EditData.ShiftCode,
                    })(<Select >
                      {this.props.EditAllShiftNames.map(function (item, index) {
                        return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                      })}
                    </Select>)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={10} key={1} style={{ display: 'block' }}>
                  <FormItem {...formItemLayout} label={`计划开始`}>
                    {getFieldDecorator(`PlanStartDateTimeEditDecorator`, {
                      initialValue: moment(this.props.EditData.PlanStartDateTime, dateFormat),
                      // moment(payload.PlanStartDateTimeDecorator).format(dateFormat),
                    })(<DatePicker
                      placeholder="计划开始"
                      showTime format="YYYY-MM-DD HH:mm:ss" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={10} key={1} style={{ display: 'block' }}>
                  <FormItem {...formItemLayout} label={`计划结束`}>
                    {getFieldDecorator(`PlanEndDateTimeEditDecorator`, {
                      initialValue: moment(this.props.EditData.PlanEndDateTime, dateFormat),
                    })(<DatePicker
                      placeholder="计划结束"
                      showTime format="YYYY-MM-DD HH:mm:ss" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={30}>
                <Col span={10} key={1} style={{ display: 'block' }}>
                  <FormItem {...formItemLayout} label={`工单备注`}>
                    {getFieldDecorator(`CommentEditDecorator`, {
                      initialValue: this.props.EditData.Comment,
                    })(<TextArea rows={4} />)}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </Modal>
        <Modal
          title="详细"
          visible={detailsModalVisible}
          width={ModalWidth || 920}
          onOk={() => handleModalClose('detailsModalVisible')}
          onCancel={() => handleModalClose('detailsModalVisible')}
        >
          <div>
            <Form>
              <FormItem
                {...formItemLayout}
                label="工单号"
              >
                <Input disabled value={this.props.DetailsData.WorkOrderNumber} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="工单状态"
              >
                <Input disabled value={this.props.DetailsData.WorkOrderState} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="成品/半成品料号"
              >
                <Input disabled value={this.props.DetailsData.PartNumber} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="产品描述"
              >
                <Input disabled value={this.props.DetailsData.PartDescription} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="工艺号"
              >
                <Input disabled value={this.props.DetailsData.ProcessNumber} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="数量"
              >
                <Input disabled value={this.props.DetailsData.PlannedQuantity} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="总线体"
              >
                <Input disabled value={this.props.DetailsData.LineName} />
              </FormItem>

              <FormItem
                {...formItemLayout}
                label="班别"
              >
                <Input disabled value={this.props.DetailsData.ShiftName} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="计划开始"
              >
                <Input disabled value={this.props.DetailsData.PlanStartDateTime} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="计划结束"
              >
                <Input disabled value={this.props.DetailsData.PlanEndDateTime} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="实际开始"
              >
                <Input disabled value={this.props.DetailsData.ActualStartDateTime} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="实际结束"
              >
                <Input disabled value={this.props.DetailsData.ActualEndDateTime} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="工单备注"
              >
                <Input disabled value={this.props.DetailsData.Comment} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="理论节拍时间"
              >
                <Input disabled value={this.props.DetailsData.CycleTimeInTheory} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="实际平均节拍"
              >
                <Input disabled value={this.props.DetailsData.ActualCycleTime} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="目标稼动率"
              >
                <Input disabled value={this.props.DetailsData.OEEInTheory} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="稼动率"
              >
                <Input disabled value={this.props.DetailsData.ActualOEE} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="FPY"
              >
                <Input disabled value={this.props.DetailsData.FPY} />
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="良率"
              >
                <Input disabled value={this.props.DetailsData.GoodRate} />
              </FormItem>
              <FormItem
                // {...formItemLayout}
                label="各工艺生产情况"
              >
                <Table columns={ProcessColumns} dataSource={this.props.DetailsData.EachStationPerformanceData} />
              </FormItem>
            </Form>
          </div>

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

export const ModalComponents = Form.create()(Modals)
// export  ModalComponents

