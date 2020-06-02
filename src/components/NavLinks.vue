<template>
  <div :id="name" class="w3-hide w3-white w3-card-4">
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
</template>

<script>
export default {
  name: "nav-links",
  props: ["name", "family"]
};
</script>

<style scoped>
.w3-card-4{
  box-shadow: none !important
}
</style>