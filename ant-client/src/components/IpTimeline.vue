<template>
  <a-timeline mode="alternate">
    <div style="paddingBottom: 30px">
      <h2>IP lookup complete</h2>
    </div>
    <a-timeline-item color="green"><b>IP:</b> {{ ipLookUpData.ip }}</a-timeline-item>
    <a-timeline-item>
      <b>Location:</b> {{ ipLookUpData.city }}({{ ipLookUpData.region_code }})
      <a-timeline-item><b>Continent:</b> {{ ipLookUpData.continent_name }}({{ ipLookUpData.continent_code }})</a-timeline-item>
      <a-timeline-item><b>Country:</b> {{ ipLookUpData.country_name }}({{ ipLookUpData.country_code }})</a-timeline-item>
      <a-timeline-item><b>Flag:</b> {{ ipLookUpData.emoji_flag }}</a-timeline-item>
    </a-timeline-item>
    <a-timeline-item color="red">
      <a-icon slot="dot" type="clock-circle-o" style="fontSize: '16px'" />
      <b>Timezone:</b> {{ ipLookUpData.time_zone.name }}({{ipLookUpData.time_zone.abbr}})
    </a-timeline-item>
    <a-timeline-item color="green"><b>Languages:</b> {{ ipLookUpData.languages.name }}</a-timeline-item>
    <a-timeline-item color="red"><b>Latitude:</b> {{ ipLookUpData.latitude }}</a-timeline-item>
    <a-timeline-item color="red"><b>Longitude:</b> {{ ipLookUpData.longitude }}</a-timeline-item>
    <a-timeline-item>
      <b>Currency:</b> {{ ipLookUpData.currency.name }}
      <a-timeline-item><b>Code:</b> {{ ipLookUpData.currency.code }}</a-timeline-item>
      <a-timeline-item><b>Symbol:</b> {{ ipLookUpData.currency.symbol }}</a-timeline-item>
    </a-timeline-item>
    <a-timeline-item>
      <a-icon slot="dot" type="clock-circle-o" style="fontSize: '16px'" />
      <b>Calling code:</b> {{ ipLookUpData.calling_code }}
    </a-timeline-item>
    <a-timeline-item color="green"><b>ISP:</b> {{ ipLookUpData.organisation }}</a-timeline-item>
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
