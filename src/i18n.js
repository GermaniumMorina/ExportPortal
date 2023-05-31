import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import TranslationAL from "./locales/al/Translation.json";
import TranslationES from "./locales/es/Translation.json";
import TranslationEN from "./locales/en/Translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: TranslationEN,
    },
    es: {
      translation: TranslationES,
    },
    al: {
      translation: TranslationAL,
    },
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
