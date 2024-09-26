import React from 'react'
import { Box, Stack, Divider, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Logo from '../../assets/Images/elephant.ico'
import { Nav_Buttons, Nav_Settings } from '../../data'
import { useSelector, useDispatch } from 'react-redux'
import { UpdateTab } from '../../redux/slices/app'
import { useNavigate } from 'react-router-dom'
import MuiSwitch from '../../components/MuiSwitch'
import useSettings from '../../hooks/useSettings'
import { ProfileMenu } from './ProfileMenu'

const getPath = (index) => {
  switch (index) {
    case 0:
      return '/app'
    case 1:
      return '/group'
    case 2:
      return '/call'
    case 3:
      return '/settings'
    default:
      break
  }
}

const SideNav = () => {
  const theme = useTheme()

  const { tab } = useSelector((state) => state.app)

  const selectedTab = tab

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleChangeTab = (index) => {
    dispatch(UpdateTab({ tab: index }))
    navigate(getPath(index))
  }

  const { onToggleMode } = useSettings()

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.paper,
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
        height: '100vh',
        width: 100
      }}
    >
      <Stack py={3} sx={{ height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack direction='column' sx={{ width: '100%', alignItems: 'center' }} spacing={4}>
          <Box
            sx={{
              bgcolor: theme.palette.primary.main,
              height: 64,
              width: 64,
              borderRadius: 1.5
            }}
            p={1}
          >
            <img
              src={Logo}
              alt={'Chat app logo'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain' // Ensures the image fits within the box while maintaining its aspect ratio
              }}
            />
          </Box>
          <Stack sx={{ width: 'auto', alignItems: 'center' }} direction='column' spacing={3}>
            {Nav_Buttons.map((ele) => {
              return ele.index == selectedTab ? (
                <Box sx={{ bgcolor: theme.palette.primary.main, borderRadius: 1.5 }} p={1} key={`button-${ele.index}`}>
                  <IconButton
                    onClick={() => {
                      handleChangeTab(ele.index)
                    }}
                    sx={{ width: 'auto', color: '#ffffff' }}
                  >
                    {ele.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  key={`button-${ele.index}`}
                  onClick={() => {
                    handleChangeTab(ele.index)
                  }}
                  sx={{
                    width: 'auto',
                    color: theme.palette.mode === 'light' ? '#080707' : theme.palette.text.primary
                  }}
                >
                  {ele.icon}
                </IconButton>
              )
            })}
            <Divider sx={{ width: 48 }} />
            {Nav_Settings.map((ele) => {
              return ele.index == selectedTab ? (
                <Box sx={{ bgcolor: theme.palette.primary.main, borderRadius: 1.5 }} p={1} key={`setting-${ele.index}`}>
                  <IconButton
                    onClick={() => {
                      handleChangeTab(ele.index)
                    }}
                    sx={{ width: 'auto', color: '#ffffff' }}
                  >
                    {ele.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  key={`setting-${ele.index}`}
                  onClick={() => {
                    handleChangeTab(ele.index)
                  }}
                  sx={{
                    width: 'auto',
                    color: theme.palette.mode === 'light' ? '#080707' : theme.palette.text.primary
                  }}
                >
                  {ele.icon}
                </IconButton>
              )
            })}
          </Stack>
        </Stack>
        <Stack spacing={4} sx={{ alignItems: 'center' }}>
          <MuiSwitch defaultChecked={theme.palette.mode === 'dark'} onChange={onToggleMode} />
          {/* Use faker to generate an random image as avatar example */}
          <ProfileMenu />
        </Stack>
      </Stack>
    </Box>
  )
}

export default SideNav
