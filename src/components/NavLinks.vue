<template>
  <div :id="name" class="w3-hide w3-white w3-card-4">
    <router-link
      v-for="service in services"
      :key="service.url"
      :to="'/' + service.familyName + '/' + service.url"
      class="item w3-bar-item w3-button w3-border-bottom"
    >
      <div>
        <span :class="{ active: service.url == url }">{{ service.title }}</span>
        <span
          class="w3-tag w3-small"
          :class="{
            'w3-teal': servicetag.trim().toLowerCase() != 'in work',
            'w3-yellow': servicetag.trim().toLowerCase() == 'in work'
          }"
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
  name: 'nav-links',
  props: {
    name: String,
    services: Array
  },
  computed: {
    url() {
      if (this.$route.params) return this.$route.params.id
      return null
    }
  }
}
</script>

<style scoped>
.w3-card-4 {
  box-shadow: none !important;
}
.active {
  font-weight: bold;
}
</style>
