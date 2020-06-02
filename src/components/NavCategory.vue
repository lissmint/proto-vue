<template>
    <div
        class="item w3-bar-item w3-button w3-border-bottom justify"
        @click="showModels(familyName)"
      >
        <span
          >{{title}} <i class="fa fa-caret-down" v-if="available"></i
        ></span>
        <div
          :class="{ 'led-green': available, 'led-gray': !available }"
        ></div>
      </div>
</template>

<script>
export default {
    name: 'nav-category',
    props: ['title', 'available', 'familyName']
}
</script>