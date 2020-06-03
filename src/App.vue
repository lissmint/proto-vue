<template>
  <div id="app">
    <div v-if="loaded">
      <Sidebar />
      <div class="w3-main" style="margin-left:350px">
        <router-view :service="selectedService" />
      </div>
    </div>
    <Loader v-else />
  </div>
</template>

<script>
import Loader from '@/components/Loader'
import Sidebar from "@/components/Sidebar";

export default {
  name: "app",
  data: () => ({}),
  components: {
    Loader,
    Sidebar,
  },
  computed: {
    selectedService() {
      return this.$store.getters.allServices.find(
        (s) => s.url === this.$route.params.id
      );
    },
    loaded() {
      return (
        this.$store.getters.responses >= this.$store.getters.allServices.length
      );
    },
  },
  created() {
    this.$store.dispatch("connectToSockets");
  },
};
</script>
<style></style>
