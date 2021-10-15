/* eslint-disable jsx-a11y/anchor-is-valid */

import styled from '@emotion/styled'

import { ReactComponent as Facebook } from '../../../../images/facebook.svg'
import { ReactComponent as Instagram } from '../../../../images/instagram.svg'
import { ReactComponent as Linkedin } from '../../../../images/linkedin.svg'
import { ReactComponent as Tiktok } from '../../../../images/tiktok.svg'
import { ReactComponent as Twitter } from '../../../../images/twitter.svg'

const Section = styled.section``
const LinkList = styled.ul`
  li {
    list-style: none;
    display: inline;
    margin: 0.7rem;
    cursor: pointer;
  }

  display: flex;
  margin-top: 2rem;
`

export function SocialMedia() {
  return (
    <Section>
      <LinkList>
        <li>
          <Facebook fill='#fff' style={{ width: '2rem' }} />
        </li>
        <li>
          <Instagram fill='#fff' style={{ width: '2rem' }} />
        </li>
        <li>
          <Linkedin fill='#fff' style={{ width: '2rem' }} />
        </li>
        <li>
          <Tiktok fill='#fff' style={{ width: '2rem' }} />
        </li>
        <li>
          <Twitter fill='#fff' style={{ width: '2rem' }} />
        </li>
      </LinkList>
    </Section>
  )
}
