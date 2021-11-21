import { Container } from '@mui/material'
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import Sidebar from '../../layout/components/sidebar'
import { useLogin } from '../../hooks/useLogin'
import { Unauthorized } from '../Unauthorized'
import TableEmployee from './Table'

const theme = createTheme()

export function Funcionarios() {
  const { user } = useLogin()
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Sidebar pageTitle='Funcionários' />
        {user?.role === 'Gerente' && <TableEmployee />}
        {user?.role !== 'Gerente' && <Unauthorized />}
      </Container>
    </ThemeProvider>
  )
}
