import React from 'react'
import { Box, Divider, IconButton, Stack, Typography, Menu, MenuItem } from '@mui/material'
import { useTheme, alpha } from '@mui/material/styles'
import PropTypes from 'prop-types'
import { Image, DownloadSimple, DotsThreeVertical } from 'phosphor-react'
import { Link } from 'react-router-dom'
import { Message_options } from '../../data'
import { useState } from 'react'

const elePropType = PropTypes.shape({
  text: PropTypes.string, // For Timeline
  incoming: PropTypes.bool, // For both MediaMsg and TextMsg
  img: PropTypes.string, // For MediaMsg
  message: PropTypes.string, // For both MediaMsg and TextMsg
  reply: PropTypes.string,
  preview: PropTypes.string
}).isRequired

const MessageOption = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <DotsThreeVertical
        size={20}
        id='basic-button'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      />
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        <Stack spacing={1} px={1}>
          {Message_options.map((ele, index) => (
            <MenuItem onClick={handleClose} key={`message_options-${index}`}>
              {ele.title}
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  )
}

const Timeline = ({ ele }) => {
  const theme = useTheme()
  return (
    <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
      <Divider width='46%' />
      <Typography variant='caption' sx={{ color: theme.palette.text }}>
        {ele.text}
      </Typography>
      <Divider width='46%' />
    </Stack>
  )
}

// Apply the shared 'elePropType' to each component's propTypes
Timeline.propTypes = {
  ele: elePropType
}

const MediaMsg = ({ ele, menu }) => {
  const theme = useTheme()

  return (
    <Stack direction='row' sx={{ justifyContent: ele.incoming ? 'start' : 'end' }}>
      <Box
        px={1.5}
        py={1.5}
        sx={{
          bgcolor: ele.incoming ? alpha(theme.palette.background.default, 1) : theme.palette.primary.main,
          borderRadius: 1.5,
          width: 'max-content'
        }}
      >
        <Stack spacing={1}>
          <img src={ele.img} alt={ele.message} style={{ maxHeight: 150, borderRadius: '10px' }} />
          <Typography variant='body2' color={ele.incoming ? theme.palette.text : '#fff'}>
            {ele.message}
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageOption />}
    </Stack>
  )
}

MediaMsg.propTypes = {
  ele: elePropType,
  menu: PropTypes.bool
}

const TextMsg = ({ ele, menu }) => {
  const theme = useTheme()

  return (
    <Stack direction='row' sx={{ justifyContent: ele.incoming ? 'start' : 'end' }}>
      <Box
        px={1.5}
        py={1.5}
        sx={{
          bgcolor: ele.incoming ? alpha(theme.palette.background.default, 1) : theme.palette.primary.main,
          borderRadius: 1.5,
          width: 'max-content'
        }}
      >
        <Typography variant='body2' color={ele.incoming ? theme.palette.text : '#fff'}>
          {ele.message}
        </Typography>
      </Box>
      {menu && <MessageOption />}
    </Stack>
  )
}

TextMsg.propTypes = {
  ele: elePropType,
  menu: PropTypes.bool
}

const DocMsg = ({ ele, menu }) => {
  const theme = useTheme()

  return (
    <Stack direction='row' sx={{ justifyContent: ele.incoming ? 'start' : 'end' }}>
      <Box
        px={1.5}
        py={1.5}
        sx={{
          bgcolor: ele.incoming ? alpha(theme.palette.background.default, 1) : theme.palette.primary.main,
          borderRadius: 1.5,
          width: 'max-content'
        }}
      >
        <Stack spacing={2}>
          <Stack p={2} direction='row' spacing={3} sx={{ alignItems: 'center', bgcolor: theme.palette.background.paper, borderRadius: 1 }}>
            <Image size={48} />
            <Typography variant='caption'>Abstract.png</Typography>
            <IconButton>
              <DownloadSimple />
            </IconButton>
          </Stack>
          <Typography variant='body2' color={ele.incoming ? theme.palette.text : '#fff'}>
            {ele.message}
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageOption />}
    </Stack>
  )
}

DocMsg.propTypes = {
  ele: elePropType,
  menu: PropTypes.bool
}

const LinkMsg = ({ ele, menu }) => {
  const theme = useTheme()
  // console.log(ele.preview)

  return (
    <Stack direction='row' sx={{ justifyContent: ele.incoming ? 'start' : 'end' }}>
      <Box
        px={1.5}
        py={1.5}
        sx={{
          bgcolor: ele.incoming ? alpha(theme.palette.background.default, 1) : theme.palette.primary.main,
          borderRadius: 1.5,
          width: 'max-content'
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction='column'
            spacing={3}
            sx={{ alignItems: 'start', bgcolor: theme.palette.background.paper, borderRadius: 1 }}
          >
            <img src={ele.preview} alt={ele.message} style={{ maxHeight: 150, borderRadius: '10px' }} />
            <Stack direction='column' spacing={2}>
              {/* Hard coded links as place holder */}
              <Typography variant='subtitle2'>Creating Chat App</Typography>
              <Typography variant='subtitle2' component={Link} sx={{ color: theme.palette.primary.main }} to='//https://www.youtube.com'>
                www.youtube.com
              </Typography>
            </Stack>
            <Typography variant='body2' color={ele.incoming ? theme.palette.text : '#fff'}>
              {ele.message}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      {menu && <MessageOption />}
    </Stack>
  )
}

LinkMsg.propTypes = {
  ele: elePropType,
  menu: PropTypes.bool
}

const ReplyMsg = ({ ele, menu }) => {
  const theme = useTheme()

  return (
    <Stack direction='row' sx={{ justifyContent: ele.incoming ? 'start' : 'end' }}>
      <Box
        px={1.5}
        py={1.5}
        sx={{
          bgcolor: ele.incoming ? alpha(theme.palette.background.default, 1) : theme.palette.primary.main,
          borderRadius: 1.5,
          width: 'max-content'
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction='column'
            spacing={3}
            sx={{ alignItems: 'center', bgcolor: alpha(theme.palette.background.paper, 1), borderRadius: 1 }}
          >
            <Typography variant='body2' color={theme.palette.text}>
              {ele.message}
            </Typography>
          </Stack>
          <Typography variant='body2' color={ele.incoming ? theme.palette.text : '#fff'}>
            {ele.reply}
          </Typography>
        </Stack>
      </Box>
      {menu && <MessageOption />}
    </Stack>
  )
}

ReplyMsg.propTypes = {
  ele: elePropType,
  menu: PropTypes.bool
}

export { Timeline, MediaMsg, TextMsg, DocMsg, LinkMsg, ReplyMsg }
