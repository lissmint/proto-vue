<template>
  <div class="w3-teal">
    <button
      class="w3-button w3-teal w3-xlarge w3-hide-large"
      @click="w3_open()"
    >
      &#9776;
    </button>
    <div class="w3-container">
      <h1 id="model-name">{{ title }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  props: ['title'],
  methods: {
    w3_open() {
      document.getElementById('mySidebar').style.display = 'block'
    }
  }
}
</script>
