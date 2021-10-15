import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ThemeProvider,
  createTheme,
  Avatar,
  Grid,
  Typography,
  TableFooter,
  TablePagination,
} from '@mui/material'
import api from '../../services/api'

interface ClienteProps {
  nome: string
  email: string
  sexo: boolean
}

const theme = createTheme()

export default function BasicTable() {
  const [clientes, setClientes] = useState<ClienteProps[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [indexStart, setIndexStart] = useState(0)
  const [indexEnd, setIndexEnd] = useState(0)

  useEffect(() => {
    async function loadClientes() {
      const response = await api.get('clientes')
      setIndexStart(0 + page * rowsPerPage)
      setIndexEnd(0 + page * rowsPerPage + rowsPerPage)
      setClientes(response.data)
    }

    loadClientes()
  }, [page, rowsPerPage])

  const handleChangePage = (event: unknown, page: number) => {
    setPage(page)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const tableCellStyle = {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  }

  return (
    <ThemeProvider theme={theme}>
      <TableContainer component={Paper} sx={{ margin: '80px 10px' }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={tableCellStyle}>Nome</TableCell>
              <TableCell sx={tableCellStyle}>Sexo</TableCell>
              <TableCell sx={tableCellStyle}>Data de Nascimento</TableCell>
              <TableCell sx={tableCellStyle}></TableCell>
              <TableCell sx={tableCellStyle}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.slice(indexStart, indexEnd).map((cliente) => (
              <TableRow key={cliente.nome}>
                <TableCell>
                  <Grid container>
                    <Grid item lg={2}>
                      <Avatar
                        alt={cliente.nome}
                        src='.'
                        sx={{
                          backgroundColor: theme.palette.primary.light,
                          color: theme.palette.getContrastText(theme.palette.primary.light),
                        }}
                      />
                    </Grid>
                    <Grid item lg={10}>
                      <Typography
                        sx={{
                          fontWeight: 'bold',
                          color: theme.palette.primary.dark,
                        }}
                      >
                        {cliente.nome}
                      </Typography>{' '}
                      <Typography>{cliente.email}</Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Typography color='primary' variant='body2'></Typography>
                </TableCell>
                <TableCell></TableCell>
                <TableCell>{cliente.sexo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component='div'
          count={clientes.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </ThemeProvider>
  )
}
