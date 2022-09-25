import { ProductGrid } from '../components/grid'

export const Fruits = () => {
  return (
    <div id='fruitsPage' className='page categoryPage'>
      <h1>Fruits</h1>
      <ProductGrid category='fruit' />
    </div>
  )
}
