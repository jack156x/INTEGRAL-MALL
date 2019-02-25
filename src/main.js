import 'babel-polyfill'
import 'whatwg-fetch'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import FastClick from 'fastclick'
import routes from './router'
import store from './store'
import Mint from 'mint-ui'
import vuet from './vuet'
import $ from 'jquery'
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
import 'mint-ui/lib/style.css'
import './style/me-mint.scss'
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  error: require('./images/imgerror.jpg'),
  loading: require('./images/imgloading.png'),
  preLoad: 1,
  attempt: 1
});
Vue.prototype.setupWebViewJavascriptBridge = function(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
Vue.prototype.returnToken = function(){
    var _this = this;
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if(isAndroid){
        return window.android.istoken_android()
        // return "Bearer 8fe9fef130b95a3dbff6eded64b5bb099e2b20d0"
    }
}
var u = navigator.userAgent;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
if(isiOS){
    Vue.prototype.Title = function(params){
        this.setupWebViewJavascriptBridge(function(bridge){
            bridge.callHandler('istitle_ios', params, function(res){
            })
            // bridge.callHandler('isgo_ios', null)
        })
    }
}else {
    Vue.prototype.Title = function(params){
        return window.android.istitle_android(params)
    }
}
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.http.interceptors.push((request, next) => {
    let timeout;
    // 這裡改用 _timeout
    if (request._timeout) {
        timeout = setTimeout(() => {
　　　　　　　　//自定义响应体 status:408,statustext:"请求超时"，并返回给下下边的next
            next(request.respondWith(request.body, {
                 status: 408,
                 statusText: '请求超时'
            }));
            
        }, request._timeout);
    }
    next((response) => {
       //console.log(response.status)如果超时输出408
　　　　return response;
    })
})
Vue.use(Mint)
const router = new VueRouter({
	routes
})
new Vue({
    router,
    vuet,
    store
}).$mount('#app')

