<template>
  <v-container fill-height fluid class="bg-image">
    <v-layout row wrap align-center>
      <v-card color="black" width="400px" class="mx-auto wrong-page-div">
        <v-card-text class="white--text">
          OH NO!!!You had too much wrong guesses, now you are in jail. Normally
          it's a 2hour punishment, too see how long you still have too serve
          your punishment return to the dashboard and navigate too the game you
          were busy with, you will get a notification on the time you still have
          to wait, before continueing on your quest. Sorry...
        </v-card-text>
        <v-card-actions class="mx-auto">
          <v-btn class="px-10" @click="toDashboard">to dashboard</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="onLogout" class="logout">Logout and return</v-btn>
        </v-card-actions>
      </v-card>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  methods: {
    toDashboard() {
      this.$router.replace("/dashboard");
    },
    onLogout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>
<style scoped>
.bg-image {
  background-image: url("../assets/jail.png");
  background-size: cover;
  height: 100vh;
  width: 100vw;
}
.wrong-page-div {
  opacity: 0.8;
}
</style>
