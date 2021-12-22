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
      <v-btn text>Register here</v-btn>
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
import axios from "axios";

export default {
  name: "TheForm",
  data() {
    return {
      isLoggedIn: false,
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
    // TODO: This has to be moved to a Vuex store.
    async login() {
      try {
        this.loading = true;
        const response = await axios.post(
          `${process.env.VUE_APP_BACKEND_URL}/login`,
          {
            email: this.email,
            password: this.password,
          }
        );
        this.loading = false;

        const { status, data } = response;

        if (status === 200) {
          this.isLoggedIn = true;
        } else {
          this.error = data.error;
        }
      } catch (error) {
        this.error = "Something went wrong!";
        this.loading = false;
      }
    },
  },
};
</script>
