<template>
  <div class="w3-card-4" style="max-width: 900px;">
    <header class="w3-container w3-light-gray">
      <h2>Result</h2>
    </header>

    <div class="w3-container">
      <p>
        <slot name="main" />
      </p>
    </div>

    <footer class="w3-container w3-light-gray">
      <p class="w3-panel w3-leftbar w3-border-teal">
        <slot name="footer" />
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'result',
  props: { receivedData: Object, fileName: String }
}
</script>
