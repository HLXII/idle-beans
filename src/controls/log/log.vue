<template>
    <div class="flex flex-col border2 bg-generic" style="flex-grow: 1; height: 0px; min-height: 320px;">
        <div class="mb-1" v-on:click="clearLog">
            <div class="btn border2 bg-white text-center">Clear Log</div>
        </div>
        <div class="overflow-auto flex flex-col-reverse" style="flex-grow: 1;">
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

</style>
