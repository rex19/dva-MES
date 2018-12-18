import React from 'react';
//https://github.com/MKitty/Library-reservation/blob/master/src/components/ui/drags1.jsx


import { Row, Col, Card } from 'antd';
import Draggable from 'react-draggable';

import './index.less'
class SearchPage extends React.Component {
  state = {
    activeDrags: 0,
    deltaPosition: {
      x: 0, y: 0
    },
    controlledPosition: {
      x: -400, y: 200
    }
  };
  onStart = () => {
    this.setState({ activeDrags: ++this.state.activeDrags });
  };
  onStop = () => {
    this.setState({ activeDrags: --this.state.activeDrags });
  };
  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  };
  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    const { deltaPosition } = this.state;
    return (
      <div>
        <div className="gutter-example button-demo">

          <Row gutter={16}>
            <Col className="gutter-row" md={6}>
              <div className="gutter-box">
                <Draggable zIndex={100} {...dragHandlers}>
                  <Card bordered={false} className={'dragDemo'}>

                    I can be dragged anywhere
                      </Card>
                </Draggable>
              </div>
            </Col>
            <Col className="gutter-row" md={6}>
              <div className="gutter-box">
                <Draggable axis="x" {...dragHandlers}>
                  <Card bordered={false} className={'dragDemo'}>
                    I can only be dragged horizonally (x axis)
                      </Card>
                </Draggable>
              </div>
            </Col>
            <Col className="gutter-row" md={6}>
              <div className="gutter-box">
                <Draggable axis="y" {...dragHandlers}>
                  <Card bordered={false} className={'dragDemo'}>
                    I can only be dragged vertically (y axis)
                      </Card>
                </Draggable>
              </div>
            </Col>
            <Col className="gutter-row" md={6}>
              <div className="gutter-box">
                <Draggable onDrag={this.handleDrag} {...dragHandlers}>
                  <Card bordered={false} className={'dragDemo'}>
                    <div>I track my deltas</div>
                    <div>x: {deltaPosition.x.toFixed(0)}, y: {deltaPosition.y.toFixed(0)}</div>
                  </Card>
                </Draggable>
              </div>
            </Col>
            <Col className="gutter-row" md={6}>
              <div className="gutter-box">
                <Draggable handle="strong" {...dragHandlers}>
                  <Card bordered={false} className={'dragDemo no-cursor'}>
                    <strong className="cursor-move"><div>Drag here</div></strong>
                    <div>You must click my handle to drag me</div>
                  </Card>
                </Draggable>
              </div>
            </Col>
            <Col className="gutter-row" md={6}>
              <div className="gutter-box">
                <Draggable cancel="strong" {...dragHandlers}>
                  <Card bordered={false} className={'dragDemo'}>
                    <strong className="no-cursor"><div>Can't drag here</div></strong>
                    <div>Dragging here works</div>
                  </Card>
                </Draggable>
              </div>
            </Col>
            <Col className="gutter-row" md={6}>
              <div className="gutter-box">
                <Draggable bounds={{ top: -100, left: -100, right: 100, bottom: 100 }} zIndex={5} {...dragHandlers}>
                  <Card bordered={false} className={'dragDemo'}>
                    <div>I can only be moved 100px in any direction.</div>
                  </Card>
                </Draggable>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default SearchPage


// import React from 'react'
// import { Search } from 'components'
// import { Table, Row, Col, Card } from 'antd'

// const SearchPage = () => (<div className="content-inner">
//   <Row gutter={32}>
//     <Col lg={8} md={12}>
//       <Card title="默认">
//         <Search />
//       </Card>
//     </Col>
//     <Col lg={8} md={12}>
//       <Card title="附带选择">
//         <Search
//           {...{
//             select: true,
//             selectOptions: [
//               { value: 'components', name: '组件' },
//               { value: 'page', name: '页面' },
//             ],
//             selectProps: {
//               defaultValue: 'components',
//             },
//           }}
//         />
//       </Card>
//     </Col>
//     <Col lg={8} md={12}>
//       <Card title="大小">
//         <Search size="large" style={{ marginBottom: 16 }} />
//         <Search size="small" />
//       </Card>
//     </Col>
//   </Row>
//   <h2 style={{ margin: '16px 0' }}>Props</h2>
//   <Row>
//     <Col lg={18} md={24}>
//       <Table
//         rowKey={(record, key) => key}
//         pagination={false}
//         bordered
//         scroll={{ x: 800 }}
//         columns={[
//           {
//             title: '参数',
//             dataIndex: 'props',
//           },
//           {
//             title: '说明',
//             dataIndex: 'desciption',
//           },
//           {
//             title: '类型',
//             dataIndex: 'type',
//           },
//           {
//             title: '默认值',
//             dataIndex: 'default',
//           },
//         ]}
//         dataSource={[
//           {
//             props: 'size',
//             desciption: '设置Search大小，可选值为 【small】 【large】 或者不设',
//             type: 'String',
//             default: '-',
//           },
//           {
//             props: 'select',
//             desciption: '设置是否有选择器',
//             type: 'Boolean',
//             default: 'false',
//           },
//           {
//             props: 'selectOptions',
//             desciption: '选择器的选项，格式为[{name:"",value:""}]或者[{value:""}]',
//             type: 'Array',
//             default: '-',
//           },
//           {
//             props: 'selectProps',
//             desciption: '选择器的属性，可参考antd的【Select】组件',
//             type: 'Object',
//             default: '-',
//           },
//           {
//             props: 'onSearch',
//             desciption: '点击搜索按钮, 按Enter键或者点击清除时的回调',
//             type: 'Function({keyword:string,field:string})',
//             default: '-',
//           },
//         ]}
//       />
//     </Col>
//   </Row>
// </div>)

// export default SearchPage

