<template>
    <div class="plantImage">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -0.5 16 64" shape-rendering="crispEdges" v-on:click="clickPlant()">
            <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
            <path pointer-events="painted" stroke="#3ab654" d="M10 26h2M8 27h3M7 28h2M5 29h3M12 29h1M4 30h3M12 30h1M4 31h3M12 31h2M3 32h3M12 32h2M2 33h4M12 33h2M2 34h3M12 34h2M1 35h4M12 35h3M1 36h3M12 36h3M1 37h3M12 37h2M0 38h4M11 38h3M0 39h4M10 39h4M0 40h4M10 40h3M1 41h4M9 41h3M1 42h5M9 42h3M2 43h5M8 43h2M2 44h7M2 45h8M3 46h8M3 47h9M4 48h9M5 49h8M3 50h2M6 50h8M3 51h2M7 51h7M2 52h2M8 52h7M1 53h3M9 53h6M1 54h3M10 54h4M1 55h2M10 55h3" />
            <path pointer-events="painted" stroke="#29863d" d="M9 28h2M8 29h2M7 30h3M7 31h2M6 32h2M6 33h2M14 33h1M5 34h2M14 34h1M5 35h2M15 35h1M4 36h3M15 36h1M4 37h2M14 37h2M4 38h2M14 38h2M4 39h2M14 39h2M4 40h3M13 40h3M0 41h1M5 41h2M12 41h4M0 42h1M6 42h1M12 42h3M0 43h2M7 43h1M10 43h5M1 44h1M9 44h5M1 45h1M10 45h3M2 46h1M11 46h1M2 47h1M3 48h1M3 49h2M13 49h1M2 50h1M5 50h1M14 50h1M2 51h1M5 51h2M14 51h1M1 52h1M4 52h4M15 52h1M0 53h1M4 53h5M15 53h1M0 54h1M4 54h3M9 54h1M14 54h2M0 55h1M3 55h3M13 55h3" />
        </svg>
    </div>
</template>

<script>
import GameController from "@/scripts/GameController";

export default {
    name: "bean-stalk",
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
