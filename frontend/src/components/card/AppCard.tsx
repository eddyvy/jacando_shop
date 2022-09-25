import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import { AddShoppingCart } from '@mui/icons-material'
import {
  capitalize,
  getImage,
  useAppDispatch,
  useAppSelector,
} from '../../app'
import { Product } from '../../features/product'
import { addToCart, removeFromCart } from '../../features/cart'
import { ProductCounter } from '../counter'
import './AppCard.sass'

type Props = {
  product: Product
}

export const AppCard = ({ product }: Props) => {
  const {
    id,
    name: title,
    description,
    image,
    price,
    stock,
  } = product

  const dispatch = useAppDispatch()
  const numOfProdInCart = useAppSelector(
    (st) => st.cart.products.filter((p) => p.id === id).length,
  )

  const handleAdd = () => {
    dispatch(addToCart(product))
  }

  const handleRemove = () => {
    dispatch(removeFromCart(product))
  }

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
        <CardActions sx={{ height: '3.5rem' }}>
          {numOfProdInCart === 0 ? (
            <Button
              startIcon={<AddShoppingCart />}
              onClick={handleAdd}
            >
              Add to cart
            </Button>
          ) : (
            <ProductCounter
              count={numOfProdInCart}
              handleAdd={handleAdd}
              handleRemove={handleRemove}
            />
          )}
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
