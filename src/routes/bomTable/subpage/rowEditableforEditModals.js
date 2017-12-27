import { Table, Input, InputNumber, Popconfirm, Select, Radio, Button } from 'antd';


const Option = Select.Option;
const RadioGroup = Radio.Group;

const data = [];
// for (let i = 0; i < 1; i++) {
//   data.push({
//     key: i.toString(),
//     Secquence: i,
//     Description: `描述`,
//     SetupStationGroupId: '请选择',
//     IsMandatory: true,
//     IsNeedSetupCheck: `是`,
//     MaximumTestCount: 22,
//     IsBackflush: `是`,
//     Side: 1,
//   });
// }
const EditableCellInputTypeOfInt = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <InputNumber style={{ margin: '-5px 0' }} value={value} onChange={value => onChange(value)} />
      : value
    }
  </div>
);
const EditableCellInput = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

class EditableCellSelect extends React.Component {

  handleStationGroupOnChange = (e) => {
    this.props.onChange(e);
  }

  handleSideOnChange = (e) => {
    this.props.onChange(e);
  }
  valueToString = (value, type) => {
    if (type === 'MaterialId' && this.props.MaterialList) {
      if (this.props.MaterialList.length > 0 && Number.isInteger(value)) {
        const temp = this.props.MaterialList.find((item, index) => item.key === parseInt(value))
        return temp.label
      }
      const temp = this.props.MaterialList.find((item, index) => item.key === parseInt(this.props.MaterialIdValue))
      return temp.label
      return '请选择'
    } else if (type === 'SetupStationGroupId' && this.props.StationGroup) {
      console.log('else if (type === SetupStationGroupId && this.props.StationGroup) {', value)
      if (this.props.StationGroup.length > 0 && Number.isInteger(value)) {
        console.log('else if (type === SetupStationGroupId this.props.StationGroup.length > 0 && Number.isInteger(value)')
        const temp = this.props.StationGroup.find((item, index) => item.key === parseInt(value))
        return temp.label
      }

      const temp = this.props.StationGroup.find((item, index) => item.key === parseInt(this.props.StationGroupIdValue))
      return temp.label
    } else if (type === 'SetupStationGroupId' && !this.props.StationGroup) {
      console.log('else if (type === SetupStationGroupId && !this.props.StationGroup) {', value)
      return '请选择'
    } else if (type === 'Layer') {
      switch (value) {
        case 0:
          return '反面'
          break;
        case 1:
          return '正面'
          break;
        case 2:
          return '全面'
          break;
      }
    }
  }
  renderSelect = () => {
    if (this.props.type === 'MaterialId') {
      return this.props.editable === true ?
        <div className="editable-cell-input-wrapper">
          <Select defaultValue='请选择' onChange={this.handleStationGroupOnChange}>
            {this.props.MaterialList.map(function (item, index) {
              return <Option key={index} value={item.key}>{item.label}</Option>
            })}
          </Select>
        </div>
        : this.valueToString(this.props.value, 'MaterialId')
    } else if (this.props.type === 'SetupStationGroupId') {
      return this.props.editable === true ?
        <div className="editable-cell-input-wrapper">
          <Select defaultValue='请选择' onChange={this.handleStationGroupOnChange}>
            {this.props.StationGroup.map(function (item, index) {
              return <Option key={index} value={item.key}>{item.label}</Option>
            })}
          </Select>
        </div>
        : this.valueToString(this.props.value, 'SetupStationGroupId')
    } else if (this.props.type === 'Layer') {
      return this.props.editable === true ?
        <div className="editable-cell-input-wrapper">
          <Select defaultValue='请选择' onChange={this.handleSideOnChange}>
            <Option key={1} value={1}>正面</Option>
            <Option key={0} value={0}>反面</Option>
            <Option key={2} value={2}>全面</Option>
          </Select>
        </div>
        : this.valueToString(this.props.value, 'Layer')
    }
  }
  render() {
    // this.props.value === 2 ? '全面' : (this.props === 0 ? '反面' : '正面') || '空'
    console.log('EditableCellSelect', this.props)
    // const { value } = this.state;
    // const { editable, onChange } = this.props;
    // onChange={this.handleChange} onPressEnter={this.check}
    // {this.props.StationGroup.map(function (item, index) {
    //   return <Option key={index} value={item}>{item.label}</Option>
    // })}

    // <Option key={0} value='label1'>label1</Option>
    // <Option key={1} value='label2'>label2</Option>
    return (
      <div className="editable-cell">
        {
          this.renderSelect()
        }
      </div>
    );
  }
}

class EditableCellRadio extends React.Component {
  handleOnChange = (e) => {
    this.setState({ value: e.target.value });
    this.props.onChange(e.target.value);
  }
  render() {
    const { editable } = this.props;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <RadioGroup onChange={this.handleOnChange} value={this.props.value} >
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </RadioGroup>
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {this.props.value === true ? '是' : '否' || ' '}
            </div>
        }
      </div>
    );
  }
}

class RowEditableEditTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.EditDataSource,
      count: 1
    };
    this.columns = [{
      title: '料号|名称|版本',
      dataIndex: 'MaterialId',
      render: (text, record) => (
        <EditableCellSelect
          editable={record.editable}
          value={text}
          onChange={value => this.handleChange(value, record.key, 'MaterialId')}
          MaterialList={this.props.MaterialList}
          MaterialIdValue={record.MaterialId}
          type='MaterialId'
        />
      ),
    }, {
      title: '版本',
      dataIndex: 'Version',
      render: (text, record) => (
        <EditableCellInputTypeOfInt
          editable={record.editable}
          value={text}
          onChange={value => this.handleChange(value, record.key, 'Version')}
        />
      ),
    }, {
      title: '设备组',
      dataIndex: 'SetupStationGroupId',
      render: (text, record) => (
        console.log('设备组', text, record),
        <EditableCellSelect
          editable={record.editable}
          value={text}
          onChange={value => this.handleChange(value, record.key, 'SetupStationGroupId')}
          StationGroup={this.props.StationGroup}
          StationGroupIdValue={record.StationGroupId}
          type='SetupStationGroupId'
        />
      ),
    }, {
      title: '定位号',
      dataIndex: 'Designator',
      render: (text, record) => this.renderColumns(text, record, 'Designator'),
    }, {
      title: '正反面',
      dataIndex: 'Layer',
      render: (text, record) => (
        <EditableCellSelect
          editable={record.editable}
          value={text}
          onChange={value => this.handleChange(value, record.key, 'Layer')}
          type='Layer'
        />
      ),
    }, {
      title: '是否是产出品',
      dataIndex: 'IsAlternative',
      render: (text, record) => (
        <EditableCellRadio
          editable={record.editable}
          value={text}
          onChange={value => this.handleChange(value, record.key, 'IsAlternative')}
        />
      ),
    }, {
      title: '用量',
      dataIndex: 'Quantity',
      render: (text, record) => (
        <EditableCellInputTypeOfInt
          editable={record.editable}
          value={text}
          onChange={value => this.handleChange(value, record.key, 'Quantity')}
        />
      ),
    }, {
      title: '是否上料检测',
      dataIndex: 'IsNeedSetupCheck',
      render: (text, record) => (
        <EditableCellRadio
          editable={record.editable}
          value={text}
          onChange={value => this.handleChange(value, record.key, 'IsNeedSetupCheck')}
        />
      ),
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.key)}>保存</a>
                  <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.key)}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
                : <span><a onClick={() => this.edit(record.key)}>编辑</a>
                  <span className="ant-divider" />
                  <Popconfirm title="确定删除?" onConfirm={() => this.onDelete(record.key)}>
                    <a href="#">删除</a>
                  </Popconfirm></span>
            }
          </div>
        );
      },
    }];

    this.cacheData = data.map(item => ({ ...item }));
  }
  componentWillReceiveProps(nextProps) {
    if (window.BOMTempRender) {
      return true
    } else if (!window.BOMTempRender) {
      this.setState({ data: this.props.EditDataSource })
    }
  }

  renderColumns(text, record, column) {
    return (
      <EditableCellInput
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }
  handleChange(value, key, column) {
    console.log('handleChange', value, key, column)
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData }, console.log('handleChange-this.state.data', target, this.state.data));
    }
  }
  onDelete = (key) => {
    const data = [...this.state.data];
    this.setState({ data: data.filter(item => item.key !== key) });
  }
  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }
  save(key) {
    window.BOMTempRender = true
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
      this.props.onEditableCellChange(this.state.data, 'RowEditableEditTable')
    }

    let x = setTimeout(() => console.log('save', newData, target, this.state.data, this.cacheData), 5000);
  }
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }
  handleAdd() {
    const { count, data } = this.state;
    const newData = {
      key: count,
      MaterialId: 1,
      SetupStationGroupId: '请选择',
      Version: count,
      Designator: `PCB`, //不能超过10位
      Quantity: 0,
      IsNeedSetupCheck: true,
      Layer: 1,
      IsAlternative: true,
      StationGroup: `1`,
      MaterialName: `MaterialName${count}`,
      MaterialNumber: `MaterialNumber${count}`,
    };
    this.setState({
      data: [...data, newData],
      count: count + 1,
    });
  }


  render() {
    console.log('RowEditableTable', this.props, 'this.state.data-----', this.state.data)
    return (
      <div>
        <Button className="editable-add-btn" onClick={this.handleAdd.bind(this)}>添加一行</Button>
        <Table bordered size={'small'} dataSource={this.state.data} columns={this.columns} />
      </div>
    )
  }
}



export default RowEditableEditTable
