import React from 'react'
import { Box, Stack, Avatar } from '@mui/material'
import StyledBadge from '../StyledBadge'
import { faker } from '@faker-js/faker'

const ChatHeader = () => {
  return (
    <>
      <Box
        p={2}
        sx={{
          width: '100%',
          height: 100,
          bgcolor: '#F8FAFF',
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
          </Stack>
        </Stack>
      </Box>
    </>
  )
}

export default ChatHeader
