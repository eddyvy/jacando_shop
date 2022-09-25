import { useQuery } from '@apollo/client'
import { GET_CHEESES } from '../features/product'

export const Cheese = () => {
  const { loading, error, data } = useQuery(GET_CHEESES, {
    variables: {
      offset: 0,
      limit: 5,
    },
  })
  return (
    <div id='cheesePage' className='page'>
      <h1>Cheese</h1>
      <p>Loading: {loading}</p>
      <p>Error: {JSON.stringify(error)}</p>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  )
}
