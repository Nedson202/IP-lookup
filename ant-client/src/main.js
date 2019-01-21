import Vue from 'vue'
import {
  Button, Layout, Menu, Icon, Skeleton, Timeline,
  Row, Col, Card, Input, Pagination, Drawer
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
Vue.component(LinkPrevue.name, LinkPrevue)

Vue.config.productionTip = false

new Vue({
  router,
  render: createElement => createElement(App)
}).$mount('#app');
