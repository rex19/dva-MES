import React, { Component } from 'react';
import TableInnerForm from './tableInnerForm.js';
import TableInnerTable from './tableInnerTable.js';
import TableInnerPagination from './tableInnerPagination.js';
import './index.less';

export default class TableComponents extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <TableInnerForm />
        <TableInnerTable />
        <TableInnerPagination />
      </div>
    );
  }
}

