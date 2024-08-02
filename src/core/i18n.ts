import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from '@/core/locales/en.json'
import nlTranslations from '@/core/locales/nl.json'

i18n.use(initReactI18next).init({
	resources: {
		en: { translation: enTranslations },
		nl: { translation: nlTranslations },
	},
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false,
	},
})

i18n.on('languageChanged', (lng) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('language', lng)
	}
})

export default i18n
