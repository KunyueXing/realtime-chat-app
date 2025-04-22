import React, { useEffect, useState } from 'react'
import { Profile_Menu } from '../../data'
import { Box, Stack, Avatar, Menu, MenuItem, Fade } from '@mui/material'
import { faker } from '@faker-js/faker'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { LogoutUser } from '../../redux/slices/auth'

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = Boolean(anchorEl)
  const [selectedMenu, setSelectedMenu] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Handle click event on the avatar. When clicked, it opens the menu. Clicking again or outside the menu closes it.
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  // Handle click event on the menu items. When clicked, it sets the selected menu index and closes the menu.
  const handleMenuItemClick = (index) => {
    // console.log(`Menu item ${index} clicked`)
    setSelectedMenu(index)
    handleClose()
  }

  useEffect(() => {
    // console.log(`Selected menu: ${selectedMenu}`)
    if (selectedMenu !== null && selectedMenu === 0) {
      // console.log('Navigating to /profile')
      navigate('/profile')
    } else if (selectedMenu !== null && selectedMenu === 1) {
      navigate('/settings')
    } else if (selectedMenu !== null && selectedMenu === 2) {
      dispatch(LogoutUser())
    }
  }, [selectedMenu, navigate])

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
              <MenuItem onClick={() => handleMenuItemClick(index)} key={`profile-menu-${index}`}>
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
