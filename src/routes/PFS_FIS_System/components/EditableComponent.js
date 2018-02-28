import { Table, Input, Icon, Button, Popconfirm, Select } from 'antd';
import './index.less'

const Option = Select.Option;

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
          editable ?
            <div className="editable-cell-input-wrapper">
              <Select defaultValue='激光打标' onChange={this.handleChange} onPressEnter={this.check}>
                <Option key={0} value='激光打标'>激光打标</Option>
                <Option key={1} value='下板机'>下板机</Option>
                <Option key={2} value='锡膏印刷'>锡膏印刷</Option>
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
        }
      </div>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      title: 'Secquence',
      dataIndex: 'Secquence',
      render: (text, record) => (
        <EditableCellInput
          value={text}
          onChange={this.onCellChange(record.key, 'Secquence')}
        />
      ),
    }, {
      title: 'ProcessId',
      dataIndex: 'ProcessId',
      render: (text, record) => (
        <EditableCellSelect
          value={text}
          onChange={this.onCellChange(record.key, 'ProcessId')}
        />
      ),
    }, , {
      title: 'Desctiption',
      dataIndex: 'Desctiption',
      render: (text, record) => (
        <EditableCellSelect
          value={text}
          onChange={this.onCellChange(record.key, 'Desctiption')}
        />
      ),
    }, {
      title: 'StationGroupId',
      dataIndex: 'StationGroupId',
      render: (text, record) => (
        <EditableCellSelect
          value={text}
          onChange={this.onCellChange(record.key, 'StationGroupId')}
        />
      ),
    }, {
      title: 'IsMandatory',
      dataIndex: 'IsMandatory',
      width: '10%',
      render: (text, record) => (
        <EditableCellSelect
          value={text === true ? '是' : '否'}
          onChange={this.onCellChange(record.key, 'IsMandatory')}
        />
      ),
    }, {
      title: 'IsNeedSetupCheck',
      dataIndex: 'IsNeedSetupCheck',
      render: (text, record) => (
        <EditableCellSelect
          value={text === true ? '是' : '否'}
          onChange={this.onCellChange(record.key, 'IsNeedSetupCheck')}
        />
      ),
    }, {
      title: 'MaximumTestCount',
      dataIndex: 'MaximumTestCount',
      render: (text, record) => (
        <EditableCellSelect
          value={text}
          onChange={this.onCellChange(record.key, 'MaximumTestCount')}
        />
      ),
    }, {
      title: 'IsBackflush',
      dataIndex: 'IsBackflush',
      render: (text, record) => (
        <EditableCellSelect
          value={text === true ? '是' : '否'}
          onChange={this.onCellChange(record.key, 'IsBackflush')}
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
        ProcessId: 2,
        Desctiption: '1',
        StationGroupId: 4,
        IsMandatory: true,
        IsNeedSetupCheck: true,
        MaximumTestCount: '',
        IsBackflush: true,
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
      Secquence: count,
      ProcessId: count,
      Desctiption: `Desctiption${count}`,
      StationGroupId: count,
      IsMandatory: true,
      IsNeedSetupCheck: true,
      MaximumTestCount: `${count}`,
      IsBackflush: true,
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

export default EditableTable

// ReactDOM.render(<EditableTable />, mountNode);



