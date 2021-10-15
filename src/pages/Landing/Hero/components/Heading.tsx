import styled from '@emotion/styled'

const slogans = [
  'LUXO. REDEFINIDO.',
  'REQUINTE. ELEVADO.',
  'OPULÊNCIA. ALCANÇADA.',
  'ESPLENDOR. ENCONTRADO.',
  'GRANDEZA. CONSTITUÍDA.',
  'SUNTUOSIDADE. CONQUISTADA.',
  'MAGNIFICICÊNCIA. REAL.',
  'OSTENTAÇÃO. ESTABELECIDA.',
]

const HeadingStyle = styled.h1`
  color: #fff;
  font-size: 6rem;
  margin-top: -100px;
  text-align: center;

  @media screen and (max-width: 960px) {
    font-size: 4rem;
    margin-top: -150px;
  }

  @media screen and (max-width: 768px) {
    font-size: 2.5rem;
    margin-top: -100px;
  }
`
export function Heading() {
  return <HeadingStyle>{slogans[Math.floor(Math.random() * slogans.length)]}</HeadingStyle>
}
