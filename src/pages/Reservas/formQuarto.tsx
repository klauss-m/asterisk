import React, { useEffect, useState } from 'react'
import {
  Button,
  Grid,
  Box,
  Container,
  createTheme,
  ThemeProvider,
  Typography,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Dialog,
  TextField,
} from '@mui/material'
import { LoadingBackdrop } from '../../components/Backdrop'
import api from '../../services/api'

const theme = createTheme()

interface DialogQuartoProps {
  openPopup: boolean
  onClose: () => void
  updated: () => void
}
interface Quarto {
  id?: number
  numero?: number
  valor?: string
  descricao?: string
  status?: number
}

enum ValorQuarto {
  Comum = '$99.00',
  Luxo = '$160.00',
  Presidencial = '$200.00',
}

type TipoQuarto = 'Comum' | 'Luxo' | 'Presidencial'

export function FormQuarto({ openPopup, onClose, updated }: DialogQuartoProps) {
  const [loading, setLoading] = useState(false)
  const [quartos, setQuartos] = useState<Quarto[]>([])
  const [quartoTipo, setQuartoTipo] = useState<TipoQuarto>('Comum')

  async function loadQuartos() {
    setLoading(true)
    const response = await api.get('/quartos')
    setQuartos(response.data)
    setLoading(false)
  }

  useEffect(() => {
    loadQuartos()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={openPopup} onClose={onClose}>
        <Container component='main' maxWidth='xs'>
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component='h1' variant='h5'>
              Cadastro de Quarto
            </Typography>
            <LoadingBackdrop open={loading} />
            <Box component='form' noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ margin: '5px' }}>
                  <FormControl variant='outlined' fullWidth>
                    <InputLabel id='tipoQuarto'>Tipo de Quarto</InputLabel>
                    <Select
                      labelId='tipoQuarto'
                      id='tipoQuarto'
                      label='Tipo de Quarto'
                      name='tipoQuarto'
                      value={quartoTipo}
                      onChange={(e) => setQuartoTipo(e.target.value as TipoQuarto)}
                    >
                      <MenuItem value='Comum'>Suíte Comum</MenuItem>
                      <MenuItem value='Luxo'>Suíte Luxo</MenuItem>
                      <MenuItem value='Presidencial'>Suíte Presidêncial</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ margin: '5px' }}>
                  <TextField
                    variant='outlined'
                    disabled
                    fullWidth
                    id='numeroQuarto'
                    label='Número do Quarto'
                    name='numeroQuarto'
                    autoComplete='numeroQuarto'
                    value={quartos.map((q) => q.numero).length + 1}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ margin: '5px' }}>
                  <TextField
                    variant='outlined'
                    disabled
                    fullWidth
                    id='valorQuarto'
                    label='Valor do Quarto'
                    name='valorQuarto'
                    autoComplete='valorQuarto'
                    value={ValorQuarto[quartoTipo]}
                  />
                </Grid>
              </Grid>
              <Grid
                sx={{ marginTop: '10px', marginBottom: '10px' }}
                container
                direction='row'
                alignItems='center'
                justifyContent='space-between'
              >
                <Grid item>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={async () => {
                      setLoading(true)
                      await api.post('/quarto', {
                        numero: quartos.map((q) => q.numero).length + 1,
                        valor: ValorQuarto[quartoTipo],
                        descricao: quartoTipo,
                        status: 0,
                      })
                      setLoading(false)
                      onClose()
                      updated()
                    }}
                  >
                    Salvar
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    type='button'
                    color='error'
                    fullWidth
                    variant='contained'
                    onClick={onClose}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Dialog>
    </ThemeProvider>
  )
}
