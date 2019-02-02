<template>
  <div class="trend-content">
    <a-card hoverable :title="trend.name" :bordered="false">
      <p>
        <b>Trend:</b>
        <span @mouseenter="handleHover()">
          <a-icon type="twitter"/>
          &nbsp;
          <a :href="trend.url">{{ trend.name}}</a>
        </span>
      </p>
      <p>
        <b>Promoted:</b>
        <span>
          <span v-if="!trend.promoted">No</span>
          <span v-else>{{ trend.promoted }}</span>
        </span>
      </p>
      <p>
        <b>Tweet Volume:</b>
        <span>
          {{ trend.tweet_volume }}
        </span>
      </p>
    </a-card>
  </div>
</template>

<script>
export default {
  name: "TweetCard",
  props: {
    trend: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleHover() {// eslint-disable-next-line
      console.log('Hover activated')
    }
  }
};
</script>

<style>
.trend-content p {
  display: grid;
  grid-template-columns: 2fr 3fr;
  grid-gap: 35px;
}

@media screen and (max-width: 560px) {
  .skeleton-grid {
    padding: 0 30px !important;
  }

  .skeleton-grid {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
    padding-left: 0 !important;
  }
}
</style>