import React from 'react'
import { styled, useTheme, alpha } from '@mui/material/styles'
import { Box, Badge, Stack, Avatar, Typography } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { faker } from '@faker-js/faker'

const truncateText = (string, n) => {
  return string?.length > n ? `${string?.slice(0, n)}...` : string
}

const StyledChatBox = styled(Box)(({ theme }) => ({
  '&:hover': {
    cursor: 'pointer'
  }
}))

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}))

const ChatElement = ({ img, name, msg, time, unread, id }) => {
  const theme = useTheme()

  return (
    <StyledChatBox
      sx={{
        width: '100%',
        borderRadius: 1,
        bgcolor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.default
      }}
      p={2}
    >
      <Stack direction='row' sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack direction='row' spacing={2}>
          <StyledBadge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
            <Avatar src={img} alt={name} />
          </StyledBadge>
          <Stack spacing={0.3}>
            <Typography variant='subtitle2'>{name}</Typography>
            <Typography variant='caption'>{truncateText(msg, 20)}</Typography>
          </Stack>
        </Stack>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontWeight: 600 }} variant='caption'>
            {time}
          </Typography>
          <Badge color='primary' badgeContent={unread} />
        </Stack>
      </Stack>
    </StyledChatBox>
  )
}

export default ChatElement
