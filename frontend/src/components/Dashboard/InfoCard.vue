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
        {{$t("dashboard.infoCard.generateBtn")}}
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
      return this.recipe
        ? this.$t("dashboard.infoCard.titleHasRecipe")
        : this.$t("dashboard.infoCard.titleNoRecipe");
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

      if (recipes.length === 1) {
        this.recipe = randomRecipe;
      } else if (randomRecipe !== this.recipe) {
        this.recipe = randomRecipe;
      } else {
        this.getRandomRecipe();
      }
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
