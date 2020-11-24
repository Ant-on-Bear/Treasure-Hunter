<template>
  <div>
    <v-card class="d-flex flex-wrap" flat tile color="transparent">
      <v-card
        class="pa-2 ma-4 game-card"
        outlined
        tile
        @click="showSearchRoom"
        :disabled="isSearchGameDisabled"
      >
        SearchRoom
      </v-card>

      <v-card class="pa-2 ma-4 game-card" outlined tile @click="showGameTwo">
        Game 2
      </v-card>

      <v-card class="pa-2 ma-4 game-card" outlined tile @click="showGameThree">
        Game 3
      </v-card>
    </v-card>
  </div>
</template>
<script>
import { eventBus } from "../../main";

export default {
  data() {
    return {
      isSearchGameDisabled: false
    };
  },
  created() {
    debugger;
    if (this.$store.getters.user.searchGameStatus == "completed") {
      this.isSearchGameDisabled = true;
    }
  },
  methods: {
    showSearchRoom() {
      eventBus.$emit("showSearchRoom", true);
    },
    showGameTwo() {
      eventBus.$emit("showGameTwo", true);
    },
    showGameThree() {
      eventBus.$emit("showGameThree", true);
    }
  }
};
</script>
<style scoped>
.game-card {
  height: 200px;
  width: 150px;
}
</style>
