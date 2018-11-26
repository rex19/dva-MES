import React from 'react'
import { AutoComplete } from 'antd';

function onSelect(value) {
  console.log('onSelect-no', value);
}
const dataSource1 = [
  "sa2",
  "test002Mouse",
  "2",
  "test003Monitor",
  "test004Fans",
  "test005CPU",
  "44444555",
  "test001PC",
  "1.1.001",
  "1.1.002",
  "1.1.003",
  "1.1.004"
]

export default class AutoCompleteComponent extends React.Component {
  state = {
    dataSource: [

    ],
  }

  handleSearch = (value) => {
    console.log('handleSearch-no', value),
      this.setState({
        dataSource: !value ? [] : [
          value,
          value + value,
          value + value + value,
        ],
      });
  }

  render() {
    const { dataSource } = this.props;
    console.log('AutoCompleteComponent-render', dataSource)
    // const { dataSource } = this.state;

    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={this.handleSearch}
        placeholder="请填写物料号自动补全"
        // backfill={true}
        allowClear={true}
        autoFocus={true}
        defaultActiveFirstOption={true}
        filterOption={true}
      />
    );
  }
}
