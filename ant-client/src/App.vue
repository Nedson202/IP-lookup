<template>
  <a-layout id="components-layout-demo-fixed" :style="{ minHeight: '100%' }">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <h1 class="logo">iLookup</h1>
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['1']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1" id="desk-menu">
          IP Lookup
          <router-link to="/"></router-link>
        </a-menu-item>
        <a-menu-item key="2" id="desk-menu">
          Twitter Trends
          <router-link to="/twitter-trends"></router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <router-view></router-view>
    <a-layout-footer :style="{ textAlign: 'center' }">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<style>
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  line-height: 31px;
  /* background: rgba(255,255,255,.2); */
  margin: 16px 24px 16px 0;
  float: left;
  color: #fff;
}

.ant-menu-dark.ant-menu-horizontal {
  border-bottom: 0;
  text-align: end;
}
</style>