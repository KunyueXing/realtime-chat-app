import React from 'react'
import { Box, Stack, Avatar, Typography, IconButton, Divider } from '@mui/material'
import StyledBadge from '../StyledBadge'
import { faker } from '@faker-js/faker'
import { VideoCamera, Phone, MagnifyingGlass, CaretCircleDown } from 'phosphor-react'
import { useTheme } from '@mui/material/styles'

const ChatHeader = () => {
  const theme = useTheme()

  return (
    <>
      <Box
        p={2}
        sx={{
          width: '100%',
          height: 100,
          bgcolor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background,
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)'
        }}
      >
        <Stack
          direction='row'
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            height: '100%'
          }}
        >
          <Stack spacing={2} direction='row'>
            <Box>
              <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
                <Avatar src={faker.image.avatar()} />
              </StyledBadge>
            </Box>
            <Stack spacing={0.2}>
              <Typography variant='subtitle2'>nameplaceholder</Typography>
            </Stack>
          </Stack>
          <Stack direction='row' spacing={3} sx={{ alignItems: 'center' }}>
            <IconButton>
              <VideoCamera />
            </IconButton>
            <IconButton>
              <Phone />
            </IconButton>
            <IconButton>
              <MagnifyingGlass />
            </IconButton>
            <Divider orientation='vertical' flexItem />
            <IconButton>
              <CaretCircleDown />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default ChatHeader
