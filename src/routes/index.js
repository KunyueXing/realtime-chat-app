import { Suspense, lazy } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
// Layouts
import DashboardLayout from '../layouts/dashboard'
import AuthLayout from '../layouts/auth'
// config
import LoadingScreen from '../components/LoadingScreen'
import { DEFAULT_PATH } from '../config'
import React from 'react'

/*
  Suspense: This component allows for showing a fallback (loading screen) while a lazy-loaded component is being loaded.
  lazy: Used to dynamically import components, which enables code-splitting. This helps improve performance by loading 
  parts of the application only when they are needed (on demand).
*/
const Loadable = (Component) => {
  const LoadableComponent = (props) => (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )

  // Set displayName for the dynamically created component
  LoadableComponent.displayName = `Loadable(${Component.displayName || Component.name || 'Component'})`

  return LoadableComponent
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
        { path: 'settings', element: <Settings /> },

        { path: '404', element: <Page404 /> },
        // When users visit a non-existing path, it will be redirected to '/404'path
        { path: '*', element: <Navigate to='/404' replace /> }
      ]
    },
    { path: '*', element: <Navigate to='/404' replace /> },
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        { path: 'reset-password', element: <ResetPasswordPage /> },
        { path: 'new-password', element: <NewPasswordPage /> }
      ]
    }
  ])
}

/*
  lazy(() => import(...)): Dynamically imports the GeneralApp / Page404 components from their respective files. This 
  splits these components into separate chunks -- they will only be loaded when needed (on route change).
*/
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')))

const Page404 = Loadable(lazy(() => import('../pages/Page404')))

const Settings = Loadable(lazy(() => import('../pages/dashboard/Settings')))

const LoginPage = Loadable(lazy(() => import('../pages/auth/Login')))

const RegisterPage = Loadable(lazy(() => import('../pages/auth/Register')))

const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPassword')))

const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPassword')))
