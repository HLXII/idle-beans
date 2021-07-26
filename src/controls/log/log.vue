<template>
    <div class="flex flex-col border2 bg-generic" style="flex-grow: 1; height: 0px; min-height: 320px;">
        <span class="btn bg-white dark:bg-gray-700 flex text-center justify-center border2 mb-1" @click="clearLog">Clear Log</span>
        <div class="flex flex-col-reverse logContainer">
            <div> <!-- Additional div used to reverse the entries correctly -->
                <log-entry v-for="(entry, idx) in log.entries" :key=idx :entry="entry" :wiki="wiki"></log-entry>
            </div>
        </div>
    </div>
</template>

<script>
import {App} from "@/App.ts"
import LogEntry from "@/controls/log/log-entry.vue"

export default {
  name: "log",
  components: {
      LogEntry,
  },
  data() {
    return {
      log: App.game.features.log,
      wiki: App.game.features.wiki,
    }
  },
  computed: {

  },
  methods: {
      clearLog() {
          this.log.clearLog();
      },
  }
}
</script>

<style scoped>
.logContainer {
    overflow-y: scroll;
    flex-grow: 1;
    scroll-snap-type: y proximity;
}

.logContainer > div > div:last-child {
    scroll-snap-align: end;
}
</style>
