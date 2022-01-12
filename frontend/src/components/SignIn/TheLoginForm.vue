<template>
  <v-form ref="form">
    <v-expand-transition>
      <div v-if="error">
        <v-alert type="error" text>{{ error }}</v-alert>
      </div>
    </v-expand-transition>
    <v-text-field
      autofocus
      :label="$t('loginPage.inputLabels.email')"
      prepend-icon="mdi-email"
      v-model="email"
      :rules="rules.required"
      ref="emailInput"
    ></v-text-field>
    <v-text-field
      type="password"
      :label="$t('loginPage.inputLabels.password')"
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
      <v-btn text ref="signUpBtn" @click="routeSignUp">
        {{ $t("loginPage.register") }}
      </v-btn>
      <v-btn
        ref="loginBtn"
        color="primary"
        @click="
          validate();
          login();
        "
      >
        {{ $t("loginPage.signIn") }}
      </v-btn>
    </div>
  </v-form>
</template>

<script>
export default {
  name: "TheLoginForm",
  data() {
    return {
      loading: false,
      error: "",
      email: "",
      password: "",
      rules: {
        required: [(v) => !!v || this.$t("loginPage.inputLabels.required")],
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
  mounted() {
    window.addEventListener("keydown", async (event) => {
      if (event.code === "Enter") {
        this.validate();
        await this.login();
      }
    });
  },
};
</script>
