import { useQuery } from '@apollo/client'
import { CircularProgress, Pagination } from '@mui/material'
import { AppCard } from '../components/card'
import { GET_VEGETABLES, Product } from '../features/product'

export const Vegetables = () => {
  const { loading, error, data } = useQuery<{
    vegetables: Product[]
  }>(GET_VEGETABLES, {
    variables: {
      offset: 0,
      limit: 5,
    },
  })

  return (
    <div id='vegetablesPage' className='page categoryPage'>
      <h1>Vegetables</h1>
      <Pagination count={2} color='primary' sx={{ margin: '30px' }} />
      <div className='productsGrid'>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <h4>Error fetching</h4>
        ) : (
          data?.vegetables.map((p) => (
            <AppCard
              description={p.description}
              image={p.image}
              price={p.price.toString()}
              stock={p.stock.toString()}
              title={p.name}
              key={p.id}
            />
          ))
        )}
      </div>
    </div>
  )
}
