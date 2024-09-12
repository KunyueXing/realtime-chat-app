import { createContext, useEffect } from "react";
import { defaultSettings } from "../config";
import useLocalStorage from "../hooks/useLocalStorage";
import getColorPresets from "../utils/getColorPresets";
import getColorPresets, { defaultPreset, colorPresets } from "../utils/getColorPresets";

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
    onResetSetting: () => {},
};
  
/* 
  Creates the context with the initial state. The context acts like a global store that any component 
  can access to retrieve or update the settings.
*/
const SettingsContext = createContext(initialState);