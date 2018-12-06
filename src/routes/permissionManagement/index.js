import { Tree } from 'antd';
import { EditableComponent } from '../../components';
const TreeNode = Tree.TreeNode;

const treeData = [{
  title: 'SFMES',
  key: '1',
  children: [{
    title: '主数据管理',
    key: '8',
    children: [
      { title: '工作站', key: '81' },
      { title: '工作站组', key: '82' },
      { title: '线体', key: '83' },
      { title: '人员', key: '84' },
      { title: '角色', key: '85' },
      { title: '物料', key: '86' },
      { title: '工艺', key: '87' },
      { title: '区域', key: '88' },
      { title: '库位', key: '89' },
      { title: '客户信息', key: '810' },
      { title: '供应商信息', key: '811' },
      { title: 'BOM', key: '812' }
    ],
  }, {
    title: 'WMS系统',
    key: '2',
    children: [
      { title: '原材料收货单', key: '21' },
      { title: '容器信息查询', key: '23' },
      { title: '成品箱信息查询', key: '24' },
      { title: '销售出库单', key: '25' },
      { title: '生产物料领用单', key: '26' },
      { title: '生产物料退料记录', key: '27' },
      { title: '成品入库单', key: '28' },
      { title: '盘点单', key: '29' }
    ],
  }, {
    title: '追溯系统',
    key: '3',
    children: [
      { title: '通过工站追溯工件', key: '31' },
      {
        title: '通过工件追溯',
        key: '32',
        children: [
          { title: '工件过站记录', key: '321' },
          { title: '工件失效记录', key: '322' },
          { title: '工件维修记录', key: '323' },
          { title: '工件装配记录', key: '324' },
          { title: '工件属性记录', key: '325' },
          { title: '工件用料记录', key: '326' }
        ],
      },
      { title: '通过物料追溯工件', key: '33' },
      { title: '通过箱号追溯', key: '34' },
      { title: '通过工单追溯', key: '35' },
      {
        title: '通过属性追溯',
        key: '36',
        children: [
          { title: '工件属性', key: '361' },
          { title: '工单属性', key: '362' },
          { title: '容器属性', key: '363' }
        ],
      },
      { title: '通过发货单追溯', key: '37' },
      { title: '工站异常查询', key: '38' },
      { title: '上料记录查询', key: '39' },
    ],
  }, {
    title: 'FIS系统',
    key: '4',
    children: [
      { title: '工单列表', key: '41' },
      { title: '工单激活', key: '42' },
      { title: '工单设置', key: '43' },
    ],
  }, {
    title: '刀具系统',
    key: '5',
    children: [
      { title: '刀具信息', key: '51' },
      { title: '刀具类型列表', key: '52' },
      { title: '刀具寿命规则', key: '53' },
      { title: '程序用刀设定', key: '54' },
      { title: '当前设备情况', key: '55' }
    ],
  }, {
    title: 'Ecall系统',
    key: '6',
    children: [
      { title: '电子叫料看板', key: '61' },
      { title: '创建生产初始配货单', key: '62' },
      { title: '创建配货单', key: '63' },
      { title: '配货单列表', key: '64' },
    ],
  }, {
    title: '报表系统',
    key: '7',
    children: [
      { title: 'lineCharts', key: '71' },
      { title: 'barCharts', key: '72' },
      { title: 'areaCharts', key: '73' },
      { title: 'permission', key: '74' },
    ],
  },],
}]

export default class PermissionManagement extends React.Component {
  state = {
    expandedKeys: ['0-0-0', '0-0-1'],
    autoExpandParent: true,
    checkedKeys: ['0-0-0'],
    selectedKeys: [],
  }
  onExpand = (expandedKeys) => {
    console.log('onExpand', arguments);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }
  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  }
  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    this.setState({ selectedKeys });
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode {...item} />;
    })
  }
  render() {
    return (
      <div>
        <Tree
          showLine
          checkable
          onExpand={this.onExpand}
          expandedKeys={this.state.expandedKeys}
          autoExpandParent={this.state.autoExpandParent}
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
          onSelect={this.onSelect}
          selectedKeys={this.state.selectedKeys}
        >
          {this.renderTreeNodes(treeData)}
        </Tree>

      </div>
    )
  }
}
// <EditableComponent />
