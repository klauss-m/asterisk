import React, { useState, useEffect } from 'react'
import { CardActionArea, Typography, CardMedia, CardContent, Card, Grid } from '@mui/material'
import api from '../../services/api'

interface QuartosProps {
  id: string
  numero: number
  valor: number
  descricao: string
  status: boolean
}

export function MapaOcupacao() {
  const [quartos, setQuartos] = useState<QuartosProps[]>([])

  useEffect(() => {
    loadQuartos()
  }, [])

  async function loadQuartos() {
    const response = await api.get('/quartos')
    console.log(response)
    setQuartos(response.data)
  }

  return (
    <Grid sx={{ margin: '100px 100px' }}>
      <Grid>
        {quartos.map((quarto) => (
          <Card key={quarto.id} sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {quarto.descricao}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {quarto.status}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Grid>
    </Grid>
  )
}
