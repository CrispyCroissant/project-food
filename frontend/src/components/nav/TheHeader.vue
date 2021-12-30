<template>
  <v-toolbar>
    <v-toolbar-title>
      <h2 class="text-h5">Project Food</h2>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-expand-transition>
      <div v-if="error">
        <v-alert ref="errorAlert" type="error" class="ma-0" text>
          {{ error }}
        </v-alert>
      </div>
    </v-expand-transition>
    <v-btn icon ref="logOutBtn" @click="logout">
      <v-icon color="primary">mdi-logout</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  name: "TheHeader",
  data() {
    return {
      error: "",
    };
  },
  methods: {
    async logout() {
      try {
        this.error = false;
        await this.$store.dispatch("logOut");
        await this.$router.push({ name: "SignIn" });
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>
