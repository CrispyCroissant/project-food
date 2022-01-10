<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-col cols="10" md="6">
        <v-alert
          v-if="confirmation"
          class="mb-16"
          type="success"
          ref="confirmAlert"
        >
          {{ $t("loginPage.confirmMessage") }}
          <br />
          <br />
          {{ $t("loginPage.confirmInfo") }}
        </v-alert>
        <h1 class="text-h2 text-md-h1 text-center mb-15">Project Food</h1>
        <the-login-form></the-login-form>
      </v-col>
    </v-row>
    <v-row justify="center">
      <language-selector class="mt-5"></language-selector>
    </v-row>
  </v-container>
</template>

<script>
import TheLoginForm from "@/components/SignIn/TheLoginForm.vue";
import LanguageSelector from "../components/ui/LanguageSelector.vue";

export default {
  name: "SignIn",
  components: { TheLoginForm, LanguageSelector },
  props: {
    confirmation: Boolean,
  },
};
</script>
