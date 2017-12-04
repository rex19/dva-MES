const { config } = require('./common')

const { apiPrefix } = config
let database = [
  {
    id: '1',
    icon: 'laptop',
    name: 'welcome',
    route: '/welcome',
  },
  {
    id: '2',
    bpid: '1',
    name: 'welcome',
    icon: 'user',
    route: '/welcome',
  },
  {
    id: '7',
    bpid: '1',
    name: 'welcome',
    icon: 'shopping-cart',
    route: '/welcome',
  },
  {
    id: '21',
    mpid: '-1',
    bpid: '2',
    name: 'welcome',
    route: '/welcome',
  },
  {
    id: '3',
    bpid: '1',
    name: 'welcome',
    icon: 'api',
    route: '/welcome',
  },
  {
    id: '4',
    bpid: '1',
    name: 'welcome',
    icon: 'camera-o',
  },
  {
    id: '41',
    bpid: '4',
    mpid: '4',
    name: 'welcome',
    icon: 'heart-o',
    route: '/welcome',
  },
  {
    id: '42',
    bpid: '4',
    mpid: '4',
    name: 'welcome',
    icon: 'database',
    route: '/welcome',
  },
  {
    id: '43',
    bpid: '4',
    mpid: '4',
    name: 'welcome',
    icon: 'bars',
    route: '/welcome',
  },
  {
    id: '44',
    bpid: '4',
    mpid: '4',
    name: 'welcome',
    icon: 'search',
    route: '/welcome',
  },
  {
    id: '45',
    bpid: '4',
    mpid: '4',
    name: 'welcome',
    icon: 'edit',
    route: '/welcome',
  },
  {
    id: '46',
    bpid: '4',
    mpid: '4',
    name: 'welcome',
    icon: 'credit-card',
    route: '/welcome',
  },
  {
    id: '5',
    bpid: '1',
    name: 'welcome',
    icon: 'code-o',
  },
  {
    id: '51',
    bpid: '5',
    mpid: '5',
    name: 'welcome',
    icon: 'line-chart',
    route: '/welcome',
  },
  {
    id: '52',
    bpid: '5',
    mpid: '5',
    name: 'welcome',
    icon: 'bar-chart',
    route: '/welcome',
  },
  {
    id: '53',
    bpid: '5',
    mpid: '5',
    name: 'welcome',
    icon: 'area-chart',
    route: '/welcome',
  },
  {
    id: '6',
    bpid: '1',
    name: 'welcome',
    icon: 'setting',
  },
  {
    id: '61',
    bpid: '6',
    mpid: '6',
    name: 'welcome',
    route: '/welcome',
  },
  {
    id: '62',
    bpid: '6',
    mpid: '6',
    name: 'welcome',
    route: '/welcome',
  },
  {
    id: '621',
    bpid: '62',
    mpid: '62',
    name: 'welcome',
    route: '/welcome',
  },
  {
    id: '622',
    bpid: '62',
    mpid: '62',
    name: 'welcome',
    route: '/welcome',
  },
]

module.exports = {

  [`GET ${apiPrefix}/menus`](req, res) {
    res.status(200).json(database)
  },
}
