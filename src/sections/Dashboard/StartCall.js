import { Dialog, DialogContent, DialogTitle, Stack, Slide } from '@mui/material'
import React from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import { MagnifyingGlass } from 'phosphor-react'
import PropTypes from 'prop-types'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

StartCall.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func
}

export default function StartCall({ open, handleClose }) {
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
      <DialogTitle>{'Start New Call'}</DialogTitle>
      <Stack p={1} sx={{ width: '100%' }}>
        <Search>
          <SearchIconWrapper>
            <MagnifyingGlass color='#709CE6' />
          </SearchIconWrapper>
          <StyledInputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
        </Search>
      </Stack>
      <DialogContent>
        <Stack sx={{ height: '100%' }}>
          <Stack spacing={2.4}></Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}
