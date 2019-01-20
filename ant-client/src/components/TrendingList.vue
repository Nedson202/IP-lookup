<template>
  <div>
     <a-col :span="6">
      <TweetCard />
    </a-col>
    <a-col :span="6">
      <TweetCard />
    </a-col>
    <a-col :span="6">
      <TweetCard />
    </a-col>
    <a-col :span="6">
      <TweetCard />
    </a-col>
  </div>
</template>

<script>
import TweetCard from './TweetCard'

export default {
  components: {
    TweetCard,
  },
}
</script>