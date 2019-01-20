import Vue from 'vue'
import {
  Button, Layout, Menu, Icon, Skeleton, Timeline,
  Row, Col, Card
} from 'ant-design-vue';
import App from './App.vue'

Vue.use(Button)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Skeleton)
Vue.use(Timeline)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
