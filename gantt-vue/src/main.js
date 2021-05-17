import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    /** THIS NEEDS TO BE DSN ENTRIES (use 5) */
    activities: [
      { id: 1, start_date: "2021-02-20", duration: 1.35000, text: "Event #1", progress: 0.5, entry_epoch: "2021-051/03:45:00", exit_epoch: "2021-051/03:46:21" },
      //
      { id: 2, start_date: "2021-02-21", duration: 524.21667, text: "Event #2", progress: 0.5, entry_epoch: "2021-052/06:50:39", exit_epoch: "2021-052/15:34:52" },
      //
      { id: 3, start_date: "2021-02-22", duration: 331.46667, text: "Event #3", progress: 0.5, entry_epoch: "2021-053/02:14:25", exit_epoch: "2021-053/07:45:53" },
      //
      { id: 4, start_date: "2021-02-23", duration: 453.81667, text: "Event #4", progress: 0.5, entry_epoch: "2021-054/03:20:59", exit_epoch: "2021-054/10:54:48" },

      { id: 5, start_date: "2021-02-24", duration: 582.41667, text: "Event #5", progress: 0.5, entry_epoch: "2021-055/05:27:25", exit_epoch: "2021-055/15:09:50" },
    ]
  },
  mutations: {
  },
  getters: {
    timeline(state) {
     const data = state.activities.map(toGanttData);
      console.log(data);
      return {
        data: data,
        links: [],
      };
    },
  },
});

function toGanttData(activity) {
  // const gantt = {}
  return activity;
}

const app = new Vue({
  render: (h) => h(App),
  store: store,
});

app.$mount("#app");

/*
{
            id: 2,
            text: "Task #2",
            start_date: "2020-01-20",
            duration: 3,
            progress: 0.4,
          },
*/