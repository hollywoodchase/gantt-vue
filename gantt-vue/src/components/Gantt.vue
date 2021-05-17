<template>
  <div ref="gantt" id="gantt"></div>
</template>

<script>
import { gantt } from "dhtmlx-gantt";
// import moment from 'moment';

export default {
  name: "gantt",
  props: {
    tasks: {
      type: Object,
      default() {
        return { data: [], links: [] };
      },
    },
  },
  mounted: function() {
    gantt.config.xml_date = "%Y-%m-%d";
    var nameLabel = [
      "<div class='gantt-text-label'>" +
        "<span>Contact Event</span>" +
        "</div>",
    ].join("");

    var entryLabel = [
      "<div class='gantt-text-label'>" + "<span>Epoch Entry</span>" + "</div>",
    ].join("");
    var exitLabel = [
      "<div class='gantt-text-label'>" + "<span>Exit Entry</span>" + "</div>",
    ].join("");
     var durationLabel = [
      "<div class='gantt-text-label'>" + "<span>Duration</span>" + "</div>",
    ].join("");

    var firstMonth = 1,
      firstDay = 1;

    gantt.date.fiscal_year_start = function(date) {
      var next = new Date(date);
      if (
        next.getMonth() < firstMonth ||
        (next.getMonth() === firstMonth && next.getDate() < firstDay)
      ) {
        next = gantt.date.add(next, -1, "year");
      }

      next = gantt.date.year_start(next);
      next.setMonth(firstMonth);
      next.setDate(firstDay);

      return next;
    };

    gantt.date.add_fiscal_year = function(date, inc) {
      return gantt.date.add(date, inc, "year");
    };

    var dateToStr = gantt.date.date_to_str("%Y");
    function fiscalYearLabel(date) {
      return dateToStr(gantt.date.fiscal_year_start(date));
    }

    gantt.config.scales = [
      { unit: "year", step: 1, format: "Calendar year %Y" },
      { unit: "fiscal_year", step: 1, format: fiscalYearLabel },
      { unit: "month", step: 1, format: "%M %Y" },
      { unit: "day", step: 1, format: "%d %M" },
    ];

    (gantt.config.columns = [
      { name: "text", label: nameLabel, align: "center" },
      { name: "entry_epoch", label: entryLabel, align: "center" },
      { name: "exit_epoch", label: exitLabel, align: "center" },
      { name: "duration", label: durationLabel, align: "center" },
      { name: "add", width: 44 },
    ]),
      // (gantt.config.scales = [
      //   {
      //     unit: "week",
      //     step: 1,
      //     format: function(date) {
      //       return "Week #" + gantt.date.getWeek(date);
      //     },
      //   },
      //   {
      //     unit: "day",
      //     step: 1,
      //     format: "%D",
      //     css: function(date) {
      //       if (!gantt.isWorkTime({ date: date, unit: "day" })) {
      //         return "weekend";
      //       }
      //     },
      //   },
      //   { unit: "hour", step: 1 },
      //   { unit: "minute", step: 1 },
      // ]);
      gantt.init(this.$refs.gantt);
    gantt.parse(this.$store.getters.timeline);

    // console.log(moment('24/12/2019 09:15:00', "DD MM YYYY hh:mm:ss"));
    // console.log(moment("12-25-1995", "MM-DD-YYYY"));
  },
};
</script>

<style scoped>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";

div {
  height: 100%;
}
</style>
