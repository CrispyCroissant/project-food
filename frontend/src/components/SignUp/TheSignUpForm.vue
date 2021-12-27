<template>
  <v-form ref="form" @keydown.enter="validate">
    <v-expand-transition>
      <div v-if="error">
        <v-alert type="error" text ref="errorAlert">{{ error }}</v-alert>
      </div>
    </v-expand-transition>
    <v-text-field
      autofocus
      label="Email"
      prepend-icon="mdi-email"
      v-model="email"
      :rules="emailRules"
      ref="emailInput"
    ></v-text-field>
    <v-text-field
      type="password"
      label="Password"
      prepend-icon="mdi-key"
      v-model="password"
      :rules="passwordRules"
      ref="passwordInput"
    ></v-text-field>
    <v-expand-transition>
      <div class="d-flex justify-center my-5" v-if="loading">
        <v-progress-circular
          color="primary"
          indeterminate
          ref="loadingElement"
        ></v-progress-circular>
      </div>
    </v-expand-transition>
    <div class="d-flex justify-space-around my-6">
      <v-btn text>Sign in</v-btn>
      <v-btn
        ref="signUpBtn"
        color="primary"
        @click="
          validate();
          signUp();
        "
      >
        Sign Up
      </v-btn>
    </div>
  </v-form>
</template>

<script>
import axios from "axios";
import isEmail from "validator/lib/isEmail";

export default {
  name: "TheSignUpForm",
  data() {
    return {
      loading: false,
      error: "",
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "Email required",
        (v) => isEmail(v) || "Email must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password required",
        (v) => v.length >= 8 || "Your password must be at least 8 characters",
      ],
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    async signUp() {
      try {
        this.error = "";
        this.loading = true;
        const response = await axios.post(
          `${process.env.VUE_APP_BACKEND_URL}/register`,
          {
            email: this.email,
            password: this.password,
          }
        );
        this.loading = false;

        const { status, data } = response;

        if (status !== 200) {
          throw new Error(data.error);
        } else {
          await this.$router.push({ name: "SignIn" });
        }
      } catch (error) {
        this.error = error.message;
        this.loading = false;
      }
    },
  },
};
</script>
