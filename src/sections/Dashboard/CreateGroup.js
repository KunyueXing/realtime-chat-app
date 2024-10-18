import React from 'react'
import { Dialog, DialogContent, DialogTitle, Slide } from '@mui/material'
import CreateGroupForm from './CreateGroupForm'
import PropTypes from 'prop-types'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

CreateGroup.propTypes = {
  open: PropTypes.boolean,
  handleClose: PropTypes.func
}

const CreateGroup = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth='xs'
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby='alert-dialog-slide-description'
      sx={{ p: 4 }}
    >
      <DialogTitle>{'Create New Group'}</DialogTitle>
      <DialogContent sx={{ mt: 4 }}>
        {/* Create Group Form */}
        <CreateGroupForm handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  )
}

export default CreateGroup
