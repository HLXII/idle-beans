<template>
    <div v-bind:class="color">{{message}}</div>
</template>

<script>

export default {
  name: "log-entry",
  props: {
      color: {
          type: String,
      },
      message: {
          type: String,
          required: true,
      }
  },
}
</script>

<style scoped>

</style>
