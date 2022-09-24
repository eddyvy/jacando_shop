import { createBrowserRouter } from 'react-router-dom'
import { Cheese, Fruits, Home, Vegetables } from '../pages'

export const routes = {
  HOME: '/',
  VEGETABLES: '/vegetables',
  FRUITS: '/fruits',
  CHEESE: '/cheese',
}

export const router = createBrowserRouter([
  {
    path: routes.CHEESE,
    element: <Cheese />,
  },
  {
    path: routes.FRUITS,
    element: <Fruits />,
  },
  {
    path: routes.VEGETABLES,
    element: <Vegetables />,
  },
  {
    path: routes.HOME,
    element: <Home />,
  },
])
