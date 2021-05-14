import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    /** THIS NEEDS TO BE DSN ENTRIES (use 5) */
    activities: [
      { id: 1, text1: "2020-01-17", duration: 1, text: "Contact Event #1", progress: 0.5 },
      //
      { id: 2, start_date: "2020-01-20", duration: 1, text: "Contact Event #2", progress: 0.5 },
      //
      { id: 3, start_date: "2020-01-23", duration: 1, text: "Contact Event #3", progress: 0.5 },
      //
    ]
  },
  mutations: {
  },
  getters: {
    timeline(state) {
      // { id: 1, start_date: "2020-01-17", duration: 1, text: "Task #1", progress: 0.5 },
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
  const gantt = {}
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