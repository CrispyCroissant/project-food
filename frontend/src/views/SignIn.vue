<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="6">
        <v-form>
          <v-text-field solo autofocus label="Email"></v-text-field>
          <v-text-field solo type="password" label="Password"></v-text-field>
          <div class="d-flex justify-center">
            <v-btn>Sign in </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "SignIn",
};
</script>

<style scoped>
.row {
  height: 100vh;
}
</style>
