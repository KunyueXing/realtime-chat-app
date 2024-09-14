import { useContext } from 'react'
import { SettingsContext } from '../contexts/SettingContext'

// ----------------------------------------------------------------------

const useSettings = () => useContext(SettingsContext)

export default useSettings
