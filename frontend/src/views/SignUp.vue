<template>
  <v-container fluid fill-height>
    <v-row justify="center">
      <v-col cols="10" md="6">
        <h1 class="text-h2 text-md-h1 text-center mb-15">Project Food</h1>
        <h3 class="text-h5 mb-6">{{ $t("signUpPage.title") }}</h3>
        <the-sign-up-form></the-sign-up-form>
      </v-col>
    </v-row>
    <v-row justify="center">
      <language-selector class="mt-5"></language-selector>
    </v-row>
  </v-container>
</template>

<script>
import TheSignUpForm from "@/components/SignUp/TheSignUpForm.vue";
import LanguageSelector from "@/components/ui/LanguageSelector.vue";

export default {
  name: "SignUp",
  components: { TheSignUpForm, LanguageSelector },
};
</script>
