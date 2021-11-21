import { Dialog, DialogTitle, DialogContent, DialogContentText, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface LGPDProps {
  open: boolean
  fullScreen: boolean
  onclose: () => void
}

export function LGPD({ open, fullScreen, onclose }: LGPDProps) {
  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={onclose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='responsive-dialog-title' sx={{ textAlign: 'center' }}>
          Termos de consentimento LGPD
          <IconButton
            aria-label='close'
            onClick={onclose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>
              Este documento visa registrar a manifestação livre, informada e inequívoca pela qual o
              titular concorda com o tratamento de seus dados pessoais para finalidade específica,
              em conformidade com a Lei nº 13.709 – Lei Geral de Proteção de Dados Pessoais (LGPD).
            </p>
            <p>
              Informamos que coletamos seus dados pessoais (CPF, Nome, Telefone, E-mail, Endereço)
              para Cupom Fiscal, Efetuação de reservas, compras feitas dentro do hotel. Os seus
              dados pessoais serão armazenados e preservados por um período indeterminado; os dados
              dos clientes são registrados no sistema e podem ser anonimizados a qualquer momento,
              desde que o cliente solicite.
            </p>
            <p>Você poderá, a qualquer momento:</p>
            <ul>
              <li>
                Ter acesso às informações sobre a forma e a duração de tratamento dos seus dados na
                nossa plataforma;
              </li>
              <li>Solicitar a atualização ou correção dos seus dados;</li>
              <li>
                Solicitar a eliminação dos seus dados pessoais tratados e revogação do
                consentimento, nos termos da Lei.
              </li>
            </ul>
            <p>
              As solicitações e questionamentos acerca do tratamento e eliminação de seus dados
              deverão ser realizadas através do email{' '}
              <a href='asteriskhotelbrasil@gmail.com'>asteriskhotelbrasil@gmail.com</a>.
            </p>
            <p>
              Caso <strong>ACEITE</strong> que seus Dados Pessoais sejam coletados, por favor,
              concorde com este aviso.
            </p>
            <p>
              Aceito – <strong>CONCORDO</strong> / Não aceito – <strong>NÃO CONCORDO</strong>
            </p>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  )
}
