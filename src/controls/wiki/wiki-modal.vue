<template>
    <modal :show="show" @close="close">
        <div class="modal-content">
            <div class="modal-header">
                <h5>Wiki</h5>
            </div>
            <div class="modal-body p-0">

            </div>
            <div class="modal-footer">

            </div>
        </div>
    </modal>
</template>

<script>
import Modal from "@/controls/modal/modal";
import {App} from "@/App.ts"

export default {
    name: "wiki-modal",
    data() {
        return {
            plants: App.game.features.plants,
            beans: App.game.features.beans,
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
        }
    },
    computed: {
        
    },
}
</script>

<style scoped>

</style>
