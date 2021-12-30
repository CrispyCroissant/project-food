<template>
  <div id="fakeContainer" class="d-flex flex-column">
    <the-header class="d-flex flex-column flex-grow-0"></the-header>
    <v-container fluid class="d-flex flex-column flex-grow-1">
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
#fakeContainer {
  height: 100%;
}
</style>
