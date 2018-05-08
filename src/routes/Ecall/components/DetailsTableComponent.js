import { Table } from 'antd';

// const columns = [{
//   title: 'Name',
//   dataIndex: 'name',
//   width: 150,
// }, {
//   title: 'Age',
//   dataIndex: 'age',
//   width: 150,
// }, {
//   title: 'Address',
//   dataIndex: 'address',
// }];

// const data = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }
const DetailsTableComponent = (props) => {
  return (
    <Table columns={props.Columns} dataSource={props.Data} />
  )
}

export default DetailsTableComponent
