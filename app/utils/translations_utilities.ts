import RNLocalize from 'react-native-localize';
import {I18n} from 'i18n-js';
import {defaultLocale, translationGetters} from '../constants/translations';

const locales = RNLocalize.getLocales();
const i18n = new I18n({
  en: translationGetters.en(),
  vi: translationGetters.vi(),
});

i18n.defaultLocale = defaultLocale;
i18n.locale = locales[0].languageCode;

export default i18n;
