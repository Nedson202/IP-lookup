<template>
  <a-layout-content :style="{ padding: '0 50px', marginTop: '64px', }">
    <h1 :style="{ padding: '24px' }">Top twitter trends in Lagos</h1>
    <template v-if="trendLoading">
      <TrendingSkeleton/>
    </template>
    <template v-else>
      <div class="trend-grid" :style="{ padding: '24px', minHeight: '75vh' }">
        <div v-for="(trend, index) in trends" :key="index ">
            <TweetCard :trend="trend"/>
        </div>
      </div>
    </template>
  </a-layout-content>
</template>

<script>
import axios from 'axios';
import TweetCard from "./TweetCard";
import TrendingSkeleton from "./TrendingSkeleton";

export default {
  components: {
    TweetCard,
    TrendingSkeleton
  },
  data() {
    return {
      trends: [],
      trendMeta: [],
      trendLoading: true
    };
  },
  created() {
    this.fetchTrends()
  },
   watch: {
    '$route': 'fetchTrends'
  },
  methods: {
    fetchTrends() {
      axios.get('https://afbbdfb2.ngrok.io/ip/getTrends')
      .then(resp => {
        const { trends } = resp.data.data;
        this.trends = trends.sort((firstEl, nextEl) => nextEl.tweet_volume - firstEl.tweet_volume)
        this.trendLoading = false
      })
      .catch(error => error)
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
    padding: 0 30px !important;
  }

  .trend-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    padding-left: 0 !important;
  }
}
</style>