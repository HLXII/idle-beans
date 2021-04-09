<template>
    <div class="overflow-auto flex flex-col-reverse" style="flex-grow: 1; height: 320px;">
        <div> <!-- Additional div used to reverse the entries correctly -->
            <log-entry v-for="(entry, idx) in log.entries" :key=idx :message=entry.logMessage :color=entry.color ></log-entry>
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

  }
}
</script>

<style scoped>

</style>
