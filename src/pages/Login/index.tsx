import React, { useEffect, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  createTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material'

import LogoStyle from './../../layout/logo'
import bgHotel from './../../images/hotelroom.jpg'

import { Copyright } from '../../layout/components/Copyright'
import { ValidationInput } from '../Clientes/ValidationInput'
import { useValidate } from '../../hooks/useValidate'
import { useInputs } from '../../hooks/useInputs'
import { useLogin } from '../../hooks/useLogin'
import { useHistory } from 'react-router-dom'
import api from '../../services/api'
import { User, UserRole } from '../../state/app-state'

const theme = createTheme()

export function Login() {
  const { validate, errors, setErrors, resetErrors } = useValidate(['email', 'password'])
  const { formData, setFormData } = useInputs()
  const { setUser } = useLogin()
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  async function doLogin(email: string, password: string) {
    try {
      const response: {
        data: {
          id: number
          nome: string
          email: string
          cargo?: UserRole
        }
      } = await api.post(
        'login',
        {
          email,
          senha: password,
        },
        { headers: { 'Content-Type': 'application/json' } },
      )
      const user: User = {
        id: response.data.id,
        name: response.data.nome,
        email: response.data.email,
        role: response.data.cargo ?? 'Hospede',
      }
      setUser(user)
      history.push('/next')
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const autoLogin = JSON.parse(sessionStorage.getItem('remember-me') ?? 'false') as boolean
    if (autoLogin) {
      //
    }
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Grid container component='main' sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${bgHotel})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'white' }}>
              <LogoStyle />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Entrar
            </Typography>
            <Box component='form' sx={{ mt: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <ValidationInput
                    field='email'
                    fieldLabel='E-mail'
                    errors={errors}
                    formData={formData}
                    setErrors={setErrors}
                    setFormData={setFormData}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ValidationInput
                    field='password'
                    fieldLabel='Senha'
                    errors={errors}
                    formData={formData}
                    setErrors={setErrors}
                    setFormData={setFormData}
                    type='password'
                  />
                </Grid>
              </Grid>
              <FormControlLabel
                control={
                  <Checkbox
                    color='primary'
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                }
                label='Lembrar-me'
              />
              <Button
                type='button'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                onClick={async () => {
                  resetErrors()
                  const validationErrors = validate(formData)
                  setErrors(validationErrors)
                  if (validationErrors.length === 0) {
                    await doLogin(formData.email, formData.password)
                  }
                }}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2' onClick={handleClickOpen}>
                    Esqueceu a senha?
                  </Link>
                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='responsive-dialog-title'
                  >
                    <DialogTitle id='responsive-dialog-title'>{'Recuperar Senha'}</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Digite seu e-mail logo abaixo, caso ele esteja cadastrado em nosso sistema
                        você receberá uma mensagem com os passos a serem seguidos para recuperar sua
                        senha.
                      </DialogContentText>
                      <TextField
                        margin='normal'
                        required
                        fullWidth
                        name='emailRec'
                        label='Email'
                        type='email'
                        id='emailRec'
                        autoComplete='email'
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button autoFocus onClick={handleClose}>
                        Recusar
                      </Button>
                      <Button onClick={handleClose} autoFocus>
                        Aceitar
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
                <Grid item>
                  <Link href='/signup' variant='body2'>
                    {'Não tem uma conta? Cadastre-se!'}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
