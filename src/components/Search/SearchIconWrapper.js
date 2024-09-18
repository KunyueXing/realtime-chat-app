import { styled } from '@mui/material/styles'

const SearchIconWrapper = styled('div')(({ theme }) => ({
  // Vertial padding - 0, both left and right sides horizontal padding - 2
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  // Disables interaction with the search icon -- used for purely decorative elements.
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

export default SearchIconWrapper
