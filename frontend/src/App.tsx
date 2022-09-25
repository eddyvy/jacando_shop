import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import { client, router, theme } from './app'

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
