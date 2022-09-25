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
import { capitalize, getImage } from '../../app'
import { Product } from '../../features/product'

type Props = {
  product: Product
}

export const AppCard = ({ product }: Props) => {
  const { name: title, description, image, price, stock } = product

  return (
    <Card sx={{ width: '22rem' }}>
      <div className='appCardImg'>
        <img src={getImage(image)} alt={'vegetables'} />
      </div>
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {capitalize(title)}
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
        <CardActions>
          <Button startIcon={<AddShoppingCart />}>Add to cart</Button>
        </CardActions>
        <Typography
          variant='body2'
          color='text.secondary'
          fontSize='small'
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}
