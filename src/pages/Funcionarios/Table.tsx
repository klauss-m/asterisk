import React, { useCallback, useEffect, useState } from 'react'
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
import { FormEmployee } from '../../hooks/useInputs'
import { FormFuncionario } from './formFuncionario'
import api from '../../services/api'
import axios from 'axios'

type EmployeeData = {
  id: number
  nome: string
  cpf: string
  rg: string
  pis: string
  cnh: string
  estado_civil: string
  sexo: string
  data_nascimento: string
  email: string
  telefone: string
  pais: string
  cidade: string
  estado: string
  endereco: string
  cep: string
  ativo: string
  cargo: string
  salario: string
  senha: string
  data_cadastro: string
  data_admissao: string
  data_demissao: string
  ultima_atualizacao: string
}

const theme = createTheme()
const drawerWidth = 240

export default function TableEmployee() {
  const [funcionarios, setFuncionarios] = useState<EmployeeData[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [indexStart, setIndexStart] = useState(0)
  const [indexEnd, setIndexEnd] = useState(0)
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [editData, setEditData] = useState<FormEmployee | null>(null)
  const [editId, setEditId] = useState<number | undefined>(undefined)
  const [updated, setUpdated] = useState(false)

  const cancelToken = axios.CancelToken
  const src = cancelToken.source()

  const loadFuncionarios = useCallback(async () => {
    try {
      const response = await api.get('funcionarios', { cancelToken: src.token })
      setIndexStart(0 + page * rowsPerPage)
      setIndexEnd(0 + page * rowsPerPage + rowsPerPage)
      setFuncionarios(response.data)
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log('cancelled')
      } else {
        console.error(e)
      }
    }
  }, [page, rowsPerPage, src])

  useEffect(() => {
    loadFuncionarios()
    return () => src.cancel('cancel')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage])

  useEffect(() => {
    if (updated) {
      loadFuncionarios()
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
      <Box sx={{ display: 'flex' }}>
        <Box
          component='main'
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px`, xl: 0 },
          }}
        >
          <Button variant='contained' onClick={handleClickOpen} sx={{ mb: 1 }}>
            Novo Funcionário
          </Button>
          <FormFuncionario
            openPopup={open}
            onClose={handleClose}
            updated={() => setUpdated(true)}
          />

          <TableContainer component={Paper}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell sx={tableCellStyle}>Nome</TableCell>
                  <TableCell sx={tableCellStyle}>E-mail</TableCell>
                  <TableCell sx={tableCellStyle}>Status</TableCell>
                  <TableCell sx={tableCellStyle}>Editar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {funcionarios.slice(indexStart, indexEnd).map((funcionario) => (
                  <TableRow key={funcionario.id}>
                    <TableCell>
                      <Grid container>
                        <Grid item lg={2}>
                          <Avatar
                            alt={funcionario.nome}
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
                            {funcionario.nome}
                          </Typography>{' '}
                          <Typography>Cargo: {funcionario.cargo}</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>
                      <Typography>{funcionario.email}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{
                          fontWeight: 'bold',
                          fontSize: '0.75rem',
                          color: 'white',
                          backgroundColor: funcionario.ativo === '1' ? 'green' : 'red',
                          borderRadius: 8,
                          padding: '3px 10px',
                          display: 'inline-block',
                        }}
                      >
                        {funcionario.ativo === '1' ? 'Ativo' : 'Inativo'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          const tempAddress = funcionario.endereco.split(' - ')
                          setEditData({
                            name: funcionario.nome,
                            address: `${tempAddress[0]} - ${tempAddress[3]}`,
                            birthday: funcionario.data_nascimento,
                            city: funcionario.cidade,
                            complement: tempAddress[2],
                            cpf: funcionario.cpf,
                            email: funcionario.email,
                            gender: funcionario.sexo === '1' ? 'M' : 'F',
                            number: tempAddress[1],
                            password: funcionario.senha,
                            phone: funcionario.telefone,
                            state: funcionario.estado,
                            zip: funcionario.cep,
                            dateAdmission: funcionario.data_admissao,
                            dateDemission: funcionario.data_demissao,
                            registerDate: funcionario.data_cadastro,
                            maritalStatus: funcionario.estado_civil,
                            rg: funcionario.rg,
                            pis: funcionario.pis,
                            cnh: funcionario.cnh,
                            salary: funcionario.salario,
                            role: funcionario.cargo,
                            active: funcionario.ativo === '1' ? 'Ativo' : 'Inativo',
                          })
                          setEditId(funcionario.id)
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
              count={funcionarios.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
          <FormFuncionario
            data={editData as FormEmployee}
            editId={editId}
            openPopup={editOpen}
            onClose={() => setEditOpen(false)}
            updated={() => setUpdated(true)}
          />
        </Box>
      </Box>
    </ThemeProvider>
  )
}
