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
    StationGroupNameKey: '',
    editable: false,
  }
  handleChange = (e) => {
    console.log('handleChange', e)
    this.setState({
      value: e.label,
      StationGroupNameKey: e.key
    });
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
                  return <Option key={index} value={item}>{item.label}</Option>
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
      title: '序列号',
      dataIndex: 'Secquence',
      render: (text, record) => (
        <EditableCellInput
          value={text}
          onChange={this.onCellChange(record.key, 'Secquence')}
        />
      ),
    }, {
      title: '描述',
      dataIndex: 'Desctiption',
      render: (text, record) => (
        <EditableCellInput
          value={text}
          onChange={this.onCellChange(record.key, 'Desctiption')}
        />
      ),
    }, {
      title: '工站组',
      dataIndex: 'StationGroupName',
      render: (text, record) => (
        <EditableCellSelect
          value={text}
          onChange={this.onCellChange(record.key, 'StationGroupName')}
          StationGroup={this.props.StationGroup}
          type='StationGroupName'
        />
      ),
    }, {
      title: '是否必做',
      dataIndex: 'IsMandatory',
      width: '10%',
      render: (text, record) => (
        <EditableCellRadio
          value={text === true ? '是' : '否'}
          onChange={this.onCellChange(record.key, 'IsMandatory')}
        />
      ),
    }, {
      title: '是否需要上料检验',
      dataIndex: 'IsNeedSetupCheck',
      render: (text, record) => (
        <EditableCellRadio
          value={text === true ? '是' : '否'}
          onChange={this.onCellChange(record.key, 'IsNeedSetupCheck')}
        />
      ),
    }, {
      title: '最大测试次数',
      dataIndex: 'MaximumTestCount',
      render: (text, record) => (
        <EditableCellInput
          value={text}
          onChange={this.onCellChange(record.key, 'MaximumTestCount')}
        />
      ),
    }, {
      title: '是否反冲',
      dataIndex: 'IsBackflush',
      render: (text, record) => (
        <EditableCellRadio
          value={text === true ? '是' : '否'}
          onChange={this.onCellChange(record.key, 'IsBackflush')}
        />
      ),
    }, {
      title: '正反面',
      dataIndex: 'Side',
      render: (text, record) => (
        console.log('正反面', text, record),
        <EditableCellSelect
          value={text}
          onChange={this.onCellChange(record.key, 'Side')}
          type='Side'
        />
      ),
    }, {
      title: 'operation',
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
        Secquence: 1,
        Desctiption: '1',
        StationGroupName: 4,
        IsMandatory: true,
        IsNeedSetupCheck: true,
        MaximumTestCount: '',
        IsBackflush: true,
        Side: 0
      }],
      count: 1,
    };
  }
  onCellChange = (key, dataIndex) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        console.log('onCellChange', key, dataIndex, value, target, dataSource)
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
      Secquence: count,
      Desctiption: `Desctiption${count}`,
      StationGroupName: count,
      IsMandatory: true,
      IsNeedSetupCheck: true,
      MaximumTestCount: `${count}`,
      IsBackflush: true,
      Side: 0
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



