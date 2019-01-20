<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <SideBar />
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="()=> collapsed = !collapsed"
        />
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <a-row>
          <a-col :span="12">
            <Skeleton />
            <IpTimeline />
          </a-col>
          <a-col :span="12">
            <Skeleton />
            <WeatherTimeline />
          </a-col>
        </a-row>
        <a-row>
          <h2>Currently trending tweets in Lagos</h2>
          <TrendingList />
        </a-row>
        <TrendingSkeleton />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import Skeleton from './components/Skeleton'
import SideBar from './components/SideBar'
import IpTimeline from './components/IpTimeline'
import WeatherTimeline from './components/WeatherTimeline'
import TrendingList from './components/TrendingList'
import TrendingSkeleton from './components/TrendingSkeleton'

export default {
  data(){
    return {
      collapsed: false,
    }
  },
  components: {
    SideBar,
    Skeleton,
    IpTimeline,
    WeatherTimeline,
    TrendingList,
    TrendingSkeleton,
  },
}
</script>

<style>
#components-layout-demo-custom-trigger {
  min-height: 100% !important;
}

#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color .3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
</style>