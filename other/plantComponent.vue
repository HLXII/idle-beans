<template>
    <div class="plantImage">
{{{SVG}}}
    </div>
</template>

<script>
import GameController from "@/scripts/GameController";

export default {
    name: "{{COMPONENTNAME}}",
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
