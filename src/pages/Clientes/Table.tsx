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
  Box,
  Button,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import api from '../../services/api'
import { FormCliente } from './formCliente'
import { DateTime } from 'luxon'
import { FormData } from '../../hooks/useInputs'
import axios from 'axios'

type ClientData = {
  id: number
  nome: string
  cpf: string
  sexo: boolean
  data_nascimento: string
  email: string
  telefone: string
  pais: string
  cidade: string
  estado: string
  endereco: string
  cep: string
  ultima_atualizacao: string
}

const theme = createTheme()

export default function BasicTable() {
  const [clientes, setClientes] = useState<ClientData[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [indexStart, setIndexStart] = useState(0)
  const [indexEnd, setIndexEnd] = useState(0)
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editData, setEditData] = useState<FormData | null>(null)
  const [editId, setEditId] = useState<number | undefined>(undefined)

  useEffect(() => {
    const cancelToken = axios.CancelToken
    const src = cancelToken.source()

    async function loadClientes() {
      try {
        const response = await api.get('clientes', { cancelToken: src.token })
        setIndexStart(0 + page * rowsPerPage)
        setIndexEnd(0 + page * rowsPerPage + rowsPerPage)
        console.log(response.data)
        setClientes(response.data)
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log('cancelled')
        } else {
          console.error(e)
        }
      }
    }

    loadClientes()

    return () => src.cancel('cancel')
  }, [page, rowsPerPage])

  const handleChangePage = (event: unknown, page: number) => {
    setPage(page)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const tableCellStyle = {
    fontWeight: 'bold',
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.getContrastText(theme.palette.primary.dark),
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ marginTop: '80px', position: 'absolute', right: '40px' }}>
        <Button variant='contained' onClick={handleClickOpen}>
          Novo Cliente
        </Button>
        <FormCliente openPopup={open} onClose={handleClose} />
      </Box>
      <TableContainer component={Paper} sx={{ margin: '80px 10px' }}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell sx={tableCellStyle}>Nome</TableCell>
              <TableCell sx={tableCellStyle}>E-mail</TableCell>
              <TableCell sx={tableCellStyle}>Última Atualização</TableCell>
              <TableCell sx={tableCellStyle}></TableCell>
              <TableCell sx={tableCellStyle}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.slice(indexStart, indexEnd).map((cliente) => (
              <TableRow key={cliente.id}>
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
                      <Typography>ID: {cliente.id}</Typography>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>
                  <Typography>{cliente.email}</Typography>
                </TableCell>
                <TableCell>
                  {DateTime.fromISO(cliente.ultima_atualizacao!).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      console.log(cliente)
                      const tempAddress = cliente.endereco.split(' - ')
                      setEditData({
                        name: cliente.nome,
                        address: `${tempAddress[0]} - ${tempAddress[3]}`,
                        birthday: cliente.data_nascimento,
                        city: cliente.cidade,
                        complement: tempAddress[2],
                        cpf: cliente.cpf,
                        email: cliente.email,
                        gender: cliente.sexo ? 'M' : 'F',
                        number: tempAddress[1],
                        password: '',
                        phone: cliente.telefone,
                        state: cliente.estado,
                        zip: cliente.cep,
                      })
                      setEditId(cliente.id)
                      setEditOpen(true)
                    }}
                  >
                    <EditIcon />
                  </Button>
                </TableCell>
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
      <FormCliente
        data={editData as FormData}
        editId={editId}
        openPopup={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </ThemeProvider>
  )
}
