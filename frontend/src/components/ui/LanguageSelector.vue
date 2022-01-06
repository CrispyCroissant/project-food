<template>
  <v-row justify="center">
    <v-menu offset-y rounded="rounded">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" text icon ref="langBtn">
          <country-flag
            class="ma-0"
            :country="currentFlag"
            rounded
            shadow
            ref="currentFlag"
          ></country-flag>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="flagCode in notCurrentLangs" :key="flagCode">
          <v-list-item-title>
            <v-btn icon text @click="setFlag(flagCode)">
              <country-flag
                class="ma-0"
                :country="flagCode"
                rounded
                shadow
                :id="flagCode"
                ref="flagBtn"
              ></country-flag>
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-row>
</template>

<script>
import CountryFlag from "vue-country-flag";

export default {
  name: "LanguageSelector",
  components: { CountryFlag },
  data() {
    return {
      currentFlag: "gb",
      supportedFlags: ["gb", "swe", "pl"],
    };
  },
  methods: {
    setFlag(flagCode) {
      const locale = navigator.language.split("-")[0];

      if (flagCode) {
        switch (flagCode) {
          case "swe":
            this.$i18n.locale = "sv";
            break;
          case "gb":
            this.$i18n.locale = "en";
            break;
          default:
            this.$i18n.locale = flagCode;
            break;
        }
        this.currentFlag = flagCode;
      } else {
        switch (locale) {
          case "sv":
            this.currentFlag = "swe";
            break;
          case "en":
            this.currentFlag = "gb";
            break;
          default:
            this.currentFlag = locale;
            break;
        }
        if (this.supportedFlags.includes(this.currentFlag)) {
          this.$i18n.locale = locale;
        }
      }
    },
  },
  computed: {
    notCurrentLangs() {
      return this.supportedFlags.filter((lang) => lang != this.currentFlag);
    },
  },
  created() {
    this.setFlag();
  },
};
</script>
