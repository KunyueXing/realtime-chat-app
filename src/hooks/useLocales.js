import { useTranslation } from 'react-i18next'
import { langOptions, defaultLang } from '../config'

function useLocales() {
  const { i18n, t: translate } = useTranslation()

  const handleChangeLanguage = (newLang) => {
    i18n.changeLanguage(newLang)
  }

  return {
    onChangeLang: handleChangeLanguage,
    translate: (text, options) => translate(text, options),
    langOptions
  }
}

export default useLocales
