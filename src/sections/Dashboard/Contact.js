import {
  Avatar,
  Box,
  Button,
  Dialog,
  Divider,
  IconButton,
  Stack,
  Switch,
  Typography,
  Slide,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import React, { useState } from 'react'
import { Bell, CaretRight, Phone, Prohibit, Star, Trash, VideoCamera, XCircle } from 'phosphor-react'
import { useTheme } from '@mui/material/styles'
import { useDispatch } from 'react-redux'
import { ToggleSidebar, UpdateSidebarType } from '../../redux/slices/app'
import { faker } from '@faker-js/faker'
import { sidebarPageMappings } from '../../utils/constants'
import PropTypes from 'prop-types'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const BlockDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>{'Block this contact'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>Do you want to BLOCK this contact?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Agree</Button>
      </DialogActions>
    </Dialog>
  )
}

const DeleteChatDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>{'Delete this chat'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>Do you want to DELETE this chat?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Agree</Button>
      </DialogActions>
    </Dialog>
  )
}

BlockDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

DeleteChatDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

const Contact = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [openBlock, setOpenBlock] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const handleCloseBlock = () => {
    setOpenBlock(false)
  }
  const handleCloseDelete = () => {
    setOpenDelete(false)
  }

  return (
    <Box sx={{ width: 320, maxHeight: '100vh' }}>
      <Stack sx={{ height: '100%', width: 326 }}>
        {/* Header */}
        <Box
          sx={{
            bgcolor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background,
            boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
            width: '100%'
          }}
        >
          <Stack
            sx={{ height: '100%', width: '100%', p: 2 }}
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            spacing={3}
          >
            <Typography variant='subtitle2'>Contact Info</Typography>
            <IconButton
              onClick={() => {
                dispatch(ToggleSidebar())
              }}
            >
              <XCircle />
            </IconButton>
          </Stack>
        </Box>
        {/* Body */}
        <Stack sx={{ height: '100%', position: 'relative', flexGrow: 1, overflow: 'scroll' }} p={3} spacing={3}>
          <Stack sx={{ alignItems: 'center' }} direction='row' spacing={2}>
            <Avatar sx={{ height: 64, width: 64 }} src={faker.image.avatar()} alt={faker.person.firstName()} />
            <Stack spacing={0.5}>
              <Typography variant='article' fontWeight={600}>
                {faker.person.fullName()}
              </Typography>
              <Typography variant='article' fontWeight={500}>
                {faker.phone.number({ style: 'national' })}
              </Typography>
            </Stack>
          </Stack>
          <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
            <Stack sx={{ alignItems: 'center' }} spacing={1}>
              <IconButton>
                <Phone />
              </IconButton>
              <Typography variant='overline'>Voice</Typography>
            </Stack>
            <Stack sx={{ alignItems: 'center' }} spacing={1}>
              <IconButton>
                <VideoCamera />
              </IconButton>
              <Typography variant='overline'>Video</Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack spacing={0.5}>
            <Typography variant='article' fontWeight={600}>
              About
            </Typography>
            <Typography variant='body2' fontWeight={500}>
              {faker.person.bio()}
            </Typography>
          </Stack>
          <Divider />
          <Stack direction={'row'} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='subtitle2'>Media, Links and Docs</Typography>
            <Button
              onClick={() => {
                dispatch(UpdateSidebarType(sidebarPageMappings[1]))
              }}
              endIcon={<CaretRight />}
            >
              401
            </Button>
          </Stack>
          <Stack direction={'row'} sx={{ alignItems: 'center' }} spacing={2}>
            {[1, 2, 3].map((ele, index) => (
              <Box key={`contactMedia-${index}`} width={'90px'} height={'90px'}>
                <img
                  src={faker.image.url('cat')}
                  alt={faker.person.fullName()}
                  style={{
                    width: '100%', // means the image will take full width of the Box.
                    height: '100%',
                    objectFit: 'cover', // ensures the image fits within the box without distortion
                    borderRadius: '1'
                  }}
                />
              </Box>
            ))}
          </Stack>
          <Divider />
          <Stack direction={'row'} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Stack direction={'row'} sx={{ alignItems: 'center' }} spacing={2}>
              <Star size={21} />
              <Typography variant='subtitle2'>Starred Messages</Typography>
            </Stack>
            <IconButton
              onClick={() => {
                dispatch(UpdateSidebarType(sidebarPageMappings[2]))
              }}
            >
              <CaretRight />
            </IconButton>
          </Stack>
          <Divider />
          <Stack direction={'row'} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Stack direction={'row'} sx={{ alignItems: 'center' }} spacing={2}>
              <Bell size={21} />
              <Typography variant='subtitle2'>Mute Notifications</Typography>
            </Stack>
            <Switch />
          </Stack>
          <Divider />
          <Typography variant='body2'>Groups in common</Typography>
          <Stack direction={'row'} sx={{ alignItems: 'center' }} spacing={2}>
            <Avatar src={faker.image.avatar()} alt={faker.person.fullName()} />
            <Stack direction={'column'} spacing={0.5}>
              <Typography variant='subtitle2'>Group name 1</Typography>
              <Typography variant='caption'>
                {faker.person.fullName() + ', '} {faker.person.fullName()}
              </Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack direction={'row'} sx={{ alignItems: 'center' }} spacing={2}>
            <Button
              fullWidth
              startIcon={<Prohibit />}
              variant='outlined'
              onClick={() => {
                setOpenBlock(true)
              }}
            >
              Block
            </Button>
            <Button
              fullWidth
              startIcon={<Trash />}
              variant='outlined'
              onClick={() => {
                setOpenDelete(true)
              }}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {openBlock && <BlockDialog open={openBlock} handleClose={handleCloseBlock} />}
      {openDelete && <DeleteChatDialog open={openDelete} handleClose={handleCloseDelete} />}
    </Box>
  )
}

export { Contact }
