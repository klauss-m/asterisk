import * as React from 'react'
import Sidebar from '../../layout/components/sidebar'
import { Container, createTheme, ThemeProvider } from '@mui/material'
import { MapaOcupacao } from './MapaOcupacao'

const theme = createTheme()

export function Reservas() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Sidebar pageTitle='Reservas' />
        <MapaOcupacao />
      </Container>
    </ThemeProvider>
  )
}
