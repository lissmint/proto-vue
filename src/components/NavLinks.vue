<template>
  <div :id="name" class="w3-hide w3-white w3-card-4">
    <div v-if="family.length">
      <router-link
        class="item w3-bar-item w3-button w3-border-bottom"
        v-for="service in family"
        :key="service.url"
        :to="'/' + service.familyName + '/' + service.url"
      >
        <div>
          {{ service.title }}
          <span
            class="w3-tag w3-small w3-teal"
            v-for="(servicetag, i) in service.tags"
            :key="i"
            >{{ servicetag }}</span
          >
        </div>
      </router-link>
    </div>
    <div class="item w3-bar-item w3-button w3-border-bottom" v-else>
      <span>No available services</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-links",
  props: ["name", "family"],
  methods: {
    // setService(service) {
    //   debugger;
    //   this.$store.commit("setSelected", service);
    // },
  },
};
</script>
