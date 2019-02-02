<template>
  <a-layout id="components-layout-demo-fixed" :style="{ minHeight: '100%' }">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <h1 class="logo">IP-Lookup</h1>
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="[selectedKeys]"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1" id="desk-menu">
          IP Lookup
          <router-link :to="{ name: 'LookUp'}"></router-link>
        </a-menu-item>
        <a-menu-item key="2" id="desk-menu">
          Twitter Trends
          <router-link to="/twitter-trends"></router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <router-view></router-view>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Trend Design ©{{new Date().getFullYear()}} by eight_wing
    </a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  data() {
    return {
      selectedKeys: '0'
    }
  },
  created() {
    this.calculateCurentPage()
  },
  watch: {
    '$route': 'calculateCurentPage'
  },
  methods: {
    calculateCurentPage() {
      const route = window.location.href.split('/#')[1];
      const routes = {
        '/': '1',
        '/twitter-trends': '2'
      }
      this.selectedKeys = routes[route]
    }
  }
}
</script>

<style>
#components-layout-demo-fixed .logo {
  width: 150px;
  height: 31px;
  line-height: 31px;
  margin: 16px 24px 16px 0;
  float: left;
  color: #fff;
}

.ant-menu-dark.ant-menu-horizontal {
  border-bottom: 0;
  text-align: end;
}
</style>