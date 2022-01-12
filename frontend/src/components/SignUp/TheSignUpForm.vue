<template>
  <v-form ref="form">
    <v-expand-transition>
      <div v-if="error">
        <v-alert type="error" text ref="errorAlert">{{ error }}</v-alert>
      </div>
    </v-expand-transition>
    <v-text-field
      autofocus
      :label="$t('signUpPage.inputLabels.email')"
      prepend-inner-icon="mdi-email"
      v-model="email"
      :rules="emailRules"
      ref="emailInput"
      outlined
    ></v-text-field>
    <v-text-field
      type="password"
      :label="$t('signUpPage.inputLabels.password')"
      prepend-inner-icon="mdi-key"
      v-model="password"
      :rules="passwordRules"
      ref="passwordInput"
      outlined
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
      <v-btn text @click="routeSignIn" ref="signInBtn">
        {{ $t("signUpPage.signIn") }}
      </v-btn>
      <v-btn
        ref="signUpBtn"
        color="primary"
        @click="
          validate();
          signUp();
        "
      >
        {{ $t("signUpPage.signUp") }}
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
      valid: false,
      loading: false,
      error: "",
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || this.$t("signUpPage.inputLabels.required"),
        (v) => isEmail(v) || this.$t("signUpPage.inputLabels.emailValid"),
      ],
      passwordRules: [
        (v) => !!v || this.$t("signUpPage.inputLabels.required"),
        (v) => v.length >= 8 || this.$t("signUpPage.inputLabels.passLength"),
      ],
    };
  },
  methods: {
    validate() {
      this.valid = this.$refs.form.validate();
    },
    async signUp() {
      if (this.valid) {
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

          const { status } = response;

          if (status === 200) {
            await this.routeSignIn({ confirmation: true });
          }
        } catch (error) {
          this.error = error.response.data.error;
          this.loading = false;
        }
      }
    },
    async routeSignIn(params) {
      try {
        await this.$router.push({ name: "SignIn", params });
      } catch (error) {
        return;
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", async (event) => {
      if (event.code === "Enter") {
        this.validate();
        await this.signUp();
      }
    });
  },
};
</script>
