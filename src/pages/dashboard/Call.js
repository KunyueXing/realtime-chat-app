import { Box, Divider, IconButton, Link, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React, { useState } from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import { MagnifyingGlass, Phone } from 'phosphor-react'
import { SimpleBarStyle } from '../../components/Scrollbar'
import { CallDialogElement, CallElement } from '../../components/CallElement'
import { faker } from '@faker-js/faker'
import { CallList } from '../../data'
import StartCall from '../../sections/Dashboard/StartCall'

const Call = () => {
  const theme = useTheme()

  const [openDialog, setOpenDialog] = useState(false)

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }
  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  return (
    <>
      <Stack direction={'row'} sx={{ width: '100%' }}>
        {/* Left */}
        <Box
          sx={{
            overflowY: 'scroll',
            height: '100vh',
            width: 340,
            bgcolor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background,
            boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)'
          }}
        >
          <Stack p={3} spacing={2} sx={{ maxHeight: '100vh' }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography variant='h5'>Call Log</Typography>
            </Stack>
            <Stack sx={{ width: '100%' }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color='#709CE6' />
                </SearchIconWrapper>
                <StyledInputBase placeholder='Search...' inputProps={{ 'aria-label': 'search' }} />
              </Search>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography variant='subtitle2' component={Link}>
                Start a conversation
              </Typography>
              <IconButton onClick={handleOpenDialog}>
                <Phone style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack sx={{ flexGrow: 1, overflow: 'scroll', height: '100%' }}>
              <SimpleBarStyle timeout={500} clickOnTrack={false}>
                <Stack spacing={2.4}>
                  {/* TODO: call logs and call element */}
                  {CallList.map((ele, idx) => {
                    return <CallDialogElement key={`call-${idx}`} {...ele} />
                  })}
                  {/* <CallDialogElement img={faker.image.avatar()} name={faker.person.fullName()} incoming={false} missed={true} /> */}
                  <CallElement img={faker.image.avatar()} name={faker.person.fullName()} />
                </Stack>
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>
        {/* right */}
        {/* Todo: reuse conversation components */}
      </Stack>
      {openDialog && <StartCall handleClose={handleCloseDialog} open={openDialog} />}
    </>
  )
}

export default Call
