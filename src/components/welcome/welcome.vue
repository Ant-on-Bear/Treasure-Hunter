<template>
  <v-container fluid class="welcome">
    <!-- <h1>Time to learn something new!</h1>
    <p>
      You found the best place to learn - and now you're just one sign in (or
      sign up) away from it!
    </p>
    -->
    <v-row style="height:100%;">
      <v-col cols="12">
        <v-img
          src="./../../assets/logo.png"
          height="500px"
          contain
          style="z-index:1;"
        />
        <p class="mt-n10 white--text title">
          WHO WILL FIND THE TREASURE FIRST...
        </p>
        <div class="cta">
          <router-link to="/signup">And so your journey STARTS</router-link>
        </div>
      </v-col>
    </v-row>
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
  </v-container>
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
.welcome {
  height: 93vh;
  background-image: url('./../../assets/scene4.png');
  background-size: cover;
  background-position: top;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  text-align: center;
}

p {
  text-align: center;
}

.cta {
  width: 300px;
  margin: auto;
  text-align: center;
  z-index: 5;
}

.cta a {
  margin: 10px;
  text-decoration: none;
  display: inline-block;
  border: 1px solid #fff;
  border-radius: 3px;
  width: 200px;
  padding: 10px;
  box-sizing: border-box;
  color: #fff;
}

.cta a:hover,
.cta a:active {
  background-color: #fcfcfc;
  color: #000;
}

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
