<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'app',

  created() {
    this.$store.dispatch('tryAutoLogin');
  },
};
</script>
