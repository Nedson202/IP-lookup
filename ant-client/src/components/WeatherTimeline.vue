<template>
  <a-timeline>
    <div style="paddingBottom: 30px">
      <h2>Weather information for Lagos</h2>
    </div>
    <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
    <a-timeline-item>Solve initial network problems 2015-09-01</a-timeline-item>
    <a-timeline-item color="red">
      <a-icon slot="dot" type="clock-circle-o" style="fontSize: '16px'" />
      Technical testing 2015-09-01
    </a-timeline-item>
    <a-timeline-item>Network problems being solved 2015-09-01</a-timeline-item>
  </a-timeline>
</template>

<script>
export default {
  name: 'Timeline'
}
</script>
