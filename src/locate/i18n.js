import { createI18n } from "vue-i18n";
import english from "./english.json";
import malay from "./malay.json";
const lang = localStorage.getItem("languge");
const i18n = createI18n({
  locale: lang || "english",
  allowComposition: true,
  legacy: false,
  messages: {
    english: english,
    malay: malay,
  },
  fallbackLocale: "english",
});

export default i18n;
