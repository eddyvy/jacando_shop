import { ChangeEvent, useEffect, useState } from 'react'
import { DocumentNode, useQuery } from '@apollo/client'
import { CircularProgress, Pagination } from '@mui/material'
import { AppCard } from '../../components/card'
import {
  Category,
  GET_CHEESES,
  GET_FRUITS,
  GET_VEGETABLES,
  loadProducts,
  Product,
  ProductsState,
} from '../../features/product'
import {
  PAGINATION_LIMIT,
  useAppDispatch,
  useAppSelector,
} from '../../app'

type Props = {
  category: Category
}

const chooseFromCategory = (
  category: Category,
): {
  query: DocumentNode
  prop: keyof ProductsState
} => {
  switch (category) {
    case 'cheese':
      return {
        prop: 'cheeses',
        query: GET_CHEESES,
      }
    case 'fruit':
      return {
        prop: 'fruits',
        query: GET_FRUITS,
      }
    case 'vegetable':
      return {
        prop: 'vegetables',
        query: GET_VEGETABLES,
      }
  }
}

export const ProductGrid = ({ category }: Props): JSX.Element => {
  const { prop, query } = chooseFromCategory(category)
  const dispatch = useAppDispatch()
  const totalProd = useAppSelector((st) => st.products[prop])

  const [page, setPage] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [pagesCached, setPagesCached] = useState<number[]>([])

  const { loading, error, data } = useQuery(query, {
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
        products: data[prop],
        category,
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
    <>
      <Pagination
        count={totalPages + 1}
        color='primary'
        onChange={handleChange}
        sx={{ margin: '30px' }}
      />
      <div className='productsGrid'>
        {loading ? (
          <CircularProgress />
        ) : error || !data[prop] ? (
          <h4>Error fetching</h4>
        ) : (
          data[prop].map((p: Product) => (
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
    </>
  )
}
