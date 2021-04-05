<template>
    <div class="test">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 16 16" shape-rendering="crispEdges" v-on:click="clickPlant()">
            <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
            <path pointer-events="painted" stroke="#b3c189" d="M8 6h1M7 7h2M7 8h1" />
            <path pointer-events="painted" stroke="#99b051" d="M9 6h1M9 7h1M8 8h1" />
        </svg>
    </div>
</template>

<script>
import GameController from "@/scripts/GameController";

export default {
    name: "beanbud",
    props: {
        row: {
            type: Number,
            required: true,
        },
        col: {
            type: Number,
            required: true,
        },
        controller: {
            type: GameController,
            required: true,
        },
    },
    methods: {
        clickPlant() {
            this.controller.clickPlant(this.row, this.col);
        }
    },
}
</script>

<style scoped>

</style>
