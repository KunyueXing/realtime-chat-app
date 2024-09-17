import React from 'react'
import Chats from './Chats'
import { Box, Stack } from '@mui/material'

const GeneralApp = () => {
  console.log('Hello')

  return (
    <>
      {/* <h1>GeneralApp is Loading</h1> */}
      <Stack direction='row' sx={{ width: '100%', height: '100vh' }}>
        <Chats />
      </Stack>
    </>
  )
}

export default GeneralApp
