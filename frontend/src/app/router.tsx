import { createBrowserRouter } from 'react-router-dom'
import { AppPageLayout } from '../components/layout'
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
    element: (
      <AppPageLayout>
        <Cheese />
      </AppPageLayout>
    ),
  },
  {
    path: routes.FRUITS,
    element: (
      <AppPageLayout>
        <Fruits />
      </AppPageLayout>
    ),
  },
  {
    path: routes.VEGETABLES,
    element: (
      <AppPageLayout>
        <Vegetables />
      </AppPageLayout>
    ),
  },
  {
    path: routes.HOME,
    element: (
      <AppPageLayout>
        <Home />
      </AppPageLayout>
    ),
  },
])
