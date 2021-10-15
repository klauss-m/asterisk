import styled from '@emotion/styled'

import { Button } from '../../Hero/components/Button'

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  margin-bottom: 24px;
  padding: 24px;
  color: #fff;

  h3 {
    font-size: 1.3rem;
    margin-bottom: 1rem;
  }

  input[type='email'] {
    padding: 8px 20px;
    border-radius: 2px;
    margin-right: 10px;
    outline: none;
    border: none;
    font-size: 18px;
    margin-bottom: 16px;
    border: 1px solid #fff;
    color: black;
  }
`

export function Subscription() {
  return (
    <Section>
      <h3>Atualizações Asterisk</h3>
      <form>
        <input name='email' type='email' placeholder='você@email.com' />
        <Button type='submit'>Inscreva-se</Button>
      </form>
    </Section>
  )
}
