import palette from "../theme/palette";

/*
  Can be dynamically applied in the UI of this app, enabling users / app to switch between different
  theme color options.
  These presets will be used in SettingsContext.js.
*/

export const colorPresets = [
    // DEFAULT
    {
      name: "default",
      ...palette.light.primary,
    },
    // PURPLE
    {
      name: "purple",
      light: "#B985F4",
      main: "#7635dc",
      dark: "#431A9E",
      contrastText: "#fff",
    },
    // CYAN
    {
      name: "cyan",
      light: "#76F2FF",
      main: "#1CCAFF",
      dark: "#0E77B7",
      contrastText: palette.light.grey[800],
    },
    // BLUE
    {
      name: "blue",
      light: "#76B0F1",
      main: "#2065D1",
      dark: "#103996",  
      contrastText: "#fff",
    },
    // ORANGE
    {
      name: "orange",
      light: "#FED680",
      main: "#fda92d",
      dark: "#B66816",
      contrastText: palette.light.grey[800],
    },
    // RED
    {
      name: "red",
      light: "#FFC1AC",
      main: "#FF3030",
      dark: "#B71833",
      contrastText: "#fff",
    },
];

export const defaultPreset = colorPresets[0];
export const purplePreset = colorPresets[1];
export const cyanPreset = colorPresets[2];
export const bluePreset = colorPresets[3];
export const orangePreset = colorPresets[4];
export const redPreset = colorPresets[5];

export default function getColorPresets(presetsKey) {
    return {
        purple: purplePreset,
        cyan: cyanPreset,
        blue: bluePreset,
        orange: orangePreset,
        red: redPreset,
        default: defaultPreset,
    }[presetsKey];  
}