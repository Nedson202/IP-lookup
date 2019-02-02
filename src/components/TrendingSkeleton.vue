<template>
  <div
    class="skeleton-grid"
    :style="{ padding: '24px', minHeight: '80vh' }"
  >
    <div :style="{ background: '#fff' }" v-for="index in 12" :key="index">
      <a-skeleton active />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrendingSkeleton'
}
</script>

<style>
.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 35px;
  margin-top: 35px;
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