<template>
  <div id="app">
    <Sidebar />
    <div class="w3-main" style="margin-left:350px">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
  data: () => ({}),
  components: {
    Sidebar,
  },
  computed: {},
  created() {
    this.$store.dispatch("connectToSockets");
  },
  mounted() {},
};
</script>
<style></style>
