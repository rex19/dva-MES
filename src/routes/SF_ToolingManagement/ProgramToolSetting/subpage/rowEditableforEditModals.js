import { Table, Input, InputNumber, Popconfirm, Select, Radio, Button } from 'antd';


const Option = Select.Option;
const RadioGroup = Radio.Group;

const data = [];
// for (let i = 0; i < 1; i++) {
//   data.push({
//     key: i.toString(),
//     Secquence: i,
//     Description: `描述`,
//     StationGroupId: '请选择',
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
      // return '请选择'
    } else if (type === 'StationGroupId' && this.props.StationGroup.length > 0 && value !== '') {
      if (this.props.StationGroup.length > 0 && Number.isInteger(value)) {
        const temp = this.props.StationGroup.find((item, index) => item.key === parseInt(value))
        return temp.label
      }
      return '请选择'
      // const temp = this.props.StationGroup.find((item, index) => item.key === parseInt(this.props.StationGroupIdValue))
      // return temp.label
    } else if (type === 'StationGroupId' && !this.props.StationGroup) {
      return '请选择2'
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
    } else if (this.props.type === 'StationGroupId') {
      return this.props.editable === true ?
        <div className="editable-cell-input-wrapper">
          <Select defaultValue='请选择' onChange={this.handleStationGroupOnChange}>
            {this.props.StationGroup.map(function (item, index) {
              return <Option key={index} value={item.key}>{item.label}</Option>
            })}
          </Select>
        </div>
        : this.valueToString(this.props.value, 'StationGroupId')
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
      count: this.props.ItemCount
    };
    this.columns = [{
      title: '项名',
      dataIndex: 'ParameterName',
      render: (text, record) => this.renderColumns(text, record, 'ParameterName'),
    }, {
      title: '值',
      dataIndex: 'MatchString',
      render: (text, record) => this.renderColumns(text, record, 'MatchString'),
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
                  <span className="ant-divider" />
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
      console.log('window.BOMTempRender')
      // this.setState({ count: nextProps.ItemCount + 1 })
      return true
    } else if (!window.BOMTempRender) {
      console.log('!window.BOMTempRender')
      this.setState({ data: this.props.EditDataSource, count: nextProps.ItemCount + 1 })
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
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  onDelete = (key) => {
    window.BOMTempRender = true
    const data = [...this.state.data];
    this.setState({ data: data.filter(item => item.key !== key) });
    let y = setTimeout(() => this.props.onEditableCellChange(this.state.data, 'RowEditableEditTable'), 2000)
    console.log('onDelete xxxx')
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

    let x = setTimeout(() => console.log('save', newData, target, this.state.data, this.cacheData), 2000);
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
      ParameterName: '请输入',
      MatchString: '请输入',
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
        <Table bordered size={'small'} dataSource={this.state.data} columns={this.columns} />
        <Button className="editable-add-btn" onClick={this.handleAdd.bind(this)}>添加一行</Button>
      </div>
    )
  }
}



export default RowEditableEditTable
