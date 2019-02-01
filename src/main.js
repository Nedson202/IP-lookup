import Vue from 'vue'
import {
  Button, Layout, Menu, Icon, Skeleton, Timeline,
  Row, Col, Card, Input, Pagination, Drawer, notification
} from 'ant-design-vue';
import LinkPrevue from 'link-prevue'
import App from './App'
import router from './router'

Vue.use(Button)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Skeleton)
Vue.use(Timeline)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Input)
Vue.use(Pagination)
Vue.use(Drawer)
Vue.prototype.$notification = notification
Vue.component(LinkPrevue.name, LinkPrevue)

Vue.config.productionTip = false

new Vue({
  render: createElement => createElement(App),
  router,
}).$mount('#app');
