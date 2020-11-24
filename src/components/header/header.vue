<template>
  <v-app-bar app color="#2b1b01" class="header">
    <v-row>
      <v-col cols="4" class="pa-3 my-auto">
        <div class="logo">
          <router-link to="/">Vue - Complete Guide</router-link>
        </div>
      </v-col>
      <v-col cols="4" class="pa-3 ma-auto px-auto">
        <div class="px-auto text-center">
          <span class="white--text font-weight-bold">
            Prize Money: R1 000 000 | Contestants: 20 777
          </span>
        </div>
      </v-col>
      <v-col cols="4" class="pa-3 my-auto">
        <div class="float-right">
          <nav>
            <ul>
              <li v-if="!auth">
                <router-link to="/signup">Sign Up</router-link>
              </li>
              <li v-if="!auth">
                <router-link to="/signin">Sign In</router-link>
              </li>
              <li v-if="auth">
                <router-link to="/dashboard">Dashboard</router-link>
              </li>
              <li v-if="auth">
                <v-btn @click="onLogout" class="logout">Log out </v-btn>
              </li>
            </ul>
          </nav>
        </div>
      </v-col>
    </v-row>
  </v-app-bar>
</template>
<script>
export default {
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
<style scoped>
#header {
  height: 56px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.header {
  background-size: cover;
  background-position: top;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0),
      rgba(255, 255, 255, 0)
    ),
    linear-gradient(to top, rgba(0, 0, 0), rgba(255, 255, 255, 0)),
    url('./../../assets/scene4.jpg');
}

.logo {
  font-weight: bold;
  color: white;
}

.logo a {
  text-decoration: none;
  color: white;
}

nav {
  height: 100%;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  flex-flow: row;
  align-items: center;
}

li {
  margin: 0 16px;
}

li a {
  text-decoration: none;
  color: white;
}

li a:hover,
li a:active,
li a.router-link-active {
  color: #fa923f;
}
</style>
