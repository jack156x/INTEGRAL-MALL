import App from '../App'
const home = r => require.ensure([], () => r(require('../page/home/home.vue')), 'home')
const detailsIng = r => require.ensure([], () => r(require('../page/order/children/detailsIng')), 'detailsIng')
const detailsErr = r => require.ensure([], () => r(require('../page/order/children/detailsErr')), 'detailsErr')
const detailsShoping = r => require.ensure([], () => r(require('../page/order/children/detailsShoping')), 'detailsShoping')
const detailsGame = r => require.ensure([], () => r(require('../page/order/children/detailsGame')), 'detailsGame')
const arrCity = r => require.ensure([], () => r(require('../page/mainListChild/arrCity.vue')), 'arrCity')

const mainListChild = r => require.ensure([], () => r(require('../page/mainListChild/find.vue')), 'mainListChild')
const exchange = r => require.ensure([], () => r(require('../page/exchange/exchange.vue')), 'exchange')
const record = r => require.ensure([], () => r(require('../page/record.vue')), 'record')
const integralRecord = r => require.ensure([], () => r(require('../page/exchange/children/integralRecord.vue')), 'integralRecord')
const orderDetails = r => require.ensure([], () => r(require('../page/order/orderDetails.vue')), 'orderDetails')
const exchangeChild = r => require.ensure([], () => r(require('../page/mainListChild/exchangeChild.vue')), 'exchangeChild')
const rule = r => require.ensure([], () => r(require('../page/exchange/children/rule.vue')), 'rule')
// import mainListChild from '../page/mainListChild/find.vue'
// import exchange from '../page/exchange/exchange.vue'
// import record from '../page/record.vue'
// import integralRecord from '../page/exchange/children/integralRecord.vue'
// import orderDetails from '../page/order/orderDetails.vue'
// import exchangeChild from '../page/mainListChild/exchangeChild.vue'
// import rule from '../page/exchange/children/rule.vue'
export default [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [ //二级路由。对应App.vue
        {
            path: '',
            redirect: '/home'
        },
        {
            path: '/home',
            component:home, 
        },
        {
            path: '/mainListChild/:id',//列表详情页面
            component:mainListChild,
            name: 'topic-detail',
        },
        {
            path: '/exchange',//兑换页面
            component:exchange,
            name: 'topic-list',
            // meta: {
            //     keepAlive: true
            // },
            // children: [
            //     {
            //         path: '/mainListChild',//列表详情页面
            //         component:mainListChild
            //     },
            // ]
        },
        {
            path: '/record',//记录页面
            component:record,
            name: 'order-list'
        },
        {
            path: '/integralRecord',//积分记录页面
            component:integralRecord
        },
        {
            path: '/rule',
            component: rule
        },
        {
            path: '/orderDetails/:id',//积分记录页面
            component:orderDetails,
            name: 'order-detail'
        },
        {
            path: '/exchangeChild',//兑换详情页
            component: exchangeChild,
            name: 'exchangeChild'
        }
        
        
    ]
       
}]