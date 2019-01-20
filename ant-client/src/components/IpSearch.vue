<template>
  <div>
    <a-input-search
      placeholder="input search text"
      @search="onSearch"
      enterButton
    />
  </div>
</template>

<script>
export default {
  name: 'IpSearch',
  methods: {
    onSearch (value) {
      console.log(value) // eslint-disable-line
    },
  },
}
</script>