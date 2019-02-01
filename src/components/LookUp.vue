<template>
  <a-layout-content class="layout-content" :style="{ padding: '0 50px', marginTop: '64px', }">
    <div class="ip-search">
      <ip-search @ipChange="handleIpLookup" :searchingIp="searchingIp" />
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
      searchingIp: false
    }
  },
  components: {
    Skeleton,
    IpTimeline,
    WeatherTimeline,
    IpSearch
  },
  created() {
    this.runIpLookup(false)
    this.runWeatherLookup(false)
  },
   watch: {
    '$route': ['runIpLookup', 'runWeatherLookup'],
  },
  methods: {
    runIpLookup({ ip }) {
      axios.get(`localhost:4000/ip/getIpData?${ip && 'ip'}=${ip}`)
      // axios.get(`localhost:4000/ip/getIpData?${ip && 'ip'}=${ip}`)
      .then(resp => {
        this.ipLookup = resp.data.data

        this.ipLookupLoading = false
        this.searchingIp = false

        if (ip) {
          this.$notification['success']({
            message: 'Lookup',
            description: 'IP address lookup completed successfully',
          });
        }
      })
      .catch((error) => {
        const { data } = error.response.data;
        this.searchingIp = false
        this.$notification['error']({
          message: 'Lookup',
          description: data.reason,
        });
      })
    },
    runWeatherLookup() {
      axios.get('localhost:4000/ip/getWeatherData')
      .then(resp => {
        this.weatherLookup = resp.data.data
        this.weatherLookupLoading = false
      })
      .catch(error => error)
    },
    handleIpLookup(payload) {
      this.searchingIp = true;
      this.runIpLookup(payload)
    }
  }
}
</script>

<style>
.ip-search {
  margin-top: 40px;
}

.search-text {
  font-size: 25px;
  /* font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; */
}

.ip-lookup-input {
  width: 40%;
  height: 42px;
  bottom: none;
  font-size: 17px;
  border: none;
  border-radius: 10px;
  padding-left: 15px;
}

input:focus {
  outline: 0;
  box-shadow: none;
  border-color: transparent;
}

.lookup-grid-child {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

@media screen and (max-width: 560px) {
  .layout-content {
    padding: 0 20px !important;
  }

  .lookup-grid {
    padding: 0 20px !important;
  }

  .lookup-grid-child {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    padding-left: 0 !important;
  }
}
</style>