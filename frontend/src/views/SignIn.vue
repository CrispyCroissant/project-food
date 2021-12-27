<template>
  <v-container fluid class="d-flex flex-column">
    <v-row id="form-row" class="flex-grow-1" justify="center" align="center">
      <v-col cols="10" md="6">
        <v-alert
          v-if="confirmation"
          class="mb-16"
          type="success"
          ref="confirmAlert"
        >
          A confirmation email has been sent to you.
          <br />
          <br />
          You can login after you've confirmed your account.
        </v-alert>
        <h1 class="text-h2 text-md-h1 text-center mb-15">Project Food</h1>
        <the-login-form></the-login-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TheLoginForm from "@/components/SignIn/TheLoginForm.vue";

export default {
  name: "SignIn",
  components: { TheLoginForm },
  props: {
    confirmation: Boolean,
  },
};
</script>

<style scoped>
.container {
  height: 100vh;
}
</style>
