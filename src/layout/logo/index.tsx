import styled from '@emotion/styled'
import { useHistory } from 'react-router'

import logo from './logo.svg'

const LogoStyle = styled.img`
  @keyframes cw {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  /* cursor: pointer;
  animation: cw infinite 2s; */
`

export default function Logo() {
  const history = useHistory()

  return (
    <>
      <LogoStyle src={logo} width={40} onClick={() => history.push('/home')} />{' '}
    </>
  )
}
