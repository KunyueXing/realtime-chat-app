import { createContext, useEffect } from 'react'
import { defaultSettings } from '../config'
import useLocalStorage from '../hooks/useLocalStorage'
import getColorPresets, { defaultPreset, colorPresets } from '../utils/getColorPresets'

const initialState = {
  ...defaultSettings,

  // Mode
  onToggleMode: () => {},
  onChangeMode: () => {},

  // Direction
  onToggleDirection: () => {},
  onChangeDirection: () => {},
  onChangeDirectionByLang: () => {},

  // Layout
  onToggleLayout: () => {},
  onChangeLayout: () => {},

  // Contrast
  onToggleContrast: () => {},
  onChangeContrast: () => {},

  // Color
  onChangeColor: () => {},
  setColor: defaultPreset,
  colorOption: [],

  // Stretch
  onToggleStretch: () => {},

  // Reset
  onResetSetting: () => {}
}

/* 
  Creates the context with the initial state. The context acts like a global store that any component 
  can access to retrieve or update the settings.
*/
const SettingsContext = createContext(initialState)

// Save the settings in the browser’s local storage. This ensures that user preferences persist even if
// they close the browser.
const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useLocalStorage('settings', {
    themeMode: initialState.themeMode,
    themeLayout: initialState.themeLayout,
    themeStretch: initialState.themeContrast,
    themeDirection: initialState.themeDirection,
    themeContrast: initialState.themeContrast,
    themeColorPresets: initialState.themeColorPresets
  })

  const isArabic = localStorage.getItem('i18nextLng') === 'ar'

  useEffect(() => {
    if (isArabic) {
      onChangeDirectionByLang('ar')
    }
  }, [isArabic])

  // Mode
  // Toggles between light and dark modes.
  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === 'light' ? 'dark' : 'light'
    })
  }

  // Changes the theme mode based on the user’s selection from a UI component.
  const onChangeMode = (event) => {
    setSettings({
      ...settings,
      themeMode: event.target.value
    })
  }

  // Direction
  // Toggles the text direction between left-to-right (LTR) and right-to-left (RTL).
  const onToggleDirection = () => {
    setSettings({
      ...settings,
      themeDirection: settings.themeDirection === 'rtl' ? 'ltr' : 'rtl'
    })
  }

  const onChangeDirection = (event) => {
    setSettings({
      ...settings,
      themeDirection: event.target.value
    })
  }

  // Automatically switches the text direction based on the selected language (e.g., RTL for Arabic).
  const onChangeDirectionByLang = (lang) => {
    setSettings({
      ...settings,
      themeDirection: lang === 'ar' ? 'rtl' : 'ltr'
    })
  }

  // Layout
  const onToggleLayout = () => {
    setSettings({
      ...settings,
      themeLayout: settings.themeLayout === 'vertical' ? 'horizontal' : 'vertical'
    })
  }

  const onChangeLayout = (event) => {
    setSettings({
      ...settings,
      themeLayout: event.target.value
    })
  }

  // Contrast

  const onToggleContrast = () => {
    setSettings({
      ...settings,
      themeContrast: settings.themeContrast === 'default' ? 'bold' : 'default'
    })
  }

  const onChangeContrast = (event) => {
    setSettings({
      ...settings,
      themeContrast: event.target.value
    })
  }

  //Color

  const onChangeColor = (event) => {
    setSettings({
      ...settings,
      themeColorPresets: event.target.value
    })
  }

  // Stretch

  const onToggleStretch = () => {
    setSettings({
      ...settings,
      themeStretch: !settings.themeStretch
    })
  }

  // Reset

  const onResetSetting = () => {
    setSettings({
      themeMode: initialState.themeMode,
      themeLayout: initialState.themeLayout,
      themeStretch: initialState.themeStretch,
      themeContrast: initialState.themeContrast,
      themeDirection: initialState.themeDirection,
      themeColorPresets: initialState.themeColorPresets
    })
  }

  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        // Mode
        onToggleMode,
        onChangeMode,

        // Direction
        onToggleDirection,
        onChangeDirection,
        onChangeDirectionByLang,

        // Layout
        onToggleLayout,
        onChangeLayout,

        // Contrast
        onChangeContrast,
        onToggleContrast,

        // Stretch
        onToggleStretch,

        // Color
        onChangeColor,
        setColor: getColorPresets(settings.themeColorPresets),
        colorOption: colorPresets.map((color) => ({
          name: color.name,
          value: color.main
        })),

        // Reset
        onResetSetting
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsContext }

export default SettingsProvider
