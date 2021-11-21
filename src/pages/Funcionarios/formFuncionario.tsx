import React, { useState, useEffect } from 'react'
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
} from '@mui/material'
import { ValidationInput } from './ValidationInput'
import { FormEmployee, useInputs } from '../../hooks/useInputs'
import { useValidate } from '../../hooks/useValidate'
import { LoadingBackdrop } from '../../components/Backdrop'
import api from '../../services/api'

const theme = createTheme()
interface DialogFuncionarioProps {
  openPopup: boolean
  data?: FormEmployee
  editId?: number
  onClose: () => void
  updated: () => void
}

export function FormFuncionario({
  openPopup,
  onClose,
  data,
  editId,
  updated,
}: DialogFuncionarioProps) {
  const [loading, setLoading] = useState(false)
  const { formEmployee, setFormEmployee, fetchAddressEmployee, setEmployee } = useInputs()
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

  useEffect(() => {
    if (data) {
      setEmployee({
        ...data!,
        gender: data.gender === '1' ? 'M' : 'F',
        active: data.active === '1' ? 'Ativo' : 'Inativo',
      })
    }
  }, [setEmployee, data])

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
                    formEmployee={formEmployee}
                    setErrors={setErrors}
                    setFormEmployee={setFormEmployee}
                    editData={data ? data.name : undefined}
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
                      defaultValue={data ? data.gender : 'M'}
                      onChange={(e) => setFormEmployee('gender', e.target.value)}
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
                  <FormControl variant='outlined' fullWidth>
                    <InputLabel htmlFor='outlined-role-native-simple'>Cargo</InputLabel>
                    <Select
                      labelId='role'
                      id='role'
                      variant='outlined'
                      label='Cargo'
                      defaultValue={data ? data.role : 'Balconista'}
                      onChange={(e) => setFormEmployee('role', e.target.value)}
                      inputProps={{
                        name: 'role',
                        id: 'outlined-role-native-simple',
                      }}
                    >
                      <MenuItem value='Balconista'>Balconista</MenuItem>
                      <MenuItem value='Gerente'>Gerente</MenuItem>
                      <MenuItem value='Cozinheiro'>Cozinheiro</MenuItem>
                      <MenuItem value='Governanta'>Governanta</MenuItem>
                      <MenuItem value='Auxiliar Geral'>Auxiliar Geral</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='salary'
                    fieldLabel='Salário'
                    errors={errors}
                    formEmployee={formEmployee}
                    setErrors={setErrors}
                    setFormEmployee={setFormEmployee}
                    editData={data ? data.name : undefined}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl variant='outlined' fullWidth>
                    <InputLabel htmlFor='outlined-active-native-simple'>Status</InputLabel>
                    <Select
                      labelId='active'
                      id='active'
                      variant='outlined'
                      label='Status'
                      defaultValue={data ? data.active : 'Ativo'}
                      onChange={(e) => setFormEmployee('active', e.target.value)}
                      inputProps={{
                        name: 'active',
                        id: 'outlined-active-native-simple',
                      }}
                    >
                      <MenuItem value='Ativo'>Ativo</MenuItem>
                      <MenuItem value='Inativo'>Inativo</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl variant='outlined' fullWidth>
                    <InputLabel htmlFor='outlined-maritalStatus-native-simple'>
                      Estado Civil
                    </InputLabel>
                    <Select
                      labelId='maritalStatus'
                      id='maritalStatus'
                      variant='outlined'
                      label='maritalStatus'
                      defaultValue={data ? data.maritalStatus : 'Solteiro'}
                      onChange={(e) => setFormEmployee('maritalStatus', e.target.value)}
                      inputProps={{
                        name: 'maritalStatus',
                        id: 'outlined-maritalStatus-native-simple',
                      }}
                    >
                      <MenuItem value='Casado'>Casado</MenuItem>
                      <MenuItem value='Solteiro'>Solteiro</MenuItem>
                      <MenuItem value='Divorciado'>Divorciado</MenuItem>
                      <MenuItem value='Viúvo'>Viúvo</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='cpf'
                    fieldLabel='CPF'
                    errors={errors}
                    formEmployee={formEmployee}
                    setErrors={setErrors}
                    setFormEmployee={setFormEmployee}
                    editData={data ? data.name : undefined}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='rg'
                    fieldLabel='RG'
                    errors={errors}
                    formEmployee={formEmployee}
                    setErrors={setErrors}
                    setFormEmployee={setFormEmployee}
                    editData={data ? data.name : undefined}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='pis'
                    fieldLabel='PIS/PASEP'
                    errors={errors}
                    formEmployee={formEmployee}
                    setErrors={setErrors}
                    setFormEmployee={setFormEmployee}
                    editData={data ? data.name : undefined}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='cnh'
                    fieldLabel='cnh'
                    errors={errors}
                    formEmployee={formEmployee}
                    setErrors={setErrors}
                    setFormEmployee={setFormEmployee}
                    editData={data ? data.name : undefined}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='birthday'
                    fieldLabel='Data de Nascimento'
                    errors={errors}
                    formEmployee={formEmployee}
                    setErrors={setErrors}
                    setFormEmployee={setFormEmployee}
                    type='date'
                    editData={data ? data.name : undefined}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='email'
                    fieldLabel='E-mail'
                    errors={errors}
                    formEmployee={formEmployee}
                    setErrors={setErrors}
                    setFormEmployee={setFormEmployee}
                    editData={data ? data.name : undefined}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='phone'
                    fieldLabel='Telefone'
                    errors={errors}
                    formEmployee={formEmployee}
                    setErrors={setErrors}
                    setFormEmployee={setFormEmployee}
                    editData={data ? data.name : undefined}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='zip'
                    fieldLabel='CEP'
                    errors={errors}
                    formEmployee={formEmployee}
                    setErrors={setErrors}
                    setFormEmployee={setFormEmployee}
                    onchange={async (e) => {
                      setErrors(errors.filter((error) => !Object.keys(error).includes('zip')))
                      await fetchAddressEmployee(e.target.value)
                    }}
                    editData={data ? data.zip : undefined}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='address'
                    fieldLabel='Endereço'
                    errors={errors}
                    formEmployee={formEmployee}
                    setErrors={setErrors}
                    setFormEmployee={setFormEmployee}
                    onchange={() => {}}
                    value
                    readonly
                    editData={data ? data.name : undefined}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='city'
                    fieldLabel='Cidade'
                    errors={errors}
                    formEmployee={formEmployee}
                    setErrors={setErrors}
                    setFormEmployee={setFormEmployee}
                    onchange={() => {}}
                    value
                    readonly
                    editData={data ? data.name : undefined}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='state'
                    fieldLabel='Estado'
                    errors={errors}
                    formEmployee={formEmployee}
                    setErrors={setErrors}
                    setFormEmployee={setFormEmployee}
                    onchange={() => {}}
                    value
                    readonly
                    editData={data ? data.name : undefined}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='number'
                    fieldLabel='Nº'
                    errors={errors}
                    formEmployee={formEmployee}
                    setErrors={setErrors}
                    setFormEmployee={setFormEmployee}
                    editData={data ? data.name : undefined}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ValidationInput
                    field='complement'
                    fieldLabel='Complemento'
                    errors={errors}
                    formEmployee={formEmployee}
                    setErrors={setErrors}
                    setFormEmployee={setFormEmployee}
                    editData={data ? data.name : undefined}
                  />
                </Grid>
              </Grid>
              <Grid container direction='row' alignItems='center' justifyContent='space-between'>
                <Grid item>
                  <Button
                    onClick={async () => {
                      setLoading(true)
                      resetErrors()
                      const validationErrors = validate(formEmployee)
                      setErrors(validationErrors)
                      if (validationErrors.length === 0) {
                        const tempAddress = formEmployee.address.split(' - ')
                        tempAddress.splice(1, 0, formEmployee.number)
                        tempAddress.splice(2, 0, formEmployee.complement)
                        const dataToSend = {
                          nome: formEmployee.name,
                          cpf: formEmployee.cpf,
                          sexo: formEmployee.gender === 'M' ?? false,
                          data_nascimento: formEmployee.birthday,
                          email: formEmployee.email,
                          telefone: formEmployee.phone,
                          pais: 'Brasil',
                          cidade: formEmployee.city,
                          estado: formEmployee.state,
                          endereco: tempAddress.join(' - '),
                          cep: formEmployee.zip,
                          senha: data ? data.password : formEmployee.cpf,
                          cnh: formEmployee.cnh,
                          pis: formEmployee.pis,
                          rg: formEmployee.rg,
                          ativo: formEmployee.active === 'Ativo' ?? false,
                          estado_civil: formEmployee.maritalStatus,
                          cargo: formEmployee.role,
                          data_cadastro: formEmployee.registerDate,
                          data_admissao: formEmployee.dateAdmission,
                          data_demissao: formEmployee.dateDemission,
                          salario: formEmployee.salary,
                        }
                        try {
                          const send = !data ? '' : `/${editId}`
                          await api(`funcionario${send}`, {
                            method: data ? 'PUT' : 'POST',
                            data: {
                              ...dataToSend,
                              sexo: dataToSend.sexo ? 1 : 0,
                              ativo: dataToSend.ativo ? 1 : 0,
                            },
                            headers: { 'Content-Type': 'application/json' },
                          })
                        } catch (e) {
                          console.log(e)
                        } finally {
                          onClose()
                          updated()
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
