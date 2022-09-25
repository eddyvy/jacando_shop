import { ProductGrid } from '../components/grid'

export const Cheese = () => {
  return (
    <div id='cheesePage' className='page categoryPage'>
      <h1>Cheese</h1>
      <ProductGrid category='cheese' />
    </div>
  )
}
