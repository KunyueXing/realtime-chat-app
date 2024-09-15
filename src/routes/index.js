import { Suspense, lazy } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
// Layouts
import DashboardLayout from '../layouts/dashboard'
// config
import LoadingScreen from '../components/LoadingScreen'
import { DEFAULT_PATH } from '../config'
import React from 'react'

/*
  Suspense: This component allows for showing a fallback (loading screen) while a lazy-loaded component is being loaded.
  lazy: Used to dynamically import components, which enables code-splitting. This helps improve performance by loading 
  parts of the application only when they are needed (on demand).
*/
const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )
}

export default function Router() {
  return useRoutes([
    /*
      The main route has the path '/', and its element is <DashboardLayout /> -- any child routes in side this path will
      render inside the Dashboardlayout.
    */
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: 'app', element: <GeneralApp /> },

        { path: '404', element: <Page404 /> },
        // When users visit a non-existing path, it will be redirected to '/404'path
        { path: '*', element: <Navigate to='/404' replace /> }
      ]
    },
    { path: '*', element: <Navigate to='/404' replace /> }
  ])
}

/*
  lazy(() => import(...)): Dynamically imports the GeneralApp / Page404 components from their respective files. This 
  splits these components into separate chunks -- they will only be loaded when needed (on route change).
*/
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')))

const Page404 = Loadable(lazy(() => import('../pages/Page404')))
