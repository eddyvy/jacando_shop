import { ProductGrid } from '../components/grid'

export const Vegetables = () => {
  return (
    <div id='vegetablesPage' className='page categoryPage'>
      <h1>Vegetables</h1>
      <ProductGrid category='vegetable' />
    </div>
  )
}
