import { createTheme, ThemeProvider, Container } from '@mui/material'

import Sidebar from '../../layout/components/sidebar'

interface MainProps {
  children?: JSX.Element
}

export function Main({ children }: MainProps) {
  const theme = createTheme()
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container>
          <Sidebar pageTitle={children?.props.pageTitle} />
          <div style={{ marginTop: '5rem' }}>{children || <h1>hue</h1>}</div>
        </Container>
      </ThemeProvider>
    </>
  )
}
