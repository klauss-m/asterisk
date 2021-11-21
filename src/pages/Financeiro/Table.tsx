import React, { useState, useEffect, useCallback } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  createTheme,
  Grid,
  Typography,
  TablePagination,
  Box,
  Button,
} from '@mui/material'
import axios from 'axios'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { FormFinanceiro } from './formFinanceiro'
import { Financeiro } from './formFinanceiro'
import { FormView } from './formView'

import api from '../../services/api'

const theme = createTheme()
const drawerWidth = 240

const tableCellStyle = {
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.getContrastText(theme.palette.primary.dark),
}

export function TableFinanceiro() {
  const [relatorios, setRelatorios] = useState<Financeiro[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [indexStart, setIndexStart] = useState(0)
  const [indexEnd, setIndexEnd] = useState(0)
  const [updated, setUpdated] = useState(false)
  const [formData, setFormData] = useState({ open: false, data: {}, editMode: false })
  const [viewData, setViewData] = useState({ open: false, data: {} })

  const cancelToken = axios.CancelToken
  const src = cancelToken.source()

  const loadRelatorios = useCallback(async () => {
    try {
      const response = await api.get('relatorios', { cancelToken: src.token })
      setIndexStart(0 + page * rowsPerPage)
      setIndexEnd(0 + page * rowsPerPage + rowsPerPage)
      setRelatorios(response.data)
    } catch (e) {
      if (axios.isCancel(e)) {
        console.log('cancelled')
      } else {
        console.error(e)
      }
    }
  }, [page, rowsPerPage, src])

  useEffect(() => {
    loadRelatorios()
    return () => src.cancel('cancel')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage])

  useEffect(() => {
    if (updated) {
      loadRelatorios()
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

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`relatorio/${id}`)
      setUpdated(true)
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px`, xl: 0 },
        }}
      >
        <Button
          onClick={() => {
            setFormData({ data: {}, open: true, editMode: false })
          }}
          variant='contained'
          sx={{ mb: 1 }}
        >
          Adicionar
        </Button>
        <TableContainer component={Paper}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell sx={tableCellStyle}>Data</TableCell>
                <TableCell sx={tableCellStyle}>Editar</TableCell>
                <TableCell sx={tableCellStyle}>Deletar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {relatorios.slice(indexStart, indexEnd).map((relatorio) => (
                <TableRow key={relatorio.id}>
                  <TableCell>
                    <Grid container>
                      <Grid item lg={10}>
                        <Button
                          onClick={() => {
                            setViewData({ data: relatorio, open: true })
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: 'bold',
                              color: theme.palette.primary.dark,
                            }}
                          >
                            {relatorio.data}
                          </Typography>
                        </Button>
                        <Typography>ID: {relatorio.id}</Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setFormData({ data: relatorio, open: true, editMode: true })
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDelete(relatorio.id!)}>
                      {' '}
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component='div'
            count={relatorios.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
        <FormFinanceiro
          editMode={formData.editMode}
          openPopup={formData.open}
          onClose={() => setFormData({ ...formData, open: false })}
          editData={formData.data}
          updated={() => setUpdated(true)}
        />
        <FormView
          openPopup={viewData.open}
          onClose={() => setViewData({ ...viewData, open: false })}
          viewData={viewData.data}
        />
      </Box>
    </Box>
  )
}
