import React, { useEffect, useState, useCallback } from 'react'
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
  sexo: string
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
const drawerWidth = 240

export default function TableCliente() {
  const [clientes, setClientes] = useState<ClientData[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [indexStart, setIndexStart] = useState(0)
  const [indexEnd, setIndexEnd] = useState(0)
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editData, setEditData] = useState<FormData | null>(null)
  const [editId, setEditId] = useState<number | undefined>(undefined)
  const [updated, setUpdated] = useState(false)

  const cancelToken = axios.CancelToken
  const src = cancelToken.source()

  const loadClientes = useCallback(async () => {
    try {
      const response = await api.get('clientes', { cancelToken: src.token })
      setIndexStart(0 + page * rowsPerPage)
      setIndexEnd(0 + page * rowsPerPage + rowsPerPage)
      setClientes(response.data)
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log('cancelled')
      } else {
        console.error(e)
      }
    }
  }, [page, rowsPerPage, src])

  useEffect(() => {
    loadClientes()
    return () => src.cancel('cancel')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage])

  useEffect(() => {
    if (updated) {
      loadClientes()
      setUpdated(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated])

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
      <Box sx={{ display: 'flex' }}>
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px`, xl: 0 },
          }}
        >
          <Button variant='contained' onClick={() => setOpen(true)} sx={{ mb: 1 }}>
            Novo Cliente
          </Button>

          <FormCliente
            openPopup={open}
            onClose={() => setOpen(false)}
            setUpdated={() => setUpdated(true)}
          />

          <TableContainer
            component={Paper}
            sx={{
              width: '1000px',
            }}
          >
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableCellStyle}>Nome</TableCell>
                  <TableCell sx={tableCellStyle}>E-mail</TableCell>
                  <TableCell sx={tableCellStyle}>Última Atualização</TableCell>
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
                              marginRight: 5,
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
                          const tempAddress = cliente.endereco.split(' - ')
                          setEditData({
                            name: cliente.nome,
                            address: `${tempAddress[0]} - ${tempAddress[3]}`,
                            birthday: cliente.data_nascimento,
                            city: cliente.cidade,
                            complement: tempAddress[2],
                            cpf: cliente.cpf,
                            email: cliente.email,
                            gender: cliente.sexo === '1' ? 'M' : 'F',
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
            setUpdated={() => setUpdated(true)}
            onClose={() => {
              setEditOpen(false)
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  )
}
