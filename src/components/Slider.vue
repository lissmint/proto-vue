<template>
  <div class="number-field">
    <label class="w3-text-grey">{{ label }}</label>
    <div>
      <input
        type="range"
        :min="min"
        :max="max"
        :value="value"
        :step="step || 1"
        class="mini-slider"
        @input="$emit('input', $event.target.value)"
      />
      <span class="w3-tag w3-teal range-val">{{ value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slider',
  props: ['label', 'min', 'max', 'value', 'step']
}
</script>
