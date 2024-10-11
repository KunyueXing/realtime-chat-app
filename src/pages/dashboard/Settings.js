import { faker } from '@faker-js/faker'
import { Avatar, Box, Divider, IconButton, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Bell, CaretLeft, Image, Info, Key, Keyboard, Lock, Note, PencilCircle } from 'phosphor-react'
import React from 'react'

const Settings = () => {
  const theme = useTheme()

  const settingsItems = [
    {
      key: 0,
      icon: <Bell size={20} />,
      title: 'Notifications',
      onclick: () => {}
    },
    {
      key: 1,
      icon: <Lock size={20} />,
      title: 'Privacy',
      onclick: () => {}
    },
    {
      key: 2,
      icon: <Key size={20} />,
      title: 'Security',
      onclick: () => {}
    },
    {
      key: 3,
      icon: <PencilCircle size={20} />,
      title: 'Theme',
      onclick: () => {}
    },
    {
      key: 4,
      icon: <Image size={20} />,
      title: 'Chat Wallpaper',
      onclick: () => {}
    },
    {
      key: 5,
      icon: <Note size={20} />,
      title: 'Request Account Info',
      onclick: () => {}
    },
    {
      key: 6,
      icon: <Keyboard size={20} />,
      title: 'Keyboard Shortcuts',
      onclick: () => {}
    },
    {
      key: 7,
      icon: <Info size={20} />,
      title: 'Help',
      onclick: () => {}
    }
  ]

  return (
    <>
      <Stack direction={'row'} sx={{ width: '100%', height: '100vh' }}>
        {/**/}
        {/* left panel */}
        <Box
          sx={{
            // overflowY: 'scroll',
            // overflow: 'hidden', // for debug
            overflowY: 'auto',
            height: '100%',
            width: 320,
            bgcolor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background,
            boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)'
            // border: '1px solid red' // Debug border
          }}
        >
          <Stack p={4} spacing={5} width={'100%'}>
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
            <Stack spacing={4}>
              {settingsItems.map(({ key, icon, title, onclick }) => {
                return (
                  <>
                    <Stack onClick={onclick} sx={{ cursor: 'pointer' }} spacing={2} key={`settingItems-${key}`}>
                      <Stack direction={'row'} spacing={2} sx={{ alignItems: 'center' }}>
                        {icon}
                        <Typography variant='body2'>{title}</Typography>
                      </Stack>
                      {key !== 7 && <Divider />}
                    </Stack>
                  </>
                )
              })}
            </Stack>
          </Stack>
        </Box>
        {/* right panel */}
        <Box
          sx={{
            height: '100%',
            // width: 'calc(100vw - 420px)',
            bgcolor: theme.palette.mode === 'light' ? '#FFF' : theme.palette.background.paper,
            // borderBottom: '6px solid #0162C4',
            flexGrow: 1, // Fill remaining space
            boxSizing: 'border-box'
            // border: '1px solid green' // Debug border
          }}
        />
      </Stack>
    </>
  )
}

export default Settings
