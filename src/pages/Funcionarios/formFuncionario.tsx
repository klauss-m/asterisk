import React, { useState } from 'react'
import {
  Button,
  CssBaseline,
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
} from '@mui/material'
import { ValidationInput } from './ValidationInput'
import { useInputs } from '../../hooks/useInputs'
import { useValidate } from '../../hooks/useValidate'
import { LoadingBackdrop } from '../../components/Backdrop'
import api from '../../services/api'

const theme = createTheme()

interface DialogClienteProps {
  openPopup: boolean
  setOpenPopup: (active: boolean) => void
  onClose: () => void
}

export function FormFuncionario({ openPopup, setOpenPopup, onClose }: DialogClienteProps) {
  const [loading, setLoading] = useState(false)
  const { formData, setFormData, fetchAddress } = useInputs()
  const { validate, errors, setErrors, resetErrors } = useValidate([
    'name',
    'gender',
    'email',
    'birthday',
    'cpf',
    'phone',
    'zip',
    'number',
    'complement',
  ])

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={openPopup} onClose={onClose}>
        <Container component='main' maxWidth='xs'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component='h1' variant='h5'>
              Cadastro
            </Typography>
            <LoadingBackdrop open={loading} />
            <Box component='form' noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='name'
                    fieldLabel='Nome'
                    errors={errors}
                    formData={formData}
                    setErrors={setErrors}
                    setFormData={setFormData}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl variant='outlined' fullWidth>
                    <InputLabel htmlFor='outlined-gender-native-simple'>Gênero</InputLabel>
                    <Select
                      labelId='gender'
                      id='gender'
                      variant='outlined'
                      label='Gênero'
                      defaultValue={'M'}
                      onChange={(e) => setFormData('gender', e.target.value)}
                      inputProps={{
                        name: 'gender',
                        id: 'outlined-gender-native-simple',
                      }}
                    >
                      <MenuItem value='M'>Masculino</MenuItem>
                      <MenuItem value='F'>Feminino</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='cpf'
                    fieldLabel='CPF'
                    errors={errors}
                    formData={formData}
                    setErrors={setErrors}
                    setFormData={setFormData}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='birthday'
                    fieldLabel='Data de Nascimento'
                    errors={errors}
                    formData={formData}
                    setErrors={setErrors}
                    setFormData={setFormData}
                    type='date'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='email'
                    fieldLabel='E-mail'
                    errors={errors}
                    formData={formData}
                    setErrors={setErrors}
                    setFormData={setFormData}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='phone'
                    fieldLabel='Telefone'
                    errors={errors}
                    formData={formData}
                    setErrors={setErrors}
                    setFormData={setFormData}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='zip'
                    fieldLabel='CEP'
                    errors={errors}
                    formData={formData}
                    setErrors={setErrors}
                    setFormData={setFormData}
                    onchange={async (e) => await fetchAddress(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='address'
                    fieldLabel='Endereço'
                    errors={errors}
                    formData={formData}
                    setErrors={setErrors}
                    setFormData={setFormData}
                    onchange={() => {}}
                    value
                    readonly
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='city'
                    fieldLabel='Cidade'
                    errors={errors}
                    formData={formData}
                    setErrors={setErrors}
                    setFormData={setFormData}
                    onchange={() => {}}
                    value
                    readonly
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='state'
                    fieldLabel='Estado'
                    errors={errors}
                    formData={formData}
                    setErrors={setErrors}
                    setFormData={setFormData}
                    onchange={() => {}}
                    value
                    readonly
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='number'
                    fieldLabel='Nº'
                    errors={errors}
                    formData={formData}
                    setErrors={setErrors}
                    setFormData={setFormData}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='complement'
                    fieldLabel='Complemento'
                    errors={errors}
                    formData={formData}
                    setErrors={setErrors}
                    setFormData={setFormData}
                  />
                </Grid>
              </Grid>
              <Grid container direction='row' alignItems='center' justifyContent='space-between'>
                <Grid item>
                  <Button
                    onClick={async () => {
                      setLoading(true)
                      resetErrors()
                      const validationErrors = validate(formData)
                      setErrors(validationErrors)
                      if (validationErrors.length === 0) {
                        const data = {
                          nome: formData.name,
                          cpf: formData.cpf,
                          sexo: formData.gender === 'M' ?? false,
                          data_nascimento: formData.birthday,
                          email: formData.email,
                          telefone: formData.phone,
                          pais: 'Brasil',
                          cidade: formData.city,
                          estado: formData.state,
                          endereco: formData.address,
                          cep: formData.zip,
                        }
                        try {
                          const response = await api.post('cliente', data, {
                            headers: { 'Content-Type': 'application/json' },
                          })
                          console.log(response)
                        } catch (e) {
                          console.log(e)
                        }
                      }
                      setLoading(false)
                    }}
                    type='button'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Registrar
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={() => onClose()}
                    type='button'
                    color='error'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
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
