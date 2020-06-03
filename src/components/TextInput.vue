<template>
  <p>
    <textarea
      :placeholder="placeholder"
      class="w3-input w3-border"
      style="resize: vertical; max-width: 900px;"
      :maxlength="maxlength"
      :value="value"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
    ></textarea>
    <span
      class="w3-tag w3-light-gray w3-border-bottom w3-border-left w3-border-right"
      > {{value.length}} / {{ maxlength }}</span
    >
  </p>
</template>

<script>
export default {
  name: "text-input",
  props: ["placeholder", "maxlength", "disabled", "value"],
  data: () => ({
  }),
  beforeRouteUpdate (to, from, next) {
    this.text = "";
    next()
  },
};
</script>
