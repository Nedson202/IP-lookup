<template>
  <a-layout-content class="layout-content" :style="{ padding: '0 50px', marginTop: '64px', }">
    <div class="ip-search">
      <ip-search @ipChange="handleIpLookup" :searchingIp="searchingIp" />
    </div>
    <div class="lookup-grid" :style="{ background: '#fff', padding: '24px', marginTop: '50px', minHeight: '75vh' }">
      <div class="lookup-grid-child" :style="{ paddingLeft: '50px'}">
        <div>
          <span v-if="ipLookupLoading"><Skeleton /></span>
          <span v-if="!ipLookupLoading && ipLookup.length !== 0"><IpTimeline :ipLookUpData=ipLookup /></span>
          <h1  v-if="!ipLookupLoading && ipLookup.length === 0">An error occurred trying to retrieve you IP data</h1>
        </div>
        <div>
          <span v-if="weatherLookupLoading"><Skeleton /></span>
          <span v-if="!weatherLookupLoading && weatherLookup.length !== 0"><WeatherTimeline :weatherLookupData=weatherLookup /></span>
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
import { appUrl } from '../constants/constant'

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
      // axios.get(`${appUrl}/ip/getIpData?${ip && 'ip'}=${ip}`)
      axios.get(`/ip/getIpData?${ip && 'ip'}=${ip}`)
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
        this.ipLookupLoading = false

        this.$notification['error']({
          message: 'Lookup',
          description: data.reason,
        });
      })
    },
    runWeatherLookup() {
      // axios.get(`${appUrl}/ip/getWeatherData`)
      axios.get(`/ip/getWeatherData`)
      .then(resp => {
        this.weatherLookup = resp.data.data
        this.weatherLookupLoading = false
      })
      .catch(error => {
        this.weatherLookupLoading = false
        return error
      })
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