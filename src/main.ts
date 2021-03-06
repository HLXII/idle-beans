import Vue from 'vue'
import VueApp from './App.vue'
import {App} from "./App";

import Notifications from "vt-notifications";
import VTooltip from 'v-tooltip';

import './VueFilters';

import "./index.css";

Vue.config.productionTip = false

Vue.use(Notifications);

const tooltipOptions = {
    defaultHideOnTargetClick: false,
    popover: {
        defaultTrigger: 'hover focus',
        defaultAutoHide: false,
    }
}
Vue.use(VTooltip, tooltipOptions);

declare global {
    interface Window {
        App: App;
    }
}

/**
 * Start the application when all html elements are loaded.
 */
window.onload = function () {
    App.start();

    // Expose the App class to the window (and the console)
    if (!App.inProduction && typeof window !== undefined) {
        console.log('Exposing App to console');
        window.App = App;
    }

    console.log("Launched");

    new Vue({
        render: h => h(VueApp),
    }).$mount('#app')

};


