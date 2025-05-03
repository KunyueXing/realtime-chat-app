import { Dialog, DialogContent, Slide, Tab, Tabs, Stack } from '@mui/material'
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const Friends = ({ open, handleClose }) => {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      keepMounted
      aria-describedby='alert-dialog-slide-description'
      sx={{ p: 4 }}
    >
      <Stack p={2} sx={{ width: '100%' }} spacing={2}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label='Explore' />
          <Tab label='Friends' />
          <Tab label='Requests' />
        </Tabs>
      </Stack>
      <DialogContent>
        {/* Dialog Content */}
        <Stack sx={{ height: '100%' }} spacing={2}>
          <Stack spacing={2.4}>
            {(() => {
              switch (value) {
                case 0:
                  return <div>Explore Content</div>
                case 1:
                  return <div>Friends Content</div>
                case 2:
                  return <div>Requests Content</div>
                default:
                  break
              }
            })()}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

Friends.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default Friends
