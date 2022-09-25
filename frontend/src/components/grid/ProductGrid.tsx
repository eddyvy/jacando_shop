import { ChangeEvent, useEffect, useState } from 'react'
import { DocumentNode, useQuery } from '@apollo/client'
import { CircularProgress, Pagination } from '@mui/material'
import { AppCard } from '../../components/card'
import {
  Category,
  GET_CHEESES,
  GET_FRUITS,
  GET_VEGETABLES,
  Product,
  ProductsState,
} from '../../features/product'
import { PAGINATION_LIMIT } from '../../app'
import './ProductGrid.sass'

type Props = {
  category: Category
}

const chooseFromCategory = (
  category: Category,
): {
  query: DocumentNode
  prop: keyof ProductsState
  totalPages: number
} => {
  switch (category) {
    case 'cheese':
      return {
        prop: 'cheeses',
        query: GET_CHEESES,
        totalPages: 1,
      }
    case 'fruit':
      return {
        prop: 'fruits',
        query: GET_FRUITS,
        totalPages: 4,
      }
    case 'vegetable':
      return {
        prop: 'vegetables',
        query: GET_VEGETABLES,
        totalPages: 3,
      }
  }
}

export const ProductGrid = ({ category }: Props): JSX.Element => {
  const { prop, query, totalPages } = chooseFromCategory(category)
  const [page, setPage] = useState<number>(0)

  const { loading, error, data } = useQuery(query, {
    variables: {
      offset: page * 5,
      limit: PAGINATION_LIMIT,
    },
  })

  const handleChange = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page - 1)
  }

  return (
    <>
      <Pagination
        count={totalPages}
        color='primary'
        onChange={handleChange}
        sx={{ margin: '30px' }}
      />
      {loading ? (
        <CircularProgress />
      ) : error || !data[prop] ? (
        <h4>Error fetching</h4>
      ) : (
        <div className='productsGrid'>
          {data[prop].map((p: Product) => (
            <AppCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </>
  )
}
