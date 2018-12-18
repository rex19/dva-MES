import React from 'react';
import ReactEcharts from 'echarts-for-react';
import 'echarts-gl/dist/echarts-gl.min.js'
import echarts from 'echarts/map/js/world.js'

let option
var canvas = document.createElement('canvas');
var mapChart = echarts.init(canvas, null, {
  width: 2048,
  height: 1024
});

mapChart.setOption({
  geo: {
    type: 'map',
    map: 'world',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    boundingCoords: [[-180, 90], [180, -90]],
    itemStyle: {
      normal: {
        areaColor: 'transparent',
        borderColor: '#fff'
      },
      emphasis: {
        areaColor: 'yellow'
      }
    },
    label: {
      show: false
    }
  }
});

option = {
  backgroundColor: '#000',
  globe: {
    baseTexture: '/asset/get/s/data-1491890179041-Hkj-elqpe.jpg',
    heightTexture: '/asset/get/s/data-1491889019097-rJQYikcpl.jpg',

    displacementScale: 0.1,

    shading: 'lambert',

    environment: '/asset/get/s/data-1491837999815-H1_44Qtal.jpg',

    light: {
      ambient: {
        intensity: 0.1
      },
      main: {
        intensity: 1.5
      }
    },

    layers: [{
      type: 'blend',
      texture: mapChart
    }]
  },
  series: []
}
const TopoChart = () => (
  <ReactEcharts
    option={option}
    style={{ height: '212px', width: '100%' }}
    className={'react_for_echarts'}
  />
);
export default TopoChart;

