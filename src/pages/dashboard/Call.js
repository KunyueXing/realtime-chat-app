import { Box, Divider, IconButton, Link, Stack, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import React from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import { MagnifyingGlass, Phone } from 'phosphor-react'
import { SimpleBarStyle } from '../../components/Scrollbar'

const Call = () => {
  const theme = useTheme()

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
              <IconButton>
                <Phone style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack sx={{ flexGrow: 1, overflow: 'scroll', height: '100%' }}>
              <SimpleBarStyle timeout={500} clickOnTrack={false}>
                <Stack spacing={2.4}>{/* TODO: call logs and call element */}</Stack>
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>
        {/* right */}
        {/* Todo: reuse conversation components */}
      </Stack>
    </>
  )
}

export default Call
