<template>
  <v-dialog v-model="dialog" transition="dialog-top-transition" max-width="700">
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon color="green">mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-expand-transition>
        <div v-if="error">
          <v-alert ref="errorAlert" type="error" text>{{ error }}</v-alert>
        </div>
      </v-expand-transition>
      <v-card-actions>
        <v-text-field
          v-model="newRecipe"
          ref="recipeInput"
          label="Add food"
          :loading="loading"
        ></v-text-field>
        <v-btn ref="addBtn" class="mx-3" color="primary" @click="addRecipe">
          Add
        </v-btn>
        <v-btn
          ref="closeBtn"
          small
          icon
          class="align-self-start"
          @click="closeDialog"
        >
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
      loading: false,
      error: "",
    };
  },
  methods: {
    async addRecipe() {
      try {
        this.error = false;
        this.loading = true;
        await this.$store.dispatch("addRecipe", this.newRecipe);
        this.loading = false;
        this.newRecipe = "";
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
    closeDialog() {
      this.dialog = false;
      this.error = false;
    },
  },
};
</script>
