<template>
  <v-container fluid class="d-flex flex-column">
    <v-row id="form-row" class="flex-grow-1" justify="center" align="center">
      <v-col cols="10" md="6">
        <h1 class="text-h2 text-md-h1 text-center mb-15">Project Food</h1>
        <v-form ref="form" @keydown.enter="validate">
          <v-alert v-if="error" type="error" text>{{ error }}</v-alert>
          <v-text-field
            autofocus
            label="Email"
            prepend-icon="mdi-email"
            v-model="email"
            :rules="rules.required"
          ></v-text-field>
          <v-text-field
            type="password"
            label="Password"
            prepend-icon="mdi-key"
            v-model="password"
            :rules="rules.required"
          ></v-text-field>
          <div class="d-flex justify-space-around my-6">
            <v-btn text>Register here</v-btn>
            <v-btn ref="loginBtn" color="primary" @click="validate">
              Sign in
            </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      error: "",
      email: "",
      password: "",
      rules: {
        required: [(v) => !!v || "Required"],
      },
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
}
</style>
