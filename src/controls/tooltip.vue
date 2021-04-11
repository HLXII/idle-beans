<template>
    <div class="tooltip" v-bind:class="outerClass" v-bind:style="outerStyle">
        <div class="border2" v-bind:class="innerClass">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "tooltip",
    props: {
        interactable: {
            type: Boolean,
            default: true,
        },
        width: {
            type: Number,
        },
        position: {
            type: String,
            default: 'bottom-right',
        },
        bg: {
            type: String,
            default: 'bg-generic',
        }
    },
    computed: {
        outerClass() {
            const classObject = {};
            classObject[`${this.marginClass}-1`] = !this.interactable;

            if (this.position.includes('left')) {
                classObject['right-0'] = true;
            } else if (this.position.includes('right')) {
                classObject['left-0'] = true;
            }

            if (this.width) {
                classObject[`w-${this.width}`] = true;
            }
            
            return classObject;
        },
        innerClass() {
            const classObject = {};
            classObject[`${this.marginClass}-1`] = this.interactable;
            classObject[`${this.marginClass}-0`] = !this.interactable;

            classObject[this.bg] = true;

            return classObject;
        },
        marginClass() {
            switch(this.position) {
                case 'bottom-right':
                case 'bottom-left':
                default:
                    return 'mt';
                case 'top-right':
                case 'top-left':
                    return 'mb';
            }
        },
        outerStyle() {
            const style = {};

            if (this.position.includes('top')) {
                style['bottom'] = '100%';
            }

            return style;
        },
    }
}
</script>

<style scoped>
</style>
