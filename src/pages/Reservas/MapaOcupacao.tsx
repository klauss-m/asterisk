import React, { useState, useEffect, useCallback } from 'react'
import {
  CardActionArea,
  Typography,
  CardContent,
  Card,
  Grid,
  Button,
  Box,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import { FormQuarto } from './formQuarto'
import { FormReserva } from './formReserva'
import { FormCheck } from './formCheck'
import api from '../../services/api'
import axios from 'axios'

const theme = createTheme()
const drawerWidth = 240

export interface Quarto {
  id: number
  numero: number
  valor: string
  descricao: string
  status: number
}

export function MapaOcupacao() {
  const [quarto, setQuarto] = useState<Quarto>()
  const [quartos, setQuartos] = useState<Quarto[]>([])
  const [openQuarto, setOpenQuarto] = useState(false)
  const [openReserva, setOpenReserva] = useState(false)
  const [openCheck, setOpenCheck] = useState(false)
  const [updated, setUpdated] = useState(false)

  const cancelToken = axios.CancelToken
  const src = cancelToken.source()

  const loadQuartos = useCallback(async () => {
    try {
      const response = await api.get('quartos', { cancelToken: src.token })
      setQuartos(response.data)
    } catch (error) {
      console.log(error)
    }
  }, [src])

  useEffect(() => {
    loadQuartos()
    return () => src.cancel('cancel')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (updated) {
      loadQuartos()
      setUpdated(false)
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated])

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
          <FormQuarto
            openPopup={openQuarto}
            onClose={() => setOpenQuarto(false)}
            updated={() => setUpdated(true)}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={() => setOpenQuarto(true)}
            sx={{ margin: 1 }}
          >
            Novo Quarto
          </Button>
          <Grid
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {quartos
              .sort((a, b) => {
                if (a.numero > b.numero) return 1
                if (a.numero < b.numero) return -1
                return 0
              })
              .map((quarto) => {
                let bgColor = ''
                switch (quarto.status) {
                  case 0:
                    bgColor = '#d4fcdb'
                    break
                  case 1:
                    bgColor = '#fcfad4'
                    break
                  case 2:
                    bgColor = '#fcdcd4'
                    break
                  default:
                    bgColor = '#ffffff'
                }

                return (
                  <Card
                    key={quarto.id}
                    sx={{ width: 200, height: 200, margin: 1, position: 'relative' }}
                  >
                    <CardActionArea
                      sx={{ width: 200, height: 200, backgroundColor: bgColor }}
                      onClick={() => {
                        setQuarto(quarto)
                        switch (quarto.status) {
                          case 0:
                            setOpenReserva(true)
                            break
                          case 1:
                          case 2:
                            setOpenCheck(true)
                            break
                          default:
                            break
                        }
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={{ position: 'absolute', top: '10px' }}
                        >
                          Nº: {quarto.numero}
                        </Typography>
                        <Typography
                          variant='h6'
                          sx={{ position: 'absolute', bottom: 2, right: 10 }}
                        >
                          {quarto.descricao}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                )
              })}
          </Grid>
          <FormReserva
            updated={() => setUpdated(true)}
            openPopup={openReserva}
            onClose={() => setOpenReserva(false)}
            quarto={quarto}
          />
          <FormCheck
            openPopup={openCheck}
            onClose={() => setOpenCheck(false)}
            quarto={quarto}
            updated={() => setUpdated(true)}
          />
        </Box>
      </Box>
    </ThemeProvider>
  )
}
