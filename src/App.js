// routes
import Router from './routes'
import React from 'react'
// theme
import ThemeProvider from './theme'
// components

function App() {
  return (
    <ThemeProvider>
      {' '}
      <Router />{' '}
    </ThemeProvider>
  )
}

export default App
