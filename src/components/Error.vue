<template>
  <div class="w3-container">
    <div
      class="w3-panel w3-red w3-display-container"
      style="resize:none;   max-width: 900px;"
    >
      <span
        @click="$emit('close')"
        class="w3-button w3-red w3-large w3-display-topright"
        >&times;</span
      >
      <h3>Error!</h3>
      <p>{{ msg }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'error',
  props: {
    msg: String
  }
}
</script>
