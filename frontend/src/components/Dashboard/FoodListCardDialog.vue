<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="700">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon color="green">mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-actions>
        <v-text-field
          v-model="newRecipe"
          ref="recipeInput"
          label="Add food"
        ></v-text-field>
        <v-btn ref="addBtn" class="mx-3" color="primary" @click="addRecipe">
          Add
        </v-btn>
        <v-btn small icon class="align-self-start" @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "FoodListCardDialog",
  data() {
    return {
      newRecipe: "",
      dialog: false,
    };
  },
  methods: {
    async addRecipe() {
      try {
        this.error = false;
        await this.$store.dispatch("addRecipe", this.newRecipe);
        this.newRecipe = "";
      } catch (error) {
        this.error = error;
      }
    },
  },
};
</script>
