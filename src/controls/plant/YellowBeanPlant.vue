<template>
    <div class="plantContainer">
        <slot></slot>
                <svg class="plantImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 16 32" shape-rendering="crispEdges" v-on:click="clickPlant()">
            <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
            <path pointer-events="painted" stroke="#b3c189" d="M3 12h2M9 12h2M3 13h3M8 13h3M5 14h5M11 14h4M7 15h1M9 15h2M8 16h2M8 17h1M7 18h1M7 19h1M7 20h1M8 21h1M8 22h1M7 23h2M6 24h2M9 24h1M7 25h1" />
            <path pointer-events="painted" stroke="#99b051" d="M4 14h1M5 15h2M8 15h1M11 15h3M7 16h1M10 16h1M9 17h1M8 18h1M8 19h1M8 20h1M9 21h1M9 22h1M9 23h1M8 24h1M9 25h1" />
            <path pointer-events="painted" stroke="#d1da4e" d="M4 15h1M4 16h2M3 17h3M11 17h2M3 18h2" />
            <path pointer-events="painted" stroke="#bbb952" d="M6 16h1M11 16h2M6 17h1M2 18h1M5 18h1M3 19h2" />
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
