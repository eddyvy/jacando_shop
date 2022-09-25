import { Paper, Typography } from '@mui/material'
import { capitalize, getImage } from '../../app'
import { Product } from '../../features/product'
import { ProductCounter } from '../counter'
import { useProductCard } from './useProductCard'
import './CartCard.sass'

type Props = {
  product: Product
}

export const CartCard = ({ product }: Props) => {
  const { name: title, image, price } = product
  const { handleAdd, handleRemove, numOfProdInCart } =
    useProductCard(product)

  return (
    <Paper
      sx={{
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        padding: '20px',
        alignItems: 'center',
        justifyItems: 'center',
      }}
    >
      <div className='cartCardImg'>
        <img src={getImage(image)} alt={'vegetables'} />
      </div>
      <ProductCounter
        count={numOfProdInCart}
        handleAdd={handleAdd}
        handleRemove={handleRemove}
      />
      <Typography gutterBottom variant='h6' component='div'>
        {capitalize(title)}
      </Typography>
      <Typography fontSize='medium'>{price} CHF / Unit</Typography>
    </Paper>
  )
}
