import styled from '@emotion/styled'

import { Subscription, Links, SocialMedia } from './components'

const FooterStyle = styled('footer')`
  background-color: #242424;
  padding: 4rem 0 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
    sans-serif;
`

export default function Footer() {
  return (
    <FooterStyle>
      <Subscription />
      <Links />
      <SocialMedia />
    </FooterStyle>
  )
}
