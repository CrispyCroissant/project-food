<template>
  <v-card elevation="3" outlined shaped>
    <v-card-title>Your foods</v-card-title>
    <v-card-text>
      <v-list v-if="recipes.length > 0" ref="cardList">
        <v-list-item
          class="px-0"
          ref="recipeList"
          v-for="recipe in recipes"
          :key="recipe"
        >
          <v-list-item-content class="mr-4">
            {{ recipe }}
          </v-list-item-content>
          <v-list-item-icon>
            <v-btn icon ref="deleteBtn" @click="deleteRecipe(recipe)">
              <v-icon size="20px" color="red">mdi-delete</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-actions>
      <food-list-card-dialog></food-list-card-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
import FoodListCardDialog from "@/components/Dashboard/FoodListCardDialog.vue";

export default {
  name: "FoodListCard",
  components: { FoodListCardDialog },
  data() {
    return {
      error: "",
    };
  },
  computed: {
    recipes: {
      get() {
        return this.$store.state.recipes;
      },
      // * Had to create this to silence a stupid vue warning which is wrong.
      set() {
        return;
      },
    },
  },
  methods: {
    async deleteRecipe(recipe) {
      try {
        this.error = false;
        await this.$store.dispatch("deleteRecipe", recipe);
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>
