import { Container } from '@mui/material'
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import TableCliente from './Table'
import Sidebar from '../../layout/components/sidebar'

const theme = createTheme()

export function Clientes() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Sidebar pageTitle='Clientes' />
        <TableCliente />
      </Container>
    </ThemeProvider>
  )
}
