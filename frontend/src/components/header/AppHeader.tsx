import { useState } from 'react'
import {
  Avatar,
  Badge,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { ShoppingCart } from '@mui/icons-material'
import { useAppSelector } from '../../app'
import { CartModal } from '../modal'
import logo from '../../assets/Jacando-logo.png'
import avatar from '../../assets/otter.jpg'
import './AppHeader.sass'

export const AppHeader = (): JSX.Element => {
  const productsNum = useAppSelector((st) => st.cart.products.length)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const handleOpenModal = () => {
    setOpenModal(true)
  }

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
        <IconButton
          color='primary'
          size='large'
          onClick={handleOpenModal}
        >
          <Badge badgeContent={productsNum} color='error'>
            <ShoppingCart fontSize='large' />
          </Badge>
        </IconButton>
      </Stack>
      <CartModal open={openModal} setOpen={setOpenModal} />
    </header>
  )
}
