<template>
  <v-toolbar>
    <v-toolbar-title>
      <h2 class="text-h5">Project Food</h2>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-btn icon ref="logOutBtn" @click="logout">
      <v-icon color="primary">mdi-logout</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "TheHeader",
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("logOut");
      await this.$router.push({ name: "SignIn" });
      } catch (error) {
        return;
      }
    },
  },
};
</script>
