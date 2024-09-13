import { useContext } from 'react'
import { SettingsContext } from '../contexts/Settingscontext'

// ----------------------------------------------------------------------

const useSettings = () => useContext(SettingsContext)

export default useSettings
