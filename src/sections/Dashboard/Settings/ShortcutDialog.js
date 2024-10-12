import { Dialog, Button, DialogTitle, DialogContent, DialogActions, Slide, Grid, Typography, Stack } from '@mui/material'
import React from 'react'
import PropTypes from 'prop-types'
import { settingShortcutsList } from '../../../utils/constants'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const ShortcutDialog = ({ open, handleClose }) => {
  return (
    <>
      <Dialog
        fullWidth
        maxWidth='md'
        TransitionComponent={Transition}
        keepMounted
        aria-describedby='alert-dialog-slide-description'
        sx={{ p: 4 }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id='shortcutDialog-dialog-title'>{'Keyboard Shortcuts'}</DialogTitle>
        <DialogContent sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            {settingShortcutsList.map(({ key, title, combination }) => {
              return (
                <Grid item xs={6} key={`shortcut item grid-${key}`}>
                  <Stack
                    sx={{ width: '100%', justifyContent: 'space-between', alignItems: 'center' }}
                    key={key}
                    spacing={3}
                    direction='row'
                  >
                    <Typography variant='caption' sx={{ fontSize: 14 }}>
                      {title}
                    </Typography>
                    <Stack spacing={2} direction='row'>
                      {combination.map((ele, index) => {
                        return (
                          <Button key={`shortcut item button-${index}`} sx={{ color: '#212121' }} disabled variant='contained'>
                            {ele}
                          </Button>
                        )
                      })}
                    </Stack>
                  </Stack>
                </Grid>
              )
            })}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant={'contained'} onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

ShortcutDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

export { ShortcutDialog }
