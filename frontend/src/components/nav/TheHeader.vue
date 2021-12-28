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
    // TODO: Make a logout call to the backend too
    async logout() {
      await this.$router.push({ name: "SignIn" });
    },
  },
};
</script>
