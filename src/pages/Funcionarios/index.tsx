import { Container } from '@mui/material'
import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material'
import CustomizedTables from './Table'
import Sidebar from '../../layout/components/sidebar'
import { useLogin } from '../../hooks/useLogin'
import { Unauthorized } from '../Unauthorized'

const theme = createTheme()

export function Funcionarios() {
  const { user } = useLogin()
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Sidebar pageTitle='Funcionários' />
        {user?.role === 'Administrador' && <CustomizedTables />}
        {user?.role !== 'Administrador' && <Unauthorized />}
      </Container>
    </ThemeProvider>
  )
}
