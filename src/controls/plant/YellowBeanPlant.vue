<template>
    <div class="plantImage">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 16 32" shape-rendering="crispEdges" v-on:click="clickPlant()">
            <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
            <path pointer-events="painted" stroke="#b3c189" d="M4 13h3M11 13h3M6 14h9M6 15h3M11 15h1M13 15h2M4 16h4M14 16h1M3 17h3M9 17h1M14 17h1M9 18h1M9 19h1M9 20h1M9 21h1M8 22h1M7 23h2M6 24h2M9 24h1M7 25h1" />
            <path pointer-events="painted" stroke="#99b051" d="M5 14h1M9 15h2M12 15h1M8 16h2M13 16h1M6 17h1M10 17h1M3 18h3M10 18h1M10 19h1M10 20h1M10 21h1M9 22h1M9 23h1M8 24h1M9 25h1" />
            <path pointer-events="painted" stroke="#bbb952" d="M11 16h1M11 17h1M6 18h2M7 19h1M7 20h1M6 21h1" />
            <path pointer-events="painted" stroke="#d1da4e" d="M12 17h1M11 18h1M6 19h1M5 20h2M5 21h1" />
        </svg>
    </div>
</template>

<script>
import GameController from "@/scripts/GameController";

export default {
    name: "yellow-bean-plant",
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
