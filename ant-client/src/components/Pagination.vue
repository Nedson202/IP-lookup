<template>
  <a-pagination  @change="onChange" :pageSize="pageSize" :current="current" :total="50" />
</template>

<script>
  export default {
    data() {
      return {
        current: 1,
        pageSize: 12
      }
    },
    methods: {
      onChange(current) {
        const pageSize = this.pageSize
        this.current = current
        const to = (pageSize * current)
        const from = to - pageSize
        this.$emit('pageChange', {
          current,
          size: this.pageSize,
          from,
        })
      }
    }
  }
</script>
