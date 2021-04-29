<template>
    <div class="plantContainer">
        <slot></slot>
                <svg class="plantImage" xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 16 32" shape-rendering="crispEdges" v-on:click="clickPlant()">
            <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
            <path pointer-events="painted" stroke="#b3c189" d="M9 13h2M8 14h2M13 14h1M4 15h3M8 15h2M12 15h2M6 16h7M8 17h1M7 18h1M9 19h1M9 20h1M8 21h2M8 22h1M7 23h2M6 24h2M9 24h1M7 25h1" />
            <path pointer-events="painted" stroke="#508f26" d="M10 14h1M5 17h1M12 17h1M6 18h1M11 18h1M6 19h1M12 19h1M5 20h1" />
            <path pointer-events="painted" stroke="#5bb91d" d="M10 15h1M5 18h1M12 18h2M4 19h2M13 19h1M4 20h1" />
            <path pointer-events="painted" stroke="#99b051" d="M5 16h1M13 16h1M6 17h2M9 17h3M8 18h2M10 19h1M10 20h1M10 21h1M9 22h1M9 23h1M8 24h1M9 25h1" />
        </svg>
    </div>
</template>

<script>
import GameController from "@/scripts/GameController";

export default {
    name: "green-bean-plant",
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
