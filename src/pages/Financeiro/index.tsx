import React from 'react'
import { Container, createTheme, ThemeProvider } from '@mui/material'

import Sidebar from '../../layout/components/sidebar'
import { TableFinanceiro } from './Table'

const theme = createTheme()

export function Financeiro() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Sidebar pageTitle='Financeiro' />
        <TableFinanceiro />
      </Container>
    </ThemeProvider>
  )
}
