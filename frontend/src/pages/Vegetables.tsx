import { useQuery } from '@apollo/client'
import { GET_VEGETABLES } from '../features/product'

export const Vegetables = () => {
  const { loading, error, data } = useQuery(GET_VEGETABLES, {
    variables: {
      offset: 0,
      limit: 5,
    },
  })

  return (
    <div id='vegetablesPage' className='page'>
      <h1>Vegetables Page</h1>
      <p>Loading: {loading}</p>
      <p>Error: {JSON.stringify(error)}</p>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  )
}
