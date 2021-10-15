import React from 'react'
import { Typography, Link } from '@mui/material'

export function Copyright(props: any) {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='/home'>
        Asterisk Hotel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
