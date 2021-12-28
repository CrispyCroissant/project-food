<template>
  <div>
    <the-header></the-header>
    <v-container fluid class="d-flex flex-column flex-grow-1">
      <v-row justify="center" align="center">
        <v-col cols="12" class="d-flex justify-space-between flex-grow-1">
          <food-list-card></food-list-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import FoodListCard from "../components/Dashboard/FoodListCard.vue";
import TheHeader from "../components/nav/TheHeader.vue";

export default {
  name: "Dashboard",
  components: { TheHeader, FoodListCard },
};
</script>
