import { faker } from '@faker-js/faker'
import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { CaretLeft } from 'phosphor-react'
import React from 'react'

const Settings = () => {
  const theme = useTheme()

  return (
    <>
      <Stack direction={'row'} sx={{ width: '100%', height: '100vh' }}>
        {/**/}
        {/* left panel */}
        <Box
          sx={{
            overflowY: 'scroll',
            height: '100%',
            width: 320,
            bgcolor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background,
            boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)'
          }}
        >
          <Stack p={4} spacing={0} width={'100%'}>
            {/* header */}
            <Stack direction={'row'} alignItems={'center'} spacing={3}>
              <IconButton>
                <CaretLeft size={24} color={'#4B4B4B'} />
              </IconButton>
              <Typography variant='h5'>Settings</Typography>
            </Stack>
            {/* profile */}
            <Stack direction={'row'} spacing={3}>
              <Avatar src={faker.image.avatar()} sx={{ height: 56, width: 56 }} />
              <Stack spacing={0.5}>
                <Typography variant='article'>{`${faker.person.firstName()} ${faker.person.lastName()}`}</Typography>
                <Typography variant='body2'>{faker.person.bio()}</Typography>
              </Stack>
            </Stack>
            {/* list */}
          </Stack>
        </Box>
        {/* right panel */}
        <Box
          sx={{
            height: '100%',
            // width: 'calc(100vw - 420px)',
            bgcolor: theme.palette.mode === 'light' ? '#FFF' : theme.palette.background.paper,
            borderBottom: '6px solid #0162C4',
            flexGrow: 1
          }}
        />
      </Stack>
    </>
  )
}

export default Settings
