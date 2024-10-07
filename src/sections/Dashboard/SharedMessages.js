import { Box, Divider, Grid, IconButton, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { ArrowLeft } from 'phosphor-react'
import React from 'react'
import { useDispatch } from 'react-redux'
import { UpdateSidebarType } from '../../redux/slices/app'
import { sidebarPageMappings } from '../../utils/constants'
import { useState } from 'react'
import { faker } from '@faker-js/faker'
import { Shared_docs, Shared_links } from '../../data'
import { DocMsg, LinkMsg } from './Conversation'

const SharedMessages = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: 320, maxHeight: '100vh' }}>
      <Stack sx={{ height: '100%', width: 326 }}>
        <Box
          sx={{
            boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
            width: '100%',
            bgcolor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background
          }}
        >
          <Stack sx={{ height: '100%', p: 2, alignItems: 'center' }} direction={'row'} spacing={3}>
            <IconButton
              onClick={() => {
                dispatch(UpdateSidebarType(sidebarPageMappings[0]))
              }}
            >
              <ArrowLeft />
            </IconButton>
            <Typography variant='subtitle2'>Shared Messages</Typography>
          </Stack>
        </Box>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label='Media' />
          <Tab label='Links' />
          <Tab label='Docs' />
        </Tabs>
        <Stack
          sx={{
            height: '100%',
            position: 'relative',
            flexGrow: 1,
            overflow: 'scroll'
          }}
          spacing={3}
          padding={value === 1 ? 1 : 3}
        >
          {(() => {
            switch (value) {
              case 0:
                return (
                  <Grid container spacing={2}>
                    {Array.from(Array(6)).map((_, index) => (
                      <Grid item xs={4} key={`sharedMedia-${index}`}>
                        <img
                          src={faker.image.avatar()}
                          alt={faker.animal.cat()}
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                )

              case 1:
                return Shared_links.map((ele, index) => (
                  <Box width={320} key={`sharedLinks-${index}`}>
                    <LinkMsg ele={ele} />
                    <Divider />
                  </Box>
                ))

              case 2:
                return Shared_docs.map((ele, index) => (
                  <Box width={320} key={`sharedDocs-${index}`}>
                    <DocMsg ele={ele} />
                    <Divider />
                  </Box>
                ))

              default:
                break
            }
          })()}
        </Stack>
      </Stack>
    </Box>
  )
}

export { SharedMessages }
