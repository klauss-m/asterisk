import React, { useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import {
  Autocomplete,
  Grid,
  Box,
  Container,
  createTheme,
  ThemeProvider,
  Typography,
  Dialog,
  TextField,
  Button,
} from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/lab'
import AdapterLuxon from '@mui/lab/AdapterLuxon'
import { LoadingBackdrop } from '../../components/Backdrop'
import api from '../../services/api'
import { Quarto } from './MapaOcupacao'

const theme = createTheme()

interface DialogReservaProps {
  openPopup: boolean
  onClose: () => void
  quarto?: Quarto
  updated: () => void
}

export interface Reserva {
  id_quarto?: number
  id_cliente?: number
  nome?: string
  data_registro?: string
  obs?: string
  checkin?: string
  checkout?: string
}

interface Clientes {
  id: number
  nome: string
}

export function FormReserva({ openPopup, onClose, quarto, updated }: DialogReservaProps) {
  const [loading, setLoading] = useState(false)
  const [reserva, setReserva] = useState<Reserva>({})
  const [reservas, setReservas] = useState<Reserva[]>([])
  const [clientes, setClientes] = useState<Clientes[]>([])
  const [checkin, setCheckin] = useState<DateTime | null>(null)
  const [checkout, setCheckout] = useState<DateTime | null>(null)
  const [cliente, setCliente] = useState('')

  useEffect(() => {
    async function loadReservas() {
      const response = await api.get(`/checks`)
      setReservas(response.data)
    }
    async function loadClientes() {
      const response = await api.get(`/clientes`)
      setClientes(response.data)
    }
    if (quarto) {
      setLoading(true)
      loadClientes()
      loadReservas()
      setLoading(false)
    }
  }, [quarto])

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
            <Typography component='h1' variant='h5'>
              Reserva {quarto?.numero}
            </Typography>
            <LoadingBackdrop open={loading} />
            <Box component='form' noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ margin: '10px' }}>
                  <Autocomplete
                    disablePortal
                    id='combo-box-client'
                    options={clientes
                      .filter((c) => !reservas.map((r) => r.id_cliente).includes(c.id))
                      .map((option) => ({ label: option.nome }))}
                    sx={{ width: 400 }}
                    renderInput={(params) => <TextField {...params} label='Cliente' />}
                    onChange={(event, value) => {
                      setCliente(value!.label)
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterLuxon}>
                    <DatePicker
                      label='Checkin'
                      value={checkin}
                      onChange={(date) => {
                        setCheckin(date)
                      }}
                      renderInput={(params) => <TextField {...params} sx={{ margin: '10px' }} />}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterLuxon}>
                    <DatePicker
                      label='Checkout'
                      value={checkout}
                      onChange={(date) => {
                        setCheckout(date)
                      }}
                      renderInput={(params) => <TextField {...params} sx={{ margin: '10px' }} />}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ margin: 1 }}>
                  <TextField
                    variant='outlined'
                    fullWidth
                    multiline
                    rows={4}
                    label='Observações'
                    value={reserva.obs}
                    onChange={(event) => {
                      setReserva({ ...reserva, obs: event.target.value })
                    }}
                  />
                </Grid>
              </Grid>

              <Typography component='h1' variant='h5' sx={{ textAlign: 'center' }}>
                {(!checkin || !checkout) && 'Escolha as datas'}
                {checkin &&
                  checkout &&
                  checkin.toMillis() > checkout.toMillis() &&
                  'Data de checkin maior que checkout'}
                {checkin?.toFormat('dd/MM/yyyy') === checkout?.toFormat('dd/MM/yyyy') &&
                  checkin &&
                  checkout !== null &&
                  'Data de checkin e checkout são as mesmas'}
                {checkin &&
                  checkout &&
                  quarto &&
                  checkin.toMillis() < checkout.toMillis() &&
                  checkin?.toFormat('dd/MM/yyyy') !== checkout?.toFormat('dd/MM/yyyy') &&
                  new Intl.NumberFormat('pt-BR', { currency: 'BRL', style: 'currency' }).format(
                    parseFloat(quarto.valor.replace('$', '')) *
                      Math.floor(checkout.diff(checkin, 'days').days),
                  )}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ margin: '20px' }}>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              onClick={async () => {
                if (checkin && checkout && quarto) {
                  setLoading(true)
                  await api.post(`/check`, {
                    id_quarto: quarto.id,
                    id_cliente: clientes.find((c) => c.nome === cliente)!.id,
                    nome: cliente,
                    data_registro: DateTime.local().toFormat('yyyy-MM-dd'),
                    checkin: checkin.toFormat('yyyy-MM-dd'),
                    checkout: checkout.toFormat('yyyy-MM-dd'),
                    obs: reserva.obs,
                  })
                  const responseQuarto = await api.get(`/quarto/${quarto.id}`)
                  await api.put(`/quarto/${quarto.id}`, {
                    ...(responseQuarto.data as Quarto),
                    status: 1,
                  })
                  setLoading(false)
                  onClose()
                  updated()
                }
              }}
            >
              Reservar
            </Button>
          </Box>
        </Container>
      </Dialog>
    </ThemeProvider>
  )
}
