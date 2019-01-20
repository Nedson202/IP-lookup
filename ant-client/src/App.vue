<template>
  <a-layout id="components-layout-demo-fixed" :style="{ minHeight: '100%' }">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :defaultSelectedKeys="['1']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          IP Lookup
          <router-link to="/"></router-link>
        </a-menu-item>
        <a-menu-item key="2">
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
  background: rgba(255,255,255,.2);
  margin: 16px 24px 16px 0;
  float: left;
}
</style>