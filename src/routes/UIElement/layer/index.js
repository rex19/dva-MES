
import React from 'react'
import { Row, Col, Tabs } from 'antd'
import BarchartDynamic from 'components/Echarts/BarchartDynamic'
import TransparentBar3DComponent from 'components/Echarts/TransparentBar3DComponent'
import TopoChart from 'components/Echarts/TopoChart'


const TabPane = Tabs.TabPane


const IcoPage = () => (
  <div>
    <Row>
      <h1 style={{ textAlign: 'center', margin: '50px' }}>ChartsTest</h1>
    </Row>
    <Row>
      <Col span={16} offset={4}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="TransparentBar3DComponent" key="1">
            <TransparentBar3DComponent />
          </TabPane>
          <TabPane tab="BarchartDynamic" key="2">
            <BarchartDynamic />
          </TabPane>
          <TabPane tab="TopoChart" key="3">
            <TopoChart />
          </TabPane>

        </Tabs>
      </Col>
    </Row>
  </div>)

export default IcoPage



