<template>
  <a-layout-content class="layout-content" :style="{ padding: '0 50px', marginTop: '64px', }">
    <h1 :style="{ padding: '24px' }">
      Top twitter trends in your location: {{ !trendLoading && trends.length ? locations[0].name : '...' }}
    </h1>
    <template v-if="trendLoading">
      <TrendingSkeleton/>
    </template>
    <template v-else-if="trends.length !== 0">
      <div class="trend-grid" :style="{ padding: '24px', minHeight: '75vh' }">
        <div v-for="(trend, index) in trends" :key="index ">
          <TweetCard :trend="trend"/>
        </div>
      </div>
      <div :style="{ textAlign: 'center', margin: '25px 0', position: 'relative' }"><Pagination @pageChange="changePage" /></div>
    </template>
    <template v-if="!trendLoading && trends.length === 0">
      <div class="trend-not-found">
        <h1>Unable to retrieve trends for your location</h1>
      </div>
    </template>
  </a-layout-content>
</template>

<script>
import axios from 'axios';
import TweetCard from "./TweetCard";
import TrendingSkeleton from "./TrendingSkeleton";
import Pagination from './Pagination'

export default {
  components: {
    TweetCard,
    TrendingSkeleton,
    Pagination
  },
  data() {
    return {
      trends: [],
      trendMeta: [],
      trendLoading: true,
      locations: []
    };
  },
  created() {
    this.fetchTrends({
      from: 0,
      size: 12
    })
  },
   watch: {
    '$route': 'fetchTrends'
  },
  methods: {
    fetchTrends({ from, size }) {
      axios.get(`/ip/getTrends?from=${from}&size=${size}`)
      .then(resp => {
        const { trends, locations } = resp.data.data;
        this.trends = trends.sort((firstEl, nextEl) => nextEl.tweet_volume - firstEl.tweet_volume)
        this.trendLoading = false
        this.locations = locations
      })
      .catch(() => {
        this.trendLoading = false;
      })
    },
    changePage(payload) {
      this.fetchTrends(payload)
    }
  }
};
</script>

<style>
.trend-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 35px 50px;
}

@media screen and (max-width: 560px) {
  .trend-grid {
    padding: 0 !important;
  }

  .trend-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    padding-left: 0 !important;
  }
}

.trend-not-found {
  width: 100%;
  max-width: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
</style>