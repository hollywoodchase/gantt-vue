<!--
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
    gantt.config.duration_unit = "minute";

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
      "<div class='gantt-text-label'>" +
        "<span>Duration (min)</span>" +
        "</div>",
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

    gantt.config.work_time = true; // removes non-working time from calculations
    gantt.config.skip_off_time = true;

    var formatter = gantt.ext.formatters.durationFormatter({
      enter: "day",
      store: "minute", // duration_unit
      format: "day",
      hoursPerDay: 8,
      hoursPerWeek: 40,
      daysPerMonth: 30,
    });

    (gantt.config.columns = [
      { name: "text", label: nameLabel, align: "center" },
      { name: "entry_epoch", label: entryLabel, align: "center" },
      { name: "exit_epoch", label: exitLabel, align: "center" },
      {
        name: "duration",
        label: durationLabel,
        resize: true,
        align: "center",
        template: function(task) {
          return formatter.format(task.duration);
        },
        width: 100,
      },
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

var state = gantt.getState();
console.log("min date");
console.log(state);
</script>

<style scoped>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";

div {
  height: 100%;
}
</style>
-->
<template>
  <div ref="gantt" id="gantt"></div>
</template>

<script>
import { gantt } from "dhtmlx-gantt";
import moment from 'moment';
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
    gantt.config.xml_date = "%d-%m-%Y %H:%i";
    gantt.config.scale_unit = "hour";
    gantt.config.step = 1;
    gantt.config.date_scale = "%g %a";
    gantt.config.min_column_width = 20;
    gantt.config.duration_unit = "minute";
    gantt.config.duration_step = 1;
    gantt.config.scale_height = 75;

    gantt.config.subscales = [
      { unit: "day", step: 1, date: "%j %F, %l" },
      { unit: "minute", step: 15, date: "%i" },
    ];

    gantt.init(this.$refs.gantt);
    gantt.config.start_date = new Date(2021, 2, 20);

    const dates = [
      "20-02-2021 03:45",
      "2021-052/06:50:39",
      "2021-052/06:50:55",
      "2021-053/02:14:25",
      "2021-054/03:20:59",
      "2021-055/05:27:25",
    ];

    const newDates = dates.map((x) => x.split("-")[0] + " " + moment().dayOfYear(1));

    console.log(newDates);
    // moment().dayOfYear();

    gantt.parse({
      data: [
        {
          id: 11,
          text: "Project #1",
          start_date: "",
          duration: "",
          progress: 0.6,
          open: true,
        },
        {
          id: 12,
          text: "DS26 --> MMS2_1",
          start_date: dates[0],
          duration: "1.35",
          parent: "11",
          progress: 1,
          open: true,
        },
        {
          id: 13,
          text: "DS54 --> MMS2_2",
          start_date: "21-02-2021 06:50",
          duration: "524.21667",
          parent: "11",
          progress: 0.5,
          open: true,
        },
        {
          id: 14,
          text: "DS34 --> MMS2_1",
          start_date: "22-02-2021 07:45",
          duration: "331.46667",
          parent: "11",
          progress: 0.8,
          open: true,
        },
        {
          id: 15,
          text: "DS34 --> MMS2_1",
          start_date: "23-02-2021 10:54",
          duration: "453.81667",
          parent: "11",
          progress: 0.2,
          open: true,
        },
        {
          id: 16,
          text: "DS54 --> MMS2_2",
          start_date: "24-02-2021 05:27",
          duration: "582.41667 ",
          parent: "11",
          progress: 0,
          open: true,
        },
        {
          id: 17,
          text: "DS54 --> MMS2_2",
          start_date: "22-02-2021 06:50",
          duration: "518.63333",
          parent: "13",
          progress: 1,
          open: true,
        },
      ],
      links: [
        // { id: "10", source: "11", target: "12", type: "1" },
        // { id: "11", source: "11", target: "13", type: "1" },
        // { id: "12", source: "11", target: "14", type: "1" },
        // { id: "13", source: "11", target: "15", type: "1" },
        // { id: "14", source: "11", target: "16", type: "1" },
        // { id: "15", source: "13", target: "17", type: "1" },
        // { id: "16", source: "17", target: "18", type: "0" },
        // { id: "17", source: "18", target: "19", type: "0" },
        // { id: "18", source: "19", target: "20", type: "0" },
        // { id: "19", source: "15", target: "21", type: "2" },
        // { id: "20", source: "15", target: "22", type: "2" },
        // { id: "21", source: "15", target: "23", type: "2" },
      ],
    });
    //     var durationLabel = [
    //       "<div class='gantt-text-label'>" +
    //         "<span>Duration (min)</span>" +
    //         "</div>",
    //     ].join("");

    //     gantt.config.xml_date = "%Y-%m-%d";
    //     var contactEventLabel = [
    //     "<div class='gantt-text-label'>"+
    //     "<span>Contact Event</span>" +
    //     "</div>"
    // ].join("");
    //     var entryEpochLabel = [
    //     "<div class='gantt-text-label'>"+
    //     "<span>Entry Epoch</span>" +
    //     "</div>"
    // ].join("");
    // var exitEpochLabel = [
    //     "<div class='gantt-text-label'>"+
    //     "<span>Exit Epoch</span>" +
    //     "</div>"
    // ].join("");

    // // var firstMonth = 1,
    // //       firstDay = 1;

    // //     gantt.date.fiscal_year_start = function(date) {
    // //       var next = new Date(date);
    // //       if (
    // //         next.getMonth() < firstMonth ||
    // //         (next.getMonth() === firstMonth && next.getDate() < firstDay)
    // //       ) {
    // //         next = gantt.date.add(next, -1, "year");
    // //       }

    // //       next = gantt.date.year_start(next);
    // //       next.setMonth(firstMonth);
    // //       next.setDate(firstDay);

    // //       return next;
    // //     };

    //     // gantt.date.add_fiscal_year = function(date, inc) {
    //     //   return gantt.date.add(date, inc, "year");
    //     // };

    //     // var dateToStr = gantt.date.date_to_str("%Y");
    //     // function fiscalYearLabel(date) {
    //     //   return dateToStr(gantt.date.fiscal_year_start(date));
    //     // }

    //     // gantt.config.scales = [
    //     //   { unit: "year", step: 1, format: "Calendar year %Y" },
    //     //   { unit: "fiscal_year", step: 1, format: fiscalYearLabel },
    //     //   { unit: "month", step: 1, format: "%M %Y" },
    //     //   { unit: "day", step: 1, format: "%d %M" },
    //     // ];

    //     gantt.config.work_time = true; // removes non-working time from calculations
    //     gantt.config.skip_off_time = true;

    //     var formatter = gantt.ext.formatters.durationFormatter({
    //       enter: "day",
    //       store: "minute", // duration_unit
    //       format: "day",
    //       hoursPerDay: 8,
    //       hoursPerWeek: 40,
    //       daysPerMonth: 30,
    //     });

    //     (gantt.config.columns = [
    //       { name: "text", label: contactEventLabel, align: "center" },
    //       { name: "entry_epoch", label: entryEpochLabel, align: "center" },
    //       { name: "exit_epoch", label: exitEpochLabel, align: "center" },
    //       {
    //         name: "duration",
    //         label: durationLabel,
    //         resize: true,
    //         align: "center",
    //         template: function(task) {
    //           return formatter.format(task.duration);
    //         },
    //         width: 100,
    //       },
    //       { name: "add", width: 44 },
    //     ]),
    //       (gantt.config.scales = [
    //         {
    //           unit: "week",
    //           step: 1,
    //           format: function(date) {
    //             return "Week #" + gantt.date.getWeek(date);
    //           },
    //         },
    //         {
    //           unit: "day",
    //           step: 1,
    //           format: "%D",
    //           css: function(date) {
    //             if (!gantt.isWorkTime({ date: date, unit: "day" })) {
    //               return "weekend";
    //             }
    //           },
    //         },
    //         { unit: "hour", step: 1 },
    //         { unit: "minute", step: 1 },
    //       ]);
    //       gantt.init(this.$refs.gantt);
    //     gantt.parse(this.$store.getters.timeline);

    // gantt.config.columns = [
    //     {name: "Contact_Event", label:contactEventLabel, align: "center", width: 100},
    //     {name: "Epoch_Entry", label:epochEntryLabel, align: "center", width: 150},
    //     {name: "Exit_Entry", label:exitEntryLabel, align: "center", width: 150},
    //     // {name: "start_time", align: "center"},
    //     {name: "duration", align: "center", width: 50},
    //     {name: "add", width: 44}
    // ],
    //     gantt.init(this.$refs.gantt);
    //     gantt.parse(this.$store.getters.timeline);

    //     // console.log(moment('24/12/2019 09:15:00', "DD MM YYYY hh:mm:ss"));
    //     // console.log(moment("12-25-1995", "MM-DD-YYYY"));
  },
};
</script>

<style scoped>
@import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";

div {
  height: 100%;
}
</style>
