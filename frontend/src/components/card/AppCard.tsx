import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import { AddShoppingCart } from '@mui/icons-material'
import './AppCard.sass'

type Props = {
  title: string
  description: string
  image: string
  price: string
  stock: string
}

export const AppCard = ({
  title,
  description,
  image,
  price,
  stock,
}: Props) => {
  return (
    <Card sx={{ width: '22rem' }}>
      <div className='appCardImg'>
        <img src={image} alt={'vegetables'} />
      </div>
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {title}
        </Typography>
        <Typography
          variant='body2'
          color='text.secondary'
          fontSize='small'
        >
          {description}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            marginTop: '10px',
          }}
        >
          <Typography fontSize='medium'>Price</Typography>
          <Typography fontSize='medium'>Stock</Typography>
          <Typography fontSize='medium'>{price} CHF</Typography>
          <Typography fontSize='medium'>{stock}</Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button startIcon={<AddShoppingCart />}>Add to cart</Button>
      </CardActions>
    </Card>
  )
}
