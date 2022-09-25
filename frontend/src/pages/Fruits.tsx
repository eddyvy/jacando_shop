import { useQuery } from '@apollo/client'
import { GET_FRUITS } from '../features/product'

export const Fruits = () => {
  const { loading, error, data } = useQuery(GET_FRUITS, {
    variables: {
      offset: 0,
      limit: 5,
    },
  })
  return (
    <div id='fruitsPage' className='page'>
      <h1>Fruits</h1>
      <p>Loading: {loading}</p>
      <p>Error: {JSON.stringify(error)}</p>
      <p>Data: {JSON.stringify(data)}</p>
    </div>
  )
}
