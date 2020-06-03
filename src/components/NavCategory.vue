<template>
  <div
    class="item w3-bar-item w3-button w3-border-bottom justify"
    @click="showModels(familyName)"
  >
    <span>{{ title }} <i class="fa fa-caret-down" v-if="available"></i></span>
    <div :class="{ 'led-green': available, 'led-gray': !available }"></div>
  </div>
</template>

<script>
export default {
  name: 'nav-category',
  props: ['title', 'available', 'familyName'],
  methods: {
    showModels(familyName) {
      this.$emit('showModels', familyName)
    }
  }
}
</script>

<style scoped>
.justify {
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.led-gray {
  margin-left: 5px;
  margin-top: auto;
  margin-bottom: auto;
  height: 7px;
  width: 7px;
  background-color: #9e9e9e !important;
  border: 2px solid #919191;
  border-radius: 50%;
  box-shadow: 0 0 4px 2px #9e9e9e !important;
}

.led-green {
  margin-left: 5px;
  margin-top: auto;
  margin-bottom: auto;
  width: 7px;
  height: 7px;
  background-color: #009688 !important;
  border: 2px solid rgb(0, 145, 130);
  border-radius: 50%;
  box-shadow: 0 0 4px 1px #009688;
}
</style>
