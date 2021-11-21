import React, { useState, useEffect } from 'react'
import { Box, Toolbar, Typography, Paper, Card, CardContent, CardHeader } from '@mui/material'
import { useLogin } from '../../hooks/useLogin'
import { ReservaCheck } from '../Reservas/formCheck'

import api from '../../services/api'

const drawerWidth = 240
interface Props {
  window?: () => Window
}

export function Hospede({ window }: Props) {
  const [reserva, setReserva] = useState<ReservaCheck | undefined>(undefined)
  const { user } = useLogin()

  useEffect(() => {
    async function loadReservas() {
      const response = await api.get<ReservaCheck[]>(`/checks/`)
      const responseFilter = response.data.filter((r) => r.cliente?.id === user?.id)
      if (responseFilter.length > 0) {
        setReserva(responseFilter[0])
      }
    }
    loadReservas()
  }, [user])

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
        <Toolbar />
        {reserva && (
          <Card sx={{ maxWidth: '300px' }}>
            <CardHeader title='Reserva' />
            <CardContent>
              <Typography variant='h6' gutterBottom>
                <strong>Nome:</strong> {reserva.cliente?.nome}
              </Typography>
              <Typography variant='body2' gutterBottom>
                <strong>Data de Checkin: </strong>
                {reserva.checkin}
              </Typography>
              <Typography variant='body2' gutterBottom>
                <strong>Data de Checkout: </strong>
                {reserva.checkout}
              </Typography>
              <Typography variant='body2' gutterBottom>
                <strong>Número do Quarto: </strong>
                {reserva.quarto?.numero}
              </Typography>
              <Typography variant='body2' gutterBottom>
                <strong>Valor: </strong>R{reserva.quarto?.valor}
              </Typography>
            </CardContent>
          </Card>
        )}
        {!reserva && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper sx={{ p: 3, height: '200px' }}>
              <Typography variant='h6' gutterBottom>
                Você não possui reservas!
              </Typography>
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  )
}
