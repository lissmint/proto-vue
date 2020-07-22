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
      <span :class="{ 'w3-text-black': isValid, 'w3-text-red': !isValid }">
        {{ amount }}
      </span>
      / {{ wordcount ? wordcount + ' words' : maxlength }}</span
    >
  </p>
</template>

<script>
export default {
  name: 'text-input',
  props: ['placeholder', 'maxlength', 'disabled', 'value', 'rows', 'wordcount'],
  data: () => ({
    isValid: true
  }),
  computed: {
    amount() {
      if (this.wordcount) {
        if (this.value.trim()) {
          return this.value.trim().split(' ').length
        }
        return 0
      }
      return this.value.length
    }
  },
  watch: {
    amount: function(val) {
      let prev = this.isValid

      if (this.wordcount) {
        if (val > this.wordcount) this.isValid = false
        else this.isValid = true

        if (prev != this.isValid) this.$emit('setValid', this.isValid)
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.isValid = true
    next()
  }
}
</script>
