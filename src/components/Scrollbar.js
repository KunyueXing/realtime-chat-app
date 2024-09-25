import PropTypes from 'prop-types'
import SimpleBarReact from 'simplebar-react'
import { alpha, styled } from '@mui/material/styles'
import React from 'react'

const RootStyle = styled('div')(() => ({
  // Allows the div to grow and fill any available space in its parent container.
  flexGrow: 1,
  height: '100%',
  // Enables scrolling within the div if the content exceeds the available space.
  overflow: 'scroll'
}))

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  // maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[600], 0.48)
    },
    '&.simplebar-visible:before': {
      opacity: 1
    }
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 10
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6
  },
  '& .simplebar-mask': {
    zIndex: 'inherit'
  },
  '& .simplebar-placeholder': {
    height: '0 !important'
  }
}))

/*
  Defines type checks for the Scrollbar component’s props.
  children: Must be React nodes (e.g., JSX elements) and are required.
  sx: An optional prop that can hold an object with custom styles (this works with Material UI’s sx prop for 
  inline styling).
*/
Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object
}

export default function Scrollbar({ children, sx, ...other }) {
  return (
    <RootStyle>
      <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  )
}

export { SimpleBarStyle }
