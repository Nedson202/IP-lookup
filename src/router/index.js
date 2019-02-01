import Vue from 'vue'
import Router from 'vue-router'
import LookUp from '../components/LookUp'
import TwitterTrend from '../components/TrendingList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LookUp',
      component: LookUp
    },
    {
      path: '/twitter-trends',
      name: 'TrendingList',
      component: TwitterTrend
    }
  ]
})