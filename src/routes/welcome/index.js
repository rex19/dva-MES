import React from 'react'
import { Row, Col, Tabs } from 'antd'
import MediaPlayer from 'components/MediaPlayer'
import VideoPlayer from 'components/MediaPlayer/VideoPlayer'
import AudioPlayer from 'components/MediaPlayer/AudioPlayer'
import CirclePlayer from 'components/MediaPlayer/CirclePlayer'
import BarchartDynamic from 'components/Echarts/BarchartDynamic'

const TabPane = Tabs.TabPane

const playMediaList = [
  { src: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4', label: 'Big Buck Bunny' },
  { src: 'http://jelmerdemaat.nl/online-demos/conexus/video/small.mp4', label: 'Lego Robot' },
  { src: 'http://shapeshed.com/examples/HTML5-video-element/video/320x240.m4v', label: 'iPod Help' },
  { src: 'http://www.youtube.com/embed/h3YVKTxTOgU', label: 'Brand New (Youtube)' },
  { src: 'https://youtu.be/VOyYwzkQB98', label: 'Neck Deep (Youtube)' },
]


const Welcome = () => (
  <Row>
    <h1 style={{ textAlign: 'center' }}>欢迎进入SF-WMS系统</h1>
  </Row>)

export default Welcome

// import TransparentBar3DComponent from 'components/Echarts/TransparentBar3DComponent'
// <TabPane tab="TransparentBar3D" key="5">
// <TransparentBar3DComponent />
// </TabPane>
// BarchartDynamic





