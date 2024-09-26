import React from 'react'
import { Box, Stack, TextField, Tooltip, Fab, InputAdornment, IconButton } from '@mui/material'
import { Chat_Footer } from '../../data'
import { useTheme, styled } from '@mui/material/styles'
import { LinkSimple, Smiley, PaperPlaneTilt } from 'phosphor-react'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { useState } from 'react'
import PropTypes from 'prop-types'

const StyledInput = styled(TextField)({
  '& .MuiInputBase-input': {
    paddingTop: '12px !important',
    paddingBottom: '12px !important'
  }
})

const ChatInput = ({ openPicker, setOpenPicker }) => {
  const [openActions, setOpenActions] = useState(false)

  return (
    <StyledInput
      fullWidth
      placeholder='Write a message...'
      variant='filled'
      InputProps={{
        disableUnderline: true,
        startAdornment: (
          <Stack sx={{ width: 'auto' }}>
            <Stack sx={{ position: 'relative', display: openActions ? 'inline-block' : 'none' }}>
              {Chat_Footer.map((ele) => (
                <Tooltip placement='right' title={ele.title} key={`footer-${ele.index}`}>
                  <Fab
                    sx={{
                      position: 'absolute',
                      top: -ele.y,
                      bgcolor: ele.color
                    }}
                    aria-label='add'
                    onClick={() => {
                      setOpenActions(!openActions)
                    }}
                  >
                    {ele.icon}
                  </Fab>
                </Tooltip>
              ))}
            </Stack>
            <InputAdornment position='end'>
              <IconButton
                onClick={() => {
                  setOpenActions(!openActions)
                }}
              >
                <LinkSimple />
              </IconButton>
            </InputAdornment>
          </Stack>
        ),
        endAdornment: (
          <Stack sx={{ position: 'relative' }}>
            <InputAdornment position='end'>
              <IconButton
                onClick={() => {
                  setOpenPicker(!openPicker)
                }}
              >
                <Smiley />
              </IconButton>
            </InputAdornment>
          </Stack>
        )
      }}
    />
  )
}

ChatInput.propTypes = {
  openPicker: PropTypes.bool.isRequired,
  setOpenPicker: PropTypes.func.isRequired
}

const Footer = () => {
  const theme = useTheme()

  const [openPicker, setOpenPicker] = useState(false)

  return (
    <Box sx={{ position: 'relative', bgcolor: 'transparent !important' }}>
      <Box
        p={2}
        sx={{
          width: '100%',
          height: 100,
          bgcolor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)'
        }}
      >
        <Stack direction='row' sx={{ alignItems: 'center' }} spacing={3}>
          <Stack sx={{ width: '100%' }}>
            <Box
              style={{
                display: openPicker ? 'inline' : 'none',
                zIndex: 10,
                position: 'fixed',
                bottom: 81,
                right: 100
              }}
            >
              <Picker theme={theme.palette.mode} data={data} onEmojiSelect={console.log} />
            </Box>
            <ChatInput openPicker={openPicker} setOpenPicker={setOpenPicker} />
          </Stack>
          <Box sx={{ height: 48, width: 48, bgcolor: theme.palette.primary.main, borderRadius: 1.5 }}>
            <Stack sx={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <IconButton>
                <PaperPlaneTilt color='#fff' />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}

export default Footer
