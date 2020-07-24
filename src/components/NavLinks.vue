<template>
  <div :id="name" class="w3-hide w3-white w3-card-4">
    <router-link
      v-for="service in services"
      :key="service.url"
      :to="'/' + service.familyName + '/' + service.url"
    >
      <div
        class="item w3-bar-item w3-button w3-border-bottom"
        :class="{ active: service.url == url }"
        @click="w3_close"
      >
        <span>{{ service.title }}</span>
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
  },
  methods: {
    w3_close() {
      if (window.innerWidth < 993) {
        document.getElementById('mySidebar').style.display = 'none'
      }
    }
  }
}
</script>

<style scoped>
.w3-card-4 {
  box-shadow: none !important;
}
.active {
  position: relative;
}

.active::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background-color: #009688;
}
a {
  text-decoration: none;
}
</style>
