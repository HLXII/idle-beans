<template>
    <table class="statusTable">
        <slot></slot>
    </table>
</template>

<script>
export default {
    name: "status-table",
}
</script>

<style>
.statusTable {
    border-collapse: inherit;
    border-spacing: 0px 4px;
}

.statusTable td {
    padding: 0px;
}
</style>
