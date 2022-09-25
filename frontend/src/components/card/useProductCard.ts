import { useAppDispatch, useAppSelector } from '../../app'
import { addToCart, removeFromCart } from '../../features/cart'
import { Product } from '../../features/product'

export const useProductCard = (product: Product) => {
  const dispatch = useAppDispatch()
  const numOfProdInCart = useAppSelector(
    (st) =>
      st.cart.products.filter((p) => p.id === product.id).length,
  )

  const handleAdd = () => {
    dispatch(addToCart(product))
  }

  const handleRemove = () => {
    dispatch(removeFromCart(product))
  }

  return {
    numOfProdInCart,
    handleAdd,
    handleRemove,
  }
}
