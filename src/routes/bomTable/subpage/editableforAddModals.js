import { Table, Input, Icon, Button, Popconfirm, Select, Radio } from 'antd';
import './index.less'

const Option = Select.Option;
const RadioGroup = Radio.Group;

class EditableCellInput extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}


class EditableCellSelect extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    console.log('handleChange', e)
    const value = e;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable && this.props.type === 'StationGroupName' ?
            <div className="editable-cell-input-wrapper">
              <Select defaultValue='请选择' onChange={this.handleChange} onPressEnter={this.check}>
                {this.props.StationGroup.map(function (item, index) {
                  return <Option key={index} value={item.key.toString()}>{item.label}</Option>
                })}
              </Select>
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            : (
              editable && this.props.type === 'Side' ?
                <div className="editable-cell-input-wrapper">
                  <Select defaultValue={2} onChange={this.handleChange} onPressEnter={this.check}>
                    <Option key={1} value={1}>正面</Option>
                    <Option key={0} value={0}>反面</Option>
                    <Option key={2} value={2}>全面</Option>
                  </Select>
                  <Icon
                    type="check"
                    className="editable-cell-icon-check"
                    onClick={this.check}
                  />
                </div>
                :
                <div className="editable-cell-text-wrapper">
                  {value || ' '}
                  <Icon
                    type="edit"
                    className="editable-cell-icon"
                    onClick={this.edit}
                  />
                </div>
            )
        }
      </div>
    );
  }
}

class EditableCellRadio extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className="editable-cell">
        {
          editable ?
            <div className="editable-cell-input-wrapper">
              <RadioGroup onChange={this.handleChange} value={this.state.value} onPressEnter={this.check}>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </RadioGroup>
              <Icon
                type="check"
                className="editable-cell-icon-check"
                onClick={this.check}
              />
            </div>
            :
            <div className="editable-cell-text-wrapper">
              {value || ' '}
              <Icon
                type="edit"
                className="editable-cell-icon"
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

class EditableforAddModals extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: '子件料号',
      dataIndex: 'MaterialName',
      render: (text, record) => (
        <EditableCellSelect
          value={text}
          onChange={this.onCellChange(record.key, 'MaterialName')}
          StationGroup={this.props.StationGroup}
          type='MaterialName'
        />
      ),
    }, {
      title: '版本号',
      dataIndex: 'Version',
      render: (text, record) => (
        <EditableCellInput
          value={text}
          onChange={this.onCellChange(record.key, 'Version')}
        />
      ),
    }, {
      title: '名称',
      dataIndex: 'MaterialNumber',
      render: (text, record) => (
        <EditableCellInput
          value={text}
          onChange={this.onCellChange(record.key, 'MaterialNumber')}
        />
      ),
    }, {
      title: '设备组',
      dataIndex: 'StationGroup',
      render: (text, record) => (
        <EditableCellSelect
          value={text}
          onChange={this.onCellChange(record.key, 'StationGroup')}
          StationGroup={this.props.StationGroup}
          type='StationGroup'
        />
      ),
    }, {
      title: '定位号',
      dataIndex: 'Designator',
      render: (text, record) => (
        <EditableCellInput
          value={text}
          onChange={this.onCellChange(record.key, 'Designator')}
        />
      ),
    }, {
      title: '正反面',
      dataIndex: 'Layer',
      render: (text, record) => (
        <EditableCellSelect
          value={text}
          onChange={this.onCellChange(record.key, 'Layer')}
          type='Layer'
        />
      ),
    }, {
      title: '是否是产出品',
      dataIndex: 'IsAlternative',
      render: (text, record) => (
        <EditableCellRadio
          value={text === true ? '是' : '否'}
          onChange={this.onCellChange(record.key, 'IsAlternative')}
        />
      ),
    }, {
      title: '用量',
      dataIndex: 'Quantity',
      render: (text, record) => (
        <EditableCellInput
          value={text}
          onChange={this.onCellChange(record.key, 'Desctiption')}
        />
      ),
    }, {
      title: '是否上料检测',
      dataIndex: 'IsNeedSetupCheck',
      render: (text, record) => (
        <EditableCellRadio
          value={text === true ? '是' : '否'}
          onChange={this.onCellChange(record.key, 'IsNeedSetupCheck')}
        />
      ),
    }, {
      title: '操作',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          this.state.dataSource.length > 0 ?
            (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                <a href="#">Delete</a>
              </Popconfirm>
            ) : null
        );
      },
    }];

    this.state = {
      dataSource: [{
        key: '0',
        MaterialName: '1',
        Version: '1',
        MaterialNumber: '1',
        Designator: '1',
        Quantity: 0,
        StationGroup: '1',
        IsNeedSetupCheck: true,
        Layer: '1',
        IsAlternative: true,
      }],
      count: 1,
    };
  }
  onCellChange = (key, dataIndex) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({ dataSource });
      }
    };
  }
  onDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      MaterialName: `MaterialName${count}`,
      Version: `Version${count}`,
      MaterialNumber: `MaterialNumber${count}`,
      Designator: `Designator${count}`,
      Quantity: 0,
      StationGroup: `StationGroup${count}`,
      IsNeedSetupCheck: true,
      Layer: `Layer${count}`,
      IsAlternative: true,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }
  render() {
    console.log('editTable', this.state)
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div>
        <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
        <Table bordered dataSource={dataSource} columns={columns} />
      </div>
    );
  }
}

export default EditableforAddModals



