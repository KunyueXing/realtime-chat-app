// routes
import Router from './routes'
import React from 'react'
// theme
import ThemeProvider from './theme'
import { Snackbar } from '@mui/material'
import MuiAlert from '@mui/material/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { CloseSnackBar } from './redux/slices/app'
// components

const vertical = 'bottom'
const horizontal = 'center'
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

function App() {
  const dispatch = useDispatch()
  const { open, message, severity } = useSelector((state) => state.app.snackbar)

  return (
    <>
      <ThemeProvider>
        {' '}
        <Router />{' '}
      </ThemeProvider>

      {message && open ? (
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          autoHideDuration={4000}
          key={vertical + horizontal}
          onClose={() => {
            console.log('This is clicked')
            dispatch(CloseSnackBar())
          }}
        >
          <Alert
            onClose={() => {
              console.log('This is clicked')
              dispatch(CloseSnackBar())
            }}
            severity={severity}
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
      ) : (
        <></>
      )}
    </>
  )
}

export default App
