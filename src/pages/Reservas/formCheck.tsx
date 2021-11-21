import React, { useState, useEffect } from 'react'
import { Typography, Box, Grid, Dialog, ThemeProvider, createTheme, Button } from '@mui/material'
import { DateTime } from 'luxon'

import api from '../../services/api'
import { Quarto } from './MapaOcupacao'

const theme = createTheme()

interface DialogCheckProps {
  openPopup: boolean
  onClose: () => void
  quarto?: Quarto
  updated: () => void
}

export interface ReservaCheck {
  id?: number
  checkin?: string
  checkout?: string
  obs?: string
  cliente?: {
    id?: number
    nome?: string
  }
  quarto?: {
    id?: number
    numero?: number
    valor?: number
    descricao?: string
    status?: string
  }
}

export function FormCheck({ openPopup, onClose, quarto, updated }: DialogCheckProps) {
  const [reserva, setReserva] = useState<ReservaCheck>({})

  useEffect(() => {
    async function loadReservas() {
      const response = await api.get<ReservaCheck[]>(`/checks/`)
      const responseFilter = response.data.filter((r) => r.quarto?.id === quarto?.id)[0]
      setReserva(responseFilter)
    }
    loadReservas()
  }, [quarto])

  return (
    <>
      {openPopup && reserva && (
        <ThemeProvider theme={theme}>
          <Dialog open={openPopup} onClose={onClose}>
            <Box p={2}>
              <Typography variant='h6'>Check</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant='body1'>
                    <strong>Nome: </strong>
                    {reserva.cliente?.nome}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body1'>
                    <strong>Data de Checkin: </strong> {reserva.checkin}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body1'>
                    <strong>Data de Checkout: </strong> {reserva.checkout}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body1'>
                    <strong>Observações: </strong> {reserva.obs}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body1'>
                    <strong>
                      Valor:{' '}
                      {new Intl.NumberFormat('pt-BR', {
                        currency: 'BRL',
                        style: 'currency',
                      }).format(
                        parseFloat(quarto!.valor!.replace('$', '')) *
                          Math.floor(
                            DateTime.fromISO(reserva.checkout!).diff(
                              DateTime.fromISO(reserva.checkin!),
                              'days',
                            ).days,
                          ),
                      )}
                    </strong>
                  </Typography>
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                <Button
                  sx={{ visibility: quarto?.status === 2 ? 'hidden' : 'visible' }}
                  variant='contained'
                  color='primary'
                  onClick={async () => {
                    await api.put(`quarto/${quarto?.id}`, {
                      numero: quarto?.numero,
                      valor: quarto?.valor,
                      descricao: quarto?.descricao,
                      status: 2,
                    })
                    onClose()
                    updated()
                  }}
                >
                  Checkin
                </Button>
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={async () => {
                    await api.put(`quarto/${quarto?.id}`, {
                      numero: quarto?.numero,
                      valor: quarto?.valor,
                      descricao: quarto?.descricao,
                      status: 0,
                    })
                    await api.delete(`/check/${reserva.id}`)
                    onClose()
                    updated()
                  }}
                  sx={{ ml: 1 }}
                >
                  {quarto?.status === 2 ? 'Checkout' : 'Cancelar'}
                </Button>
              </Box>
            </Box>
          </Dialog>
        </ThemeProvider>
      )}
    </>
  )
}
