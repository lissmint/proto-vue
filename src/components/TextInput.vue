<template>
  <p>
    <textarea
      :placeholder="placeholder"
      class="w3-input w3-border"
      style="resize: vertical; max-width: 900px;"
      :maxlength="maxlength"
      :value="value"
      :rows="rows"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
    ></textarea>
    <span
      class="w3-tag w3-light-gray w3-border-bottom w3-border-left w3-border-right"
    >
      {{ wordcount ? (value ? value.split(' ').length : '0') : value.length }} /
      {{ wordcount ? wordcount + ' words' : maxlength }}</span
    >
  </p>
</template>

<script>
export default {
  name: 'text-input',
  props: ['placeholder', 'maxlength', 'disabled', 'value', 'rows', 'wordcount']
}
</script>
