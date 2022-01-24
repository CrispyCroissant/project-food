<template>
  <div id="theContainer">
    <the-header></the-header>
    <v-img
      src="@/assets/bg.jpg"
      lazy-src="@/assets/bg-lazy.jpg"
      height="calc(100% - 64px)"
      gradient="rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)"
      class="d-flex align-center"
    >
      <v-container fluid class="d-flex flex-column flex-grow-1" id="container">
        <v-row align="end">
          <v-col cols="12" class="d-flex justify-center">
            <info-card></info-card>
          </v-col>
        </v-row>
        <v-row align="start">
          <v-col cols="12" class="d-flex justify-center">
            <food-list-card></food-list-card>
          </v-col>
        </v-row>
      </v-container>
    </v-img>
  </div>
</template>

<script>
import FoodListCard from "../components/Dashboard/FoodListCard.vue";
import InfoCard from "../components/Dashboard/InfoCard.vue";
import TheHeader from "../components/nav/TheHeader.vue";

export default {
  name: "Dashboard",
  components: { TheHeader, FoodListCard, InfoCard },
};
</script>

<style scoped>
#theContainer {
  height: 100vh;
}
</style>
