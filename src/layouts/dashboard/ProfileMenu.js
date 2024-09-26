import React, { useState } from 'react'
import { Profile_Menu } from '../../data'
import { Box, Stack, Avatar, Menu, MenuItem, Fade } from '@mui/material'
import { faker } from '@faker-js/faker'

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Avatar
        id='profile-menu-button'
        aria-controls={openMenu ? 'profile-menu-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={openMenu ? 'true' : undefined}
        onClick={handleClick}
        src={faker.image.avatar()}
      />
      <Menu
        id='profile-menu-menu'
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'fade-button'
        }}
        TransitionComponent={Fade}
        aria-labelledby='profile-menu-button'
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box p={1}>
          <Stack spacing={1}>
            {Profile_Menu.map((ele, index) => (
              <MenuItem onClick={handleClose} key={`profile-menu-${index}`}>
                <Stack direction='row' sx={{ width: 100, alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{ele.title}</span>
                  {ele.icon}
                </Stack>{' '}
              </MenuItem>
            ))}
          </Stack>
        </Box>
      </Menu>
    </>
  )
}

export { ProfileMenu }
