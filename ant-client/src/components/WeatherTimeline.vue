<template>
  <a-timeline mode="alternate">
    <div style="paddingBottom: 30px">
      <h2>Weather information for Lagos</h2>
    </div>
    <a-timeline-item><b>Summary:</b> {{ weatherLookupData.currently.summary }}</a-timeline-item>
    <a-timeline-item color="green"><b>Timezone:</b> {{ weatherLookupData.timezone }}</a-timeline-item>
    <a-timeline-item><b>Temperature:</b> {{ weatherLookupData.currently.temperature }}</a-timeline-item>
    <a-timeline-item color="red">
      <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />
      <b>Latitude:</b> {{ weatherLookupData.latitude }}
    </a-timeline-item>
    <a-timeline-item color="red">
      <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />
      <b>Longitude:</b> {{ weatherLookupData.longitude }}
    </a-timeline-item>
    <a-timeline-item color="green"><b>Pressure:</b> {{ weatherLookupData.currently.pressure }}</a-timeline-item>
    <a-timeline-item color="red"><b>Time:</b> {{ weatherLookupData.currently.time }}</a-timeline-item>
    <a-timeline-item><b>Humidity:</b> {{ weatherLookupData.currently.humidity }}</a-timeline-item>
    <a-timeline-item>
      <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;" />
      <b>Wind Speed:</b> {{ weatherLookupData.currently.windSpeed }}
    </a-timeline-item>
  </a-timeline>
</template>

<script>
export default {
  name: 'WeatherTimeline',
  props: {
    weatherLookupData: {
      type: Object,
      required: true
    },
  },
}
</script>
