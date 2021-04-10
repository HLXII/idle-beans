<template>
    <modal :show="show" @close="close">
        <div class="modal-header">
            <h3>New Post</h3>
        </div>
        <div class="modal-body">
            <label class="form-label">
                Title
                <input class="form-control">
            </label>
            <label class="form-label">
                Body
                <textarea rows="5" class="form-control">
                </textarea>
            </label>
        </div>
        <div class="modal-footer text-right">

        </div>
    </modal>
</template>

<script>
import Modal from "@/controls/modal/modal";

export default {
    name: "test-modal",
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
        }
    },
}
</script>

<style scoped>

</style>
