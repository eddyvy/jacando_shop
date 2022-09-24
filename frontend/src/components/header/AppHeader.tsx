import { Avatar, IconButton, Stack, Typography } from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import logo from '../../assets/Jacando-logo.png'
import avatar from '../../assets/otter.jpg'
import './AppHeader.sass'

export const AppHeader = (): JSX.Element => {
  return (
    <header className='header'>
      <div className='headerLogo'>
        <img src={logo} alt='Jacando logo' />
      </div>
      <Stack
        direction='row'
        spacing={3}
        sx={{ marginRight: '15px', alignItems: 'center' }}
      >
        <div className='headerUserName'>
          <Typography sx={{ fontSize: '2rem', textAlign: 'right' }}>
            Otter Gentleman
          </Typography>
        </div>
        <Avatar
          alt='User avatar'
          src={avatar}
          sx={{ width: 56, height: 56 }}
        />
        <IconButton color='primary' size='large'>
          <ShoppingCart fontSize='large' />
        </IconButton>
      </Stack>
    </header>
  )
}
