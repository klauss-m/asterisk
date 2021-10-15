/* eslint-disable jsx-a11y/anchor-is-valid */

import styled from '@emotion/styled'

const Section = styled.section`
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  color: white;

  h2 {
    font-size: 1.3rem;
  }

  @media screen and (max-width: 540px) {
    text-align: center;

    div {
      margin: 0 0.4rem 2rem 0.4rem;
    }
  }
`
const LinkList = styled.ul`
  padding-left: 0;

  a,
  a:hover {
    color: #e9e9e9;
    transition: 0.3s ease-out;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  li {
    list-style: none;
  }

  @media screen and (max-width: 540px) {
    text-align: center;
  }
`

export function Links() {
  return (
    <Section>
      <div>
        <h2>Sobre nós</h2>
        <LinkList>
          <li>
            <a href='#'>História</a>
          </li>
          <li>
            <a href='#'>Carreiras</a>
          </li>
          <li>
            <a href='#'>Investidores</a>
          </li>
          <li>
            <a href='#'>Termos de Serviço</a>
          </li>
        </LinkList>
      </div>
      <div>
        <h2>Contato</h2>
        <LinkList>
          <li>
            <a href='#'>Suporte</a>
          </li>
          <li>
            <a href='#'>Destinos</a>
          </li>
          <li>
            <a href='#'>Covid-19</a>
          </li>
          <li>
            <a href='#'>Parcerias</a>
          </li>
        </LinkList>
      </div>
    </Section>
  )
}
