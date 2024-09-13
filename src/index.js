import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import SettingsProvider from './contexts/Settingscontext'


const root = ReactDOM.createRoot(document.getElementById('root'))

/*
  BrowserRouter - Provides client-side routing for the app, enabling navigation without full page reloads. 
  It wraps the application to enable routing features such as defining routes, navigating between pages, etc.

  HelmetProvider - Manage changes to the <head> of the document (e.g., title, meta tags) asynchronously. 
  It helps with SEO and dynamic updates of the document’s head in a React app.
*/
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <SettingsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SettingsProvider>
    </HelmetProvider>
  </React.StrictMode>
)
