import { ChangeEvent, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { CircularProgress, Pagination } from '@mui/material'
import { AppCard } from '../components/card'
import {
  GET_VEGETABLES,
  loadProducts,
  Product,
} from '../features/product'
import {
  PAGINATION_LIMIT,
  useAppDispatch,
  useAppSelector,
} from '../app'

export const Vegetables = () => {
  const dispatch = useAppDispatch()
  const totalProd = useAppSelector((st) => st.products.vegetables)
  const [page, setPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [pagesCached, setPagesCached] = useState<number[]>([])

  const { loading, error, data } = useQuery<{
    vegetables: Product[]
  }>(GET_VEGETABLES, {
    variables: {
      offset: page * 5,
      limit: PAGINATION_LIMIT,
    },
  })

  const handleChange = (_: ChangeEvent<unknown>, page: number) => {
    setPage(page - 1)
  }

  useEffect(() => {
    if (!data || pagesCached.includes(page)) return

    dispatch(
      loadProducts({
        products: data.vegetables,
        category: 'vegetable',
      }),
    )
    setPagesCached([...pagesCached, page])
  }, [data, pagesCached])

  useEffect(() => {
    const pagesShouldBe =
      Math.floor(totalProd.length / PAGINATION_LIMIT) + 1
    if (totalPages < pagesShouldBe) {
      setTotalPages(totalPages + 1)
    }
  }, [totalProd])

  return (
    <div id='vegetablesPage' className='page categoryPage'>
      <h1>Vegetables</h1>
      <Pagination
        count={totalPages + 1}
        color='primary'
        onChange={handleChange}
        sx={{ margin: '30px' }}
      />
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
