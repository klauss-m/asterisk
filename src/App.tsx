import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { CssBaseline } from '@mui/material'

import { LandingPage } from './pages/Landing'
import { Main } from './pages/Main'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Hospede } from './pages/Hospede'
import { Clientes } from './pages/Clientes'
import { Reservas } from './pages/Reservas'
import { Funcionarios } from './pages/Funcionarios'
import { Financeiro } from './pages/Financeiro'
import { useLogin } from './hooks/useLogin'
import { useEffect } from 'react'

function App() {
  const { user } = useLogin()

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          <Route path='/home' exact>
            <LandingPage />
          </Route>
          <Route path='/next'>
            {!user && <Redirect to='/login' />}
            {user && user.role === 'Hospede' && <Redirect to='/hospede' />}
            {user && user.role !== 'Hospede' && <Redirect to='/main' />}
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/signup'>
            <Signup />
          </Route>
          <Route path='/hospede'>
            <Main>
              <Hospede />
            </Main>
          </Route>
          <Route path='/main'>
            {!user && <Redirect to='/login' />}
            <Route path='/main' exact>
              <Redirect to='/main/reservas' />
            </Route>
            <Route path='/main/clientes'>
              <Main>
                <Clientes />
              </Main>
            </Route>
            <Route path='/main/funcionarios'>
              <Main>
                <Funcionarios />
              </Main>
            </Route>
            <Route path='/main/reservas'>
              <Main>
                <Reservas />
              </Main>
            </Route>
            <Route path='/main/financeiro'>
              <Main>
                <Financeiro />
              </Main>
            </Route>
          </Route>
        </Switch>
      </Router>
    </>
  )
}

export default App
