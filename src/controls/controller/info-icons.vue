<template>
    <div class="flex flex-wrap gap-1 justify-center" v-show="useModal">
        <div class="btn" v-tooltip="'Wiki'" style="height:32px;" @click="openInfo(InfoType.Wiki)">
            <icon :bg="notifications.hasWikiNotification ? 'bg-red-500' : 'bg-icon'" :image="require(`@/assets/images/icons/Wiki Icon.png`)" />
        </div>
        <div class="btn" v-tooltip="'Achievements'" style="height:32px;" @click="openInfo(InfoType.Achievements)">
            <icon :image="require(`@/assets/images/icons/Achievement Icon.png`)" />
        </div>
        <div class="btn" v-tooltip="'Prestige'" style="height:32px;" v-if="showPrestige" @click="openInfo(InfoType.Prestige)">
            <icon :image="require(`@/assets/images/icons/Prestige Icon.png`)" />
        </div>
        <div class="btn" v-tooltip="'Settings'" style="height:32px;" @click="openInfo(InfoType.Settings)">
            <icon :image="require(`@/assets/images/icons/Settings Icon.png`)" />
        </div>
    </div>      
</template>

<script>
import Icon from "@/controls/utility/icon.vue";
import Notifications from '@/scripts/notifications/Notifications';
import GameController, {InfoType} from '@/scripts/GameController';
import { Settings } from '@/scripts/Settings';

export default {
    components: {
        Icon,
    },
    data() {
        return {
            InfoType,
        }
    },
    props: {
        controller: {
            type: GameController,
            required: true,
        },
        settings: {
            type: Settings,
            required: true,
        },
        notifications: {
            type: Notifications,
            required: true,
        },
        showPrestige: {
            type: Boolean,
            default: true,
        },
    },
    computed: {
        useModal() {
            return this.settings.getSetting('useModal').value;
        },
        wikiNotification() {
            return this.notifications.hasWikiNotification ? 'bg-red-500' : 'bg-icon';
        },
    },
    methods: {
        openInfo(infoType) {
            this.controller.openInfo(infoType);
        },
    },
}
</script>

<style>

</style>
