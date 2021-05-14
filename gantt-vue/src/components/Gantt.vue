<template>
  <div ref="gantt" id="gantt"></div>
</template>

<script>
import {gantt} from 'dhtmlx-gantt';
// import moment from 'moment';
export default {
  name: 'gantt',
  props: {
    tasks: {
      type: Object,
      default () {
        return {data: [], links: []}
      }
    }
  },
  mounted: function () {
    gantt.config.xml_date = "%Y-%m-%d";
    var contactEventLabel = [
    "<div class='gantt-text-label'>"+
    "<span>Contact Event</span>" +
    "</div>"
].join("");
    var text1Label = [
    "<div class='gantt-text-label'>"+
    "<span>Epoch Entry</span>" +
    "</div>"
].join("");
var text2Label = [
    "<div class='gantt-text-label'>"+
    "<span>Exit Entry</span>" +
    "</div>"
].join("");


gantt.config.columns = [
    {name: "text", label:contactEventLabel, align: "center"},
    {name: "text1", label:text1Label, align: "center"},
    {name: "text2", label:text2Label, align: "center"},
    // {name: "start_time", align: "center"},
    {name: "duration", align: "center"},
    {name: "add", width: 44}
],
    gantt.init(this.$refs.gantt);
    gantt.parse(this.$store.getters.timeline);

    // console.log(moment('24/12/2019 09:15:00', "DD MM YYYY hh:mm:ss"));
    // console.log(moment("12-25-1995", "MM-DD-YYYY"));
  }
}
</script>

<style scoped>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";

div {
  height: 100%;
}
</style>
