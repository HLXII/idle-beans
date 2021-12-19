<template>
    <div>
        <div class="flex">
            <div class="border4 bg-icon mr-2" @click="openWiki">
                <svg width=64px xmlns="http://www.w3.org/2000/svg" :viewBox="entity.icon.viewBox" shape-rendering="crispEdges">
                    <metadata>Made with Pixels to Svg https://codepen.io/shshaw/pen/XbxvNj</metadata>
                    <path v-for="path in entity.icon.paths" v-bind:key="path.stroke" pointer-events="painted" :stroke="path.stroke" :d="path.d" />
                </svg>
            </div>
            <div class="flex-1">
                <div class="flex py-1">
                    <div class="entityName">{{entity.type}}</div>
                    
                    <div class="flex-grow text-right" style="height: 32px;" >
                        <slot name="topRightContent"></slot>
                    </div>
                </div>
                <div class="py-1">
                    <div class="float-right">
                        <slot name="bottomRightContent"></slot>
                    </div>
                    <div>Age: {{entity.age}}</div>
                </div>
            </div>
        </div>
        <status-table>
            <status v-for="status in entity.statuses" :key="status.label" :status="status" />
        </status-table>
    </div>
</template>

<script>
import EntityState from "@/scripts/entity/EntityState";
import Farms from '@/scripts/farm/Farms';
import StatusTable from './status-table.vue';
import Status from './status.vue';
import Wiki from '@/scripts/wiki/Wiki';

export default {
    name: "entity-details",
    data() {
        return {};
    },
    components: {
        StatusTable,
        Status,
    },
    props: {
        entity: {
            type: EntityState,
            required: true,
        },
        farms: {
            type: Farms,
            required: true,
        },
        wiki: {
            type: Wiki,
            required: true,
        }
    },
    computed: {

    },
    methods: {
        remove() {
            this.farms.removeEntity(this.entity.row, this.entity.col);
        },
        openWiki() {
            this.wiki.openWiki(this.entity.wikiType, this.entity.data.name);
        }
    }
}
</script>

<style scoped>

.plantName {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
}
</style>
