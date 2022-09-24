import { ThemeProvider } from '@mui/material'
import { AppPageLayout } from './components/layout'
import { theme } from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppPageLayout>
        <h1>Hello World!</h1>
      </AppPageLayout>
    </ThemeProvider>
  )
}

export default App
