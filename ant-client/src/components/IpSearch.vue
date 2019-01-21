<template>
  <div :style="{ textAlign: 'center' }">
    <span class="search-text">Lookup: </span>
    <input
      type="text"
      class="ip-lookup-input"
      placeholder="search IP address e.g 32.12.334.122"
      @change="handleIpChange"
    >
    <a-button
      type="primary"
      icon="search"
      size="large"
      :style="{ marginLeft: '10px' }"
      @click="onSearch"
      v-if="!searchingIp"
    >Search</a-button>
    <a-button v-else type="primary" loading size="large" :style="{ marginLeft: '10px' }">
      Loading
    </a-button>
  </div>
</template>

<script>
export default {
  name: 'IpSearch',
  data() {
    return {
      ip: '',
    }
  },
  props: {
      searchingIp: {
        type: Boolean,
        required: true
      }
  },
  methods: {
    handleIpChange (event) {
      this.ip = event.target.value
    },
    onSearch () {
      this.$emit('ipChange', { ip: this.ip })
    },
  },
}
</script>