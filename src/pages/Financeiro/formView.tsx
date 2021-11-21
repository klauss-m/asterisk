import React from 'react'
import { Grid, Box, Container, createTheme, ThemeProvider, Typography, Dialog } from '@mui/material'

import { Financeiro } from './formFinanceiro'

const theme = createTheme()

interface DialogFinanceiroViewProps {
  openPopup: boolean
  onClose: () => void
  viewData?: Financeiro
}

export function FormView({ openPopup, onClose, viewData }: DialogFinanceiroViewProps) {
  return (
    <ThemeProvider theme={theme}>
      <Dialog open={openPopup} onClose={onClose}>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box p={3}>
                <Typography variant='h6' sx={{ textAlign: 'center', margin: 2 }}>
                  Relatório {viewData?.data}
                </Typography>
                <Typography variant='body1'>
                  <strong>Aluguel:</strong> {viewData?.aluguel}
                </Typography>
                <Typography variant='body1'>
                  <strong>Telefone:</strong> {viewData?.telefone}
                </Typography>
                <Typography variant='body1'>
                  <strong>Planos de Saúde:</strong> {viewData?.plano_saude}
                </Typography>
                <Typography variant='body1'>
                  <strong>Seguro:</strong> {viewData?.seguro}
                </Typography>
                <Typography variant='body1'>
                  <strong>Tv a cabo:</strong> {viewData?.tv}
                </Typography>
                <Typography variant='body1' sx={{}}>
                  <strong>Vale-refeição dos funcionários:</strong> {viewData?.vr}
                </Typography>
                <Typography variant='body1'>
                  <strong>Lavanderia:</strong> {viewData?.lavanderia}
                </Typography>
                <Typography variant='body1'>
                  <strong>Água:</strong> {viewData?.agua}
                </Typography>
                <Typography variant='body1'>
                  <strong>Vale-Transporte dos funcionários:</strong> {viewData?.vt}
                </Typography>
                <Typography variant='body1'>
                  <strong>Energia:</strong> {viewData?.energia}
                </Typography>
                <Typography variant='body1'>
                  <strong>Gás:</strong> {viewData?.gas}
                </Typography>
                <Typography variant='body1'>
                  <strong>Internet:</strong> {viewData?.internet}
                </Typography>
                <Typography variant='body1'>
                  <strong>Vale-Alimentação dos funcionários:</strong> {viewData?.va}
                </Typography>
                <Typography variant='body1'>
                  <strong>Faturamento do mês:</strong> {viewData?.faturamento}
                </Typography>
                <Typography variant='body1'>
                  <strong>Consumo:</strong> {viewData?.consumo}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Dialog>
    </ThemeProvider>
  )
}
