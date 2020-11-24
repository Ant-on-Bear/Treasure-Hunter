<template>
  <div id="dashboard" class="main-panel">
    <v-navigation-drawer permanent app dark color="#031a22" expand-on-hover>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title" v-if="email">
            {{ email }}
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          @click="toggleGameList(item)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <splash-screen v-if="showSplashScreen == true" />
      <game-list v-if="showGameList == true" />
      <search-room
        v-if="showSearchRoom == true"
        :key="componentKey"
        @reRender="forceRerender($event)"
        @toGamelist="toggleGameList($event)"
      />
      <game-two v-if="showGameTwo == true" />
      <game-three v-if="showGameThree == true" />
    </v-main>
  </div>
</template>

<script>
import { eventBus } from "../../main";
import GameList from "./gameList";
import SplashScreen from "./splashScreen";
import SearchRoom from "../games/searchRoom";
import GameTwo from "../games/gameTwo";
import GameThree from "../games/gameThree";
export default {
  data() {
    return {
      items: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        { title: "Games", icon: "mdi-image", show: false },
        { title: "About", icon: "mdi-help-box" }
      ],
      right: null,
      showGameList: false,
      showSearchRoom: false,
      showGameTwo: false,
      showGameThree: false,
      showSplashScreen: true,
      username: "",
      componentKey: 0,
      searchGameStatus: "active"
    };
  },
  components: {
    GameList,
    SearchRoom,
    GameTwo,
    GameThree,
    SplashScreen
  },
  computed: {
    email() {
      return !this.$store.getters.user ? false : this.$store.getters.user.email;
    }
  },
  created() {
    eventBus.$on("showSearchRoom", (show) => {
      this.showGameList = !show;
      this.showSearchRoom = show;
      this.showGameTwo = !show;
      this.showGameThree = !show;
    });
    eventBus.$on("showGameTwo", (show) => {
      this.showGameList = !show;
      this.showSearchRoom = !show;
      this.showGameTwo = show;
      this.showGameThree = !show;
    });
    eventBus.$on("showGameThree", (show) => {
      this.showGameList = !show;
      this.showSearchRoom = !show;
      this.showGameTwo = !show;
      this.showGameThree = show;
    });
    this.$store.dispatch("fetchUser");
  },
  methods: {
    forceRerender(number) {
      debugger;
      this.componentKey += number;
    },
    toggleGameList(item) {
      if (item.title == "Games") {
        this.showGameList = true;
        this.showSearchRoom = false;
        this.showGameTwo = false;
        this.showGameThree = false;
        this.showSplashScreen = false;
      } else if (item.title == "Dashboard") {
        this.showGameList = false;
        this.showSearchRoom = false;
        this.showGameTwo = false;
        this.showGameThree = false;
        this.showSplashScreen = true;
      }
    }
  }
};
</script>
<style scoped>
.main-panel {
  background-image: url("../../assets/dashboard-bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  float: right;
  width: 100%;
  min-height: 100%;
}
</style>
