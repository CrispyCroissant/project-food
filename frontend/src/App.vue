<template>
  <v-app>
    <v-main>
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  created() {
    document.title = "Project Food";
  },
};
</script>
