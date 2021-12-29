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
      <v-dialog
        v-model="dialog"
        transition="dialog-top-transition"
        max-width="700"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon color="green">mdi-plus</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-actions>
            <v-text-field label="Add food"></v-text-field>
            <v-btn class="mx-3" color="primary">Add</v-btn>
            <v-btn small icon class="align-self-start" @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "FoodListCard",
  data() {
    return {
      error: "",
      dialog: false,
      recipes: [],
    };
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
