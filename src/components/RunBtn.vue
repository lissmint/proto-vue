<template>
  <p>
    <button
      class="w3-button w3-teal"
      @click="$emit('run')"
      :disabled="disabled"
    >
      Run
    </button>
    <i
      class="fa fa-spinner w3-spin w3-center"
      style="font-size:20px; margin-left: 10px; vertical-align: middle;"
      v-if="isRunning"
    ></i>
  </p>
</template>

<script>
export default {
  name: 'run-btn',
  props: { disabled: Boolean, isRunning: Boolean }
}
</script>
