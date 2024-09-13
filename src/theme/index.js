// @MUI
import { createTheme, ThemeProvider as MUIThemeProvider, StyledEngineProvider } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

import PropTypes from 'prop-types'
import { useMemo } from 'react'
// hooks
import useSettings from '../hooks/useSettings'
// customized palette, typography, ...
import palette from './palette'
import typography from './typography'
import breakpoints from './breakpoints'
import shadows, { customShadows } from './shadows'

/*
  The expected types of the props passed to the ThemeProvider component must be a valid React node. 
  PropTypes.node is a data type in the prop-types library that can be anything renderable by React: 
  strings, numbers, elements, fragments, or an array of these.
*/
ThemeProvider.PropTypes = {
  children: PropTypes.node
}

export default function ThemeProvider({ children }) {
  const { themeMode, themeDirection } = useSettings()

  const isLight = themeMode === 'light'

  const themeOptions = useMemo(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark
    }),
    [isLight, themeDirection]
  )

  const theme = createTheme(themeOptions)

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  )
}
