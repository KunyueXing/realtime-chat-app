import { Box, Divider, IconButton, Link, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import { MagnifyingGlass, Plus } from 'phosphor-react'
import { useTheme } from '@mui/material/styles'
import { SimpleBarStyle } from '../../components/Scrollbar'
import { ChatList } from '../../data'
import ChatElement from '../../components/ChatElement'
import CreateGroup from '../../sections/Dashboard/CreateGroup'

const Group = () => {
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
            height: '100vh',
            width: 320,
            overflowY: 'scroll',
            bgcolor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background,
            boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)'
          }}
        >
          <Stack p={3} spacing={2} sx={{ maxHeight: '100vh' }}>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography variant='h5'>Groups</Typography>
            </Stack>
            <Stack sx={{ width: '100%' }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color='#709CE6' />
                </SearchIconWrapper>
                <StyledInputBase placeholder='Search...' inputProps={{ 'aria-label': 'search' }} />
              </Search>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Typography variant='subtitle2' component={Link}>
                Create New Group
              </Typography>
              <IconButton onClick={handleOpenDialog}>
                <Plus style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack sx={{ flexGrow: 1, overflow: 'scroll', height: '100%' }}>
              <SimpleBarStyle timeout={500} clickOnTrack={false}>
                <Stack spacing={2.4}>
                  <Typography variant='subtitle2' sx={{ color: '#676667' }}>
                    Pinned
                  </Typography>
                  {/* <ChatElement /> */}
                  {ChatList.filter((ele) => ele.pinned).map((ele) => {
                    return <ChatElement {...ele} chat_type={'group'} key={`chat-${ele.id}`} />
                  })}
                  <Typography variant='subtitle2' sx={{ color: '#676667' }}>
                    All Groups
                  </Typography>
                  {/* <ChatElement /> */}
                  {ChatList.filter((ele) => !ele.pinned).map((ele) => {
                    return <ChatElement {...ele} chat_type={'group'} key={`chat2-${ele.id}`} />
                  })}
                </Stack>
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>
        {/* Right */}
        {/* TODO:  Reuse conversation components */}
      </Stack>
      {openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialog} />}
    </>
  )
}

export default Group
