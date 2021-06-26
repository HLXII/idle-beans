<template>
    <modal :show="show" @close="close">
        <div class="modal-content">
            <div class="modal-header">
            </div>
            <div class="modal-body">
            </div>
            <div class="modal-footer">
            </div>
        </div>
    </modal>
</template>

<script>
import Modal from "@/controls/modal/modal.vue";

export default {
    name: "achievements-modal",
    data() {
        return {
        }
    },
    components: {
        Modal,
    },
    props: {
        show: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        close: function() {
            this.$emit('close');
        },
    },
    computed: {
    },
}
</script>

<style scoped>
</style>
