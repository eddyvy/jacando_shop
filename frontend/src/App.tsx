import { Provider } from 'react-redux'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import { client, router, store, theme } from './app'

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </ApolloProvider>
    </Provider>
  )
}

export default App
