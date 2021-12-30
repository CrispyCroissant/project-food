<template>
  <v-card elevation="3" outlined shaped :loading="loading">
    <v-expand-transition>
      <div v-if="error">
        <v-alert ref="errorAlert" type="error" text>
          {{ error }}
        </v-alert>
      </div>
    </v-expand-transition>
    <p ref="titleText" class="text-caption text-center my-5 px-5">
      {{ titleText }}
    </p>
    <h3 v-if="recipe" ref="recipeText" class="text-h6 text-center mt-5 px-5">
      {{ recipe }}
    </h3>
    <v-row v-if="recipe" justify="center" class="my-8">
      <v-btn
        ref="recipeBtn"
        class="mx-15"
        color="primary"
        @click="getRandomRecipe"
      >
        Another one
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "InfoCard",
  data() {
    return {
      loading: false,
      error: false,
      recipe: "",
    };
  },
  computed: {
    titleText() {
      return this.recipe ? "Your next recipe is" : "You have no recipes yet!";
    },
  },
  methods: {
    getRandomRecipe() {
      const recipes = this.$store.state.recipes;

      if (recipes.length === 0) {
        this.recipe = "";
        return;
      }

      const randomIndex = Math.floor(Math.random() * recipes.length);
      const randomRecipe = recipes[randomIndex];

      randomRecipe ? (this.recipe = randomRecipe) : null;
    },
  },
  watch: {
    "$store.state.recipes"() {
      this.getRandomRecipe();
    },
  },
  created() {
    this.getRandomRecipe();
  },
};
</script>
