import { useTranslation } from 'react-i18next'
import useSettings from './useSettings'
import { langOptions, defaultLang } from '../config'

function useLocales() {
  // i18n: The main object from i18next that handles language switching.
  // t: A translation function used to translate text according to the current language.
  const { i18n, t: translate } = useTranslation()

  const { onChangeDirectionByLang } = useSettings()

  // Retrieves the current language from localStorage under the key 'i18nextLng'. This ensures the app
  // remembers the user’s selected language even after they close or refresh the page.
  const langStorage = localStorage.getItem('i18nextLng')

  /*
    Determines the currently active language. It searches the langOptions array to find the language that 
    matches the value stored in langStorage. If no match is found, it defaults to defaultLang.
  */
  const currentLang =
    langOptions.find((language) => {
      return language.value === langStorage
    }) || defaultLang

  // Switches the app’s languag and adjust the app's text direction based on the selected language.
  const handleChangeLanguage = (newLang) => {
    i18n.changeLanguage(newLang)
    onChangeDirectionByLang(newLang)
  }

  return {
    onChangeLang: handleChangeLanguage,
    translate: (text, options) => translate(text, options),
    langOptions,
    currentLang
  }
}

export default useLocales
