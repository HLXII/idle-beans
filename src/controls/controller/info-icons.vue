<template>
    <div class="flex flex-wrap gap-1 justify-center" v-show="useModal">
        <div class="btn" style="height:32px;" @click="openInfo(InfoType.Wiki)">
            <icon class="has-tooltip" :bg="wikiNotification" :image="require(`@/assets/images/icons/Wiki Icon.png`)">
                <tooltip :interactable="false">
                <div class="text-center">Wiki</div>
                </tooltip>
            </icon>
        </div>
        <div class="btn" style="height:32px;" @click="openInfo(InfoType.Achievements)">
            <icon class="has-tooltip" :image="require(`@/assets/images/icons/Achievement Icon.png`)">
                <tooltip :interactable="false">
                <div class="text-center">Achievements</div>
                </tooltip>
            </icon>
        </div>
        <div class="btn" style="height:32px;" v-if="showPrestige" @click="openInfo(InfoType.Prestige)">
            <icon class="has-tooltip" :image="require(`@/assets/images/icons/Prestige Icon.png`)">
                <tooltip :interactable="false">
                <div class="text-center">Prestige</div>
                </tooltip>
            </icon>
        </div>
        <div class="btn" style="height:32px;" @click="openInfo(InfoType.Settings)">
            <icon class="has-tooltip" :image="require(`@/assets/images/icons/Settings Icon.png`)">
                <tooltip :interactable="false">
                <div class="text-center">Settings</div>
                </tooltip>
            </icon>
        </div>
    </div>      
</template>

<script>
import Icon from "@/controls/utility/icon.vue";
import Tooltip from '@/controls/utility/tooltip.vue';
import Notifications from '@/scripts/notifications/Notifications';
import GameController, {InfoType} from '@/scripts/GameController';
import { Settings } from '@/scripts/Settings';

export default {
    components: {
        Icon,
        Tooltip,
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
