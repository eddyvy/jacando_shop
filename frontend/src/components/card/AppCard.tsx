import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Rating,
  Switch,
  Typography,
  LinearProgress,
} from '@mui/material'
import { AddShoppingCart } from '@mui/icons-material'
import { capitalize, getImage } from '../../app'
import { Product } from '../../features/product'
import { ProductCounter } from '../counter'
import { useProductCard } from './useProductCard'
import './AppCard.sass'

type Props = {
  product: Product
}

export const AppCard = ({ product }: Props) => {
  const {
    name: title,
    description,
    image,
    price,
    stock,
    isLocal,
    smellLevel,
    waterPct,
  } = product

  const { handleAdd, handleRemove, numOfProdInCart } =
    useProductCard(product)

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
        {isLocal !== undefined && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '15px',
            }}
          >
            <Switch
              disabled
              defaultChecked={isLocal}
              color='success'
            />
            <Typography
              fontSize='medium'
              sx={{ color: isLocal ? 'green' : 'orange' }}
            >
              {isLocal ? 'Local food!' : 'Imported food'}
            </Typography>
          </Box>
        )}
        {waterPct !== undefined && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '15px',
            }}
          >
            <Typography fontSize='medium' sx={{ color: 'blue' }}>
              Water %
            </Typography>
            <LinearProgress variant='determinate' value={waterPct} />
          </Box>
        )}
        {smellLevel !== undefined && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginBottom: '15px',
            }}
          >
            <Typography fontSize='medium' sx={{ color: 'orange' }}>
              Smell Level
            </Typography>
            <Rating value={smellLevel} readOnly />
          </Box>
        )}
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
