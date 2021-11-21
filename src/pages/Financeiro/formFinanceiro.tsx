import React, { useState } from 'react'
import {
  TextField,
  Box,
  Grid,
  Button,
  Dialog,
  createTheme,
  ThemeProvider,
  Container,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterLuxon from '@mui/lab/AdapterLuxon'

import api from '../../services/api'

const theme = createTheme()

export interface Financeiro {
  id?: number
  data?: string
  aluguel?: string
  telefone?: string
  plano_saude?: string
  seguro?: string
  tv?: string
  vr?: string
  lavanderia?: string
  agua?: string
  vt?: string
  energia?: string
  gas?: string
  internet?: string
  va?: string
  faturamento?: string
  consumo?: string
}

interface DialogFinanceiroProps {
  openPopup: boolean
  onClose: () => void
  editData?: Financeiro
  updated: () => void
  editMode: boolean
}

export function FormFinanceiro({
  openPopup,
  onClose,
  editData,
  updated,
  editMode,
}: DialogFinanceiroProps) {
  const [financeiro, setFinanceiro] = useState<Financeiro>({})

  const clearData = () => {
    setFinanceiro({
      id: 0,
      data: '',
      aluguel: '',
      telefone: '',
      plano_saude: '',
      seguro: '',
      tv: '',
      vr: '',
      lavanderia: '',
      agua: '',
      vt: '',
      energia: '',
      gas: '',
      internet: '',
      va: '',
      faturamento: '',
      consumo: '',
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={openPopup} onClose={onClose}>
        <Container component='main' maxWidth='xs'>
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ margin: 2 }}>
                <LocalizationProvider dateAdapter={AdapterLuxon}>
                  <DatePicker
                    label='Data'
                    value={editMode ? editData?.data : financeiro.data}
                    onChange={(date) => {
                      setFinanceiro({ ...financeiro, data: date! })
                    }}
                    renderInput={(params) => <TextField {...params} sx={{ margin: '10px' }} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Aluguel'
                  defaultValue={editMode ? editData?.aluguel : financeiro.aluguel}
                  onChange={(e) => {
                    setFinanceiro({ ...financeiro, aluguel: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Telefone'
                  defaultValue={editMode ? editData?.telefone : financeiro.telefone}
                  onChange={(e) => {
                    setFinanceiro({ ...financeiro, telefone: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Plano de Saúde'
                  defaultValue={editMode ? editData?.plano_saude : financeiro.plano_saude}
                  onChange={(e) => {
                    setFinanceiro({ ...financeiro, plano_saude: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Seguro'
                  defaultValue={editMode ? editData?.seguro : financeiro.seguro}
                  onChange={(e) => {
                    setFinanceiro({ ...financeiro, seguro: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='TV'
                  defaultValue={editMode ? editData?.tv : financeiro.tv}
                  onChange={(e) => {
                    setFinanceiro({ ...financeiro, tv: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='VR'
                  defaultValue={editMode ? editData?.vr : financeiro.vr}
                  onChange={(e) => {
                    setFinanceiro({ ...financeiro, vr: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Lavanderia'
                  defaultValue={editMode ? editData?.lavanderia : financeiro.lavanderia}
                  onChange={(e) => {
                    setFinanceiro({ ...financeiro, lavanderia: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Água'
                  defaultValue={editMode ? editData?.agua : financeiro.agua}
                  onChange={(e) => {
                    setFinanceiro({ ...financeiro, agua: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='VT'
                  defaultValue={editMode ? editData?.vt : financeiro.vt}
                  onChange={(e) => {
                    setFinanceiro({ ...financeiro, vt: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Energia'
                  defaultValue={editMode ? editData?.energia : financeiro.energia}
                  onChange={(e) => {
                    setFinanceiro({ ...financeiro, energia: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Gas'
                  defaultValue={editMode ? editData?.gas : financeiro.gas}
                  onChange={(e) => {
                    setFinanceiro({ ...financeiro, gas: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Internet'
                  defaultValue={editMode ? editData?.internet : financeiro.internet}
                  onChange={(e) => {
                    setFinanceiro({ ...financeiro, internet: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='VA'
                  defaultValue={editMode ? editData?.va : financeiro.va}
                  onChange={(e) => {
                    setFinanceiro({ ...financeiro, va: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Faturamento'
                  defaultValue={editMode ? editData?.faturamento : financeiro.faturamento}
                  onChange={(e) => {
                    setFinanceiro({ ...financeiro, faturamento: e.target.value })
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label='Consumo'
                  defaultValue={editMode ? editData?.consumo : financeiro.consumo}
                  onChange={(e) => {
                    setFinanceiro({ ...financeiro, consumo: e.target.value })
                  }}
                />
              </Grid>
            </Grid>
            <Grid
              container
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              sx={{ margin: 2 }}
            >
              <Button
                variant='contained'
                color='primary'
                onClick={async () => {
                  if (editMode) {
                    const dataToSend = {
                      data: financeiro.data!.length > 0 ? financeiro.data : editData?.data,
                      aluguel:
                        financeiro.aluguel!.length > 0 ? financeiro.aluguel : editData?.aluguel,
                      telefone:
                        financeiro.telefone!.length > 0 ? financeiro.telefone : editData?.telefone,
                      plano_saude:
                        financeiro.plano_saude!.length > 0
                          ? financeiro.plano_saude
                          : editData?.plano_saude,
                      seguro: financeiro.seguro!.length > 0 ? financeiro.seguro : editData?.seguro,
                      tv: financeiro.tv!.length > 0 ? financeiro.tv : editData?.tv,
                      vr: financeiro.vr!.length > 0 ? financeiro.vr : editData?.vr,
                      lavanderia:
                        financeiro.lavanderia!.length > 0
                          ? financeiro.lavanderia
                          : editData?.lavanderia,
                      agua: financeiro.agua!.length > 0 ? financeiro.agua : editData?.agua,
                      vt: financeiro.vt!.length > 0 ? financeiro.vt : editData?.vt,
                      energia:
                        financeiro.energia!.length > 0 ? financeiro.energia : editData?.energia,
                      gas: financeiro.gas!.length > 0 ? financeiro.gas : editData?.gas,
                      internet:
                        financeiro.internet!.length > 0 ? financeiro.internet : editData?.internet,
                      va: financeiro.va!.length > 0 ? financeiro.va : editData?.va,
                      faturamento:
                        financeiro.faturamento!.length > 0
                          ? financeiro.faturamento
                          : editData?.faturamento,
                      consumo:
                        financeiro.consumo!.length > 0 ? financeiro.consumo : editData?.consumo,
                    }
                    await api.put(`/relatorio/${editData?.id}`, dataToSend)
                  } else {
                    await api.post('/relatorio', financeiro)
                  }
                  clearData()
                  onClose()
                  updated()
                }}
              >
                Salvar
              </Button>

              <Button
                variant='contained'
                color='secondary'
                onClick={async () => {
                  clearData()
                  onClose()
                  updated()
                }}
              >
                Cancelar
              </Button>
            </Grid>
          </Box>
        </Container>
      </Dialog>
    </ThemeProvider>
  )
}
