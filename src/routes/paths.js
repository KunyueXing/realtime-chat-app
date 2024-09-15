function path(root, sublink) {
  return `${root}${sublink}`
}

const ROOTS_DASHBOARD = '/'

/*
  Instead of hardcoding strings throughout the application, import PATH_DASHBOARD and use it to reference paths consistently.
  PATH_DASHBOARD.general.app refer to the '/app' route.
  To improve the maintainability, especially when paths need to be changed in the future.
*/
export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, 'app')
  }
}
