import { Backdrop, CircularProgress } from '@mui/material'

interface BackdropProps {
  open: boolean
}

export function LoadingBackdrop({ open }: BackdropProps) {
  return (
    <Backdrop
      sx={{ color: '#fff' }}
      open={open}
      // onClick={handleClose}
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}
