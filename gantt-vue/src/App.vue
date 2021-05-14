<template>
  <div id="app">
    <Gantt :tasks="tasks" /> 
    <Foo howdy="howdy" />
  </div>
</template>

<script>
import Gantt from "./components/Gantt.vue";
import Foo from "./components/Foo.vue";

export default {
  name: "App",
  components: {
    Gantt,
    Foo
  },
  data: () => {
    return {}
  }
};
</script>

<style>
html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #app {
    height: 100%;
  }
  .container {
    height: 100%;
    width: 100%;
  }
  .left-container {
    overflow: hidden;
    position: relative;
    height: 100%;
  }
</style>
