<template>
  <a-timeline mode="alternate">
    <div style="paddingBottom: 30px">
      <h2>IP lookup complete</h2>
    </div>
    <a-timeline-item color="green"><b>IP:</b> {{ ipLookUpData.ip }}</a-timeline-item>
    <a-timeline-item><b>City:</b> {{ ipLookUpData.city }}</a-timeline-item>
    <a-timeline-item color="red">
      <a-icon slot="dot" type="clock-circle-o" style="fontSize: '16px'" />
      <b>Timezone:</b> {{ ipLookUpData.timezone }}
    </a-timeline-item>
    <a-timeline-item><b>Country:</b> {{ ipLookUpData.country_name }}</a-timeline-item>
    <a-timeline-item color="green"><b>Languages:</b> {{ ipLookUpData.languages }}</a-timeline-item>
    <a-timeline-item color="red"><b>Latitude:</b> {{ ipLookUpData.latitude }}</a-timeline-item>
    <a-timeline-item color="red"><b>Longitude:</b> {{ ipLookUpData.longitude }}</a-timeline-item>
    <a-timeline-item><b>Currency:</b> {{ ipLookUpData.currency }}</a-timeline-item>
    <a-timeline-item>
      <a-icon slot="dot" type="clock-circle-o" style="fontSize: '16px'" />
      <b>Calling code:</b> {{ ipLookUpData.country_calling_code }}
    </a-timeline-item>
    <a-timeline-item color="green"><b>ISP:</b> {{ ipLookUpData.org }}</a-timeline-item>
  </a-timeline>
</template>

<script>
export default {
  name: 'IpTimeline',
  props: {
    ipLookUpData: {
      type: Object,
      required: true
    }
  },
}
</script>
