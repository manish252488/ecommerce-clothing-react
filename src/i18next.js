import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locale/en/en.json";
import ge from "./locale/ge/ge.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: en,
    },
    ge: {
      translations: ge,
    },
  },
  whitelist: ["en", "ge"],
  fallbackLng: "en",
  // debug only when not in production
  debug: false,
  lng: "en",
  ns: ["translations"],
  defaultNS: "translations",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ",",
  },
});
