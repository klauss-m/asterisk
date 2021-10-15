import styled from '@emotion/styled'

const Button = styled.button`
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  background-color: #ffffff;
  color: #242424;
  border: 1px solid #ffffff;
  padding: 12px 26px;
  font-size: 1rem;
  margin: 0.5rem;

  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    color: #242424;
    transition: 250ms;
  }
`

export { Button }
