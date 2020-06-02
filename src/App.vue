<template>
  <div id="app">
    <Sidebar />
    <div class="w3-main" style="margin-left:350px">
      <router-view :service="selectedService" />
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";

export default {
  name: "app",
  data: () => ({}),
  components: {
    Sidebar,
  },
  computed: {
    selectedService() {
      return this.$store.getters.allServices.find(
        (s) => s.url === this.$route.params.id
      );
    },
  },
  created() {
    this.$store.dispatch("connectToSockets");
  },
};
</script>
<style></style>
