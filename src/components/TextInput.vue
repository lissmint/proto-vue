<template>
  <p>
    <textarea
      :placeholder="placeholder"
      class="w3-input w3-border"
      style="resize: vertical; max-width: 900px;"
      :maxlength="maxLength"
      v-model="text"
      :disabled="disabled"
      @input="$emit('setText', text)"
    ></textarea>
    <span
      class="w3-tag w3-light-gray w3-border-bottom w3-border-left w3-border-right"
      >{{ text.length }} / {{ maxLength }}</span
    >
  </p>
</template>

<script>
export default {
  name: "text-input",
  props: ['placeholder', 'maxLength', 'disabled'],
  data: () => ({
    text: ''
  })
};
</script>
