<template>
    <div class="border2 bg-icon" style="width: 28px; height: 28px;">
        <div style="position: relative; left: -6px; top: -6px;">
            <svg width=32px xmlns="http://www.w3.org/2000/svg" :viewBox="icon.viewBox" shape-rendering="crispEdges">
                <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
                <path v-for="path in icon.paths" v-bind:key="path.stroke" pointer-events="painted" :stroke="path.stroke" :d="path.d" />
            </svg>
        </div>
    </div>
</template>

<script>
export default {
  name: "svg-icon",
  props: {
    icon: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
</style>
