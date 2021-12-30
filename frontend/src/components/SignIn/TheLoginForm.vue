<template>
  <v-form ref="form" @keydown.enter="validate">
    <v-expand-transition>
      <div v-if="error">
        <v-alert type="error" text>{{ error }}</v-alert>
      </div>
    </v-expand-transition>
    <v-text-field
      autofocus
      label="Email"
      prepend-icon="mdi-email"
      v-model="email"
      :rules="rules.required"
      ref="emailInput"
    ></v-text-field>
    <v-text-field
      type="password"
      label="Password"
      prepend-icon="mdi-key"
      v-model="password"
      :rules="rules.required"
      ref="passwordInput"
    ></v-text-field>
    <v-expand-transition>
      <div class="d-flex justify-center my-5" v-if="loading">
        <v-progress-circular
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
    </v-expand-transition>
    <div class="d-flex justify-space-around my-6">
      <v-btn text ref="signUpBtn" @click="routeSignUp">Register here</v-btn>
      <v-btn
        ref="loginBtn"
        color="primary"
        @click="
          validate();
          login();
        "
      >
        Sign in
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  name: "TheForm",
  data() {
    return {
      loading: false,
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
    async routeSignUp() {
      await this.$router.push({ name: "SignUp" });
    },
    async login() {
      try {
        this.error = "";
        this.loading = true;

        await this.$store.dispatch("attemptLogin", {
          email: this.email,
          password: this.password,
        });

        this.loading = false;

        await this.$router.push({ name: "Dashboard" });
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
  },
};
</script>
