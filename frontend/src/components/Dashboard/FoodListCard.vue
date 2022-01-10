<template>
  <v-card elevation="3" outlined shaped :loading="loading">
    <v-expand-transition>
      <div v-if="error">
        <v-alert ref="errorAlert" type="error" class="mb-0" text>
          {{ error }}
        </v-alert>
      </div>
    </v-expand-transition>
    <v-card-title class="px-15">
      {{ $t("dashboard.foodListCard.title") }}
    </v-card-title>
    <v-card-text>
      <v-list
        class="overflow-y-auto"
        max-height="200px"
        v-if="recipes.length > 0"
        ref="cardList"
      >
        <v-list-item
          class="px-0"
          ref="recipeList"
          v-for="recipe in recipes"
          :key="recipe"
        >
          <v-list-item-content class="mr-4 pa-0">
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
      loading: false,
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
  watch: {
    "$store.state.recipes"() {
      return this.$store.state.recipes;
    },
  },
  methods: {
    async deleteRecipe(recipe) {
      try {
        this.error = false;
        this.loading = true;
        await this.$store.dispatch("deleteRecipe", recipe);
        this.loading = false;
      } catch (error) {
        this.error = error;
      }
    },
  },
  async created() {
    try {
      await this.$store.dispatch("getRecipes");
    } catch (error) {
      if (error.message === "Couldn't find any recipes") {
        return;
      }
    }
  },
};
</script>
