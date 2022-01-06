<template>
  <v-container fluid class="d-flex flex-column">
    <v-row id="form-row" class="flex-grow-1" justify="center" align="center">
      <v-col cols="10" md="6">
        <h1 class="text-h2 text-md-h1 text-center mb-15">Project Food</h1>
        <h3 class="text-h5 mb-6">{{ $t("signUpPage.title") }}</h3>
        <the-sign-up-form></the-sign-up-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TheSignUpForm from "@/components/SignUp/TheSignUpForm.vue";

export default {
  name: "SignUp",
  components: { TheSignUpForm },
};
</script>

<style scoped>
.container {
  height: 100vh;
}
</style>
