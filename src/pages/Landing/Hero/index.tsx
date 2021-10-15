/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content*/

import { useHistory } from 'react-router'

import { Button, Div, Heading, Video, Line, ButtonContainer } from './components'

import video from '../asterisk.mp4'

export default function Hero() {
  const history = useHistory()

  return (
    <Div>
      <a id='landing-hero' />
      <Video src={video} autoPlay loop muted />
      <Heading />
      <Line>O que está esperando?</Line>
      <ButtonContainer>
        <Button
          onClick={() => {
            document.querySelector('#landing-cards')!.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          SAIBA MAIS
        </Button>
        <Button onClick={() => history.push('/next')}>ENTRAR</Button>
      </ButtonContainer>
    </Div>
  )
}
