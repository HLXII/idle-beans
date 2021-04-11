<template>
    <div class="flex flex-col border2 bg-generic" style="flex-grow: 1; height: 0px; min-height: 320px;">
        <div class="mb-1" v-on:click="clearLog">
            <span class="btn border2 bg-white flex justify-center text-center">Clear Log</span>
        </div>
        <div class="flex flex-col-reverse logContainer">
            <div> <!-- Additional div used to reverse the entries correctly -->
                <log-entry v-for="(entry, idx) in log.entries" :key=idx :message=entry.logMessage :color=entry.color ></log-entry>
            </div>
        </div>
    </div>
</template>

<script>
import {App} from "@/App.ts"
import LogEntry from "@/controls/log/log-entry"

export default {
  name: "log",
  components: {
      LogEntry,
  },
  data() {
    return {
      log: App.game.features.log,
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
