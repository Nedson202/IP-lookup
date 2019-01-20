<template>
  <a-layout-content :style="{ padding: '0 50px', marginTop: '64px', }">
    <div class="ip-search">
      Run IP lookup: <ip-search />
    </div>
    <div class="lookup-grid" :style="{ background: '#fff', padding: '24px', marginTop: '50px', minHeight: '75vh' }">
      <div class="lookup-grid-child" :style="{ paddingLeft: '50px'}">
        <div>
          <span v-if="ipLookupLoading"><Skeleton /></span>
          <span v-else><IpTimeline :ipLookUpData=ipLookup /></span>
        </div>
        <div>
          <span v-if="weatherLookupLoading"><Skeleton /></span>
          <span v-else><WeatherTimeline :weatherLookupData=weatherLookup /></span>
        </div>
      </div>
    </div>
  </a-layout-content>
</template>

<script>
import axios from 'axios'
import Skeleton from './Skeleton'
import IpTimeline from './IpTimeline'
import WeatherTimeline from './WeatherTimeline'
import IpSearch from './IpSearch'

export default {
  data(){
    return {
      collapsed: false,
      ipLookupLoading: true,
      weatherLookupLoading: true,
      ipLookup: [],
      weatherLookup: [],
    }
  },
  components: {
    Skeleton,
    IpTimeline,
    WeatherTimeline,
    IpSearch
  },
  created() {
    this.runIpLookup()
    this.runWeatherLookup()
  },
   watch: {
    '$route': ['runIpLookup', 'runWeatherLookup'],
  },
  methods: {
    runIpLookup() {
      axios.get('https://afbbdfb2.ngrok.io/ip/getIpData')
      .then(resp => {
        this.ipLookup = resp.data.data
        this.ipLookupLoading = false
      })
      .catch(error => error)
    },
    runWeatherLookup() {
      axios.get('https://afbbdfb2.ngrok.io/ip/getWeatherData')
      .then(resp => {
        this.weatherLookup = resp.data.data
        this.weatherLookupLoading = false
      })
      .catch(error => error)
    }
  }
}
</script>

<style>
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  background: rgba(255,255,255,.2);
  margin: 16px 24px 16px 0;
  float: left;
}

.ip-search {
  width: 40%;
}

.input {
  padding: 20px;
}

.lookup-grid-child {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

@media screen and (max-width: 560px) {
  .lookup-grid {
    padding: 0 30px !important;
  }

  .lookup-grid-child {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    padding-left: 0 !important;
  }
}
</style>