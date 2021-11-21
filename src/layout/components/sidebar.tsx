import React, { useState } from 'react'
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Drawer,
} from '@mui/material'
import { RoomService, AccountBox, Work, MonetizationOn, Logout, Menu } from '@mui/icons-material'
import { useHistory } from 'react-router'
import { useLogin } from '../../hooks/useLogin'

//import Logo from './logo';

const drawerWidth = 240

interface Props {
  window?: () => Window
  pageTitle: string
}

export default function Sidebar({ window, pageTitle }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logoff } = useLogin()
  const history = useHistory()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {user?.role !== 'Hospede' && (
          <>
            <ListItem button onClick={() => history.push('/main/reservas')}>
              <ListItemIcon>
                <RoomService />
              </ListItemIcon>
              <ListItemText primary='Reservas' />
            </ListItem>
            <ListItem button onClick={() => history.push('/main/clientes')}>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary='Clientes' />
            </ListItem>
            <ListItem button onClick={() => history.push('/main/funcionarios')}>
              <ListItemIcon>
                <Work />
              </ListItemIcon>
              <ListItemText primary='Funcionários' />
            </ListItem>
            <ListItem button onClick={() => history.push('/main/financeiro')}>
              <ListItemIcon>
                <MonetizationOn />
              </ListItemIcon>
              <ListItemText primary='Financeiro' />
            </ListItem>
          </>
        )}
        <ListItem
          button
          onClick={() => {
            logoff()
            history.push('/login')
          }}
        >
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary='Sair' />
        </ListItem>
      </List>
    </div>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position='fixed'
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label='menu folders'
      >
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}
