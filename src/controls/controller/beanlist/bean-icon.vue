<template>
    <div style="display: inline-block; position: relative;">
        <img style="position: absolute;" width="32px" :src="require(`@/assets/images/back.png`)"/>
        <img style="position: relative;" width="32px" :src="bean.image"/>
        <slot></slot>
    </div>
</template>

<script>
import Bean from "@/scripts/bean/Bean";

export default {
    name: "bean-icon",
    props: {
        bean: {
            type: Bean,
        },
    },
}
</script>

<style scoped>
</style>
